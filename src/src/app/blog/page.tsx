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
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 py-16">
            <main className="w-full max-w-3xl mx-auto p-6 space-y-10">
                <div className="space-y-6">
                    <div className="container mx-auto p-4">
                        <h1 className="text-5xl font-extrabold mb-8 text-center">
                            Shota Blog
                        </h1>
                        
                        <section className="mt-8">
                            <h2 className="text-4xl font-extrabold mb-10 border-l-4 border-indigo-500 pl-4">
                                Blog一覧 📚
                            </h2>
                            
                            <ul className="space-y-6">
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
                <div className="text-center pt-8">
                    <Link 
                        href="https://qiita.com/amatsu4510"
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