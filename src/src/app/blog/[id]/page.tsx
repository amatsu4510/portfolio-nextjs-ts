import { getPostData, getSortedPostsData, PostData } from '@/app/lib/blog/blog';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const formatDate = (date: string | Date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  const postData = await getPostData(id);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 py-16 px-4">
      <main className="max-w-3xl mx-auto space-y-8">

        {/* 記事タイトル */}
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white">{postData.title}</h1>

        {/* 投稿日・更新日 */}
        <div className="flex justify-end space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <div>投稿日: {formatDate(postData.date)}</div>
          {postData.update && postData.update !== postData.date && (
            <div>更新日: {formatDate(postData.update)}</div>
          )}
        </div>

        {/* 記事本文 (Markdown → HTML) */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{postData.content!}</ReactMarkdown>

        {/* ページ下部リンク */}
        <div className="flex justify-between mt-10 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            &larr; ブログ一覧に戻る
          </Link>
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            トップページに戻る &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}

// 静的生成パス
export async function generateStaticParams() {
  const allPosts = await getSortedPostsData();
  return allPosts.map((post: PostData) => ({
    id: post.id,
  }));
}
