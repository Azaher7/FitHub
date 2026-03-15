import { Link } from 'react-router-dom';
import { Settings, LogOut, ChevronRight, Calendar, Dumbbell, Flame, Moon, Sun } from 'lucide-react';
import Avatar from '../components/Avatar';
import useTheme from '../hooks/useTheme';
import { mockUser } from '../data/mockData';
import './Profile.css';

export default function Profile() {
  const user = mockUser;

  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    // TODO: connect to backend
    window.location.href = '/';
  };

  return (
    <div className="page">
      <div className="profile-header">
        <Avatar name={user.name} src={user.profilePicture} size="xl" />
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-email">{user.email}</p>
        <p className="profile-joined">
          Member since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="profile-stats">
        <div className="profile-stat">
          <Dumbbell size={18} />
          <div>
            <span className="profile-stat-value">{user.stats.totalWorkouts}</span>
            <span className="profile-stat-label">Workouts</span>
          </div>
        </div>
        <div className="profile-stat">
          <Calendar size={18} />
          <div>
            <span className="profile-stat-value">{user.stats.thisWeek}</span>
            <span className="profile-stat-label">This Week</span>
          </div>
        </div>
        <div className="profile-stat">
          <Flame size={18} />
          <div>
            <span className="profile-stat-value">{user.stats.currentStreak}</span>
            <span className="profile-stat-label">Streak</span>
          </div>
        </div>
      </div>

      <div className="profile-menu">
        <Link to="/profile/edit" className="profile-menu-item card">
          <div className="profile-menu-item-left">
            <Settings size={18} />
            <span>Edit Profile</span>
          </div>
          <ChevronRight size={18} />
        </Link>
        <button className="profile-menu-item card" onClick={toggleTheme}>
          <div className="profile-menu-item-left">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
          <ChevronRight size={18} />
        </button>
        <button className="profile-menu-item card" onClick={handleLogout}>
          <div className="profile-menu-item-left">
            <LogOut size={18} />
            <span>Log Out</span>
          </div>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
