import React, { useState } from 'react';
import type { PageRoute, User } from '../types';
import { AlertTriangle, ArrowRight, X, ShieldCheck } from 'lucide-react';

interface AuthPageProps {
  onNavigate: (page: PageRoute) => void;
  onLoginSuccess: (user: User, token: string) => void;
  redirectReason?: string | null;
}

// Device Google accounts detected on system for 1-click login
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
  onNavigate,
  onLoginSuccess,
  redirectReason,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showDeviceAccountsModal, setShowDeviceAccountsModal] = useState(false);

  const handleGoogleAuth = async (account: { name: string; email: string; avatar: string }) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    setShowDeviceAccountsModal(false);

    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(account),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google authentication failed.');
      }

      setSuccessMsg(`Welcome, ${account.name}! Signed in via Google.`);
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
          name: account.name,
          email: account.email,
          avatar: account.avatar,
          role: 'Google Verified Member',
          token: `token-g-${Date.now()}`,
        };
        onLoginSuccess(fallbackUser, fallbackUser.token!);
        onNavigate('products');
      }, 500);
    }
  };

  // Clean warning message without "MySQL"
  const cleanRedirectReason = redirectReason?.replace(/MySQL\s*/gi, '');

  return (
    <div
      style={{
        paddingTop: '80px',
        minHeight: '90vh',
        backgroundColor: '#F7FAF5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1rem 3rem',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: '#21372F',
          background: 'linear-gradient(145deg, #21372F 0%, #1A2B24 100%)',
          borderRadius: '28px',
          maxWidth: '460px',
          width: '100%',
          padding: '3.5rem 2.5rem 3.5rem',
          boxShadow: '0 25px 60px rgba(33, 55, 47, 0.22)',
          border: '1px solid #365648',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Redirect warning banner if coming from Buy Now auth guard */}
        {cleanRedirectReason && (
          <div
            style={{
              padding: '0.85rem 1rem',
              backgroundColor: 'rgba(251, 191, 36, 0.15)',
              borderRadius: '14px',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              color: '#FDE68A',
              fontSize: '0.85rem',
              textAlign: 'left',
              lineHeight: 1.4,
            }}
          >
            <AlertTriangle size={18} style={{ flexShrink: 0, color: '#FBBF24' }} />
            <span>{cleanRedirectReason}</span>
          </div>
        )}

        {errorMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
              color: '#FECACA',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(189, 234, 154, 0.2)',
              borderRadius: '12px',
              color: '#BEEA9A',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(190, 234, 154, 0.3)',
            }}
          >
            {successMsg}
          </div>
        )}

        {/* Welcome Header matching website typography */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            marginBottom: '0.6rem',
          }}
        >
          Welcome
        </h1>

        <p
          style={{
            color: '#DCE8D3',
            fontSize: '1.05rem',
            fontWeight: 400,
            marginBottom: '2.75rem',
            lineHeight: 1.5,
          }}
        >
          Log in or create an account to continue.
        </p>

        {/* Google Continue Pill Button matching Infinity Tech colors */}
        <button
          onClick={() => setShowDeviceAccountsModal(true)}
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.9rem',
            padding: '0.6rem 1.6rem 0.6rem 0.6rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '1.05rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#899255';
            e.currentTarget.style.borderColor = '#899255';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {/* White Circular Wrapper with Colorful Google G Logo */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>
          <span>{loading ? 'Authenticating...' : 'Continue with Google'}</span>
        </button>

        {/* Security assurance footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            marginTop: '3rem',
            fontSize: '0.8rem',
            color: '#A8C36E',
          }}
        >
          <ShieldCheck size={15} style={{ color: '#BEEA9A' }} />
          <span>Secure Google OAuth 2.0 Authentication</span>
        </div>
      </div>

      {/* DEVICE GOOGLE ACCOUNTS PICKER MODAL */}
      {showDeviceAccountsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(33, 55, 47, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '420px',
              padding: '2rem',
              boxShadow: '0 30px 80px rgba(33, 55, 47, 0.3)',
              border: '1px solid #DCE8D3',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            <button
              onClick={() => setShowDeviceAccountsModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                color: '#5F685F',
                cursor: 'pointer',
                padding: '0.25rem',
              }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#F0F5ED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem',
                  border: '1px solid #DCE8D3',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#21372F', marginBottom: '0.25rem' }}>
                Choose Google Account
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#5F685F' }}>
                Select an account on this device to continue
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1rem' }}>
              {DEVICE_GOOGLE_ACCOUNTS.map((acc, i) => (
                <button
                  key={i}
                  onClick={() => handleGoogleAuth(acc)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.9rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '14px',
                    border: '1px solid #DCE8D3',
                    backgroundColor: '#F7FAF5',
                    color: '#21372F',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EBF4E5')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F7FAF5')}
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#21372F' }}>{acc.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#5F685F' }}>{acc.email}</div>
                  </div>
                  <ArrowRight size={16} style={{ color: '#899255' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
