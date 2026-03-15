import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react';
import ExerciseSearch from '../components/ExerciseSearch';
import './CreateTemplate.css';

export default function CreateTemplate() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const addExercise = (exercise) => {
    setExercises([...exercises, {
      id: `${exercise.id}-${Date.now()}`,
      exerciseId: exercise.id,
      name: exercise.name,
      category: exercise.category,
      sets: 3,
      reps: 10,
    }]);
    setShowSearch(false);
  };

  const updateExercise = (index, field, value) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: parseInt(value) || 0 };
    setExercises(updated);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!name.trim() || exercises.length === 0) return;
    // TODO: save to backend
    navigate('/templates');
  };

  return (
    <div className="page">
      <div className="page-header">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ width: 'auto', marginBottom: 'var(--space-md)' }}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="page-title">New Template</h1>
        <p className="page-subtitle">Create a reusable workout routine</p>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="template-name">Template Name</label>
        <input
          id="template-name"
          type="text"
          className="form-input"
          placeholder="e.g., Push Day, Upper Body"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="template-exercises">
        <div className="section-header" style={{ marginTop: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>Exercises</h2>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            {exercises.length} added
          </span>
        </div>

        {exercises.length === 0 ? (
          <div className="empty-state card">
            <p>No exercises added yet.<br />Tap the button below to add exercises.</p>
          </div>
        ) : (
          <div className="exercise-cards">
            {exercises.map((ex, index) => (
              <div key={ex.id} className="exercise-card card">
                <div className="exercise-card-header">
                  <GripVertical size={16} className="drag-handle" />
                  <div className="exercise-card-title">
                    <h3>{ex.name}</h3>
                    <span className="badge badge-primary">{ex.category}</span>
                  </div>
                  <button
                    className="btn btn-ghost btn-icon btn-sm"
                    onClick={() => removeExercise(index)}
                    style={{ width: '32px', height: '32px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="exercise-card-inputs">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Sets</label>
                    <input
                      type="number"
                      className="form-input"
                      value={ex.sets}
                      onChange={e => updateExercise(index, 'sets', e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Reps</label>
                    <input
                      type="number"
                      className="form-input"
                      value={ex.reps}
                      onChange={e => updateExercise(index, 'reps', e.target.value)}
                      min="1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          className="btn btn-secondary"
          onClick={() => setShowSearch(true)}
          style={{ marginTop: 'var(--space-md)' }}
        >
          <Plus size={18} /> Add Exercise
        </button>
      </div>

      <div className="template-actions">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={!name.trim() || exercises.length === 0}
        >
          Save Template
        </button>
      </div>

      {showSearch && (
        <ExerciseSearch
          onSelect={addExercise}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}
