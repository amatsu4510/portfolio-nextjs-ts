# Dockerfile

# ====================
# 1. Builder Stage (ビルド環境)
# ====================
FROM node:20-slim AS builder

# Docker Composeから渡されるビルド引数を受け取る
ARG NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL
ARG NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL
ARG NEXT_PUBLIC_BASIC_AUTH_USER
ARG NEXT_PUBLIC_BASIC_AUTH_PASSWORD

# 受け取ったビルド引数を、このステージの環境変数として設定
# これにより `npm run build` がこの値を認識できるようになる
ENV NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL=$NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL
ENV NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL=$NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL
ENV NEXT_PUBLIC_BASIC_AUTH_USER=$NEXT_PUBLIC_BASIC_AUTH_USER
ENV NEXT_PUBLIC_BASIC_AUTH_PASSWORD=$NEXT_PUBLIC_BASIC_AUTH_PASSWORD

# package.jsonが存在する src/ を作業ディレクトリにする
WORKDIR /app/src

# package.json と package-lock.json をローカルからコピー
COPY src/package.json src/package-lock.json ./

# 依存関係をインストール
RUN npm install

# ローカルのsrc/ディレクトリの内容をコンテナの作業ディレクトリにコピー
COPY src/ .

# Next.js アプリケーションをビルド
RUN npm run build

# ====================
# 2. Production Stage (実行環境)
# ====================
FROM node:20-slim AS runner

# 環境変数の設定 (本番環境用)
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
# 実行時に利用する環境変数を受け取るためのARGとENV（重要）
# docker-compose.yamlのenvironmentセクションからこの値が渡される
ARG NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL
ARG NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL
ARG NEXT_PUBLIC_BASIC_AUTH_USER
ARG NEXT_PUBLIC_BASIC_AUTH_PASSWORD
ENV NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL=$NEXT_PUBLIC_BLOG_CLD_FLONT_BASE_URL
ENV NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL=$NEXT_PUBLIC_BLOG_CLD_FLONT_IMAGE_URL
ENV NEXT_PUBLIC_BASIC_AUTH_USER=$NEXT_PUBLIC_BASIC_AUTH_USER
ENV NEXT_PUBLIC_BASIC_AUTH_PASSWORD=$NEXT_PUBLIC_BASIC_AUTH_PASSWORD

# 作業ディレクトリを /app に設定
WORKDIR /app/src

# 3. Builderステージから必要なファイルのみをコピー
# 依存関係 (node_modules)
COPY --from=builder /app/src/node_modules ./src/node_modules
# .nextのビルド結果
COPY --from=builder /app/src/.next ./src/.next
# publicフォルダ (もしpublicフォルダが src/ の下にある場合)
COPY src/public ./src/public
# package.json (npm startのため)
COPY src/package.json ./src/package.json
# next.config.jsなどの設定ファイル (もし src/ の下にある場合)
# COPY src/next.config.js ./src/
COPY --from=builder /app/src/src ./src

# 4. 起動コマンド
# Next.jsの本番サーバーを起動し、srcディレクトリを参照させる
CMD ["npm", "start", "--prefix", "src"]
