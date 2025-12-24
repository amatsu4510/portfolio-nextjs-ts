'use client'

import Link from "next/link";
import { getSortedPostsData } from '../../lib/blog/blog';
import { useEffect, useState } from 'react';
import { PostData } from "../../type/Type";

const Top2Blog = () => {
    /* ブログ記事の状態変数定義 */
    const [latestPosts, setLatestPosts] = useState<PostData[]>([]);
    const [totalPostsCount, setTotalPostsCount] = useState<number>(0);

    /* クライアントサイドで非同期にブログ記事を取得 */
    useEffect(() => {
        async function fetchPosts() {
            try {
                const allPostsData = await getSortedPostsData();
                /* 総記事数を設定 */
                setTotalPostsCount(allPostsData.length);
                /* 最新2件 */
                setLatestPosts(allPostsData.slice(0, 2));
            } catch (error) {
                console.error('ブログ記事の取得に失敗:', error);
            }
        }
        fetchPosts();
    }, []);
    return (
        <>
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
        </>
    )
}

export default Top2Blog;