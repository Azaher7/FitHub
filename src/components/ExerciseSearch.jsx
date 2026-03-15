import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { exerciseLibrary } from '../data/mockData';
import './ExerciseSearch.css';

export default function ExerciseSearch({ onSelect, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(exerciseLibrary.map(e => e.category))];

  const filtered = useMemo(() => {
    return exerciseLibrary.filter(e => {
      const matchesQuery = e.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  return (
    <div className="exercise-search-overlay" onClick={onClose}>
      <div className="exercise-search-modal" onClick={e => e.stopPropagation()}>
        <div className="exercise-search-header">
          <h3>Add Exercise</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        </div>

        <div className="exercise-search-input-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search exercises..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="exercise-search-input"
            autoFocus
          />
        </div>

        <div className="exercise-category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`badge ${selectedCategory === cat ? 'badge-primary' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="exercise-list">
          {filtered.map(exercise => (
            <button
              key={exercise.id}
              className="exercise-list-item"
              onClick={() => onSelect(exercise)}
            >
              <div>
                <div className="exercise-name">{exercise.name}</div>
                <div className="exercise-meta">{exercise.category} &middot; {exercise.equipment}</div>
              </div>
              <Plus size={18} />
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="empty-state" style={{ padding: '2rem' }}>No exercises found</p>
          )}
        </div>
      </div>
    </div>
  );
}
