import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Mail } from 'lucide-react';
import './Auth.css';

export default function AlreadySignedUp() {
  const { state } = useLocation();
  const email = state?.email;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Dumbbell size={32} />
          <h1>FitHub</h1>
        </div>

        <div className="auth-status-icon auth-status-icon-neutral">
          <Mail size={28} />
        </div>

        <h2>You've already signed up.</h2>
        <p className="auth-subtitle">
          {email ? <>An account for <strong>{email}</strong> already exists.</> : 'An account for that email already exists.'}{' '}
          We'll email you as soon as log in is ready.
        </p>

        <Link to="/" className="btn btn-primary auth-submit">Back to home</Link>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <p className="auth-footer">
          Need a different account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
