import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Dumbbell, Calendar } from 'lucide-react';
import { mockWorkoutHistory } from '../data/mockData';
import './WorkoutDetail.css';

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const workout = mockWorkoutHistory.find(w => w.id === id);

  if (!workout) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Workout not found.</p>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/history')} style={{ width: 'auto' }}>
            Go to History
          </button>
        </div>
      </div>
    );
  }

  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const totalVolume = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.reps * set.weight, 0),
    0
  );

  return (
    <div className="page">
      <div className="page-header">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ width: 'auto', marginBottom: 'var(--space-md)' }}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="page-title">{workout.templateName}</h1>
        <p className="page-subtitle">
          {new Date(workout.date).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>
      </div>

      <div className="workout-summary">
        <div className="workout-summary-item">
          <Clock size={16} />
          <span>{workout.duration} min</span>
        </div>
        <div className="workout-summary-item">
          <Dumbbell size={16} />
          <span>{workout.exercises.length} exercises</span>
        </div>
        <div className="workout-summary-item">
          <Calendar size={16} />
          <span>{totalSets} sets</span>
        </div>
      </div>

      {totalVolume > 0 && (
        <div className="card workout-volume">
          <span className="volume-label">Total Volume</span>
          <span className="volume-value">{totalVolume.toLocaleString()} lbs</span>
        </div>
      )}

      <div className="workout-exercises">
        {workout.exercises.map((exercise, i) => (
          <div key={i} className="workout-exercise card">
            <h3>{exercise.name}</h3>
            <div className="sets-table">
              <div className="sets-table-header">
                <span>Set</span>
                <span>Reps</span>
                <span>Weight</span>
              </div>
              {exercise.sets.map((set, j) => (
                <div key={j} className="sets-table-row">
                  <span>{j + 1}</span>
                  <span>{set.reps}</span>
                  <span>{set.weight > 0 ? `${set.weight} lbs` : 'BW'}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
