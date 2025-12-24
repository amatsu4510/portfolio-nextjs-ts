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
        url: "https://shoat-portfolio.com/blog", // ブログトップのURL
    },
};

const BlogPage = async () => {
    const allPostsData: PostData[] = await getSortedPostsData();

    return (
        <div className="min-h-screen bg-white font-sans text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 py-8 sm:py-12">
            <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-600">
                            Shota Blog
                        </h1>

                        <section className="space-y-8">
                            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-700 dark:text-zinc-200">
                                Blog一覧 📚
                            </h2>

                            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {allPostsData.map(({ id, date, update, title, description }) => (
                                    <li
                                        key={id}
                                        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-zinc-800"
                                    >
                                        <article className="group relative flex flex-col w-full h-[280px] p-8 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl bg-white dark:bg-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300 shadow-sm hover:shadow-md">
                                        {/* タイトルエリア：高さを固定 (h-20) */}
                                        <div className="flex items-start">
                                            <Link href={`/blog/${id}`} className="block">
                                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                                                    {title}
                                                </h3>
                                            </Link>
                                        </div>

                                        {/* 説明文エリアも高さを固定せず、余白で調整 */}
                                        <div className="mt-4 mb-6">
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                                                {description || "この記事の説明文はありません。"}
                                            </p>
                                        </div>
                                        {/* 余白を埋めるためのスペーサー */}
                                        <div className="grow"></div>
                                        {/* メタ情報エリア：下部に固定 */}
                                        <div className="mt-auto flex flex-wrap items-center gap-y-2 border-t border-zinc-100 dark:border-zinc-700/50 pt-6">
                                            <div className="flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-500">
                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                投稿: {formatDate(date)}
                                            </div>
                                            {update && update !== date && (
                                                <div className="ml-4 flex items-center text-xs font-medium text-indigo-500/80 dark:text-indigo-400/80">
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    更新: {formatDate(update)}
                                                </div>
                                            )}
                                        </div>
                                        {/* 装飾用の矢印 */}
                                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hidden sm:block">
                                            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                        </article>
                                </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>

                {/* 外部ブログへの誘導リンク */}
                <div className="text-center pt-8 border-t border-zinc-200 dark:border-zinc-700/70 space-y-4">
                    <Link
                        href="https://qiita.com/amatsu4510"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
                    >
                        外部ブログ（Qiita/Zenn）を見る &rarr;
                    </Link>
                </div>

                <div className="text-center pt-4">
                    <Link
                        href="/"
                        className="inline-block text-base sm:text-lg font-medium text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mt-2"
                    >
                        &larr; トップページに戻る
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default BlogPage;