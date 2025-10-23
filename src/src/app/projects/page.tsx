'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// --- データ型定義と定数（本来は共通ファイルに切り出すべきもの） ---
const PROJECT_CATEGORIES = ['すべて', 'Webアプリ', 'サンプルコード', 'Webサイト'];

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  link: string;
}

const categoryColors: { [key: string]: string } = {
  'Webアプリ': 'text-red-500 bg-red-100 dark:bg-red-900/50 dark:text-red-300',
  'サンプルコード': 'text-green-500 bg-green-100 dark:bg-green-900/50 dark:text-green-300',
  'Webサイト': 'text-purple-500 bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300',
  'すべて': 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300',
};

const getCategoryColor = (category: string) => categoryColors[category] || 'text-gray-500 bg-gray-200 dark:bg-gray-600/50 dark:text-gray-400';

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
  {
    id: 3,
    title: 'フルスタック認証システムサンプル',
    description: 'Next.jsのAPIルートとNextAuth.jsを使用し、データベース連携（例：Prisma + PostgreSQL）によるユーザー認証機能を実装。',
    category: 'Webアプリ',
    techStack: ['Next.js', 'NextAuth', 'Prisma', 'PostgreSQL'],
    link: '#',
  },
  // ここにさらに多くのプロジェクトを追加
];
// ----------------------------------------------------------------------


export default function ProjectsPage() {
  const [filterCategory, setFilterCategory] = useState(PROJECT_CATEGORIES[0]);

  // プロジェクトの絞り込み処理
  const filteredProjects = ALL_PROJECTS.filter(project => {
    if (filterCategory === PROJECT_CATEGORIES[0]) {
      return true;
    }
    return project.category === filterCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 py-16">
      <main className="w-full max-w-4xl mx-auto p-6 space-y-10">
        
        <h1 className="text-4xl font-extrabold mb-10 border-l-4 border-indigo-500 pl-4">
          全Webアプリ・作品一覧 💻
        </h1>

        {/* フィルター選択ドロップダウン */}
        <div className="mb-10 flex items-center justify-start space-x-4">
          <label className="font-semibold text-zinc-600 dark:text-zinc-400">
            カテゴリーで絞り込み:
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-xl border border-zinc-300 p-2 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white text-base appearance-none focus:border-indigo-500 focus:ring-indigo-500"
          >
            {PROJECT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* プロジェクトリスト本体 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400 py-10 col-span-full">
              {filterCategory === PROJECT_CATEGORIES[0] 
                ? '現在、登録されているプロジェクトはありません。'
                : `「${filterCategory}」のプロジェクトはありません。`}
            </p>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl p-5 bg-white hover:bg-zinc-50 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 shadow-lg transition-transform hover:scale-[1.01]"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {project.title}
                  </h3>
                  <span 
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${getCategoryColor(project.category)} flex-shrink-0`}
                  >
                    {project.category}
                  </span>
                </div>
                
                <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
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
            ))
          )}
        </div>
        
        <div className="text-center pt-8">
            <Link 
                href="/"
                className="inline-block text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
            >
                &larr; トップページに戻る
            </Link>
        </div>
      </main>
    </div>
  );
}