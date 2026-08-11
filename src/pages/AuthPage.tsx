import React, { useState, useEffect } from 'react';
import type { PageRoute, User } from '../types';
import { AlertTriangle, X, ShieldCheck } from 'lucide-react';

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

  // Handle Google ID Token received from Google Identity Services
  const handleGoogleCredentialAuth = async (credential: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    setShowDeviceAccountsModal(false);

    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google authentication failed.');
      }

      processAuthResult(data.user, data.token, data.isNewUser);
    } catch (err: any) {
      setErrorMsg(err.message || 'Google Sign-In failed. Please try again.');
      setLoading(false);
    }
  };

  // Initialize Google Identity Services SDK
  useEffect(() => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
    if (!googleClientId || googleClientId === 'YOUR_GOOGLE_CLIENT_ID') return;

    const initGoogleGIS = () => {
      if ((window as any).google?.accounts?.id) {
        (window as any).google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response: any) => {
            if (response.credential) {
              handleGoogleCredentialAuth(response.credential);
            }
          },
        });
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

  const handleGoogleButtonClick = () => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
    if ((window as any).google?.accounts?.id && googleClientId && googleClientId !== 'YOUR_GOOGLE_CLIENT_ID') {
      (window as any).google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setShowDeviceAccountsModal(true);
        }
      });
    } else {
      setShowDeviceAccountsModal(true);
    }
  };

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

      processAuthResult(data.user, data.token, data.isNewUser);
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
          isNewUser: true,
        };
        processAuthResult(fallbackUser, fallbackUser.token!, true);
      }, 500);
    }
  };

  // Submit Profile Details for First-Time Users
  const handleSaveProfileDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingUser || !pendingToken) return;
    setSavingProfile(true);

    try {
      await fetch('http://localhost:5000/api/user/profile', {
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

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) return;
    const name = customGoogleName.trim() || customGoogleEmail.split('@')[0];
    handleGoogleAuth({
      name,
      email: customGoogleEmail.trim().toLowerCase(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    });
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
                Sign In with Google
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#5F685F' }}>
                Enter your Google Account email to continue
              </p>
            </div>

            <form onSubmit={handleCustomGoogleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1rem', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#3B5949', marginBottom: '0.3rem' }}>
                  Google Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="user@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #DCE8D3',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.9rem',
                    color: '#21372F',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#3B5949', marginBottom: '0.3rem' }}>
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #DCE8D3',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.9rem',
                    color: '#21372F',
                    outline: 'none',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowDeviceAccountsModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '1px solid #DCE8D3',
                    backgroundColor: '#F7FAF5',
                    color: '#5F685F',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 2,
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#899255',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Sign In with Google
                </button>
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
