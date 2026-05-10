'use client';

import { useTodos } from '@/hooks/useTodos';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';
import { FilterBar } from './FilterBar';

export function TodoApp() {
  const {
    todos,
    totalCount,
    activeCount,
    completedCount,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
  } = useTodos();

  const tagline =
    totalCount === 0
      ? 'タスクを追加して始めましょう'
      : activeCount === 0
      ? 'すべて完了！お疲れさまでした 🎉'
      : `あと ${activeCount} 件、頑張ろう！`;

  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1>Todoリスト</h1>
            <p className="tagline">{tagline}</p>
          </div>
          {totalCount > 0 && (
            <div className="header-badge">
              <span className="badge-count">{completedCount}</span>
              <span className="badge-total">/{totalCount} 完了</span>
            </div>
          )}
        </div>
        {totalCount > 0 && (
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        )}
      </header>

      <div className="card">
        <TodoInput
          onAdd={addTodo}
          totalCount={totalCount}
          onToggleAll={toggleAll}
        />
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        {totalCount > 0 && (
          <FilterBar
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  );
}
