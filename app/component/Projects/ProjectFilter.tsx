'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Project } from '../../type/Type';
import { getCategoryColor } from '../../config/projectConfig';

interface ProjectFilterProps {
  allProjects: Project[];
  categories: string[];
}

const ProjectFilter = ({ allProjects, categories }: ProjectFilterProps) => {
  const [filterCategory, setFilterCategory] = useState(categories[0]);

  const filteredProjects = allProjects.filter(project =>
    filterCategory === categories[0] ? true : project.category === filterCategory
  );

  return (
    <>
      {/* フィルター */}
      <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <label
          htmlFor="category-filter"
          className="font-semibold text-zinc-600 dark:text-zinc-400 text-sm sm:text-base shrink-0"
        >
          カテゴリーで絞り込み:
        </label>
        <select
          id="category-filter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white px-4 py-2.5 text-base appearance-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer shadow-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* プロジェクトグリッド */}
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length === 0 ? (
          <p className="text-center text-zinc-500 dark:text-zinc-400 py-10 col-span-full">
            {filterCategory === categories[0]
              ? '現在、登録されているプロジェクトはありません。'
              : `「${filterCategory}」のプロジェクトはありません。`}
          </p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="group">
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
                  {project.techStack.map(tech => (
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
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProjectFilter;
