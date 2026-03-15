import { Link } from 'react-router-dom';
import {
  Settings, LogOut, ChevronRight, Calendar, Dumbbell, Flame,
  Moon, Sun, Weight, Clock, Trophy, Target, TrendingUp,
  Award, Zap,
} from 'lucide-react';
import Avatar from '../components/Avatar';
import useTheme from '../hooks/useTheme';
import { mockUser, mockWorkoutHistory } from '../data/mockData';
import './Profile.css';

function getVolume(workout) {
  return workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.reps * set.weight, 0),
    0
  );
}

function getRelativeDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

const achievements = [
  { icon: Flame, label: 'First Streak', desc: '5 day streak', unlocked: true },
  { icon: Trophy, label: '50 Workouts', desc: '47 / 50', unlocked: false },
  { icon: Zap, label: 'PR Crusher', desc: '8 personal records', unlocked: true },
  { icon: Award, label: 'Iron Will', desc: '10+ day streak', unlocked: true },
];

export default function Profile() {
  const user = mockUser;
  const { theme, toggleTheme } = useTheme();
  const recentWorkouts = mockWorkoutHistory.slice(0, 3);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="page">
      {/* Profile Card */}
      <div className="prof-card">
        <div className="prof-card-bg" />
        <div className="prof-card-content">
          <Avatar name={user.name} src={user.profilePicture} size="xl" />
          <h1 className="prof-name">{user.name}</h1>
          <p className="prof-username">@{user.username}</p>
          {user.bio && <p className="prof-bio">{user.bio}</p>}
          {user.fitnessGoal && (
            <span className="prof-goal">
              <Target size={12} />
              {user.fitnessGoal}
            </span>
          )}
          <p className="prof-joined">
            <Calendar size={11} />
            Member since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <Link to="/profile/edit" className="prof-edit-btn">
            <Settings size={14} />
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="prof-stats">
        <div className="prof-stat">
          <div className="prof-stat-icon">
            <Dumbbell size={16} />
          </div>
          <span className="prof-stat-value">{user.stats.totalWorkouts}</span>
          <span className="prof-stat-label">Workouts</span>
        </div>
        <div className="prof-stat">
          <div className="prof-stat-icon">
            <Clock size={16} />
          </div>
          <span className="prof-stat-value">{user.stats.totalHours}h</span>
          <span className="prof-stat-label">Total Time</span>
        </div>
        <div className="prof-stat">
          <div className="prof-stat-icon">
            <Weight size={16} />
          </div>
          <span className="prof-stat-value">{(user.stats.totalVolume / 1000).toFixed(0)}k</span>
          <span className="prof-stat-label">lbs Lifted</span>
        </div>
        <div className="prof-stat">
          <div className="prof-stat-icon">
            <Flame size={16} />
          </div>
          <span className="prof-stat-value">{user.stats.currentStreak}</span>
          <span className="prof-stat-label">Day Streak</span>
        </div>
        <div className="prof-stat">
          <div className="prof-stat-icon">
            <TrendingUp size={16} />
          </div>
          <span className="prof-stat-value">{user.stats.longestStreak}</span>
          <span className="prof-stat-label">Best Streak</span>
        </div>
        <div className="prof-stat">
          <div className="prof-stat-icon">
            <Trophy size={16} />
          </div>
          <span className="prof-stat-value">{user.stats.prs}</span>
          <span className="prof-stat-label">PRs Hit</span>
        </div>
      </div>

      {/* Achievements */}
      <div className="prof-section">
        <div className="prof-section-header">
          <h2>Achievements</h2>
          <span className="prof-section-count">
            {achievements.filter(a => a.unlocked).length}/{achievements.length}
          </span>
        </div>
        <div className="prof-achievements">
          {achievements.map((ach, i) => (
            <div key={i} className={`prof-achievement ${ach.unlocked ? 'unlocked' : 'locked'}`}>
              <div className="prof-achievement-icon">
                <ach.icon size={18} />
              </div>
              <div className="prof-achievement-text">
                <span className="prof-achievement-label">{ach.label}</span>
                <span className="prof-achievement-desc">{ach.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="prof-section">
        <div className="prof-section-header">
          <h2>Recent Activity</h2>
          <Link to="/history" className="prof-section-link">
            View All <ChevronRight size={14} />
          </Link>
        </div>
        <div className="prof-activity">
          {recentWorkouts.map(workout => {
            const volume = getVolume(workout);
            const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
            return (
              <Link key={workout.id} to={`/workout/${workout.id}`} className="prof-activity-card">
                <div className="prof-activity-date">
                  <span className="prof-activity-day">
                    {new Date(workout.date).getDate()}
                  </span>
                  <span className="prof-activity-month">
                    {new Date(workout.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
                <div className="prof-activity-content">
                  <div className="prof-activity-top">
                    <h3>{workout.templateName}</h3>
                    <span className="prof-activity-badge">{getRelativeDate(workout.date)}</span>
                  </div>
                  <div className="prof-activity-stats">
                    <span><Dumbbell size={11} /> {workout.exercises.length} exercises</span>
                    <span><TrendingUp size={11} /> {totalSets} sets</span>
                    <span><Clock size={11} /> {workout.duration}m</span>
                    {volume > 0 && (
                      <span><Weight size={11} /> {volume.toLocaleString()} lbs</span>
                    )}
                  </div>
                </div>
                <ChevronRight size={16} className="prof-activity-chevron" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Settings Menu */}
      <div className="prof-section">
        <div className="prof-section-header">
          <h2>Settings</h2>
        </div>
        <div className="prof-menu">
          <button className="prof-menu-item" onClick={toggleTheme}>
            <div className="prof-menu-left">
              <div className="prof-menu-icon">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </div>
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <ChevronRight size={16} />
          </button>
          <button className="prof-menu-item logout" onClick={handleLogout}>
            <div className="prof-menu-left">
              <div className="prof-menu-icon logout-icon">
                <LogOut size={16} />
              </div>
              <span>Log Out</span>
            </div>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
