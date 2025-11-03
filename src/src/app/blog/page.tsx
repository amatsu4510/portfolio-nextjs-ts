// サーバーコンポーネントとして動作させる
import { getSortedPostsData, PostData } from '@/app/lib/blog/blog';
import Link from 'next/link';

export default async function BlogPage() {
    const allPostsData: PostData[] = await getSortedPostsData();

    // 日付を「YYYY-MM-DD」形式に整形する関数
    const formatDate = (date: string | Date) => {
        const d = typeof date === 'string' ? new Date(date) : date;
        return d.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    return (
        <div className="min-h-screen bg-white font-sans text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 py-8 sm:py-12">
            <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                            Shota Blog
                        </h1>

                        <section className="space-y-8">
                            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-700 dark:text-zinc-200">
                                Blog一覧 📚
                            </h2>

                            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {allPostsData.map(({ id, date, update, title }) => (
                                    <li
                                        key={id}
                                        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-zinc-800"
                                    >
                                        {/* 個別記事へのリンク */}
                                        <Link
                                            href={`/blog/${id}`}
                                            className="block text-2xl font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            {title}
                                        </Link>

                                        {/* 投稿日と更新日 */}
                                        <small className="text-gray-500 dark:text-gray-400 mt-1 block">
                                        投稿日: {formatDate(date)}
                                        {update && update !== date && (
                                            <span className="ml-4">更新日: {formatDate(update)}</span>
)}
                                        </small>
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