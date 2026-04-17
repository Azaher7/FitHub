import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Camera, Eye, EyeOff, User } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import './Auth.css';

export default function SignUp() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, photo: 'Image must be under 5MB' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePicture(ev.target.result);
        setErrors({ ...errors, photo: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (form.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    if (!isSupabaseConfigured) {
      setSubmitError(
        'Signup is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local and restart the dev server.'
      );
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          username: form.username.trim(),
        },
      },
    });
    setSubmitting(false);

    if (error) {
      setSubmitError(error.message);
      return;
    }

    navigate('/thank-you', {
      replace: true,
      state: {
        email: form.email.trim(),
        username: form.username.trim(),
        needsEmailConfirmation: !data?.session,
      },
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Dumbbell size={32} />
          <h1>FitHub</h1>
        </div>
        <h2>Create your account</h2>
        <p className="auth-subtitle">Start tracking your workouts today</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Profile Picture Upload */}
          <div className="auth-avatar-upload">
            <button
              type="button"
              className="auth-avatar-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="auth-avatar-img" />
              ) : (
                <div className="auth-avatar-placeholder">
                  <User size={28} />
                </div>
              )}
              <span className="auth-avatar-overlay">
                <Camera size={16} />
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
            <span className="auth-avatar-hint">Upload photo</span>
            {errors.photo && <span className="form-error">{errors.photo}</span>}
          </div>

          {/* Username */}
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <div className="input-wrapper">
              <input
                id="username"
                type="text"
                className={`form-input ${errors.username ? 'form-input-error' : ''}`}
                placeholder="Choose a username"
                value={form.username}
                onChange={update('username')}
                required
                minLength={3}
                autoComplete="username"
              />
            </div>
            {errors.username && <span className="form-error">{errors.username}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={update('email')}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input input-with-icon"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={update('password')}
                required
                minLength={8}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-icon-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                className={`form-input input-with-icon ${errors.confirmPassword ? 'form-input-error' : ''}`}
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={update('confirmPassword')}
                required
                minLength={8}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-icon-btn"
                onClick={() => setShowConfirm(!showConfirm)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>

          {submitError && (
            <div className="auth-submit-error" role="alert">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={submitting}
          >
            {submitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
