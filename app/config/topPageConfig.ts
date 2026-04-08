import { TopPageAbout } from '../type/Type'

export const topPageData : TopPageAbout = {
    name: "千葉 翔太",
    career: " 短大卒業後、組み込みシステム開発を5年経験。Web開発に興味を持ち現在はWeb開発を独学中。",
    course_content:{
        frontend: "フロントエンド: Next.js, React, TypeScript, Tailwind CSS を用いたモダンなUI/UX設計と実装。",
        infra: "インフラ・デプロイ: AWS (EC, S3, CloudFront)やDockerを用いた実践的なデプロイ経験。",
        devenv: "開発環境: Docker と WSL を活用した、チーム開発にも対応可能なポータブルな環境構築。",
        goal: "目標: 開発環境の構築から、実際のアプリケーション設計、デプロイ、運用までの一連の工程を習得すること。"
    },
    gitUrl:"https://github.com/amatsu4510"
};

/* スキル/学習サマリーデータ定義 */
export const LEARNING_SUMMARY = [
  { title: 'フロントエンド', skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { title: 'バックエンド/DB', skills: ['Node.js', 'Express.js', 'Next.js API Routes', 'Prisma', 'PostgreSQL'] },
  { title: 'インフラ/DevOps (開発環境)', skills: ['AWS (S3, CloudFront)', 'Docker', 'Docker Compose', 'Git/GitHub', 'WSL'] },
];