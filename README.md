# Zen & Iki — 神社で味わう鰹節削り体験

鰹節削り体験をイメージしてもらうためのギャラリーサイトです。

## 構成

- **index.html** — 1ページのランディング構成
- **styles.css** — 和風ベージュ・ブラウン基調のスタイル
- **script.js** — 左側セクションインジケーター、スムーススクロール、表示時フェードイン

## セクション

1. **ヒーロー** — 「禅と粋の極致の世界へようこそ。」＋ CTA
2. **本枯節とは** — What is Honkarebushi? 説明＋画像
3. **身体体験** — Physical Indulge / Artisan Spirit / Pure Simplicity の3カード
4. **動画** — YouTube 埋め込み用プレースホルダー
5. **究極の出汁体験** — 4 Steps（削り→沸かす→深み→薬味）
6. **薬味サプライズ** — 暗い背景＋「体験を予約する」CTA

## 閲覧方法

ブラウザで `index.html` を開くか、ローカルサーバーで表示してください。

```bash
# 例: Python 3
python -m http.server 8000
# http://localhost:8000 でアクセス
```

```bash
# 例: Node.js (npx)
npx serve .
```

## カスタム

- **画像** — `styles.css` 内の `url(...)` や `index.html` の背景用画像を、ご自身の鰹節・出汁・薬味の写真に差し替えられます。
- **動画** — `index.html` の `.video-placeholder` 内のリンクを実際の YouTube 動画URLにし、必要なら iframe 埋め込みに変更してください。
- **予約** — 「体験を予約する」の `href="#contact"` を予約ページや外部フォームのURLに変更できます。

## フォント

- [Noto Serif JP](https://fonts.google.com/noto/specimen/Noto+Serif+JP)（見出し）
- [Zen Kaku Gothic New](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New)（本文）

Google Fonts から読み込んでいます（`display=swap` で LCP を考慮）。

## SEO・本番デプロイ時の注意

- **OGP・Twitter Card**  
  `index.html` の `<head>` 内コメントの通り、本番では **og:url** と **og:image** を絶対URL（例: `https://yoursite.com/`、`https://yoursite.com/assets/hero1.png`）に差し替えてください。SNS シェア時に正しい画像・タイトルが表示されます。

- **Favicon**  
  `assets/favicon.svg` を配置済み。必要に応じて `assets/favicon.ico` や `assets/apple-touch-icon.png`（推奨 180×180px）を追加し、`<link rel="apple-touch-icon">` を有効にしてください。

- **多言語とSEO**  
  現在は JS 切り替え（i18n.js）のため、検索エンジンにはデフォルト言語（英語）の HTML が主に評価されます。日本語・中国語での集客を本格化する場合は、`/en/`・`/ja/`・`/zh/` のように URL を分け、静的 HTML を出し分ける構成を推奨します。
