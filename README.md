# Todo

React + TypeScript + Vite で作ったシンプルなTodoアプリ。

## 機能

- タスクの追加・完了・削除・インライン編集
- すべて / 未完了 / 完了 フィルター
- 全件一括切り替え、完了済み一括削除
- ブラウザを閉じてもデータが残る（localStorage）
- ダークモード対応（OS設定に自動連動）
- スマホ対応

## 使い方

```bash
npm install
npm run dev
```

`http://localhost:5173` をブラウザで開く。

| 操作 | 方法 |
|------|------|
| タスク追加 | 入力して `Enter` または「追加」ボタン |
| 完了切り替え | チェックボックスをクリック |
| 編集 | テキストをダブルクリック → `Enter` で確定、`Esc` でキャンセル |
| 削除 | ホバーして `×` をクリック |

## 技術スタック

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
