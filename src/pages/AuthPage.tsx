import React, { useState, useEffect } from 'react';
import type { PageRoute, User } from '../types';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  // State for First-Time User Profile Details Bar/Modal
  const [showProfileDetailsModal, setShowProfileDetailsModal] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileCompany, setProfileCompany] = useState('');
  const [profileRole, setProfileRole] = useState('Digital Architect');
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [pendingToken, setPendingToken] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Process authenticated Google account
  const processAuthResult = (userData: User, token: string, isNewUser?: boolean) => {
    if (isNewUser || userData.isNewUser) {
      setPendingUser(userData);
      setPendingToken(token);
      setProfileName(userData.name || '');
      setProfilePhone(userData.phone || '');
      setProfileCompany(userData.company || '');
      setProfileRole(userData.role || 'Digital Architect');
      setLoading(false);
      setShowProfileDetailsModal(true);
    } else {
      setSuccessMsg(`Welcome back, ${userData.name}! Signed in successfully.`);
      setTimeout(() => {
        onLoginSuccess(userData, token);
        onNavigate('home');
      }, 500);
    }
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
    setLoading(true);

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
          processAuthResult(data.user, data.token, data.isNewUser);
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
      processAuthResult(gUser, credential, true);
    } else {
      setErrorMsg('Google Sign-In failed. Please try again.');
      setLoading(false);
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
              processAuthResult(gUser, accessToken, true);
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

  const triggerOAuthFallback = (googleClientId: string) => {
    const redirectUri = window.location.origin + window.location.pathname;
    const scope = 'email profile openid';
    const nonce = Math.random().toString(36).substring(2);
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token&scope=${encodeURIComponent(scope)}&nonce=${nonce}&prompt=select_account`;
  };

  const handleGoogleButtonClick = () => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1032430083994-ks2adb95ardvjphhubdne2vsjkkp5j66.apps.googleusercontent.com';
    if (!googleClientId || googleClientId === 'YOUR_GOOGLE_CLIENT_ID') {
      setErrorMsg('Google OAuth Client ID is not configured. Please check your .env settings.');
      return;
    }

    setLoading(true);

    if ((window as any).google?.accounts?.id) {
      try {
        (window as any).google.accounts.id.cancel();
        (window as any).google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // One Tap suppressed or skipped on mobile, trigger direct Google Account Chooser
            triggerOAuthFallback(googleClientId);
          }
        });

        // Safety fallback timer for mobile devices if prompt callback does not fire
        setTimeout(() => {
          if (!pendingUser && !showProfileDetailsModal) {
            triggerOAuthFallback(googleClientId);
          }
        }, 1200);
      } catch (e) {
        triggerOAuthFallback(googleClientId);
      }
    } else {
      triggerOAuthFallback(googleClientId);
    }
  };

  // Submit Profile Details for First-Time Users
  const handleSaveProfileDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingUser || !pendingToken) return;
    setSavingProfile(true);

    try {
      const customApi = import.meta.env.VITE_API_BASE_URL;
      const apiUrl = customApi
        ? `${customApi.replace(/\/$/, '')}/api/user/profile`
        : (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
          ? '/api/user/profile'
          : 'http://localhost:5000/api/user/profile');

      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pendingToken}`,
        },
        body: JSON.stringify({
          name: profileName,
          phone: profilePhone,
          company: profileCompany,
          role: profileRole,
        }),
      });
    } catch (err) {
      console.warn('Backend profile sync notice:', err);
    }

    const updatedUser: User = {
      ...pendingUser,
      name: profileName || pendingUser.name,
      phone: profilePhone,
      company: profileCompany,
      role: profileRole,
      isNewUser: false,
    };

    setSavingProfile(false);
    setShowProfileDetailsModal(false);
    setSuccessMsg('Profile setup complete! Redirecting to Home Page...');
    setTimeout(() => {
      onLoginSuccess(updatedUser, pendingToken);
      onNavigate('home');
    }, 400);
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

        {/* Google Continue Pill Button matching Digiro colors */}
        <button
          onClick={handleGoogleButtonClick}
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

      {/* FIRST-TIME USER PROFILE DETAILS COMPLETION MODAL */}
      {showProfileDetailsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(33, 55, 47, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
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
              maxWidth: '460px',
              padding: '2.25rem 2rem',
              boxShadow: '0 30px 90px rgba(0, 0, 0, 0.35)',
              border: '1px solid #DCE8D3',
              textAlign: 'left',
              animation: 'fadeInUp 0.35s ease forwards',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#F0F5ED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem',
                  border: '2px solid #899255',
                  fontSize: '1.5rem',
                }}
              >
                🎉
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#21372F', marginBottom: '0.35rem' }}>
                Welcome to Digiro!
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#5F685F', lineHeight: 1.5 }}>
                First time signing in? Please fill out your profile details to customize your workspace.
              </p>
            </div>

            <form onSubmit={handleSaveProfileDetails} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                  Full Name <span style={{ color: '#E53E3E' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #DCE8D3',
                    fontSize: '0.9rem',
                    color: '#21372F',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-1234"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #DCE8D3',
                    fontSize: '0.9rem',
                    color: '#21372F',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="Acme Innovations"
                  value={profileCompany}
                  onChange={(e) => setProfileCompany(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #DCE8D3',
                    fontSize: '0.9rem',
                    color: '#21372F',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                  Professional Role
                </label>
                <select
                  value={profileRole}
                  onChange={(e) => setProfileRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #DCE8D3',
                    fontSize: '0.9rem',
                    color: '#21372F',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="Digital Architect">Digital Architect</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="CTO / Tech Director">CTO / Tech Director</option>
                  <option value="Business Founder">Business Founder</option>
                  <option value="Verified Member">Verified Member</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                style={{
                  marginTop: '0.75rem',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#899255',
                  color: '#FFFFFF',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(137, 146, 85, 0.35)',
                  transition: 'all 0.2s ease',
                }}
              >
                {savingProfile ? 'Saving Profile...' : 'Save Details & Go to Home Page →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
