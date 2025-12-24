"use client";

import { useEffect, useState, ReactNode, FC } from 'react';
import { usePathname } from 'next/navigation';

// LinkコンポーネントのPropsの型を定義
interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

// NOTE: Next.jsの環境外で実行可能にするため、Linkコンポーネントを通常のaタグに置き換えるためのモック
// FC (Function Component) を使用して型付け
const Link: FC<LinkProps> = ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>;

/**
 * モバイル対応ナビゲーションバーコンポーネント
 * 状態管理（メニュー開閉）を持つため、"use client" ディレクティブが必要です。
 */
// export default を直接使用して、宣言された値が読み込まれない警告を解消します
const MobileHeader: FC = () => {
  // モバイルメニューの状態を boolean 型で定義
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // 現在のパスを取得
  const pathname = usePathname();

  // ページ遷移時にメニューを閉じる処理 ---
  useEffect(() => {
    // pathname (現在のURLパス) が変更された場合、isMenuOpenをfalseにリセットする
    if (isMenuOpen) {
        setIsMenuOpen(false);
    }
  }, [pathname]); // 依存配列にpathnameを設定

  // メニュークリック時のハンドラ (メニューを閉じる処理を追加)
  // usePathnameの処理により、このハンドラは実際には冗長になる可能性がありますが、
  // ユーザーが同じページ内のアンカーリンク（例: /#section1）をクリックした場合に備えて残します。
  const handleLinkClick = (): void => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90 shadow-lg">
      <nav className="w-full max-w-5xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          千葉翔太 | Portfolio
        </span>

        {/* デスクトップナビゲーション (md以上で表示) */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-indigo-600 transition-colors">TOPページ</Link>
          <Link href="/projects" className="hover:text-indigo-600 transition-colors">Webアプリ・作品</Link>
          <Link href="/blog" className="hover:text-indigo-600 transition-colors">技術ブログ</Link>
          <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
        </div>

        {/* モバイルメニューボタン (md未満で表示) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {/* ハンバーガー/クローズアイコン (SVG) */}
          <svg className="w-6 h-6 text-zinc-800 dark:text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* モバイルメニュー (ドロップダウン) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-800/95 border-t border-zinc-200 dark:border-zinc-700 pb-2">
          <div className="flex flex-col space-y-1 p-4 text-base">
            <Link href="/" className="block py-2 px-3 rounded-md hover:bg-indigo-50 dark:hover:bg-zinc-700 transition-colors" onClick={handleLinkClick}>TOPページ</Link>
            <Link href="/projects" className="block py-2 px-3 rounded-md hover:bg-indigo-50 dark:hover:bg-zinc-700 transition-colors" onClick={handleLinkClick}>Webアプリ・作品</Link>
            <Link href="/blog" className="block py-2 px-3 rounded-md hover:bg-indigo-50 dark:hover:bg-zinc-700 transition-colors" onClick={handleLinkClick}>技術ブログ</Link>
            <Link href="/contact" className="block py-2 px-3 rounded-md hover:bg-indigo-50 dark:hover:bg-zinc-700 transition-colors" onClick={handleLinkClick}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default MobileHeader;
