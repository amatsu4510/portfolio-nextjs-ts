import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import MobileHeader from './component/Header';
import Footer from "./component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shota Portfolio",
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
        <Footer />
      </body>
    </html>
  );
}
