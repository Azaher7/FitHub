import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock, Dumbbell, ChevronRight, ClipboardList,
  Search, Weight, Calendar, TrendingUp,
} from 'lucide-react';
import { mockWorkoutHistory } from '../data/mockData';
import './History.css';

function getVolume(workout) {
  return workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.reps * set.weight, 0),
    0
  );
}

function getTotalSets(workout) {
  return workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
}

function getRelativeDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return null;
}

export default function History() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return mockWorkoutHistory;
    const q = searchQuery.toLowerCase();
    return mockWorkoutHistory.filter(w =>
      w.templateName.toLowerCase().includes(q) ||
      w.exercises.some(ex => ex.name.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach(w => {
      const date = new Date(w.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      if (!groups[key]) groups[key] = { label, workouts: [] };
      groups[key].workouts.push(w);
    });
    return Object.values(groups);
  }, [filtered]);

  // Summary stats
  const totalWorkouts = mockWorkoutHistory.length;
  const totalVolume = mockWorkoutHistory.reduce((s, w) => s + getVolume(w), 0);
  const totalDuration = mockWorkoutHistory.reduce((s, w) => s + w.duration, 0);

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Workout History</h1>
        <p className="page-subtitle">{totalWorkouts} workouts logged</p>
      </div>

      {/* Summary Stats */}
      <div className="hist-stats">
        <div className="hist-stat">
          <Dumbbell size={16} />
          <div>
            <span className="hist-stat-value">{totalWorkouts}</span>
            <span className="hist-stat-label">Workouts</span>
          </div>
        </div>
        <div className="hist-stat">
          <Clock size={16} />
          <div>
            <span className="hist-stat-value">{Math.round(totalDuration / 60)}h</span>
            <span className="hist-stat-label">Total Time</span>
          </div>
        </div>
        <div className="hist-stat">
          <Weight size={16} />
          <div>
            <span className="hist-stat-value">{(totalVolume / 1000).toFixed(0)}k</span>
            <span className="hist-stat-label">lbs Lifted</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="hist-search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search workouts or exercises..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="hist-search-input"
        />
      </div>

      {/* Workout List */}
      {grouped.length > 0 ? (
        <div className="hist-groups">
          {grouped.map(group => (
            <div key={group.label} className="hist-group">
              <div className="hist-month-header">
                <Calendar size={14} />
                <h2>{group.label}</h2>
                <span className="hist-month-count">{group.workouts.length} workouts</span>
              </div>
              <div className="hist-list">
                {group.workouts.map(workout => {
                  const volume = getVolume(workout);
                  const sets = getTotalSets(workout);
                  const relative = getRelativeDate(workout.date);

                  return (
                    <Link key={workout.id} to={`/workout/${workout.id}`} className="hist-card">
                      {/* Date Column */}
                      <div className="hist-card-date">
                        <span className="hist-card-day">
                          {new Date(workout.date).getDate()}
                        </span>
                        <span className="hist-card-weekday">
                          {new Date(workout.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="hist-card-content">
                        <div className="hist-card-top">
                          <h3>{workout.templateName}</h3>
                          {relative && <span className="hist-card-badge">{relative}</span>}
                        </div>

                        {/* Exercise names preview */}
                        <p className="hist-card-exercises">
                          {workout.exercises.map(ex => ex.name).join(' · ')}
                        </p>

                        {/* Stats row */}
                        <div className="hist-card-stats">
                          <span><Dumbbell size={11} /> {workout.exercises.length} exercises</span>
                          <span><TrendingUp size={11} /> {sets} sets</span>
                          <span><Clock size={11} /> {workout.duration}m</span>
                          {volume > 0 && (
                            <span><Weight size={11} /> {volume.toLocaleString()} lbs</span>
                          )}
                        </div>
                      </div>

                      <ChevronRight size={18} className="hist-card-chevron" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="hist-empty">
          <div className="hist-empty-icon">
            <ClipboardList size={36} />
          </div>
          {searchQuery ? (
            <>
              <h3>No results</h3>
              <p>No workouts match "{searchQuery}"</p>
            </>
          ) : (
            <>
              <h3>No workouts yet</h3>
              <p>Complete a workout to see it here</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
