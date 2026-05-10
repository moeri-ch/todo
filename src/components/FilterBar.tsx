import type { FilterType } from '../types/todo';

interface Props {
  activeCount: number;
  completedCount: number;
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  onClearCompleted: () => void;
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'active', label: '未完了' },
  { key: 'completed', label: '完了' },
];

export function FilterBar({ activeCount, completedCount, filter, onFilterChange, onClearCompleted }: Props) {
  return (
    <div className="filter-bar">
      <span className="item-count">
        {activeCount} 件残り
      </span>

      <div className="filters">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={`filter-btn${filter === key ? ' active' : ''}`}
            onClick={() => onFilterChange(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          完了を削除
        </button>
      )}
    </div>
  );
}
