import { Link } from 'react-router-dom';
import { Plus, Flame, Dumbbell, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import Avatar from '../components/Avatar';
import { mockUser, mockTemplates, mockWorkoutHistory } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
  const user = mockUser;
  const recentWorkouts = mockWorkoutHistory.slice(0, 3);

  return (
    <div className="page">
      <div className="dashboard-greeting">
        <div>
          <h1 className="page-title">Hey, {user.name.split(' ')[0]}</h1>
          <p className="page-subtitle">Ready to train?</p>
        </div>
        <Link to="/profile">
          <Avatar name={user.name} src={user.profilePicture} size="md" />
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card card">
          <Dumbbell size={20} className="stat-icon" />
          <div className="stat-value">{user.stats.totalWorkouts}</div>
          <div className="stat-label">Total Workouts</div>
        </div>
        <div className="stat-card card">
          <Calendar size={20} className="stat-icon" />
          <div className="stat-value">{user.stats.thisWeek}</div>
          <div className="stat-label">This Week</div>
        </div>
        <div className="stat-card card">
          <Flame size={20} className="stat-icon" />
          <div className="stat-value">{user.stats.currentStreak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card card">
          <TrendingUp size={20} className="stat-icon" />
          <div className="stat-value">{user.stats.longestStreak}</div>
          <div className="stat-label">Best Streak</div>
        </div>
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <h2>Quick Start</h2>
          <Link to="/templates/new" className="section-link">
            <Plus size={16} /> New Template
          </Link>
        </div>
        <div className="template-quick-list">
          {mockTemplates.map(template => (
            <Link
              key={template.id}
              to={`/workout/active?template=${template.id}`}
              className="template-quick-card card"
            >
              <div className="template-quick-info">
                <h3>{template.name}</h3>
                <p>{template.exercises.length} exercises</p>
              </div>
              <ChevronRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <h2>Recent Workouts</h2>
          <Link to="/history" className="section-link">View All</Link>
        </div>
        {recentWorkouts.length > 0 ? (
          <div className="recent-workout-list">
            {recentWorkouts.map(workout => (
              <Link key={workout.id} to={`/workout/${workout.id}`} className="recent-workout-card card">
                <div className="recent-workout-info">
                  <h3>{workout.templateName}</h3>
                  <p>{new Date(workout.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                </div>
                <div className="recent-workout-meta">
                  <span>{workout.exercises.length} exercises</span>
                  <span>{workout.duration} min</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state card">
            <p>No workouts yet. Start your first one!</p>
          </div>
        )}
      </section>
    </div>
  );
}
