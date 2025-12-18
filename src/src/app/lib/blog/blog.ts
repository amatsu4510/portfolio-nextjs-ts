'use server'; // Server Component / Actionとして動作することを明示

import matter from 'gray-matter';
// fs や path のインポートは S3 移行により不要となるため削除

// ----------------------------------------------------------------------
// 🔥 S3設定: 環境変数から S3 のベースURLを取得
// デプロイ前に 'BLOG_S3_BASE_URL' 環境変数を設定してください。
// 例: https://{YOUR_BUCKET_NAME}.s3.{YOUR_REGION}.amazonaws.com/
//const S3_BASE_URL = process.env.BLOG_S3_BASE_URL || 'https://placeholder-s3-url.com/';
const S3_BASE_URL = process.env.NEXT_PUBLIC_BLOG_S3_BASE_URL;

// S3バケット内の 'blog/' フォルダを基準とする
const BASE_CONTENT_URL = `${S3_BASE_URL}blog/`;

// 記事一覧メタデータ JSON ファイルの場所
const POSTS_LIST_URL = `${BASE_CONTENT_URL}posts-list.json`;
// ----------------------------------------------------------------------


// 記事データに必要な型の定義 (変更なし)
export type PostData = {
  id: string;
  date: string;
  update: string;
  title: string;
  content?: string; // getSortedPostsDataでは含まれないためオプショナルに
};

/**
 * Next.jsのfetch APIを使用し、キャッシュと再検証を制御します。
 * @param url 取得する URL
 * @param revalidate キャッシュを再検証する間隔（秒）。ISRに利用されます。
 */
async function fetchWithRevalidate(url: string, revalidate: number = 60) {
  // 本番環境では環境変数の設定を必須とする
  if (!S3_BASE_URL) {
    // 開発環境と本番環境で、環境変数が設定されていない場合にクラッシュさせる
    throw new Error('NEXT_PUBLIC_BLOG_S3_BASE_URL is not set. Please set the S3 base URL environment variable.');
  }

  // 環境変数が設定されていない場合のエラーを防ぐ
  if (S3_BASE_URL.includes('placeholder-s3-url.com')) {
    console.error("BLOG_S3_BASE_URL is not configured.");
    // 開発環境でクラッシュしないようにダミーデータを返すための例外を投げる
    throw new Error("S3 URL is a placeholder. Configure BLOG_S3_BASE_URL.");
  }

  const response = await fetch(url, {
    // ISRの動作を設定
    next: { revalidate: revalidate }
  });

  if (!response.ok) {
    // S3のデータが見つからない、またはアクセスできない場合はエラー
    console.error(`Failed to fetch ${url}. Status: ${response.status}`);
    throw new Error(`Content not found or inaccessible: ${url}`);
  }
  return response;
}


/**
 * すべての投稿データを日付降順で取得します。
 * S3にアップロードされた posts-list.json からメタデータを取得します。
 * @returns {Promise<PostData[]>} 投稿データの配列（id, title, date, update）
 */
export async function getSortedPostsData(): Promise<PostData[]> {
  try {
    console.log('Fetching posts list from S3:', POSTS_LIST_URL);

    // S3からメタデータのJSONリストを取得し、60秒ごとに再検証を試みる
    const response = await fetchWithRevalidate(POSTS_LIST_URL, 60);
    const allPostsData = await response.json() as PostData[];

    // 日付でソートします (新しい記事が上に来るように降順ソート)
    return allPostsData.sort((a, b) => {
      // 日付を Date オブジェクトに変換して比較
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

  } catch (error) {
    console.error('Error in getSortedPostsData:', error);
    // posts-list.jsonが存在しない/アクセスできない場合は空の配列を返し、ビルド時のクラッシュを防ぐ
    return [];
  }
}

/**
 * 個別の投稿データをS3から取得し、マークダウン本文とメタデータをパースします。
 * @param id 記事ID（ファイル名）
 * @returns {Promise<PostData>} 個別の投稿データ
 */
export async function getPostData(id: string): Promise<PostData> {
  // URLから渡される場合はデコードしてファイル名に変換 (S3キーに安全な文字列へ)
  const fileName = decodeURIComponent(id);

  // S3上のマークダウンファイルへのフルパスを構築
  // S3上のパスは BASE_CONTENT_URL/markdown/{fileName}.md を想定
  const markdownUrl = `${BASE_CONTENT_URL}markdown/${fileName}.md`;

  try {
    console.log('Fetching single post from S3:', markdownUrl);

    // S3から個別マークダウンファイルの内容を取得
    const response = await fetchWithRevalidate(markdownUrl, 60);
    const fileContents = await response.text();

    // gray-matterを使って、メタデータセクションをパースします
    const matterResult = matter(fileContents);

    return {
      id,
      content: matterResult.content, // Markdown文字列
      // matterResult.data から title, date, update を取得
      ...(matterResult.data as { title: string; date: string; update: string }),
    };
  } catch (error) {
    console.error(`Error in getPostData for ID ${id}:`, error);
    // 記事が見つからない、またはアクセスできない場合はエラーを投げる
    throw new Error(`Post not found or inaccessible: ${id}`);
  }
}