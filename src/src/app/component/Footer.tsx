const Footer = () => {
    return (
        <footer className="w-full border-t border-zinc-200 dark:border-zinc-700 mt-auto bg-white dark:bg-zinc-900/50 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                {/* シンプルな著作権表示をレスポンシブなコンテナ内に入れる */}
                <p>&copy; {new Date().getFullYear()} 千葉翔太 Portfolio.</p>
                <p className="mt-1 text-xs">Built with Next.js & Tailwind CSS.</p>
            </div>
        </footer>
    )
}

export default Footer;
