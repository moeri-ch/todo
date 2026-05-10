import { useState } from 'react';

interface Props {
  onAdd: (text: string) => void;
  totalCount: number;
  onToggleAll: () => void;
}

export function TodoInput({ onAdd, totalCount, onToggleAll }: Props) {
  const [value, setValue] = useState('');

  const submit = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <div className="input-section">
      {totalCount > 0 && (
        <button className="toggle-all" onClick={onToggleAll} title="全て切り替え">
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1,1 7,8 13,1" />
          </svg>
        </button>
      )}
      <input
        className="todo-new-input"
        type="text"
        placeholder="タスクを追加... (Enterで追加)"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') submit(); }}
        autoFocus
      />
      <button className="add-btn" onClick={submit} disabled={!value.trim()}>
        追加
      </button>
    </div>
  );
}
