import React, { useEffect, useState } from 'react';
import type { ProductItem, PageRoute } from '../types';
import {
  X, Check, ArrowRight, Layers, Zap, Globe, Users,
  Shield, BarChart3, Puzzle, Star
} from 'lucide-react';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onNavigate: (page: PageRoute) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (product) {
      requestAnimationFrame(() => setIsVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!product) return null;

  const statusColor = product.status === 'Live'
    ? '#4CAF50'
    : product.status === 'Beta'
      ? '#FF9800'
      : '#9E9E9E';

  const useCaseIcons = [BarChart3, Users, Globe, Shield];

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: isVisible ? 'rgba(33, 55, 47, 0.6)' : 'rgba(33, 55, 47, 0)',
        backdropFilter: isVisible ? 'blur(6px)' : 'blur(0px)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 30px 80px rgba(33, 55, 47, 0.25)',
        }}
      >
        {/* Modal Header with Image */}
        <div style={{ position: 'relative' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '280px',
              objectFit: 'cover',
              borderRadius: '24px 24px 0 0',
            }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '140px',
              background: 'linear-gradient(to top, rgba(33,55,47,0.85), transparent)',
              borderRadius: '0 0 0 0',
            }}
          />

          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#21372F',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)')}
          >
            <X size={20} />
          </button>

          {/* Product title on image */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '28px',
              right: '28px',
              color: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(6px)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#BEEA9A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {product.category}
              </span>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: statusColor,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusColor }} />
                {product.status} — v{product.version}
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              {product.name}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          {/* Tagline & Description */}
          <p
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              fontStyle: 'italic',
              color: '#899255',
              marginBottom: '1rem',
            }}
          >
            "{product.tagline}"
          </p>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#5F685F',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            {product.fullDesc}
          </p>

          {/* Pricing CTA Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#F7FAF5',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
              marginBottom: '2.5rem',
              border: '1px solid #DCE8D3',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', color: '#5F685F', display: 'block', marginBottom: '0.25rem' }}>
                Starting at
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#21372F' }}>
                {product.pricing}
              </span>
            </div>
            <button
              onClick={() => { handleClose(); onNavigate('contact'); }}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}
            >
              Get Started <ArrowRight size={18} />
            </button>
          </div>

          {/* Features Grid */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#F0F5ED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Layers size={18} color="#899255" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#21372F' }}>Key Features</h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '0.75rem',
              }}
            >
              {product.features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#F7FAF5',
                    borderRadius: '12px',
                    border: '1px solid #F0F5ED',
                    fontSize: '0.92rem',
                    color: '#365648',
                    lineHeight: 1.5,
                  }}
                >
                  <Check size={16} style={{ color: '#899255', flexShrink: 0, marginTop: '2px' }} />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#F0F5ED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={18} color="#899255" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#21372F' }}>Benefits</h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
              }}
            >
              {product.benefits.map((benefit, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '1rem 1.25rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #DCE8D3',
                    boxShadow: '0 2px 8px rgba(33,55,47,0.04)',
                  }}
                >
                  <Star size={18} style={{ color: '#899255', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.95rem', color: '#365648', lineHeight: 1.5 }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#F0F5ED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Users size={18} color="#899255" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#21372F' }}>Use Cases</h3>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {product.useCases.map((useCase, i) => {
                const Icon = useCaseIcons[i % useCaseIcons.length];
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.2rem',
                      backgroundColor: '#F0F5ED',
                      borderRadius: '10px',
                      border: '1px solid #DCE8D3',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#365648',
                    }}
                  >
                    <Icon size={16} color="#899255" />
                    {useCase}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tech Stack & Integrations */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            {/* Tech Stack */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#F0F5ED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Layers size={18} color="#899255" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#21372F' }}>Tech Stack</h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.techStack.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#365648',
                      backgroundColor: '#F7FAF5',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: '1px solid #DCE8D3',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Integrations */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#F0F5ED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Puzzle size={18} color="#899255" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#21372F' }}>Integrations</h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.integrations.map((integration, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#899255',
                      backgroundColor: '#F0F5ED',
                      padding: '6px 14px',
                      borderRadius: '8px',
                    }}
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              textAlign: 'center',
              borderTop: '1px solid #DCE8D3',
              paddingTop: '2rem',
            }}
          >
            <p style={{ fontSize: '1rem', color: '#5F685F', marginBottom: '1.25rem' }}>
              Interested in {product.name}? Let's discuss how it fits your business.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => { handleClose(); onNavigate('contact'); }}
                className="btn btn-primary"
                style={{ padding: '0.8rem 2rem' }}
              >
                Request a Demo <ArrowRight size={18} />
              </button>
              <button
                onClick={handleClose}
                className="btn btn-outline"
                style={{ padding: '0.8rem 2rem' }}
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
