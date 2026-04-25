import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Camera, Eye, EyeOff, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import './Auth.css';

const STEPS = [
  { key: 'account', label: 'Account' },
  { key: 'name', label: 'Your name' },
  { key: 'profile', label: 'Profile' },
];

export default function SignUp() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
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

  const validateStep = (index) => {
    const newErrors = {};
    if (index === 0) {
      const email = form.email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Enter a valid email address';
      }
      if (form.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (index === 1) {
      if (form.firstname.trim().length < 2) {
        newErrors.firstname = 'First name is required';
      }
      if (form.lastname.trim().length < 2) {
        newErrors.lastname = 'Last name is required';
      }
    } else if (index === 2) {
      if (form.username.trim().length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setSubmitError('');
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateStep(2)) return;

    if (!isSupabaseConfigured) {
      setSubmitError(
        'Signup is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local and restart the dev server.'
      );
      return;
    }

    const firstname = form.firstname.trim();
    const lastname = form.lastname.trim();
    const username = form.username.trim();
    const email = form.email.trim();

    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          firstname,
          lastname,
          username,
          full_name: `${firstname} ${lastname}`.trim(),
        },
      },
    });
    setSubmitting(false);

    if (error) {
      const msg = error.message || '';
      if (/already registered|already exists|user exists/i.test(msg)) {
        navigate('/already-signed-up', { replace: true, state: { email } });
        return;
      }
      setSubmitError(msg || 'Something went wrong. Please try again.');
      return;
    }

    if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      navigate('/already-signed-up', { replace: true, state: { email } });
      return;
    }

    navigate('/thank-you', {
      replace: true,
      state: {
        firstname,
        lastname,
        email,
        username,
        needsEmailConfirmation: !data?.session,
      },
    });
  };

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Dumbbell size={32} />
          <h1>FitHub</h1>
        </div>
        <h2>Create your account</h2>
        <p className="auth-subtitle">
          Step {step + 1} of {STEPS.length} — {STEPS[step].label}
        </p>

        <div className="auth-stepper" aria-hidden="true">
          {STEPS.map((s, i) => (
            <span
              key={s.key}
              className={`auth-stepper-dot ${i === step ? 'is-current' : ''} ${i < step ? 'is-done' : ''}`}
            />
          ))}
        </div>

        <form onSubmit={isLastStep ? handleSubmit : goNext} className="auth-form">
          {step === 0 && (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update('email')}
                  required
                  autoComplete="email"
                  autoFocus
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input input-with-icon ${errors.password ? 'form-input-error' : ''}`}
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
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
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
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="firstname">First name</label>
                <input
                  id="firstname"
                  type="text"
                  className={`form-input ${errors.firstname ? 'form-input-error' : ''}`}
                  placeholder="John"
                  value={form.firstname}
                  onChange={update('firstname')}
                  required
                  autoComplete="given-name"
                  autoFocus
                />
                {errors.firstname && <span className="form-error">{errors.firstname}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="lastname">Last name</label>
                <input
                  id="lastname"
                  type="text"
                  className={`form-input ${errors.lastname ? 'form-input-error' : ''}`}
                  placeholder="Smith"
                  value={form.lastname}
                  onChange={update('lastname')}
                  required
                  autoComplete="family-name"
                />
                {errors.lastname && <span className="form-error">{errors.lastname}</span>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
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
                <span className="auth-avatar-hint">Upload photo (optional)</span>
                {errors.photo && <span className="form-error">{errors.photo}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="username">Username</label>
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
                  autoFocus
                />
                {errors.username && <span className="form-error">{errors.username}</span>}
              </div>
            </>
          )}

          {submitError && (
            <div className="auth-submit-error" role="alert">
              {submitError}
            </div>
          )}

          <div className="auth-step-actions">
            {step > 0 && (
              <button
                type="button"
                className="btn btn-secondary auth-step-back"
                onClick={goBack}
                disabled={submitting}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={submitting}
            >
              {isLastStep
                ? (submitting ? 'Creating account…' : 'Create Account')
                : (<>Continue <ArrowRight size={16} /></>)}
            </button>
          </div>
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
