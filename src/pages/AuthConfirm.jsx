import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Dumbbell, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import './Auth.css';

export default function AuthConfirm() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    if (!isSupabaseConfigured) {
      setStatus('error');
      return;
    }

    const check = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (cancelled) return;
      if (error || !data?.session) {
        setStatus('error');
        return;
      }
      setStatus('success');
    };

    check();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      if (session) setStatus('success');
    });

    return () => {
      cancelled = true;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

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
            <h2>Confirming your email…</h2>
            <p className="auth-subtitle">Hang tight for a second.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="auth-status-icon auth-status-icon-success">
              <CheckCircle size={28} />
            </div>
            <h2>You're confirmed.</h2>
            <p className="auth-subtitle">Welcome to FitHub. We'll email you as soon as your account unlocks.</p>
            <Link to="/" className="btn btn-primary auth-submit">Back to home</Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="auth-status-icon auth-status-icon-error">
              <AlertTriangle size={28} />
            </div>
            <h2>This link didn't work.</h2>
            <p className="auth-subtitle">It may have expired or already been used. Try signing up again.</p>
            <Link to="/signup" className="btn btn-primary auth-submit">Back to sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
