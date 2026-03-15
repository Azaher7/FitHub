import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, ClipboardList, User, Users } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/dashboard" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <Home size={22} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/feed" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <Users size={22} />
        <span>Feed</span>
      </NavLink>
      <NavLink to="/templates" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <Dumbbell size={22} />
        <span>Workouts</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <ClipboardList size={22} />
        <span>History</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <User size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
