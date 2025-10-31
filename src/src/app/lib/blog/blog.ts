'use server'; // Server Actionとして扱うことを明示

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 記事データに必要な型の定義
export type PostData = {
  id: string;
  date: string;
  update: string;
  title: string;
  content?: string; // getSortedPostsDataでは含まれないためオプショナルに
};

// ----------------------------------------------------------------------
// 🚨 パスの修正: Dockerコンテナ内でのファイルシステム解決
// ユーザー提供の情報に基づき、ディレクトリ構造が 'src/src' となっているため、
// 二重の 'src' を含めるように修正しました。
const postsDirectory = '/app/src/src/app/contents/blog';
// ----------------------------------------------------------------------


/**
 * すべての投稿データを日付降順で取得します。
 * @returns {Promise<PostData[]>} 投稿データの配列（id, title, date, update）
 */
export async function getSortedPostsData(): Promise<PostData[]> {
  try {
    // ファイルシステムから /blog ディレクトリ直下のファイル名を取得し、.mdファイルのみをフィルタ
    console.log('Posts Directory:', postsDirectory);
    console.log(process.cwd());
    const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md'));
    
    const allPostsData = fileNames.map((fileName) => {
      // 拡張子を除いたファイル名が id になります
      const id = fileName.replace(/\.md$/, '');

      // Markdownファイルを文字列として読み込みます
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // gray-matterを使って、メタデータセクションをパースします
      const matterResult = matter(fileContents);

      // データと id を結合します
      return {
          id,
          // matterResult.data から title, date, update を取得
          ...(matterResult.data as { title: string; date: string; update: string }),
      } as PostData;
    });

    // 日付でソートします (新しい記事が上に来るように降順ソート)
    return allPostsData.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        
        return dateB - dateA; // 降順ソート
    });
  } catch (error) {
    console.error(`Error accessing blog directory: ${postsDirectory}`, error);
    // postsディレクトリが存在しない/アクセスできない場合は空の配列を返す
    // ビルド時に generateStaticParams がクラッシュするのを防ぎます
    return [];
  }
}

export async function getPostData(id: string): Promise<PostData> {
  // URLから渡される場合はデコードしてファイル名に変換
  const fileName = decodeURIComponent(id);

  const fullPath = path.join(postsDirectory, `${fileName}.md`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content, // Markdown文字列
    ...(matterResult.data as { title: string; date: string; update: string }),
  };
}
