import { Metadata } from 'next';
import Link from 'next/link';
import { ALL_PROJECTS, PROJECT_CATEGORIES } from '../config/projectConfig';
import ProjectFilter from '../component/Projects/ProjectFilter';

export const metadata: Metadata = {
  title: "プロジェクト一覧",
  description: "組み込みエンジニアShotaのWebアプリ・作品一覧。Next.js、TypeScript、AWSを活用したプロジェクトを公開中。",
  openGraph: {
    title: "プロジェクト一覧 | Shota Portfolio",
    description: "組み込みエンジニアShotaのWebアプリ・作品一覧。",
    url: "https://shoat-portfolio.com/projects",
  },
};

const ProjectsPage = () => {
  return (
    <div className="py-10 sm:py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-10">
          <span className="gradient-text">全Webアプリ・作品一覧</span> 💻
        </h1>

        <ProjectFilter allProjects={ALL_PROJECTS} categories={PROJECT_CATEGORIES} />

        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-block text-base font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
          >
            &larr; トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
