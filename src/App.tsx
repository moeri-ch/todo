import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';

export default function App() {
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
      ? 'すべて完了！お疲れさまでした'
      : `${activeCount} 件のタスクが残っています`;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo</h1>
        <p className="tagline">{tagline}</p>
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
