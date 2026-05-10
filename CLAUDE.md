# CLAUDE.md

このファイルはClaude Codeがこのリポジトリで作業する際のガイドラインです。

## プロジェクト概要

Next.js 15 (App Router) + React 19 + TypeScript 製のTodoアプリ。  
データはlocalStorageに永続化。ClientComponentに `'use client'` を付与している。

## テストコードを書く際の注意事項

### 1. テストフレームワークはVitestを使う

JestはNext.jsとの設定競合が起きやすい。このプロジェクトではVitestを使うこと。

**必要パッケージ（未導入の場合）:**
```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

**vitest.config.ts の雛形:**
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

**src/test/setup.ts の雛形:**
```ts
import '@testing-library/jest-dom';
```

### 2. localStorage は必ず各テスト前後にクリアする

`useTodos` はlocalStorageを読み書きする。クリアしないとテスト間でデータが汚染される。

```ts
beforeEach(() => {
  localStorage.clear();
});
```

`useTodos.ts` には `typeof window === 'undefined'` のSSRガードがあるが、
jsdom環境では `window` が存在するためlocalStorageへのアクセスはそのまま走る。
テスト側でのモックは不要だが、クリアは必須。

### 3. crypto.randomUUID をモックする

`addTodo` は `crypto.randomUUID()` でIDを生成する。
jsdomのバージョンによっては未実装のため、グローバルをモックしておく。

```ts
// setup.ts または各テストファイルの先頭
vi.stubGlobal('crypto', {
  randomUUID: vi.fn(() => `id-${Math.random().toString(36).slice(2)}`),
});
```

### 4. useTodos フックは renderHook でテストする

状態とロジックは `useTodos` に集中しているため、フック単体のテストが最も効率的。
状態変更は必ず `act()` でラップすること。

```ts
import { renderHook, act } from '@testing-library/react';
import { useTodos } from '@/hooks/useTodos';

test('タスクを追加できる', () => {
  const { result } = renderHook(() => useTodos());

  act(() => {
    result.current.addTodo('テストタスク');
  });

  expect(result.current.todos).toHaveLength(1);
  expect(result.current.todos[0].text).toBe('テストタスク');
  expect(result.current.activeCount).toBe(1);
});
```

### 5. コンポーネントテストは userEvent を使う

`fireEvent` より `userEvent` の方が実際のブラウザ操作を正確に再現できる。
キーボード操作・フォーカス・入力などは必ず `userEvent` を使うこと。

```ts
import userEvent from '@testing-library/user-event';

test('Enterキーでタスクを追加できる', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  await user.type(screen.getByPlaceholderText(/タスクを追加/), 'テスト{Enter}');
  expect(screen.getByText('テスト')).toBeInTheDocument();
});
```

### 6. 要素取得は getByRole を優先する

クラス名・idなど実装詳細に依存するクエリは使わないこと。
`getByRole` → `getByLabelText` → `getByPlaceholderText` → `getByText` の優先順で使う。

```ts
// 良い例
screen.getByRole('checkbox');
screen.getByRole('button', { name: '追加' });

// 避ける例
document.querySelector('.add-btn');
screen.getByTestId('add-button');
```

### 7. 'use client' コンポーネントのテスト

`'use client'` ディレクティブはバンドル時の境界を示すものであり、
テスト（jsdom）では通常のReactコンポーネントとして扱える。特別な対応は不要。

本プロジェクトでは `useRouter` / `usePathname` 等のNext.js固有APIは使っていないため、
Next.js本体のモックも不要。

### 8. スナップショットテストは使わない

UIの変更のたびにスナップショットの更新が必要になり保守コストが高い。
「何をしたか」ではなく「何が表示されているか・何が起きるか」を振る舞いでテストすること。

### 9. テストファイルの配置

テスト対象ファイルと同じディレクトリに置く。

```
src/
├── components/
│   ├── TodoItem.tsx
│   └── TodoItem.test.tsx
├── hooks/
│   ├── useTodos.ts
│   └── useTodos.test.ts
└── test/
    └── setup.ts
```

### 10. インポートパスは @/ エイリアスを使う

`../../../` の多段相対パスは使わないこと。
Vitestの `resolve.alias` に `@` を設定することで `tsconfig.json` と同じパスが使える。

```ts
// 良い例
import { useTodos } from '@/hooks/useTodos';

// 避ける例
import { useTodos } from '../../hooks/useTodos';
```
