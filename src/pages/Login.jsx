import { Link } from 'react-router-dom';
import { Dumbbell, Lock } from 'lucide-react';
import './Auth.css';

export default function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Dumbbell size={32} />
          <h1>FitHub</h1>
        </div>

        <div className="auth-status-icon auth-status-icon-neutral">
          <Lock size={28} />
        </div>

        <h2>Log in is coming soon.</h2>
        <p className="auth-subtitle">
          We're finishing the app. For now, sign up for early access and we'll email you the moment it opens.
        </p>

        <Link to="/signup" className="btn btn-primary auth-submit">Sign up for early access</Link>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <p className="auth-footer">
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
