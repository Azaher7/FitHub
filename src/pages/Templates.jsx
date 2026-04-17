import { Link } from 'react-router-dom';
import { Plus, ChevronRight, Dumbbell } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { mockTemplates } from '../data/mockData';
import './Templates.css';

export default function Templates() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Workout Templates</h1>
        <p className="page-subtitle">Your saved routines</p>
      </div>

      {mockTemplates.length > 0 ? (
        <div className="templates-list">
          {mockTemplates.map(template => (
            <div key={template.id} className="template-card card">
              <div className="template-card-content">
                <h3>{template.name}</h3>
                <p className="template-exercise-list">
                  {template.exercises.map(e => e.exercise.name).join(', ')}
                </p>
                <div className="template-card-meta">
                  <span>{template.exercises.length} exercises</span>
                  {template.lastUsed && (
                    <span>Last used {new Date(template.lastUsed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  )}
                </div>
              </div>
              <div className="template-card-actions">
                <Link
                  to={`/workout/active?template=${template.id}`}
                  className="btn btn-primary btn-sm"
                  style={{ width: 'auto' }}
                >
                  Start
                </Link>
                <Link to={`/templates/${template.id}`} className="template-detail-link">
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Dumbbell}
          title="No templates yet"
          message="Create one to get started!"
        />
      )}

      <Link to="/templates/new" className="fab">
        <Plus size={24} />
      </Link>
    </div>
  );
}
