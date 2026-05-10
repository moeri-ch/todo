import { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEdit = () => {
    setEditValue(todo.text);
    setEditing(true);
  };

  const commitEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed) onEdit(todo.id, trimmed);
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditValue(todo.text);
    setEditing(false);
  };

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <div
        className="checkbox"
        onClick={() => onToggle(todo.id)}
        role="checkbox"
        aria-checked={todo.completed}
        tabIndex={0}
        onKeyDown={e => { if (e.key === ' ') { e.preventDefault(); onToggle(todo.id); } }}
      >
        <svg
          className="checkbox-check"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="1,5 4,8 9,2" />
        </svg>
      </div>

      {editing ? (
        <input
          ref={inputRef}
          className="todo-edit-input"
          type="text"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') commitEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
          onBlur={commitEdit}
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={startEdit}
          title="ダブルクリックで編集"
        >
          {todo.text}
        </span>
      )}

      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="削除"
      >
        ×
      </button>
    </li>
  );
}
