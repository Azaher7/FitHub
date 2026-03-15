import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Check, X, Timer, Trash2 } from 'lucide-react';
import ExerciseSearch from '../components/ExerciseSearch';
import { mockTemplates } from '../data/mockData';
import './ActiveWorkout.css';

export default function ActiveWorkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');

  const [workoutName, setWorkoutName] = useState('Workout');
  const [exercises, setExercises] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (templateId) {
      const template = mockTemplates.find(t => t.id === templateId);
      if (template) {
        setWorkoutName(template.name);
        setExercises(template.exercises.map((ex, i) => ({
          id: `ex-${i}`,
          name: ex.exercise.name,
          category: ex.exercise.category,
          sets: Array.from({ length: ex.sets }, () => ({
            reps: ex.reps,
            weight: '',
            completed: false,
          })),
        })));
      }
    }
  }, [templateId]);

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const addExercise = (exercise) => {
    setExercises([...exercises, {
      id: `ex-${Date.now()}`,
      name: exercise.name,
      category: exercise.category,
      sets: [{ reps: 10, weight: '', completed: false }],
    }]);
    setShowSearch(false);
  };

  const addSet = (exerciseIndex) => {
    const updated = [...exercises];
    const lastSet = updated[exerciseIndex].sets[updated[exerciseIndex].sets.length - 1];
    updated[exerciseIndex].sets.push({ ...lastSet, completed: false });
    setExercises(updated);
  };

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets[setIndex] = {
      ...updated[exerciseIndex].sets[setIndex],
      [field]: field === 'completed' ? value : (parseInt(value) || ''),
    };
    setExercises(updated);
  };

  const removeSet = (exerciseIndex, setIndex) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets = updated[exerciseIndex].sets.filter((_, i) => i !== setIndex);
    if (updated[exerciseIndex].sets.length === 0) {
      updated.splice(exerciseIndex, 1);
    }
    setExercises(updated);
  };

  const handleFinish = () => {
    // TODO: save workout to backend
    navigate('/history');
  };

  const handleCancel = () => {
    if (exercises.some(ex => ex.sets.some(s => s.completed))) {
      if (!window.confirm('Are you sure? You have logged sets that will be lost.')) return;
    }
    navigate(-1);
  };

  return (
    <div className="page active-workout-page">
      <div className="active-workout-header">
        <div className="active-workout-title">
          <input
            type="text"
            value={workoutName}
            onChange={e => setWorkoutName(e.target.value)}
            className="workout-name-input"
          />
          <div className="workout-timer">
            <Timer size={16} />
            <span>{formatTime(elapsed)}</span>
          </div>
        </div>
        <div className="active-workout-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleCancel} style={{ width: 'auto' }}>
            <X size={16} /> Cancel
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleFinish} style={{ width: 'auto' }}>
            <Check size={16} /> Finish
          </button>
        </div>
      </div>

      <div className="active-exercises">
        {exercises.map((exercise, exIdx) => (
          <div key={exercise.id} className="active-exercise card">
            <h3 className="active-exercise-name">{exercise.name}</h3>
            <div className="active-sets">
              <div className="active-sets-header">
                <span>Set</span>
                <span>Reps</span>
                <span>Weight (lbs)</span>
                <span></span>
              </div>
              {exercise.sets.map((set, setIdx) => (
                <div key={setIdx} className={`active-set-row ${set.completed ? 'completed' : ''}`}>
                  <span className="set-number">{setIdx + 1}</span>
                  <input
                    type="number"
                    className="set-input"
                    value={set.reps}
                    onChange={e => updateSet(exIdx, setIdx, 'reps', e.target.value)}
                    min="0"
                  />
                  <input
                    type="number"
                    className="set-input"
                    value={set.weight}
                    onChange={e => updateSet(exIdx, setIdx, 'weight', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                  <div className="set-actions">
                    <button
                      className={`set-complete-btn ${set.completed ? 'active' : ''}`}
                      onClick={() => updateSet(exIdx, setIdx, 'completed', !set.completed)}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="set-delete-btn"
                      onClick={() => removeSet(exIdx, setIdx)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => addSet(exIdx)}
              style={{ marginTop: 'var(--space-sm)' }}
            >
              <Plus size={14} /> Add Set
            </button>
          </div>
        ))}
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => setShowSearch(true)}
        style={{ marginTop: 'var(--space-md)' }}
      >
        <Plus size={18} /> Add Exercise
      </button>

      {showSearch && (
        <ExerciseSearch
          onSelect={addExercise}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}
