'use client';

import React from 'react';
import Link from 'next/link';

// --- データ型定義と定数（本来は共通ファイルに切り出すべきもの） ---
interface Post {
  id: number;
  title: string;
  summary: string;
  date: string; // 投稿日
  tags: string[];
  link: string;
}

const ALL_POSTS: Post[] = [
  {
    id: 101,
    title: 'AWS CloudFrontとS3でNext.jsの静的サイトを完全サーバーレスデプロイする方法',
    summary: 'SSGでビルドしたNext.jsアプリをS3にアップロードし、CloudFrontでCDN配信する手順を解説。',
    date: '2025-01-15',
    tags: ['AWS', 'Next.js', 'インフラ', 'サーバーレス'],
    link: 'https://qiita.com/your-qiita-id/post/xxxxxxxxxxxxxxxxxxxx',
  },
  {
    id: 102,
    title: 'Docker Composeでモダンな開発環境を一発構築',
    summary: '開発環境のポータビリティを確保するため、Docker Composeを使ってコンテナ化するメリットと具体的な設定方法を紹介。',
    date: '2024-12-20',
    tags: ['Docker', '開発環境', 'WSL', 'TypeScript'],
    link: 'https://zenn.dev/your-zenn-id/articles/xxxxxxxxxxxxxxxxxxxx',
  },
  { 
    id: 103,
    title: 'Tailwind CSSでのダークモード実装とベストプラクティス',
    summary: 'Tailwindのユーティリティクラスを用いたダークモードの簡単な実装方法と、テーマ切り替えの仕組みを紹介。',
    date: '2024-11-01',
    tags: ['Tailwind CSS', 'UI/UX', 'フロントエンド'],
    link: 'https://zenn.dev/your-zenn-id/articles/yyyyyyyyyyyyyyyyyyyy',
  },
  {
    id: 104,
    title: 'Next.js App RouterでのServer ComponentsとClient Componentsの使い分け',
    summary: 'App Routerの基本概念を理解し、パフォーマンスを最大化するためのコンポーネント戦略を解説。',
    date: '2024-10-10',
    tags: ['Next.js', 'React', 'アーキテクチャ'],
    link: 'https://qiita.com/your-qiita-id/post/zzzzzzzzzzzzzzzzzzzz',
  },
];
// ----------------------------------------------------------------------


export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 py-16">
      <main className="w-full max-w-3xl mx-auto p-6 space-y-10">
        
        <h1 className="text-4xl font-extrabold mb-10 border-l-4 border-indigo-500 pl-4">
          技術ブログ記事一覧 📚
        </h1>
        
        <div className="space-y-6">
          {ALL_POSTS.map((post) => (
            <a 
              key={post.id}
              href={post.link} 
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 shadow-lg transition-transform hover:scale-[1.005]"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 flex-shrink-0 ml-4">
                  {post.date}
                </span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-3 text-sm">
                {post.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
        
        {/* 外部ブログへの誘導リンク (任意) */}
        <div className="text-center pt-8">
          <Link 
            href="https://qiita.com/amatsu4510" // 実際のQiita/ZennなどのURLに変更
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
          >
            外部ブログ（Qiita/Zenn）を見る &rarr;
          </Link>
        </div>

        <div className="text-center pt-4">
            <Link 
                href="/"
                className="inline-block text-lg font-semibold text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
                &larr; トップページに戻る
            </Link>
        </div>
      </main>
    </div>
  );
}