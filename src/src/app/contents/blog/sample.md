---
title: ブログ要素Demo
date: 2000-01-01
update: 2000-01-01
---

# 記事のメインタイトル (h1)

## 導入部と強調 (h2)

このブログ記事は、Markdown記法で**一般的に使われる要素**をすべてデモするためのものです。

Markdownは、ブログやドキュメント作成において**非常に便利**で、*記述がシンプル*な軽量マークアップ言語です。この文章の後半には、`コード`や**リスト**、**テーブル**などの具体的な使用例があります。

---

## リストの例 (h2)

### 順序なしリスト (Unordered List)

- ブログ記事の構成要素
    - 見出しと段落
    - 画像とリンク
    - リストと引用
- 最適なフォントの選択
    - Noto Sans JP
    - ヒラギノ角ゴ

### 順序ありリスト (Ordered List)

1.  まず、Next.jsでプロジェクトを作成します。
2.  Markdownパーサー（例: `remark`）をインストールします。
3.  Markdownを読み込み、HTMLに変換するロジックを実装します。
4.  TSXテンプレートに表示します。

---

## コードと引用 (h2)

### インラインコード

`font-family`プロパティで行いたいフォントを指定します。

### コードブロック (Code Block)

以下の例は、CSSでNoto Sans JPを指定する方法です。

```css
body {
  font-family: "Noto Sans JP", "ヒラギノ角ゴ ProN", sans-serif;
  line-height: 1.7;
}
```

## 画像表示 (h2)

![代替テキスト](/img/blog/sample/sample.png)

## リンク (h2)

[Googleのトップページへ](https://www.google.com)

<https://www.google.com>

## 文中にリンク (h2)

文章の間に[Googleのトップページへ](https://www.google.com)リンクを入れてみる
