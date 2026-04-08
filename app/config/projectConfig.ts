import { Project } from '../type/Type';

/* カテゴリーごとの色を定義（tailwindのクラス名）*/
const categoryColors: { [key: string]: string } = {
  'Webアプリ': 'text-red-500 bg-red-100 dark:bg-red-900/50 dark:text-red-300',
  'サンプルコード': 'text-green-500 bg-green-100 dark:bg-green-900/50 dark:text-green-300',
  'Webサイト': 'text-purple-500 bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300',
  'すべて': 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300',
};
/* カテゴリーの色を取得するヘルパー関数 */
export const getCategoryColor = (category: string) => categoryColors[category] || 'text-gray-500 bg-gray-200 dark:bg-gray-600/50 dark:text-gray-400';

export const PROJECT_CATEGORIES = ['すべて', 'Webアプリ', 'サンプルコード', 'Webサイト'];
export const ALL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'React Hooksまとめ',
    description: 'ReactのHooks（useState、useEffect）の使い方をまとめたサンプルコード集。',
    category: 'サンプルコード',
    techStack: ['React', 'Next.js', 'TypeScript'],
    link: '/projects/react_hooks_samples',
  },
  {
    id: 2,
    title: 'ポートフォリオサイト (AWSデプロイ)',
    description: 'このサイト自体。現在はAWSからVercelとCloudflareに移管',
    category: 'Webサイト',
    techStack: ['Next.js', 'AWS S3', 'AWS CloudFront', 'GitHub Actions'],
    link: '#',
  },
  {
    id: 3,
    title: '必殺チャタテムシ駆除捕獲人',
    description: 'チャタテムシに関する情報をまとめた情報サイト。WordPressからNext.jsに置き換え。',
    category: 'Webサイト',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://chatachata.jp/',
  },
  {
    id: 4,
    title: 'Shota Photography',
    description: '自分用オンライン写真展。',
    category: 'Webサイト',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://shotaphotography.com/',
  },
  // ここにさらに多くのプロジェクトを追加
];
/* 最新3つのプロジェクトを取得 */
export const LATEST_PROJECTS = ALL_PROJECTS.slice(0, 3); // 最新3件