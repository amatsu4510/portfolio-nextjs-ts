import Link from 'next/link';
import { ALL_PROJECTS, LATEST_PROJECTS, getCategoryColor } from './config/projectConfig';
import { topPageData, LEARNING_SUMMARY } from './config/topPageConfig';
import Top2Blog from './component/Home/Top2Blog';

const Home = () => {
  return (
    <div className="flex flex-col font-sans text-zinc-800 dark:text-zinc-200">

      {/* ===== ヒーローセクション ===== */}
      <section className="relative w-full overflow-hidden">
        {/* グラジェント背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 dark:from-indigo-950 dark:via-violet-950 dark:to-zinc-900" />
        {/* ドットグリッドオーバーレイ */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          {/* アイブロウタグ */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            組み込みエンジニア → Web開発者
          </div>

          {/* 名前 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-3 tracking-tight">
            千葉 翔太
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-indigo-200 mb-6 tracking-widest">
            Chiba Shota
          </p>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {topPageData.career}
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={topPageData.gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-indigo-700 font-bold text-base shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/10 border border-white/30 text-white font-bold text-base backdrop-blur-sm hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              プロジェクトを見る &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== メインコンテンツ ===== */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-20">

        {/* --- プロジェクトハイライト --- */}
        <section id="projects-highlight">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-200 dark:to-indigo-800" />
            <h2 className="text-2xl sm:text-3xl font-extrabold gradient-text whitespace-nowrap">
              プロジェクト (最新) 💻
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-200 dark:to-indigo-800" />
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {LATEST_PROJECTS.map((project) => (
              <article key={project.id} className="group">
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ml-2 ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map(tech => (
                      <span key={tech} className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-100 dark:border-indigo-800/50">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={project.link}
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-auto"
                  >
                    詳細を見る <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center pt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-semibold text-base hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors border border-indigo-100 dark:border-indigo-800/50 shadow-sm"
            >
              すべてのプロジェクトを見る (全{ALL_PROJECTS.length}件)
            </Link>
          </div>
        </section>

        {/* --- ブログハイライト --- */}
        <section id="blog-highlight">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-200 dark:to-indigo-800" />
            <h2 className="text-2xl sm:text-3xl font-extrabold gradient-text whitespace-nowrap">
              Shota Blog (最新) 📚
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-200 dark:to-indigo-800" />
          </div>
          <Top2Blog />
        </section>

        {/* --- スキルセクション --- */}
        <section id="skills" className="pb-4">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-200 dark:to-indigo-800" />
            <h2 className="text-2xl sm:text-3xl font-extrabold gradient-text whitespace-nowrap">
              開発環境と習得スキル ✨
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-200 dark:to-indigo-800" />
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {LEARNING_SUMMARY.map((group) => (
              <div key={group.title} className="glass-card rounded-2xl p-6">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-5 rounded-sm bg-gradient-to-b from-indigo-500 to-violet-500 shrink-0" />
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/40 dark:to-violet-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
