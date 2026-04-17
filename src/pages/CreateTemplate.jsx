import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, GripVertical, Dumbbell, Save, X, Copy } from 'lucide-react';
import ExerciseSearch from '../components/ExerciseSearch';
import './CreateTemplate.css';

export default function CreateTemplate() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const addExercise = (exercise) => {
    setExercises([...exercises, {
      id: `${exercise.id}-${Date.now()}`,
      exerciseId: exercise.id,
      name: exercise.name,
      category: exercise.category,
      equipment: exercise.equipment,
      sets: [
        { reps: 10, weight: '' },
        { reps: 10, weight: '' },
        { reps: 10, weight: '' },
      ],
    }]);
    setShowSearch(false);
  };

  const updateSet = (exIndex, setIndex, field, value) => {
    const updated = [...exercises];
    updated[exIndex].sets[setIndex] = {
      ...updated[exIndex].sets[setIndex],
      [field]: value === '' ? '' : (parseInt(value) || 0),
    };
    setExercises(updated);
  };

  const addSet = (exIndex) => {
    const updated = [...exercises];
    const lastSet = updated[exIndex].sets[updated[exIndex].sets.length - 1];
    updated[exIndex].sets.push({ ...lastSet });
    setExercises(updated);
  };

  const removeSet = (exIndex, setIndex) => {
    const updated = [...exercises];
    if (updated[exIndex].sets.length <= 1) return;
    updated[exIndex].sets = updated[exIndex].sets.filter((_, i) => i !== setIndex);
    setExercises(updated);
  };

  const duplicateExercise = (index) => {
    const copy = {
      ...exercises[index],
      id: `${exercises[index].exerciseId}-${Date.now()}`,
      sets: exercises[index].sets.map(s => ({ ...s })),
    };
    const updated = [...exercises];
    updated.splice(index + 1, 0, copy);
    setExercises(updated);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const moveExercise = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= exercises.length) return;
    const updated = [...exercises];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setExercises(updated);
  };

  const handleDiscard = () => {
    if (exercises.length > 0 || name.trim()) {
      if (!window.confirm('Discard this template? Your changes will be lost.')) return;
    }
    navigate(-1);
  };

  const handleSave = () => {
    if (!name.trim() || exercises.length === 0) return;
    // TODO: save to backend
    navigate('/templates');
  };

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const isValid = name.trim() && exercises.length > 0;

  return (
    <div className="page create-template-page">
      {/* Header */}
      <div className="ct-header">
        <button className="ct-back-btn" onClick={handleDiscard}>
          <ArrowLeft size={20} />
        </button>
        <div className="ct-header-center">
          <h1>New Template</h1>
        </div>
        <button
          className="ct-save-btn"
          onClick={handleSave}
          disabled={!isValid}
        >
          <Save size={18} />
          <span>Save</span>
        </button>
      </div>

      {/* Template Name */}
      <div className="ct-name-section">
        <input
          type="text"
          className="ct-name-input"
          placeholder="Template name"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
        />
        <input
          type="text"
          className="ct-notes-input"
          placeholder="Add notes (optional)"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>

      {/* Summary bar */}
      <div className="ct-summary">
        <span>{exercises.length} exercise{exercises.length !== 1 ? 's' : ''}</span>
        <span className="ct-summary-dot" />
        <span>{totalSets} set{totalSets !== 1 ? 's' : ''}</span>
      </div>

      {/* Exercise List */}
      <div className="ct-exercises">
        {exercises.length === 0 ? (
          <div className="ct-empty">
            <div className="ct-empty-icon">
              <Dumbbell size={32} />
            </div>
            <h3>No exercises yet</h3>
            <p>Add exercises to build your workout template</p>
          </div>
        ) : (
          exercises.map((ex, exIndex) => (
            <div key={ex.id} className="ct-exercise-card">
              {/* Exercise Header */}
              <div className="ct-exercise-header">
                <div className="ct-exercise-drag">
                  <GripVertical size={16} />
                </div>
                <div className="ct-exercise-num">{exIndex + 1}</div>
                <div className="ct-exercise-title">
                  <h3>{ex.name}</h3>
                  <span className="ct-exercise-meta">
                    {ex.category} &middot; {ex.equipment}
                  </span>
                </div>
                <div className="ct-exercise-actions">
                  <button
                    className="ct-icon-btn"
                    onClick={() => duplicateExercise(exIndex)}
                    title="Duplicate"
                  >
                    <Copy size={15} />
                  </button>
                  <button
                    className="ct-icon-btn ct-icon-btn-danger"
                    onClick={() => removeExercise(exIndex)}
                    title="Remove"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Sets Table */}
              <div className="ct-sets">
                <div className="ct-sets-header">
                  <span className="ct-col-set">Set</span>
                  <span className="ct-col-reps">Reps</span>
                  <span className="ct-col-weight">Weight (lbs)</span>
                  <span className="ct-col-action"></span>
                </div>
                {ex.sets.map((set, setIndex) => (
                  <div key={setIndex} className="ct-set-row">
                    <span className="ct-col-set ct-set-num">{setIndex + 1}</span>
                    <div className="ct-col-reps">
                      <input
                        type="number"
                        className="ct-set-input"
                        value={set.reps}
                        onChange={e => updateSet(exIndex, setIndex, 'reps', e.target.value)}
                        min="1"
                        placeholder="10"
                      />
                    </div>
                    <div className="ct-col-weight">
                      <input
                        type="number"
                        className="ct-set-input"
                        value={set.weight}
                        onChange={e => updateSet(exIndex, setIndex, 'weight', e.target.value)}
                        min="0"
                        placeholder="—"
                      />
                    </div>
                    <div className="ct-col-action">
                      <button
                        className="ct-set-remove"
                        onClick={() => removeSet(exIndex, setIndex)}
                        disabled={ex.sets.length <= 1}
                        title="Remove set"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Set */}
              <button className="ct-add-set-btn" onClick={() => addSet(exIndex)}>
                <Plus size={14} /> Add Set
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Exercise Button */}
      <button
        className="ct-add-exercise-btn"
        onClick={() => setShowSearch(true)}
      >
        <Plus size={20} />
        <span>Add Exercise</span>
      </button>

      {/* Bottom Save (sticky) */}
      {exercises.length > 0 && (
        <div className="ct-bottom-bar">
          <button
            className="btn btn-primary ct-bottom-save"
            onClick={handleSave}
            disabled={!isValid}
          >
            Save Template
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
