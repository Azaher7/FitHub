import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Dumbbell, Weight, TrendingUp, Trophy, Calendar } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { getBestSetIndex } from '../utils/helpers';
import { mockWorkoutHistory } from '../data/mockData';
import './WorkoutDetail.css';

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const workout = mockWorkoutHistory.find(w => w.id === id);

  if (!workout) {
    return (
      <div className="page">
        <EmptyState
          icon={Dumbbell}
          title="Workout not found"
          message="This workout may have been deleted"
        >
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/history')}
            style={{ width: 'auto' }}
          >
            Go to History
          </button>
        </EmptyState>
      </div>
    );
  }

  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const totalReps = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.reps, 0), 0
  );
  const totalVolume = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.reps * set.weight, 0), 0
  );

  return (
    <div className="page">
      {/* Header */}
      <div className="wd-header">
        <button className="wd-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div className="wd-header-text">
          <h1>{workout.templateName}</h1>
          <p>
            <Calendar size={12} />
            {new Date(workout.date).toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="wd-summary">
        <div className="wd-summary-card">
          <Clock size={16} />
          <span className="wd-summary-value">{workout.duration}</span>
          <span className="wd-summary-label">minutes</span>
        </div>
        <div className="wd-summary-card">
          <Dumbbell size={16} />
          <span className="wd-summary-value">{workout.exercises.length}</span>
          <span className="wd-summary-label">exercises</span>
        </div>
        <div className="wd-summary-card">
          <TrendingUp size={16} />
          <span className="wd-summary-value">{totalSets}</span>
          <span className="wd-summary-label">sets</span>
        </div>
        <div className="wd-summary-card">
          <Trophy size={16} />
          <span className="wd-summary-value">{totalReps}</span>
          <span className="wd-summary-label">reps</span>
        </div>
      </div>

      {/* Volume Banner */}
      {totalVolume > 0 && (
        <div className="wd-volume">
          <div className="wd-volume-left">
            <Weight size={18} />
            <span>Total Volume</span>
          </div>
          <span className="wd-volume-value">{totalVolume.toLocaleString()} lbs</span>
        </div>
      )}

      {/* Exercises */}
      <div className="wd-exercises">
        {workout.exercises.map((exercise, i) => {
          const bestIdx = getBestSetIndex(exercise.sets);
          return (
            <div key={i} className="wd-exercise">
              <div className="wd-exercise-header">
                <div className="wd-exercise-num">{i + 1}</div>
                <h3>{exercise.name}</h3>
              </div>
              <div className="wd-sets">
                <div className="wd-sets-header">
                  <span className="wd-col-set">Set</span>
                  <span className="wd-col-reps">Reps</span>
                  <span className="wd-col-weight">Weight</span>
                  <span className="wd-col-vol">Volume</span>
                </div>
                {exercise.sets.map((set, j) => {
                  const vol = set.reps * set.weight;
                  return (
                    <div key={j} className={`wd-set-row ${j === bestIdx && set.weight > 0 ? 'best' : ''}`}>
                      <span className="wd-col-set">
                        <span className="wd-set-badge">{j + 1}</span>
                      </span>
                      <span className="wd-col-reps wd-set-value">{set.reps}</span>
                      <span className="wd-col-weight wd-set-value">
                        {set.weight > 0 ? `${set.weight} lbs` : 'BW'}
                      </span>
                      <span className="wd-col-vol wd-set-vol">
                        {vol > 0 ? `${vol.toLocaleString()}` : '—'}
                        {j === bestIdx && set.weight > 0 && (
                          <Trophy size={11} className="wd-best-icon" />
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
