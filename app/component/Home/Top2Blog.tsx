import Link from "next/link";
import { getSortedPostsData } from '../../lib/blog/blog';

const Top2Blog = async () => {
  const allPostsData = await getSortedPostsData();
  const latestPosts = allPostsData.slice(0, 2);
  const totalPostsCount = allPostsData.length;

  return (
    <>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {latestPosts.map(({ id, title, date, update }) => (
          <article key={id} className="group">
            <Link
              href={`/blog/${id}`}
              className="glass-card block rounded-2xl p-6 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
            >
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3 leading-snug">
                {title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                <span>投稿日: {new Date(date).toLocaleDateString('ja-JP')}</span>
                {update && update !== date && (
                  <span>更新日: {new Date(update).toLocaleDateString('ja-JP')}</span>
                )}
              </div>
              <span className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                記事を見る <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          </article>
        ))}
      </div>
      <div className="text-center pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-semibold text-base hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors border border-indigo-100 dark:border-indigo-800/50 shadow-sm"
        >
          すべての記事を読む (全{totalPostsCount}件)
        </Link>
      </div>
    </>
  );
};

export default Top2Blog;
