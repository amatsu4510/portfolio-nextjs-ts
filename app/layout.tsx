import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './component/common/Header';
import Footer from './component/common/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Shota Portfolio",
    default: "Shota Portfolio",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  description: "Next.js, TypeScript, AWSを活用したモダンなWeb開発を手掛けるShotaのポートフォリオサイトです。",
  keywords: ["組み込みエンジニア", "Web開発", "Next.js", "TypeScript", "AWS", "Shota", "ポートフォリオ"],
  authors: [{ name: "Shota" }],
  openGraph: {
    title: "Shota Portfolio",
    description: "Next.js, TypeScript, AWSを活用したモダンなWeb開発を手掛けるShotaのポートフォリオサイトです。",
    url: "https://shoat-portfolio.com",
    siteName: "Shota Portfolio",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shota Portfolio",
    description: "組み込み × Webエンジニア Shotaのポートフォリオ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 1. ナビゲーションバー (ヘッダー) */}
        <Header />
        {/* メインコンテンツ */}
        {children}
        {/* フッター */}
        <Footer />
      </body>
    </html>
  );
}
