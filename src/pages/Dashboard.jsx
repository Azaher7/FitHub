import { Link } from 'react-router-dom';
import {
  Plus, Flame, Dumbbell, Calendar, TrendingUp,
  ChevronRight, Play, Clock, Weight,
} from 'lucide-react';
import Avatar from '../components/Avatar';
import ThemeToggle from '../components/ThemeToggle';
import { mockUser, mockTemplates, mockWorkoutHistory } from '../data/mockData';
import './Dashboard.css';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getRelativeDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getTotalVolume(workout) {
  return workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.reps * set.weight, 0),
    0
  );
}

// Which days this week had a workout (Mon=0 ... Sun=6)
function getWeekActivity(workouts) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const activeDays = new Set();
  workouts.forEach(w => {
    const d = new Date(w.date);
    if (d >= monday) {
      activeDays.add((d.getDay() + 6) % 7); // 0=Mon
    }
  });
  return activeDays;
}

export default function Dashboard() {
  const user = mockUser;
  const recentWorkouts = mockWorkoutHistory.slice(0, 3);
  const weekActivity = getWeekActivity(mockWorkoutHistory);
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <div className="page">
      {/* Greeting */}
      <div className="dashboard-greeting">
        <div>
          <p className="greeting-label">{getGreeting()}</p>
          <h1 className="page-title">{user.name.split(' ')[0]}</h1>
        </div>
        <div className="greeting-actions">
          <ThemeToggle />
          <Link to="/profile">
            <Avatar name={user.name} src={user.profilePicture} size="md" />
          </Link>
        </div>
      </div>

      {/* Start Workout CTA */}
      <Link to="/workout/active" className="start-workout-cta">
        <div className="start-workout-left">
          <div className="start-workout-icon">
            <Play size={22} fill="currentColor" />
          </div>
          <div>
            <h2>Start a Workout</h2>
            <p>Begin an empty session or pick a template</p>
          </div>
        </div>
        <ChevronRight size={20} />
      </Link>

      {/* Weekly Activity */}
      <div className="week-tracker card">
        <div className="week-tracker-header">
          <h3>This Week</h3>
          <span className="week-tracker-count">
            {weekActivity.size} / 7 days
          </span>
        </div>
        <div className="week-dots">
          {dayLabels.map((label, i) => (
            <div key={i} className="week-dot-col">
              <div
                className={`week-dot ${weekActivity.has(i) ? 'active' : ''} ${i === todayIndex ? 'today' : ''}`}
              />
              <span className={`week-dot-label ${i === todayIndex ? 'today' : ''}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon-wrap">
            <Dumbbell size={18} />
          </div>
          <div className="stat-value">{user.stats.totalWorkouts}</div>
          <div className="stat-label">Total Workouts</div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon-wrap">
            <Calendar size={18} />
          </div>
          <div className="stat-value">{user.stats.thisWeek}</div>
          <div className="stat-label">This Week</div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon-wrap">
            <Flame size={18} />
          </div>
          <div className="stat-value">{user.stats.currentStreak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon-wrap">
            <TrendingUp size={18} />
          </div>
          <div className="stat-value">{user.stats.longestStreak}</div>
          <div className="stat-label">Best Streak</div>
        </div>
      </div>

      {/* Templates / Quick Start */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>My Templates</h2>
          <Link to="/templates/new" className="section-link">
            <Plus size={16} /> New
          </Link>
        </div>
        {mockTemplates.length > 0 ? (
          <div className="template-quick-list">
            {mockTemplates.map(template => (
              <div key={template.id} className="template-quick-card card">
                <Link
                  to={`/workout/active?template=${template.id}`}
                  className="template-quick-inner"
                >
                  <div className="template-quick-icon">
                    <Dumbbell size={18} />
                  </div>
                  <div className="template-quick-info">
                    <h3>{template.name}</h3>
                    <p>
                      {template.exercises.length} exercises
                      {template.lastUsed && (
                        <> &middot; Last {getRelativeDate(template.lastUsed)}</>
                      )}
                    </p>
                  </div>
                </Link>
                <Link
                  to={`/workout/active?template=${template.id}`}
                  className="template-start-btn"
                >
                  <Play size={14} fill="currentColor" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state card">
            <Dumbbell size={40} />
            <p>No templates yet</p>
            <Link to="/templates/new" className="btn btn-primary btn-sm" style={{ width: 'auto' }}>
              Create Template
            </Link>
          </div>
        )}
        {mockTemplates.length > 0 && (
          <Link to="/templates" className="view-all-link">
            View all templates <ChevronRight size={16} />
          </Link>
        )}
      </section>

      {/* Recent Workouts */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Recent Workouts</h2>
          <Link to="/history" className="section-link">View All</Link>
        </div>
        {recentWorkouts.length > 0 ? (
          <div className="recent-workout-list">
            {recentWorkouts.map(workout => {
              const volume = getTotalVolume(workout);
              return (
                <Link key={workout.id} to={`/workout/${workout.id}`} className="recent-workout-card card">
                  <div className="recent-workout-date">
                    <span className="recent-workout-day">
                      {new Date(workout.date).getDate()}
                    </span>
                    <span className="recent-workout-month">
                      {new Date(workout.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div className="recent-workout-info">
                    <h3>{workout.templateName}</h3>
                    <div className="recent-workout-stats">
                      <span><Dumbbell size={12} /> {workout.exercises.length} exercises</span>
                      <span><Clock size={12} /> {workout.duration} min</span>
                      {volume > 0 && (
                        <span><Weight size={12} /> {volume.toLocaleString()} lbs</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={18} className="recent-workout-chevron" />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="empty-state card">
            <Clock size={40} />
            <p>No workouts logged yet.<br />Complete your first workout to see it here!</p>
          </div>
        )}
      </section>
    </div>
  );
}
