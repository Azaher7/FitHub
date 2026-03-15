import { Link } from 'react-router-dom';
import { Clock, Dumbbell, ChevronRight, ClipboardList } from 'lucide-react';
import { mockWorkoutHistory } from '../data/mockData';
import './History.css';

export default function History() {
  const groupByMonth = (workouts) => {
    const groups = {};
    workouts.forEach(w => {
      const date = new Date(w.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      if (!groups[key]) groups[key] = { label, workouts: [] };
      groups[key].workouts.push(w);
    });
    return Object.values(groups);
  };

  const grouped = groupByMonth(mockWorkoutHistory);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Workout History</h1>
        <p className="page-subtitle">{mockWorkoutHistory.length} workouts logged</p>
      </div>

      {grouped.length > 0 ? (
        <div className="history-groups">
          {grouped.map(group => (
            <div key={group.label} className="history-group">
              <h2 className="history-month">{group.label}</h2>
              <div className="history-list">
                {group.workouts.map(workout => (
                  <Link key={workout.id} to={`/workout/${workout.id}`} className="history-card card">
                    <div className="history-card-left">
                      <div className="history-date">
                        <span className="history-day">
                          {new Date(workout.date).getDate()}
                        </span>
                        <span className="history-weekday">
                          {new Date(workout.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                      </div>
                      <div className="history-info">
                        <h3>{workout.templateName}</h3>
                        <div className="history-meta">
                          <span><Dumbbell size={12} /> {workout.exercises.length} exercises</span>
                          <span><Clock size={12} /> {workout.duration} min</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="history-chevron" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <ClipboardList size={48} />
          <p>No workouts logged yet.<br />Complete a workout to see it here.</p>
        </div>
      )}
    </div>
  );
}
