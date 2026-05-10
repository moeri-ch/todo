import { useState, useEffect, useCallback } from 'react';
import type { Todo, FilterType } from '../types/todo';

const STORAGE_KEY = 'todo-app-items';

function load(): Todo[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(load);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    const t = text.trim();
    if (!t) return;
    setTodos(prev => [
      { id: crypto.randomUUID(), text: t, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const editTodo = useCallback((id: string, text: string) => {
    const t = text.trim();
    if (!t) return;
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, text: t } : todo))
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const toggleAll = useCallback(() => {
    setTodos(prev => {
      const allDone = prev.every(t => t.completed);
      return prev.map(t => ({ ...t, completed: !allDone }));
    });
  }, []);

  const filtered = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return {
    todos: filtered,
    totalCount: todos.length,
    activeCount: todos.filter(t => !t.completed).length,
    completedCount: todos.filter(t => t.completed).length,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
  };
}
