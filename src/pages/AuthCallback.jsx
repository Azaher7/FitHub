import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Dumbbell, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import './Auth.css';

const REDIRECT_DELAY_MS = 1200;

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    let redirectTimer;

    const setFriendlyError = (message) => {
      if (cancelled) return;
      setErrorMessage(message || 'This confirmation link is invalid or has expired. Please try signing up again.');
      setStatus('error');
    };

    const finishSuccess = () => {
      if (cancelled) return;
      setStatus('success');
      redirectTimer = window.setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, REDIRECT_DELAY_MS);
    };

    const handleCallback = async () => {
      if (!isSupabaseConfigured || !supabase) {
        setFriendlyError('Authentication is not configured yet. Please try again later.');
        return;
      }

      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const callbackError = url.searchParams.get('error_description') || url.searchParams.get('error');

      if (callbackError) {
        setFriendlyError(decodeURIComponent(callbackError));
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setFriendlyError(error.message);
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();
      if (error || !data?.session) {
        setFriendlyError(error?.message);
        return;
      }

      finishSuccess();
    };

    handleCallback();

    const { data: authListener } = supabase?.auth.onAuthStateChange((event, session) => {
      if (cancelled) return;
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        finishSuccess();
      }
    }) || { data: null };

    return () => {
      cancelled = true;
      if (redirectTimer) {
        window.clearTimeout(redirectTimer);
      }
      authListener?.subscription?.unsubscribe?.();
    };
  }, [navigate]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Dumbbell size={32} />
          <h1>FitHub</h1>
        </div>

        {status === 'loading' && (
          <>
            <div className="auth-status-icon auth-status-icon-neutral">
              <Loader2 size={28} className="auth-spin" />
            </div>
            <h2>Signing you in…</h2>
            <p className="auth-subtitle">We're securely confirming your email.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="auth-status-icon auth-status-icon-success">
              <CheckCircle size={28} />
            </div>
            <h2>Email confirmed.</h2>
            <p className="auth-subtitle">Success! Redirecting you to your dashboard now.</p>
            <Link to="/dashboard" className="btn btn-primary auth-submit">Go now</Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="auth-status-icon auth-status-icon-error">
              <AlertTriangle size={28} />
            </div>
            <h2>We couldn't confirm your email.</h2>
            <p className="auth-subtitle">{errorMessage}</p>
            <Link to="/signup" className="btn btn-primary auth-submit">Back to sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
