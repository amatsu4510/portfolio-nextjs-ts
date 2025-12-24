'use client';

import React, { useState } from 'react';
import { Project } from '../type/Type';
import Link from 'next/link';

const PROJECT_CATEGORIES = ['すべて', 'Webアプリ', 'サンプルコード', 'Webサイト'];
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
  // ここにさらに多くのプロジェクトを追加
];
// ----------------------------------------------------------------------

const ProjectsPage = () => {
  const [filterCategory, setFilterCategory] = useState(PROJECT_CATEGORIES[0]);

  // プロジェクトの絞り込み処理
  const filteredProjects = ALL_PROJECTS.filter(project => {
    if (filterCategory === PROJECT_CATEGORIES[0]) {
      return true;
    }
    return project.category === filterCategory;
  });

  // Next.jsのLinkコンポーネントの代わりに、aタグのラッパー関数を定義
  const CustomLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => (
    <a {...props}>{props.children}</a>
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 py-10 sm:py-16">
      <main className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-10">
      <article>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-10 border-l-4 border-indigo-500 pl-4">
          全Webアプリ・作品一覧 💻
        </h1>
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-start space-y-2 sm:space-y-0 sm:space-x-4">
          <label
            htmlFor="category-filter"
            className="font-semibold text-zinc-600 dark:text-zinc-400 text-sm sm:text-base"
          >
            カテゴリーで絞り込み:
          </label>
          <select
            id="category-filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            /* モバイルでのタッチターゲットサイズを大きくするため、パディングを増やす */
            className="w-full sm:w-auto rounded-xl border border-zinc-300 p-3 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white text-base appearance-none focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
          >
            {PROJECT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* プロジェクトリスト本体 (モバイルでは1カラムを強制) */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                /* カードのホバー効果を維持しつつ、パディングを少し増やしてモバイルでの見やすさを向上 */
                className="rounded-xl p-6 bg-white hover:bg-zinc-50 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 shadow-xl transition-transform hover:scale-[1.02]"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 sm:mb-0">
                    {project.title}
                  </h3>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${getCategoryColor(project.category)} shrink-0`}
                  >
                    {project.category}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-sm line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.link}
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline text-base mt-2"
                >
                  詳細を見る &rarr;
                </Link>
              </div>
            ))
          )}
        </div>

        {/* トップページに戻るリンク */}
        <div className="text-center pt-8">
            <Link
              href="/"
              className="inline-block text-base font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
            >
              &larr; トップページに戻る
            </Link>
        </div>
        </article>
      </main>
    </div>
  );
}

export default ProjectsPage;