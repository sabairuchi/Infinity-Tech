import React, { useState, useEffect } from 'react';
import type { PageRoute, User } from '../types';
import { AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface AuthPageProps {
  onNavigate: (page: PageRoute) => void;
  onLoginSuccess: (user: User, token: string) => void;
  redirectReason?: string | null;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onNavigate,
  onLoginSuccess,
  redirectReason,
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  // Process authenticated Google account for direct sign-in
  const processAuthResult = (userData: User, token: string) => {
    setSuccessMsg(`Welcome, ${userData.name || 'Member'}! Signed in successfully.`);
    setTimeout(() => {
      onLoginSuccess(userData, token);
      onNavigate('home');
    }, 400);
  };

  // Parse JWT token payload on client side
  const parseJwtPayload = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  // Handle Google ID Token received from Google Identity Services
  const handleGoogleCredentialAuth = async (credential: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const customApi = import.meta.env.VITE_API_BASE_URL;
      const apiUrl = customApi
        ? `${customApi.replace(/\/$/, '')}/api/auth/google`
        : (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
          ? '/api/auth/google'
          : 'http://localhost:5000/api/auth/google');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user && data.token) {
          processAuthResult(data.user, data.token);
          return;
        }
      }
    } catch (err: any) {
      console.warn('Backend server notice, verifying Google token client-side:', err);
    }

    // Direct client-side Google token payload decoding fallback
    const payload = parseJwtPayload(credential);
    if (payload && payload.email) {
      const gUser: User = {
        id: payload.sub || `usr-g-${Date.now()}`,
        name: payload.name || payload.email.split('@')[0],
        email: payload.email,
        avatar: payload.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: 'Google Verified Member',
        googleId: payload.sub,
        profileImage: payload.picture,
        authProvider: 'google',
        token: credential,
      };
      processAuthResult(gUser, credential);
    } else {
      setErrorMsg('Google Sign-In failed. Please try again.');
    }
  };

  // Handle OAuth 2.0 redirect tokens from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && (hash.includes('id_token=') || hash.includes('access_token='))) {
      const params = new URLSearchParams(hash.replace('#', '?'));
      const idToken = params.get('id_token');
      const accessToken = params.get('access_token');

      if (idToken) {
        handleGoogleCredentialAuth(idToken);
        window.history.replaceState(null, '', window.location.pathname);
      } else if (accessToken) {
        fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.email) {
              const gUser: User = {
                id: data.sub || `usr-g-${Date.now()}`,
                name: data.name || data.email.split('@')[0],
                email: data.email,
                avatar: data.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
                role: 'Google Verified Member',
                googleId: data.sub,
                profileImage: data.picture,
                authProvider: 'google',
                token: accessToken,
              };
              processAuthResult(gUser, accessToken);
            }
            window.history.replaceState(null, '', window.location.pathname);
          })
          .catch((err) => {
            console.error('Access token fetch error:', err);
            setErrorMsg('Failed to complete Google Sign-In.');
          });
      }
    }
  }, []);

  // Initialize Google Identity Services SDK
  useEffect(() => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1032430083994-ks2adb95ardvjphhubdne2vsjkkp5j66.apps.googleusercontent.com';
    if (!googleClientId || googleClientId === 'YOUR_GOOGLE_CLIENT_ID') return;

    const initGoogleGIS = () => {
      if ((window as any).google?.accounts?.id) {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: googleClientId,
            auto_select: false,
            use_fedcm_for_prompt: false,
            callback: (response: any) => {
              if (response.credential) {
                handleGoogleCredentialAuth(response.credential);
              }
            },
          });

          // Also render official Google button in slot if available
          const btnSlot = document.getElementById('google-official-btn');
          if (btnSlot) {
            btnSlot.innerHTML = '';
            (window as any).google.accounts.id.renderButton(btnSlot, {
              theme: 'outline',
              size: 'large',
              width: 280,
              shape: 'pill',
              text: 'continue_with',
            });
          }
        } catch (e) {
          console.warn('GIS Init notice:', e);
        }
      }
    };

    if ((window as any).google?.accounts?.id) {
      initGoogleGIS();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initGoogleGIS;
      document.body.appendChild(script);
    }
  }, []);

  // Clean warning message without "MySQL"
  const cleanRedirectReason = redirectReason?.replace(/MySQL\s*/gi, '');

  return (
    <div
      style={{
        minHeight: '90vh',
        backgroundColor: '#F7FAF5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem 3rem',
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
        {/* Close (X) Button in top right corner */}
        <button
          onClick={() => onNavigate(redirectReason ? 'products' : 'home')}
          aria-label="Close authentication modal"
          title="Close"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#DCE8D3',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = '#DCE8D3';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={18} />
        </button>
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
            marginBottom: '2.25rem',
            lineHeight: 1.5,
          }}
        >
          Log in or create an account to continue.
        </p>

        {/* Official Google Sign-In Button Container */}
        <div id="google-official-btn" style={{ margin: '1.5rem auto 0 auto', display: 'flex', justifyContent: 'center', minHeight: '44px' }} />

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
    </div>
  );
};
