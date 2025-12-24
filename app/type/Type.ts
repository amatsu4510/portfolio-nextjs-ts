// --- データ型定義 ---

/* プロジェクトデータ型 */
export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  link: string; // GitHubまたはデプロイURL
}

/* ブログ記事データ型 */
export type PostData = {
  id: string;
  date: string;
  update: string;
  title: string;
  description: string;
  content?: string; // getSortedPostsDataでは含まれないためオプショナルに
};