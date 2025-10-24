# Dockerfile

# ====================
# 1. Builder Stage (ビルド環境)
# ====================
FROM node:20-slim AS builder

# package.jsonが存在する src/ を作業ディレクトリにする
WORKDIR /app/src

# 1. 依存ファイルのみをコピー（キャッシュ最適化のため）
COPY src/package.json src/package-lock.json ./

# 依存関係をインストール
RUN npm install

# 2. アプリケーションコードをコピー
COPY src/ .

# 3. Next.jsの本番ビルドを実行
RUN npm run build

# ====================
# 2. Production Stage (実行環境)
# ====================
FROM node:20-slim AS runner

# 1. 環境変数とポート設定
# 警告を解消するため、ENVの記述を修正
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# 2. 実行用作業ディレクトリを /app に設定
WORKDIR /app

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

# 4. 起動コマンド
# Next.jsの本番サーバーを起動し、srcディレクトリを参照させる
CMD ["npm", "start", "--prefix", "src"]
