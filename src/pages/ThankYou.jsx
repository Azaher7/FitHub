import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Dumbbell, Mail, Sparkles } from 'lucide-react';
import './ThankYou.css';

export default function ThankYou() {
  const { state } = useLocation();
  const firstname = state?.firstname;
  const email = state?.email;
  const needsEmailConfirmation = state?.needsEmailConfirmation ?? true;

  return (
    <div className="thank-you">
      <div className="thank-you-bg" aria-hidden="true" />
      <div className="thank-you-card">
        <div className="thank-you-brand">
          <Dumbbell size={28} />
          <span>FitHub</span>
        </div>

        <div className="thank-you-icon" aria-hidden="true">
          <CheckCircle size={40} strokeWidth={2.25} />
        </div>

        <h1>Thank you{firstname ? `, ${firstname}` : ''}.</h1>
        <p className="thank-you-lead">
          Please confirm your email to activate your account.
        </p>

        {needsEmailConfirmation && email && (
          <div className="thank-you-note" role="status">
            <Mail size={16} />
            <span>
              We sent a link to <strong>{email}</strong>. Click it and you're in.
            </span>
          </div>
        )}

        <div className="thank-you-upcoming">
          <h2>
            <Sparkles size={16} />
            What's coming next
          </h2>
          <ul>
            <li>Workout tracker with templates, sets, and full history</li>
            <li>FitHub Coach — personalised programming and progress reviews</li>
            <li>FitHub Calorie Tracker — simple nutrition logging built for lifters</li>
            <li>AI-powered fitness support that adapts as you train</li>
          </ul>
        </div>

        <p className="thank-you-footer-line">
          We'll email you as new features unlock.
        </p>

        <div className="thank-you-actions">
          <Link to="/" className="btn btn-primary btn-lg">Back to home</Link>
          <Link to="/about" className="btn btn-outline btn-lg">Learn more about us</Link>
        </div>
      </div>
    </div>
  );
}
