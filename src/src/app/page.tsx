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
    title: 'モダンWebアプリ開発環境構築',
    description: 'Docker, Next.js, TypeScript, Tailwind CSS, WSLを使った開発環境の基盤構築。保守性とスケーラビリティを意識。',
    category: 'サンプルコード',
    techStack: ['Docker', 'Next.js', 'TypeScript', 'Tailwind CSS', 'WSL'],
    link: 'https://github.com/your-username/portfolio-nextjs-ts',
  },
  {
    id: 2,
    title: 'ポートフォリオサイト (AWSデプロイ)',
    description: 'このサイト自体。Next.jsのSSG機能を利用し、AWS S3とCloudFrontを用いたサーバーレスデプロイパイプラインを構築。',
    category: 'Webサイト',
    techStack: ['Next.js', 'AWS S3', 'AWS CloudFront', 'GitHub Actions'],
    link: '#',
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

  // クライアントサイドで非同期にブログ記事を取得
  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPostsData = await getSortedPostsData();
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

      {/* 1. ナビゲーションバー (ヘッダー) - stickyで固定 */}
      <header className="sticky top-0 z-10 w-full bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90 shadow-md">
        <nav className="w-full max-w-4xl mx-auto flex justify-between items-center py-4 px-6">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            千葉翔太 | Portfolio
          </span>
          <div className="space-x-6 text-sm font-medium">
            <a href="#about" className="hover:text-indigo-600 transition-colors">自己紹介</a>
            {/* 変更: 別ページへのリンクに変更 */}
            <Link href="/projects" className="hover:text-indigo-600 transition-colors">Webアプリ・作品</Link>
            {/* 変更: 別ページへのリンクに変更 */}
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">技術ブログ</Link>
            <a href="#skills" className="hover:text-indigo-600 transition-colors">開発環境・学習</a>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>
        </nav>
      </header>

      {/* メインコンテンツコンテナ */}
      <main className="w-full max-w-5xl p-6 space-y-20 pt-16">

        {/* --- ヒーローセクション（自己紹介欄） ---*/}
        <section id="about" className="text-center py-20 px-20 rounded-3xl bg-white/90 shadow-2xl backdrop-blur-sm dark:bg-zinc-800/90 ">

          <h1 className="text-5xl font-extrabold mb-6 text-zinc-900 dark:text-white">
            学習ポートフォリオ
          </h1>

          <div className="max-w-4xl mx-auto text-left space-y-3 mb-8">
            <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                基本情報
            </p>
            <ul className="space-y-2 text-lg text-zinc-700 dark:text-zinc-300 mb-6 border-b border-zinc-200 dark:border-zinc-700 pb-4">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 font-bold w-20 flex-shrink-0">名前:</span>
                千葉 翔太
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 font-bold w-20 flex-shrink-0">生年月日:</span>
                2000年7月2日
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 font-bold w-20 flex-shrink-0">経歴:</span>
                短大卒業後、組み込みシステム開発5年。<br />現在も組み込み系エンジニアとして勤務しつつ、Web開発を独学中。
              </li>
            </ul>

            <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                主な学習内容
            </p>
            <ul className="space-y-2 text-lg text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 text-xl">&bull;</span>
                フロントエンド: Next.js, React, TypeScript, Tailwind CSS を用いたモダンなUI/UX設計と実装。
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 text-xl">&bull;</span>
                インフラ・デプロイ: AWS (S3, CloudFront)** を中心としたサーバーレス構成でのデプロイ経験。
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

          <div className="mt-8 space-x-4">
             {/* 連絡先/GitHubへのボタン */}
            <Link
              href="https://github.com/amatsu4510"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-lg font-semibold text-white transition-transform hover:scale-[1.02] shadow-lg"
            >
              GitHubを見る (コードはこちら)
            </Link>
          </div>
        </section>

        {/* -------------------------------------------------------------------------------------- */}

        {/* --- プロジェクト/作品のハイライトセクション --- */}
        <section id="projects-highlight">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-indigo-500 pl-4">
            Webアプリ・作品 (最新) 💻
          </h2>
          {/* Topページでは最新の3件のみを表示 */}
          <div className="grid gap-6 md:grid-cols-3">
            {LATEST_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl p-6 bg-white hover:bg-zinc-50 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 shadow-lg"
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline text-sm"
                  >
                    詳細を見る &rarr;
                  </Link>
                </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/projects" // 全プロジェクトページへのリンク
              className="rounded-xl bg-indigo-100 dark:bg-indigo-900/50 px-6 py-3 text-lg font-semibold text-indigo-600 dark:text-indigo-300 transition-colors hover:bg-indigo-200 dark:hover:bg-indigo-900 shadow-md"
            >
              すべての作品・プロジェクトを見る (全{ALL_PROJECTS.length}件)
            </Link>
          </div>
        </section>

        {/* -------------------------------------------------------------------------------------- */}

        {/* --- ブログ記事のハイライトセクション --- */}
        <section id="blog-highlight">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-indigo-500 pl-4">
            Shota Blog (最新) 📚
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {latestPosts.map(({ id, title, date, update }) => (
              <Link
                key={id}
                href={`/blog/${id}`}
                className="block p-6 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 shadow-lg transition-transform hover:scale-[1.005]"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white hover:text-indigo-600 transition-colors">
                    {title}
                  </h3>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 flex-shrink-0 ml-4 text-right">
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
            ))}
          </div>
          <div className="text-center pt-8">
            <Link
              href="/blog" // 全ブログ記事ページへのリンク
              className="rounded-xl bg-indigo-100 dark:bg-indigo-900/50 px-6 py-3 text-lg font-semibold text-indigo-600 dark:text-indigo-300 transition-colors hover:bg-indigo-200 dark:hover:bg-indigo-900 shadow-md"
            >
              すべての記事を読む (全{latestPosts.length}件)
            </Link>
          </div>
        </section>

        {/* --- スキル/学習したことまとめセクション --- (変更なし) */}
        <section id="skills" className="pb-20">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-indigo-500 pl-4">
            開発環境と習得スキル ✨
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {LEARNING_SUMMARY.map((group) => (
              <div
                key={group.title}
                className="rounded-xl p-6 bg-white dark:bg-zinc-800/80 shadow-md border-t-4 border-indigo-500"
              >
                <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.skills.map(skill => (
                    <li key={skill} className="flex items-center text-zinc-700 dark:text-zinc-300">
                      <svg className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* フッター */}
      <footer className="w-full max-w-4xl py-6 border-t border-zinc-200 dark:border-zinc-700 text-center text-sm text-zinc-500 dark:text-zinc-400 mt-10">
        &copy; {new Date().getFullYear()} 千葉翔太 Portfolio. Built with Next.js & Tailwind CSS.
      </footer>
    </div>
  );
}
