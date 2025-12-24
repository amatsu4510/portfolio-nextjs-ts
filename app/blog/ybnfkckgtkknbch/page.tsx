'use client'

import { useState, useRef, UIEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../../../styles/MarkdownViewer.css'

const BlogPreviewPage = () => {
  const [content, setContent] = useState('');
  const imageBaseUrl = process.env.NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL || '';

  /* スクロール同期用のRef */
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  /* エディタのスクロールに合わせてプレビューを動かす */
  const handleScroll = (e: UIEvent<HTMLTextAreaElement>) => {
    const editor = editorRef.current;
    const preview = previewRef.current;

    if (editor && preview) {
      /* スクロール率を計算 (現在の位置 / スクロール可能な最大幅) */
      const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);

      /* プレビュー側のスクロール位置を決定 */
      preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <h1 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Blog Preview Editor</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80vh]">
        {/* 左側：エディタ */}
        <textarea
          ref={editorRef}
          onScroll={handleScroll}
          className="w-full h-full p-4 border rounded-md font-mono text-sm bg-white dark:bg-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          placeholder="ここにマークダウンを貼り付けてください..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 右側：プレビュー表示 */}
        <div
          ref={previewRef}
          className="w-full h-full p-6 border rounded-md bg-white dark:bg-zinc-800 overflow-y-auto border-zinc-300 dark:border-zinc-700"
        >
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content.replaceAll('__BLOG_IMAGE__BASE__', imageBaseUrl)}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        ※ 左側のエディタをスクロールすると、右側のプレビューも同期して動きます。
      </p>
    </div>
  );
}

export default BlogPreviewPage;