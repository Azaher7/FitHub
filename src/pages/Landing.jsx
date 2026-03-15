import { Link } from 'react-router-dom';
import { Dumbbell, BarChart3, Clock, Zap } from 'lucide-react';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-header-inner container">
          <div className="landing-logo">
            <Dumbbell size={28} />
            <span>FitHub</span>
          </div>
          <div className="landing-header-actions">
            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
          </div>
        </div>
      </header>

      <section className="landing-hero container">
        <h1>Track your workouts.<br />Crush your goals.</h1>
        <p>Simple, powerful workout tracking. Create templates, log sets and reps, and watch your progress grow.</p>
        <div className="landing-hero-actions">
          <Link to="/signup" className="btn btn-primary">Get Started Free</Link>
          <Link to="/login" className="btn btn-secondary">I have an account</Link>
        </div>
      </section>

      <section className="landing-features container">
        <div className="feature-grid">
          <div className="feature-card card">
            <div className="feature-icon">
              <Dumbbell size={24} />
            </div>
            <h3>Workout Templates</h3>
            <p>Create reusable templates for your favorite routines. Start a workout in seconds.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">
              <BarChart3 size={24} />
            </div>
            <h3>Track Progress</h3>
            <p>Log sets, reps, and weight for every exercise. See your strength gains over time.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">
              <Clock size={24} />
            </div>
            <h3>Workout History</h3>
            <p>Review every past workout. Never forget what weight you lifted last session.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">
              <Zap size={24} />
            </div>
            <h3>Fast & Simple</h3>
            <p>No bloat. No fluff. Just the features you need to get stronger.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer container">
        <p>&copy; 2025 FitHub. Built for lifters, by lifters.</p>
      </footer>
    </div>
  );
}
