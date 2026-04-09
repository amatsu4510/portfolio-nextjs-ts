"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'TOPページ' },
  { href: '/projects', label: 'Webアプリ・作品' },
  { href: '/blog', label: '技術ブログ' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md dark:bg-zinc-900/80 border-b border-zinc-200/60 dark:border-zinc-700/60 shadow-sm">
      <nav className="w-full max-w-5xl mx-auto flex justify-between items-center py-3.5 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/favicon.ico"
            alt="Site Icon"
            width={24}
            height={24}
            className="rounded"
            style={{ width: 24, height: 24 }}
          />
          <span className="text-lg font-bold gradient-text">
            Shota | Portfolio
          </span>
        </Link>

        {/* デスクトップナビゲーション */}
        <div className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive(href)
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* モバイルメニューボタン */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-zinc-200/60 dark:border-zinc-700/60 pb-2">
          <div className="flex flex-col space-y-1 p-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block py-2.5 px-4 rounded-xl transition-colors text-base ${
                  isActive(href)
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold border-l-4 border-indigo-500'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
