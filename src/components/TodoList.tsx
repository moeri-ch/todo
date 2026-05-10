import type { Todo, FilterType } from '../types/todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const EMPTY_MESSAGES: Record<FilterType, string> = {
  all: 'タスクがありません。\n上から追加してみましょう！',
  active: '未完了のタスクはありません。',
  completed: '完了したタスクはありません。',
};

const EMPTY_ICONS: Record<FilterType, string> = {
  all: '📝',
  active: '🎯',
  completed: '✅',
};

export function TodoList({ todos, filter, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">{EMPTY_ICONS[filter]}</div>
        <p>{EMPTY_MESSAGES[filter]}</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
