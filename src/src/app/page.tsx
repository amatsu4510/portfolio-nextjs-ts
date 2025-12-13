'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSortedPostsData, PostData } from '@/app/lib/blog/blog';

// --- データ型定義 ---
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  link: string; // GitHubまたはデプロイURL
}

// カテゴリーごとの色を定義（tailwindのクラス名）
const categoryColors: { [key: string]: string } = {
  'Webアプリ': 'text-red-500 bg-red-100 dark:bg-red-900/50 dark:text-red-300',
  'サンプルコード': 'text-green-500 bg-green-100 dark:bg-green-900/50 dark:text-green-300',
  'Webサイト': 'text-purple-500 bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300',
  'すべて': 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300',
};

// カテゴリーの色を取得するヘルパー関数
const getCategoryColor = (category: string) => categoryColors[category] || 'text-gray-500 bg-gray-200 dark:bg-gray-600/50 dark:text-gray-400';

// --- サンプルプロジェクトデータ (全データ) ---
const ALL_PROJECTS: Project[] = [
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
    description: 'このサイト自体。Next.jsのSSG機能を利用し、AWS S3とCloudFrontを用いたサーバーレスデプロイパイプラインを構築。',
    category: 'Webサイト',
    techStack: ['Next.js', 'AWS S3', 'AWS CloudFront', 'GitHub Actions'],
    link: '#',
  },
  {
    id: 3,
    title: '必殺チャタテムシ駆除捕獲人',
    description: 'チャタテムシに関する情報をまとめた情報サイト。',
    category: 'Webサイト',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://www.chatachata.jp/',
  },
  {
    id: 4,
    title: 'ECサイトデモプロジェクト',
    description: 'ECサイトの基本的な機能を備えたデモプロジェクト。商品一覧、カート機能、購入フローなどを実装。',
    category: 'Webサイト',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    link: '/projects/ec_site_demo',
  },
];

// --- Homeで表示する最新ハイライトデータを抽出 ---
const LATEST_PROJECTS = ALL_PROJECTS.slice(0, 3); // 最新3件

