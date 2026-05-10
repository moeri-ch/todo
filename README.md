# Todo

Next.js + React + TypeScript で作ったシンプルなTodoアプリ。

**デモ:** https://moeri-ch.github.io/todo/

## 機能

- タスクの追加・完了・削除・インライン編集
- すべて / 未完了 / 完了 フィルター
- 全件一括切り替え、完了済み一括削除
- 進捗バーと完了カウンター表示
- ブラウザを閉じてもデータが残る（localStorage）
- ダークモード対応（OS設定に自動連動）
- スマホ対応

## 使い方

```bash
npm install
npm run dev
```

`http://localhost:3000` をブラウザで開く。

| 操作 | 方法 |
|------|------|
| タスク追加 | 入力して `Enter` または「追加」ボタン |
| 完了切り替え | チェックボックスをクリック |
| 編集 | テキストをダブルクリック → `Enter` で確定、`Esc` でキャンセル |
| 削除 | ホバーして `×` をクリック |

## 技術スタック

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## デプロイ

`master` ブランチへのプッシュで GitHub Actions が自動的に GitHub Pages へデプロイする。

```bash
npm run build   # out/ に静的ファイルを出力
```
