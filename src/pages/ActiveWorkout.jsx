import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Check, X, Timer, Trash2, Dumbbell, Trophy, ChevronDown } from 'lucide-react';
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
  const [restTimer, setRestTimer] = useState(0);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const timerRef = useRef(null);
  const restRef = useRef(null);

  // Load template
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

  // Workout timer
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Rest timer countdown
  useEffect(() => {
    if (showRestTimer && restTimer > 0) {
      restRef.current = setInterval(() => {
        setRestTimer(r => {
          if (r <= 1) {
            setShowRestTimer(false);
            clearInterval(restRef.current);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
      return () => clearInterval(restRef.current);
    }
  }, [showRestTimer, restTimer]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Progress
  const progress = useMemo(() => {
    let total = 0;
    let done = 0;
    exercises.forEach(ex => {
      ex.sets.forEach(s => {
        total++;
        if (s.completed) done++;
      });
    });
    return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  }, [exercises]);

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
    updated[exerciseIndex].sets.push({ reps: lastSet.reps, weight: lastSet.weight, completed: false });
    setExercises(updated);
  };

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const updated = [...exercises];
    const prev = updated[exerciseIndex].sets[setIndex];
    updated[exerciseIndex].sets[setIndex] = {
      ...prev,
      [field]: field === 'completed' ? value : (value === '' ? '' : (parseInt(value) || 0)),
    };
    setExercises(updated);

    // Start rest timer when completing a set
    if (field === 'completed' && value === true) {
      setRestTimer(90);
      setShowRestTimer(true);
    }
  };

  const removeSet = (exerciseIndex, setIndex) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets = updated[exerciseIndex].sets.filter((_, i) => i !== setIndex);
    if (updated[exerciseIndex].sets.length === 0) {
      updated.splice(exerciseIndex, 1);
    }
    setExercises(updated);
  };

  const removeExercise = (exIndex) => {
    setExercises(exercises.filter((_, i) => i !== exIndex));
  };

  const handleFinish = () => {
    if (progress.done === 0) {
      if (!window.confirm('You haven\'t completed any sets. Discard this workout?')) return;
      navigate(-1);
      return;
    }
    // TODO: save workout to backend
    navigate('/history');
  };

  const handleCancel = () => {
    if (progress.done > 0) {
      if (!window.confirm('You have completed sets that will be lost. Discard workout?')) return;
    }
    navigate(-1);
  };

  const dismissRest = () => {
    setShowRestTimer(false);
    setRestTimer(0);
    clearInterval(restRef.current);
  };

  return (
    <div className="aw-page">
      {/* Sticky Top Bar */}
      <div className="aw-top-bar">
        <div className="aw-top-bar-inner">
          <button className="aw-cancel-btn" onClick={handleCancel}>
            <X size={18} />
          </button>
          <div className="aw-top-center">
            <span className="aw-timer">
              <Timer size={14} />
              {formatTime(elapsed)}
            </span>
          </div>
          <button className="aw-finish-btn-top" onClick={handleFinish}>
            Finish
          </button>
        </div>
        {/* Progress bar */}
        <div className="aw-progress-track">
          <div className="aw-progress-fill" style={{ width: `${progress.pct}%` }} />
        </div>
      </div>

      {/* Workout Title */}
      <div className="aw-title-section">
        <input
          type="text"
          value={workoutName}
          onChange={e => setWorkoutName(e.target.value)}
          className="aw-name-input"
        />
        <p className="aw-progress-text">
          {progress.done} / {progress.total} sets completed
        </p>
      </div>

      {/* Rest Timer Banner */}
      {showRestTimer && (
        <div className="aw-rest-banner">
          <div className="aw-rest-info">
            <span className="aw-rest-label">Rest Timer</span>
            <span className="aw-rest-time">{formatTime(restTimer)}</span>
          </div>
          <button className="aw-rest-skip" onClick={dismissRest}>
            Skip
          </button>
        </div>
      )}

      {/* Exercises */}
      <div className="aw-exercises">
        {exercises.length === 0 && (
          <div className="aw-empty">
            <div className="aw-empty-icon">
              <Dumbbell size={32} />
            </div>
            <h3>No exercises yet</h3>
            <p>Add an exercise to start logging</p>
          </div>
        )}

        {exercises.map((exercise, exIdx) => (
          <div key={exercise.id} className="aw-exercise">
            {/* Exercise Header */}
            <div className="aw-exercise-header">
              <div className="aw-exercise-num">{exIdx + 1}</div>
              <div className="aw-exercise-title">
                <h3>{exercise.name}</h3>
                <span>{exercise.category}</span>
              </div>
              <button
                className="aw-exercise-remove"
                onClick={() => removeExercise(exIdx)}
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Sets */}
            <div className="aw-sets">
              <div className="aw-sets-header">
                <span className="aw-col-set">Set</span>
                <span className="aw-col-prev">Previous</span>
                <span className="aw-col-reps">Reps</span>
                <span className="aw-col-weight">lbs</span>
                <span className="aw-col-check"></span>
              </div>
              {exercise.sets.map((set, setIdx) => (
                <div
                  key={setIdx}
                  className={`aw-set-row ${set.completed ? 'completed' : ''}`}
                >
                  <span className="aw-col-set aw-set-badge">
                    {set.completed ? <Check size={12} /> : setIdx + 1}
                  </span>
                  <span className="aw-col-prev aw-prev-text">—</span>
                  <div className="aw-col-reps">
                    <input
                      type="number"
                      inputMode="numeric"
                      className="aw-input"
                      value={set.reps}
                      onChange={e => updateSet(exIdx, setIdx, 'reps', e.target.value)}
                      min="0"
                      placeholder="0"
                    />
                  </div>
                  <div className="aw-col-weight">
                    <input
                      type="number"
                      inputMode="decimal"
                      className="aw-input"
                      value={set.weight}
                      onChange={e => updateSet(exIdx, setIdx, 'weight', e.target.value)}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="aw-col-check">
                    <button
                      className={`aw-check-btn ${set.completed ? 'active' : ''}`}
                      onClick={() => updateSet(exIdx, setIdx, 'completed', !set.completed)}
                    >
                      <Check size={18} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Set */}
            <button className="aw-add-set" onClick={() => addSet(exIdx)}>
              <Plus size={14} /> Add Set
            </button>
          </div>
        ))}
      </div>

      {/* Add Exercise */}
      <button
        className="aw-add-exercise"
        onClick={() => setShowSearch(true)}
      >
        <Plus size={20} />
        <span>Add Exercise</span>
      </button>

      {/* Sticky Bottom Finish */}
      {exercises.length > 0 && (
        <div className="aw-bottom-bar">
          <button className="aw-finish-btn" onClick={handleFinish}>
            <Trophy size={18} />
            Finish Workout ({progress.done}/{progress.total})
          </button>
        </div>
      )}

      {/* Exercise Search Modal */}
      {showSearch && (
        <ExerciseSearch
          onSelect={addExercise}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}