// --- スキル/学習サマリーデータ ---
const LEARNING_SUMMARY = [
    { title: 'フロントエンド', skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', '状態管理 (Zustandなど)'] },
    { title: 'バックエンド/DB', skills: ['Node.js', 'Express.js', 'Next.js API Routes', 'Prisma', 'PostgreSQL'] },
    { title: 'インフラ/DevOps (開発環境)', skills: ['AWS (S3, CloudFront, Amplify)', 'Docker', 'Docker Compose', 'Git/GitHub', 'WSL'] },
];

/* トップページ */
export default function Home() {

  /* ブログ記事の状態変数定義 */
  const [latestPosts, setLatestPosts] = useState<PostData[]>([]);
  const [totalPostsCount, setTotalPostsCount] = useState<number>(0);

  // クライアントサイドで非同期にブログ記事を取得
  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPostsData = await getSortedPostsData();

        // 総記事数を設定
        setTotalPostsCount(allPostsData.length);

        setLatestPosts(allPostsData.slice(0, 2)); // 最新2件
      } catch (error) {
        console.error('ブログ記事の取得に失敗:', error);
      }
    }
    fetchPosts();
  }, []);

  return (
    // 全体の背景とテキストカラー
    <div className="flex flex-col items-center min-h-screen bg-zinc-50 font-sans text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      {/* メインコンテンツコンテナ: モバイルで左右にパディングを確保し、タブレット以上で中央揃え */}
      <main className="w-full max-w-5xl p-4 sm:p-6 space-y-16 sm:space-y-20 pt-10 sm:pt-16">

        {/* --- ヒーローセクション（自己紹介欄） ---*/}
        {/* モバイルでパディングを削減し、角を丸くする */}
        <section id="about" className="text-center p-6 sm:p-10 md:p-16 lg:p-20 rounded-3xl bg-white/90 shadow-2xl backdrop-blur-sm dark:bg-zinc-800/90 ">

          {/* H1: モバイルで小さく、デスクトップで大きく */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-zinc-900 dark:text-white">
            学習ポートフォリオ
          </h1>

          <div className="max-w-4xl mx-auto text-left space-y-6 sm:space-y-8 mb-8">
            <p className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              基本情報
            </p>
            {/* UL: 垂直方向のスペースを確保 */}
            <ul className="space-y-3 sm:space-y-2 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mb-6 border-b border-zinc-200 dark:border-zinc-700 pb-4">
              {/* LI: モバイルでの固定幅を解除し、sm以上でW-20を適用 */}
              <li className="flex flex-col sm:flex-row items-start sm:items-center">
                <span className="text-indigo-500 mr-2 font-bold w-auto sm:w-20 sm:shrink-0">名前:</span>
                千葉 翔太
              </li>
              <li className="flex flex-col sm:flex-row items-start sm:items-center">
                <span className="text-indigo-500 mr-2 font-bold w-auto sm:w-20 sm:shrink-0">生年月日:</span>
                2000年7月2日
              </li>
              <li className="flex flex-col sm:flex-row items-start">
                <span className="text-indigo-500 mr-2 font-bold w-auto sm:w-20 sm:shrink-0">経歴:</span>
                短大卒業後、組み込みシステム開発5年。<br />現在も組み込み系エンジニアとして勤務しつつ、Web開発を独学中。
              </li>
            </ul>

            <p className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              主な学習内容
            </p>
            <ul className="space-y-2 text-base sm:text-lg text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 text-xl">&bull;</span>
                フロントエンド: Next.js, React, TypeScript, Tailwind CSS を用いたモダンなUI/UX設計と実装。
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 text-xl">&bull;</span>
                インフラ・デプロイ: AWS (S3, CloudFront) を中心としたサーバーレス構成でのデプロイ経験。
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 text-xl">&bull;</span>
                開発環境: Docker と WSL を活用した、チーム開発にも対応可能なポータブルな環境構築。
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 text-xl">&bull;</span>
                目標: 開発環境の構築から、実際のアプリケーション設計、デプロイ、運用までの一連の工程を習得すること。
              </li>
            </ul>
          </div>

          <div className="mt-8">
            {/* 連絡先/GitHubへのボタン: モバイルで適切なパディングとテキストサイズ */}
            <Link
              href="https://github.com/amatsu4510"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-base sm:text-lg font-semibold text-white transition-transform hover:scale-[1.02] shadow-lg"
            >
              GitHub
            </Link>
          </div>
        </section>

        {/* -------------------------------------------------------------------------------------- */}

        {/* --- プロジェクト/作品のハイライトセクション --- */}
        <section id="projects-highlight">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-l-4 border-indigo-500 pl-4">
            プロジェクト (最新) 💻
          </h2>
          {/* Topページでは最新の3件のみを表示 */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {LATEST_PROJECTS.map((project) => (
                <article key={project.id}>
                <div
                  className="rounded-xl p-5 sm:p-6 bg-white hover:bg-zinc-50 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 shadow-lg transition-shadow hover:shadow-xl"
                >
                  <div className="flex justify-between items-start mb-3 h-12">
                    <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {project.title}
                    </h3>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${getCategoryColor(project.category)}`}
                    >
                      {project.category}
                    </span>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm line-clamp-3 h-16">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map(tech => ( // 3つに制限
                      <span key={tech} className="text-xs px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={project.link}
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline text-sm"
                  >
                    詳細を見る &rarr;
                  </Link>
                </div>
                </article>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/projects" // 全プロジェクトページへのリンク
              className="rounded-xl bg-indigo-100 dark:bg-indigo-900/50 px-6 py-3 text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-300 transition-colors hover:bg-indigo-200 dark:hover:bg-indigo-900 shadow-md"
            >
              すべてのプロジェクト見る (全{ALL_PROJECTS.length}件)
            </Link>
          </div>
        </section>

        {/* -------------------------------------------------------------------------------------- */}

        {/* --- ブログ記事のハイライトセクション --- */}
        <section id="blog-highlight">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-l-4 border-indigo-500 pl-4">
            Shota Blog (最新) 📚
          </h2>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {latestPosts.map(({ id, title, date, update }) => (
              <article key={id}>
                <Link
                  href={`/blog/${id}`}
                  className="block p-5 sm:p-6 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 shadow-lg transition-transform hover:scale-[1.005]"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white hover:text-indigo-600 transition-colors mb-2 sm:mb-0">
                      {title}
                    </h3>
                    <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 shrink-0 ml-0 sm:ml-4 text-left sm:text-right">
                    <div>投稿日: {new Date(date).toLocaleDateString()}</div>
                    {update && update !== date && (
                    <div>更新日: {new Date(update).toLocaleDateString()}</div>
                    )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block text-indigo-600 dark:text-indigo-400 font-semibold hover:underline text-sm">
                      記事を見る &rarr;
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="text-center pt-8">
            <Link
              href="/blog" // 全ブログ記事ページへのリンク
              className="rounded-xl bg-indigo-100 dark:bg-indigo-900/50 px-6 py-3 text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-300 transition-colors hover:bg-indigo-200 dark:hover:bg-indigo-900 shadow-md"
            >
              すべての記事を読む (全{totalPostsCount}件)
            </Link>
          </div>
        </section>

        {/* --- スキル/学習したことまとめセクション --- (変更なし) */}
        <section id="skills" className="pb-16 sm:pb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 border-l-4 border-indigo-500 pl-4">
            開発環境と習得スキル ✨
          </h2>
          {/* Grid: モバイルでは1カラム (grid-cols-1)、md以上で3カラム */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {LEARNING_SUMMARY.map((group) => (
              <div
                key={group.title}
                className="rounded-xl p-5 sm:p-6 bg-white dark:bg-zinc-800/80 shadow-md border-t-4 border-indigo-500"
              >
                <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.skills.map(skill => (
                    <li key={skill} className="flex items-center text-zinc-700 dark:text-zinc-300 text-base">
                      <svg className="w-4 h-4 mr-2 text-indigo-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
