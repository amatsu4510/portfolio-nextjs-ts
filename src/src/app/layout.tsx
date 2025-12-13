import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import MobileHeader from './MobileHeader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shota Portpolio",
  description: "組み込みエンジニアShotaのWeb開発ポートフォリオ。Next.js, TypeScript, Tailwind CSS, AWSを用いたモダンな開発スキルと具体的な作品（Webアプリ・サイト）を紹介します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 1. ナビゲーションバー (ヘッダー) - stickyで固定 */}
        <MobileHeader />

        {/* メインコンテンツ */}
        {children}

        {/* フッター */}
        <footer className="w-full border-t border-zinc-200 dark:border-zinc-700 mt-auto bg-white dark:bg-zinc-900/50 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                {/* シンプルな著作権表示をレスポンシブなコンテナ内に入れる */}
                <p>&copy; {new Date().getFullYear()} 千葉翔太 Portfolio.</p>
                <p className="mt-1 text-xs">Built with Next.js & Tailwind CSS.</p>
            </div>
        </footer>
      </body>
    </html>
  );
}
