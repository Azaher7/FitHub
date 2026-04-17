import { Link } from 'react-router-dom';
import {
  Plus, Flame, Dumbbell, Calendar, TrendingUp,
  ChevronRight, Play, Clock, Weight,
} from 'lucide-react';
import Avatar from '../components/Avatar';
import ThemeToggle from '../components/ThemeToggle';
import EmptyState from '../components/EmptyState';
import { getGreeting, getRelativeDate, getWorkoutVolume, getWeekActivity } from '../utils/helpers';
import { mockUser, mockTemplates, mockWorkoutHistory } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
  const user = mockUser;
  const recentWorkouts = mockWorkoutHistory.slice(0, 3);
  const weekActivity = getWeekActivity(mockWorkoutHistory);
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <div className="page">
      {/* Greeting */}
      <div className="dash-greeting">
        <div>
          <p className="dash-greeting-label">{getGreeting()}</p>
          <h1 className="page-title">{user.name.split(' ')[0]}</h1>
        </div>
        <div className="dash-greeting-actions">
          <ThemeToggle />
          <Link to="/profile">
            <Avatar name={user.name} src={user.profilePicture} size="md" />
          </Link>
        </div>
      </div>

      {/* Start Workout CTA */}
      <Link to="/workout/active" className="dash-cta">
        <div className="dash-cta-left">
          <div className="dash-cta-icon">
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
      <div className="dash-week card">
        <div className="dash-week-header">
          <h3>This Week</h3>
          <span className="dash-week-count">{weekActivity.size} / 7 days</span>
        </div>
        <div className="dash-week-dots">
          {dayLabels.map((label, i) => (
            <div key={i} className="dash-week-col">
              <div
                className={`dash-dot ${weekActivity.has(i) ? 'active' : ''} ${i === todayIndex ? 'today' : ''}`}
              />
              <span className={`dash-dot-label ${i === todayIndex ? 'today' : ''}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="dash-stats">
        <div className="dash-stat card">
          <div className="dash-stat-icon"><Dumbbell size={18} /></div>
          <div className="dash-stat-value">{user.stats.totalWorkouts}</div>
          <div className="dash-stat-label">Total Workouts</div>
        </div>
        <div className="dash-stat card">
          <div className="dash-stat-icon"><Calendar size={18} /></div>
          <div className="dash-stat-value">{user.stats.thisWeek}</div>
          <div className="dash-stat-label">This Week</div>
        </div>
        <div className="dash-stat card">
          <div className="dash-stat-icon"><Flame size={18} /></div>
          <div className="dash-stat-value">{user.stats.currentStreak}</div>
          <div className="dash-stat-label">Day Streak</div>
        </div>
        <div className="dash-stat card">
          <div className="dash-stat-icon"><TrendingUp size={18} /></div>
          <div className="dash-stat-value">{user.stats.longestStreak}</div>
          <div className="dash-stat-label">Best Streak</div>
        </div>
      </div>

      {/* Templates / Quick Start */}
      <section className="dash-section">
        <div className="dash-section-header">
          <h2>My Templates</h2>
          <Link to="/templates/new" className="dash-section-link">
            <Plus size={16} /> New
          </Link>
        </div>
        {mockTemplates.length > 0 ? (
          <div className="dash-template-list">
            {mockTemplates.map(template => (
              <div key={template.id} className="dash-template card">
                <Link
                  to={`/workout/active?template=${template.id}`}
                  className="dash-template-inner"
                >
                  <div className="dash-template-icon">
                    <Dumbbell size={18} />
                  </div>
                  <div className="dash-template-info">
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
                  className="dash-template-start"
                >
                  <Play size={14} fill="currentColor" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Dumbbell}
            title="No templates yet"
            message="Create a template to get started"
          >
            <Link to="/templates/new" className="btn btn-primary btn-sm" style={{ width: 'auto' }}>
              Create Template
            </Link>
          </EmptyState>
        )}
        {mockTemplates.length > 0 && (
          <Link to="/templates" className="dash-view-all">
            View all templates <ChevronRight size={16} />
          </Link>
        )}
      </section>

      {/* Recent Workouts */}
      <section className="dash-section">
        <div className="dash-section-header">
          <h2>Recent Workouts</h2>
          <Link to="/history" className="dash-section-link">View All</Link>
        </div>
        {recentWorkouts.length > 0 ? (
          <div className="dash-recent-list">
            {recentWorkouts.map(workout => {
              const volume = getWorkoutVolume(workout);
              return (
                <Link key={workout.id} to={`/workout/${workout.id}`} className="dash-recent card">
                  <div className="dash-recent-date">
                    <span className="dash-recent-day">
                      {new Date(workout.date).getDate()}
                    </span>
                    <span className="dash-recent-month">
                      {new Date(workout.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div className="dash-recent-info">
                    <h3>{workout.templateName}</h3>
                    <div className="dash-recent-stats">
                      <span><Dumbbell size={12} /> {workout.exercises.length} exercises</span>
                      <span><Clock size={12} /> {workout.duration} min</span>
                      {volume > 0 && (
                        <span><Weight size={12} /> {volume.toLocaleString()} lbs</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={18} className="dash-recent-chevron" />
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={Clock}
            title="No workouts logged yet"
            message="Complete your first workout to see it here!"
          />
        )}
      </section>
    </div>
  );
}
