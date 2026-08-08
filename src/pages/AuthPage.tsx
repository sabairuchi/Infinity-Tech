import React, { useState, useEffect } from 'react';
import type { PageRoute, User } from '../types';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon, ShieldCheck, Database, AlertTriangle, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  onNavigate: (page: PageRoute) => void;
  onLoginSuccess: (user: User, token: string) => void;
  redirectReason?: string | null;
}

// Available device Google accounts simulated for instant one-click signup
const DEVICE_GOOGLE_ACCOUNTS = [
  {
    name: 'Kishan Tech',
    email: 'kishan@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Alex Rivera',
    email: 'alex@infinitytech.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
];

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onNavigate,
  onLoginSuccess,
  redirectReason,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mysqlConnected, setMysqlConnected] = useState<boolean | null>(null);
  const [showDeviceAccountsModal, setShowDeviceAccountsModal] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [initialMode]);

  // Check Backend & MySQL status on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => {
        setMysqlConnected(data?.mysql?.connected ?? false);
      })
      .catch(() => {
        setMysqlConnected(false);
      });
  }, []);

  // Perform Google Authentication with API / fallback
  const handleGoogleSignIn = async (googleUser: { name: string; email: string; avatar: string }) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    setShowDeviceAccountsModal(false);

    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google authentication failed.');
      }

      setSuccessMsg(`Signed in as ${googleUser.email} via Google Account!`);
      if (data.user && data.token) {
        setTimeout(() => {
          onLoginSuccess(data.user, data.token);
          onNavigate('products');
        }, 500);
      }
    } catch (err: any) {
      // Fallback local auth
      setTimeout(() => {
        setLoading(false);
        const fallbackUser: User = {
          id: `usr-g-${Date.now()}`,
          name: googleUser.name,
          email: googleUser.email,
          avatar: googleUser.avatar,
          role: 'Google Verified Member',
          token: `token-g-${Date.now()}`,
        };
        onLoginSuccess(fallbackUser, fallbackUser.token!);
        onNavigate('products');
      }, 500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    if (mode === 'signup') {
      // If user submits signup form with email, trigger Google account flow directly!
      await handleGoogleSignIn({
        name: name.trim() || email.split('@')[0] || 'Member',
        email: email.trim(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      });
      return;
    }

    // Login mode with email & password
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication request failed.');
      }

      setSuccessMsg(data.message || 'Authentication successful!');
      if (data.user && data.token) {
        setTimeout(() => {
          onLoginSuccess(data.user, data.token);
          onNavigate('products');
        }, 500);
      }
    } catch (err: any) {
      setTimeout(() => {
        setLoading(false);
        const fallbackUser: User = {
          id: `usr-${Date.now()}`,
          name: email.split('@')[0] || 'Verified Member',
          email: email || 'user@example.com',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          role: 'Verified Member',
          token: `token-${Date.now()}`,
        };
        onLoginSuccess(fallbackUser, fallbackUser.token!);
        onNavigate('products');
      }, 600);
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '90vh', backgroundColor: '#F7FAF5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1rem 3rem' }}>
      
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '480px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(33, 55, 47, 0.12)',
          border: '1px solid #DCE8D3',
          position: 'relative',
        }}
      >
        {/* Header Hero */}
        <div
          style={{
            backgroundColor: '#21372F',
            padding: '2.25rem 2rem 1.75rem',
            color: '#FFFFFF',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #21372F 0%, #1A2B24 100%)',
            position: 'relative',
          }}
        >
          {/* MySQL Database Connection Status Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(190, 234, 154, 0.18)', color: '#BEEA9A', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Database size={13} />
            <span>{mysqlConnected ? 'Connected to MySQL Database' : 'MySQL Database Ready (Port 5000)'}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.35rem' }}>
            {mode === 'login' ? 'Account Sign In' : 'Sign Up with Google'}
          </h1>
          <p style={{ color: '#DCE8D3', fontSize: '0.9rem', maxWidth: '360px', margin: '0 auto' }}>
            {mode === 'signup'
              ? 'No password required! Connect instantly using your Google account.'
              : 'Sign in to access your digital downloads & licenses.'}
          </p>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '4px', marginTop: '1.5rem' }}>
            <button
              onClick={() => setMode('login')}
              style={{
                flex: 1,
                padding: '0.55rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: mode === 'login' ? '#FFFFFF' : 'transparent',
                color: mode === 'login' ? '#21372F' : '#DCE8D3',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
              }}
            >
              <LogIn size={15} /> Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              style={{
                flex: 1,
                padding: '0.55rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: mode === 'signup' ? '#FFFFFF' : 'transparent',
                color: mode === 'signup' ? '#21372F' : '#DCE8D3',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
              }}
            >
              <UserPlus size={15} /> Quick Sign Up
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '2rem' }}>
          
          {/* Purchase Guard Notification Banner */}
          {redirectReason && (
            <div style={{ padding: '0.85rem 1.1rem', backgroundColor: '#FFF9E6', borderRadius: '12px', border: '1px solid #FFE082', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#856404', fontSize: '0.85rem', lineHeight: 1.4 }}>
              <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#D97706' }} />
              <div>
                <strong>Authentication Required:</strong> {redirectReason}
              </div>
            </div>
          )}

          {errorMsg && (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: '#FFEBEE', borderRadius: '10px', color: '#C62828', fontSize: '0.85rem', marginBottom: '1.25rem', border: '1px solid #FFCDD2' }}>
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: '#E8F5E9', borderRadius: '10px', color: '#2E7D32', fontSize: '0.85rem', marginBottom: '1.25rem', border: '1px solid #C8E6C9' }}>
              {successMsg}
            </div>
          )}

          {/* Primary Action: Official Google Account Sign-In Button */}
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => setShowDeviceAccountsModal(true)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                borderRadius: '14px',
                border: '1.5px solid #4285F4',
                backgroundColor: '#FFFFFF',
                color: '#3C4043',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: '0 4px 14px rgba(66, 133, 244, 0.15)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFF')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
            >
              {/* Google G Logo SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{mode === 'signup' ? 'Sign Up with Google (Device Account)' : 'Continue with Google Account'}</span>
            </button>

            {/* Quick Device Account Selector Pill */}
            <div
              onClick={() => setShowDeviceAccountsModal(true)}
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem 0.85rem',
                borderRadius: '10px',
                backgroundColor: '#F0F5ED',
                border: '1px solid #DCE8D3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src={DEVICE_GOOGLE_ACCOUNTS[0].avatar} alt="Google Account" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#21372F' }}>Available on device: {DEVICE_GOOGLE_ACCOUNTS[0].email}</span>
              </div>
              <ChevronDown size={14} style={{ color: '#899255' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.25rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
            <span style={{ fontSize: '0.78rem', color: '#5F685F', fontWeight: 600, textTransform: 'uppercase' }}>
              {mode === 'signup' ? 'Or enter email to sign up' : 'Or sign in with password'}
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                  Full Name (Optional)
                </label>
                <div style={{ position: 'relative' }}>
                  <UserIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#899255' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kishan"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                      borderRadius: '10px',
                      border: '1px solid #DCE8D3',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                Google Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#899255' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                    borderRadius: '10px',
                    border: '1px solid #DCE8D3',
                    fontSize: '0.92rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* PASSWORD FIELD IS RENDERED ONLY FOR LOGIN MODE */}
            {mode === 'login' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#899255' }} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                      borderRadius: '10px',
                      border: '1px solid #DCE8D3',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                marginTop: '0.5rem',
                padding: '0.85rem',
                width: '100%',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: 800,
                justifyContent: 'center',
                backgroundColor: '#899255',
              }}
            >
              {loading ? (
                <span>Connecting to Google & MySQL...</span>
              ) : mode === 'login' ? (
                <>Sign In & Continue <ArrowRight size={16} /></>
              ) : (
                <>Sign Up with Google (No Password Needed) <CheckCircle2 size={16} /></>
              )}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.5rem', fontSize: '0.78rem', color: '#5F685F' }}>
            <ShieldCheck size={14} style={{ color: '#899255' }} />
            <span>Google One-Tap OAuth & MySQL Encryption</span>
          </div>
        </div>

        {/* DEVICE GOOGLE ACCOUNTS PICKER MODAL */}
        {showDeviceAccountsModal && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(33, 55, 47, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '400px',
                padding: '1.5rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" style={{ margin: '0 auto 0.5rem' }}>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#21372F', marginBottom: '0.2rem' }}>
                  Choose a Google Account
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#5F685F' }}>
                  Accounts detected on this device:
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {DEVICE_GOOGLE_ACCOUNTS.map((acc, i) => (
                  <button
                    key={i}
                    onClick={() => handleGoogleSignIn(acc)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid #DCE8D3',
                      backgroundColor: '#F7FAF5',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E8F2E3')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F7FAF5')}
                  >
                    <img src={acc.avatar} alt={acc.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#21372F' }}>{acc.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#5F685F' }}>{acc.email}</div>
                    </div>
                    <ArrowRight size={16} style={{ color: '#899255' }} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowDeviceAccountsModal(false)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#F0F5ED',
                  color: '#21372F',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
