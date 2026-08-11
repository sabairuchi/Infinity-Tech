import React, { useState } from 'react';
import type { PageRoute } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute, targetId?: string) => void;
  onOpenLegalModal: (title: string, type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegalModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer style={{ backgroundColor: '#21372F', color: '#FFFFFF', paddingTop: '4.5rem', paddingBottom: '2.5rem' }}>
      <div className="container">
        
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(220, 232, 211, 0.15)',
          }}
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#BEEA9A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 12c-2-2.5-4-4-6.5-4A4.5 4.5 0 0 0 1 12.5 4.5 4.5 0 0 0 5.5 17C8 17 10 14.5 12 12zm0 0c2 2.5 4 4 6.5 4a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-4.5-4.5C16 7 14 9.5 12 12z" />
              </svg>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>
                Digi<span style={{ color: '#BEEA9A' }}>ro</span>
              </span>
            </div>
            
            <p style={{ color: '#DCE8D3', fontSize: '0.925rem', lineHeight: 1.6, fontStyle: 'italic' }}>
              "Endless Possibilities, Infinite Solutions"
            </p>

            <p style={{ color: '#A8C36E', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Empowering global enterprises and scaling startups with custom digital products, cloud platforms, and intelligent automation.
            </p>

            {/* Newsletter Input */}
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Subscribe to Industry Insights
              </span>
              {subscribed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#BEEA9A', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={18} /> Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="email"
                    placeholder="Enter business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: '0.6rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(220, 232, 211, 0.25)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#899255',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              {[
                { name: 'About Us', page: 'about' as PageRoute },
                { name: 'Services', page: 'services' as PageRoute },
                { name: 'Portfolio', page: 'portfolio' as PageRoute },
                { name: 'Blog / Insights', page: 'blog' as PageRoute },
                { name: 'Contact', page: 'contact' as PageRoute },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#DCE8D3',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 0.2s ease',
                      fontSize: 'inherit',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#BEEA9A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#DCE8D3')}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              {[
                'Web Development',
                'Mobile App Development',
                'UI/UX Design',
                'Cloud Solutions',
                'AI & Automation',
                'Digital Marketing',
              ].map((serviceName) => (
                <li key={serviceName}>
                  <button
                    onClick={() => onNavigate('services')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#DCE8D3',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 0.2s ease',
                      fontSize: 'inherit',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#BEEA9A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#DCE8D3')}
                  >
                    {serviceName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.9rem', color: '#DCE8D3' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} style={{ color: '#BEEA9A', flexShrink: 0 }} />
                <a href="mailto:hello@digiro.digital" style={{ color: 'inherit' }}>hello@digiro.digital</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} style={{ color: '#BEEA9A', flexShrink: 0 }} />
                <a href="tel:+18005550199" style={{ color: 'inherit' }}>+1 (800) 555-0199</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} style={{ color: '#BEEA9A', flexShrink: 0, marginTop: '2px' }} />
                <span>100 Technology Plaza, Suite 400<br />San Francisco, CA 94107</span>
              </div>
            </div>

            {/* Direct Contact Channels: WhatsApp, Mail, Contact */}
            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {/* WhatsApp */}
              <a
                href="https://wa.me/18005550199"
                target="_blank"
                rel="noreferrer"
                aria-label="Contact on WhatsApp"
                title="WhatsApp Us"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#BEEA9A',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#899255';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#BEEA9A';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              {/* Mail */}
              <a
                href="mailto:hello@digiro.digital"
                aria-label="Send Email"
                title="Send Email"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#BEEA9A',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#899255';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#BEEA9A';
                }}
              >
                <Mail size={18} />
              </a>

              {/* Contact / Call */}
              <button
                onClick={() => onNavigate('contact')}
                aria-label="Contact Page"
                title="Contact Us"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#BEEA9A',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#899255';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#BEEA9A';
                }}
              >
                <Phone size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Sub-Footer Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#A8C36E',
          }}
        >
          <p>© {new Date().getFullYear()} Digiro. All rights reserved.</p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button
              onClick={() => onOpenLegalModal('Privacy Policy', 'privacy')}
              style={{ background: 'none', border: 'none', color: '#DCE8D3', cursor: 'pointer', fontSize: 'inherit' }}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegalModal('Terms of Service', 'terms')}
              style={{ background: 'none', border: 'none', color: '#DCE8D3', cursor: 'pointer', fontSize: 'inherit' }}
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
