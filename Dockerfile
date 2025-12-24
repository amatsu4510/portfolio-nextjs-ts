# Dockerfile

# ====================
# 1. Builder Stage (ビルド環境)
# ====================
FROM node:20-slim AS builder

# Docker Composeから渡されるビルド引数を受け取る
ARG NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL
ARG NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL

# 受け取ったビルド引数を、このステージの環境変数として設定
# これにより `npm run build` がこの値を認識できるようになる
ENV NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL=$NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL
ENV NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL=$NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL

# app/ を作業ディレクトリにする
WORKDIR /app

# 依存関係を先にインストール（キャッシュを効かせる）
COPY package.json package-lock.json ./
RUN npm install

# すべてのファイルをコピーしてビルド実行
COPY . .
RUN npm run build

# ====================
# 2. Production Stage (実行環境)
# ====================
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# 実行に必要なファイルだけを抽出してコピー
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# サーバーサイドで実行されるファイル（lib, components, app等）をコピー
COPY --from=builder /app ./

# 起動
CMD ["npm", "start"]
