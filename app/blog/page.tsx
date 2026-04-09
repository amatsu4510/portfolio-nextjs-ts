import Link from 'next/link';
import { Metadata } from 'next';
import { PostData } from '../type/Type';
import { getSortedPostsData } from '../lib/blog/blog';
import { formatDate } from '../lib/common/common';

export const metadata: Metadata = {
  title: "Blog一覧",
  description: "組み込みエンジニアShotaの技術ブログ。Next.jsやAWSなどに関する知見を発信しています。",
  openGraph: {
    title: "Blog一覧 | Shota Portfolio",
    description: "組み込みエンジニアShotaの技術ブログ。最新の学習内容や開発記録を公開中。",
    url: "https://shoat-portfolio.com/blog",
  },
};

const BlogPage = async () => {
  const allPostsData: PostData[] = await getSortedPostsData();

  return (
    <div className="py-10 sm:py-16">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-12">

        {/* ページヘッダー */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight gradient-text">
            Shota Blog
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base">
            学習記録・技術アウトプット
          </p>
        </div>

        {/* 記事一覧 */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-700 dark:text-zinc-200 mb-8">
            Blog一覧 📚
          </h2>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allPostsData.map(({ id, date, update, title, description }) => (
              <li key={id}>
                <article className="group glass-card relative flex flex-col w-full min-h-[260px] p-7 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* タイトル */}
                  <div className="mb-4">
                    <Link href={`/blog/${id}`} className="block">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                        {title}
                      </h3>
                    </Link>
                  </div>

                  {/* 説明文 */}
                  <div className="flex-1 mb-5">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {description || "この記事の説明文はありません。"}
                    </p>
                  </div>

                  {/* メタ情報 */}
                  <div className="flex flex-wrap items-center gap-3 border-t border-zinc-100 dark:border-zinc-700/50 pt-4">
                    <div className="flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-500">
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      投稿: {formatDate(date)}
                    </div>
                    {update && update !== date && (
                      <div className="flex items-center text-xs font-medium text-indigo-500/80 dark:text-indigo-400/80">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        更新: {formatDate(update)}
                      </div>
                    )}
                  </div>

                  {/* ホバー矢印 */}
                  <div className="absolute top-7 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hidden sm:block">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* 外部ブログリンク */}
        <div className="text-center pt-4 border-t border-zinc-200 dark:border-zinc-700/70 space-y-4">
          <Link
            href="https://qiita.com/amatsu4510"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            外部ブログ（Qiita/Zenn）を見る &rarr;
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-base font-medium text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            &larr; トップページに戻る
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
