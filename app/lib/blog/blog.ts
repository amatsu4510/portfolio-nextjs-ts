import matter from 'gray-matter';
import { PostData } from '../../type/Type';

/** * 外部ストレージ（CloudFront）の設定
 * ブログ記事のマークダウンやメタデータ取得に使用
 */
const CLD_FLONT_BASE_URL = process.env.NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL;

/* 記事コンテンツ（Markdown等）の格納ディレクトリURL */
const BASE_CONTENT_URL = `${CLD_FLONT_BASE_URL}posts/`;

/* 全記事のインデックス情報（JSON）の取得先URL */
const POSTS_LIST_URL = `${BASE_CONTENT_URL}posts-list.json`;

/**
 * Next.jsのfetch APIを使用し、キャッシュと再検証を制御します。
 * @param url 取得する URL
 * @param revalidate キャッシュを再検証する間隔（秒）。ISRに利用されます。
 */
const fetchWithRevalidate = async (url: string, revalidate: number = 60) => {
  /* 環境変数の設定を必須とする */
  if (!CLD_FLONT_BASE_URL) {
    /* 環境変数が設定されていない場合にクラッシュさせる */
    throw new Error('NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL is not set. Please set the CloudFront base URL environment variable.');
  }

  const response = await fetch(url, {
    /* ISRの動作を設定 */
    next: { revalidate: revalidate }
  } as RequestInit);

  if (!response.ok) {
    /* データが見つからないときはエラー */
    console.error(`Failed to fetch ${url}. Status: ${response.status}`);
    throw new Error(`Content not found or inaccessible: ${url}`);
  }
  return response;
}

/**
 * すべての投稿データを日付降順で取得します。
 * CloudFront経由で posts-list.json からメタデータを取得します。
 * (オリジンのS3から直接ではなく、CDNのキャッシュを利用します)
 * @returns {Promise<PostData[]>} 投稿データの配列（id, title, date, update）
 */
export const getSortedPostsData = async (): Promise<PostData[]> => {
  try {
    console.log('Fetching posts list from CloudFront:', POSTS_LIST_URL);

    /* CloudFrontからメタデータのJSONリストを取得し、60秒ごとに再検証を試みる */
    const response = await fetchWithRevalidate(POSTS_LIST_URL, 60);
    const allPostsData = await response.json() as PostData[];

    /* 日付でソートします (新しい記事が上に来るように降順ソート) */
    return allPostsData.sort((a, b) => {
      /* 日付を Date オブジェクトに変換して比較 */
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

  } catch (error) {
    console.error('Error in getSortedPostsData:', error);
    /* posts-list.jsonが存在しない/アクセスできない場合は空の配列を返し、ビルド時のクラッシュを防ぐ */
    return [];
  }
}

/**
 * 個別の投稿データをCloudFront経由でS3から取得し、マークダウン本文とメタデータをパースします。
 * @param id 記事ID（ファイル名）
 * @returns {Promise<PostData>} 個別の投稿データ
 */
export const getPostData = async (id: string): Promise<PostData> => {
  const fileName = decodeURIComponent(id);
  const markdownUrl = `${BASE_CONTENT_URL}markdown/${fileName}.md`;

  try {
    console.log('Fetching single post from CloudFront:', markdownUrl);

    const response = await fetchWithRevalidate(markdownUrl, 60);
    const fileContents = await response.text();

    /* gray-matterを使って、メタデータセクションをパース */
    const matterResult = matter(fileContents);

    return {
      id,
      content: matterResult.content,
      ...(matterResult.data as {
        title: string;
        date: string;
        update: string;
        description: string; // ← ここに追加
      }),
    };
  } catch (error) {
    console.error(`Error in getPostData for ID ${id}:`, error);
    throw new Error(`Post not found or inaccessible: ${id}`);
  }
}