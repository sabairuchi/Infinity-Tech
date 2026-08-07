import React from 'react';
import type { PageRoute } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onNavigate: (page: PageRoute) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section
      style={{
        backgroundColor: '#365648',
        color: '#FFFFFF',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Subtle Background Grid Patterns */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(rgba(190, 234, 154, 0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: 0.75,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 195, 110, 0.25) 0%, rgba(54, 86, 72, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px' }}>
        
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: '#BEEA9A',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}
        >
          <Sparkles size={16} /> Transform Your Business Today
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '1.25rem',
            lineHeight: 1.2,
          }}
        >
          Ready to Start Your Next Project?
        </h2>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: '#DCE8D3',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}
        >
          Let's turn your idea into a digital product that makes an impact. Get in touch with our expert team for a complimentary technical consultation.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('contact')}
            className="btn btn-light"
            style={{
              padding: '0.95rem 2.2rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              backgroundColor: '#899255',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 8px 24px rgba(33, 55, 47, 0.25)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#21372F')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#899255')}
          >
            Get In Touch <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
};
