import { getPostData, getSortedPostsData, PostData } from '@/app/lib/blog/blog';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import '@/styles/MarkdownViewer.css';
import remarkGfm from 'remark-gfm';

const formatDate = (date: string | Date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postData = await getPostData(id);
  const imageBaseUrl = process.env.NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL || '';
  const processedContent = postData.content!.replaceAll(
    '__BLOG_IMAGE__BASE__',
    imageBaseUrl
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 py-16 px-4">
      <main className="max-w-5xl mx-auto space-y-8">
      <article>
        {/* 記事タイトル */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white text-center leading-tight">{postData.title}</h1>

        {/* 投稿日・更新日 */}
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-1 sm:space-y-0 text-sm sm:text-lg text-zinc-500 dark:text-zinc-400 border-b border-t border-zinc-200 dark:border-zinc-700 py-3">
          <div className="text-center">投稿日: {formatDate(postData.date)}</div>
          {postData.update && postData.update !== postData.date && (
            <div className="text-center">更新日: {formatDate(postData.update)}</div>
          )}
        </div>

        {/* 記事本文 (Markdown → HTML) */}
        <div className='markdown-body'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{processedContent!}</ReactMarkdown>
        </div>

        {/* ページ下部リンク */}
        <div className="flex flex-col sm:flex-row justify-between pt-8 border-t border-zinc-200 dark:border-zinc-700 mt-10 text-sm text-zinc-500 dark:text-zinc-400 space-y-4 sm:space-y-0">
          <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-center sm:text-left p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
            &larr; ブログ一覧に戻る
          </Link>
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-center sm:text-right p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
            トップページに戻る &rarr;
          </Link>
        </div>
      </article>
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
