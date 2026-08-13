import React, { useEffect, useState } from 'react';
import type { ProductItem, PageRoute } from '../types';
import {
  X, Check, Zap, Download, ShoppingCart, Heart, BookOpen, FileText
} from 'lucide-react';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onNavigate: (page: PageRoute) => void;
  onBuyNow?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onToggleWishlist?: (product: ProductItem) => void;
  isInWishlist?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onNavigate,
  onBuyNow,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'cover' | 'description'>('cover');

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
    ? '#4ADE80'
    : product.status === 'Beta'
      ? '#FACC15'
      : '#94A3B8';

  const coverImg = product.coverImage || product.image;
  const descImg = product.descriptionImage;

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: isVisible ? 'rgba(7, 12, 23, 0.75)' : 'rgba(7, 12, 23, 0)',
        backdropFilter: isVisible ? 'blur(12px)' : 'blur(0px)',
        transition: 'all 0.35s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
    >
      {/* 2-Column Dark Reference Card Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          borderRadius: '28px',
          maxWidth: '1020px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(24px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Close Button (X) at Top Right */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(30, 41, 59, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6366F1';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.85)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={20} />
        </button>

        {/* ════════════════════════════════════════════
            LEFT COLUMN: Book Cover / Description Showcase
        ════════════════════════════════════════════ */}
        <div
          style={{
            flex: '1 1 380px',
            maxWidth: '460px',
            backgroundColor: '#070D19',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.12) 0%, #070D19 70%)',
          }}
        >
          {/* Cover / Infographic Display */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            {activeTab === 'cover' ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxHeight: '500px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#071326',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={coverImg}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display = 'none';
                    const fallbackEl = document.getElementById(`modal-left-fallback-${product.id}`);
                    if (fallbackEl) fallbackEl.style.display = 'flex';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />

                {/* Styled CSS Cover Fallback (Matching Cover Image) */}
                <div
                  id={`modal-left-fallback-${product.id}`}
                  style={{
                    display: 'none',
                    width: '100%',
                    minHeight: '420px',
                    background: 'linear-gradient(135deg, #071326 0%, #0D2240 50%, #071326 100%)',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '2rem 1.5rem',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #3776AB 0%, #FFD43B 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      color: '#071326',
                      fontSize: '1.8rem',
                      boxShadow: '0 0 25px rgba(255, 212, 59, 0.4)',
                      marginBottom: '1rem',
                    }}
                  >
                    Py
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                    PYTHON <span style={{ color: '#FFD43B' }}>FOR DATA</span>
                  </h2>
                  <p style={{ color: '#BEEA9A', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.5rem', maxWidth: '320px' }}>
                    THE COMPLETE GUIDE TO DATA ANALYSIS, MANIPULATION, AND VISUALIZATION
                  </p>
                </div>
              </div>
            ) : (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxHeight: '500px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#071326',
                }}
              >
                {descImg ? (
                  <img
                    src={descImg}
                    alt="Description Graphic"
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '500px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8' }}>
                    Full Description Graphic
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Toggle Switcher between Cover Page & Description Graphic */}
          {descImg && (
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                padding: '4px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <button
                onClick={() => setActiveTab('cover')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'cover' ? '#6366F1' : 'transparent',
                  color: activeTab === 'cover' ? '#FFFFFF' : '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <BookOpen size={14} /> Cover Page
              </button>
              <button
                onClick={() => setActiveTab('description')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'description' ? '#6366F1' : 'transparent',
                  color: activeTab === 'description' ? '#FFFFFF' : '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <FileText size={14} /> Description Graphic
              </button>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════
            RIGHT COLUMN: Book Details & Actions (Reference Style)
        ════════════════════════════════════════════ */}
        <div
          style={{
            flex: '1 1 450px',
            padding: '2.5rem 2.5rem 2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {/* Top Category Badge Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 1rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid rgba(165, 180, 252, 0.3)',
                  color: '#A5B4FC',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <BookOpen size={14} /> {product.category}
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: statusColor,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusColor }} />
                {product.status} — v{product.version}
              </span>

              {product.author && (
                <span
                  style={{
                    fontSize: '0.82rem',
                    color: '#94A3B8',
                    fontWeight: 600,
                  }}
                >
                  By <strong style={{ color: '#F8FAFC' }}>{product.author}</strong>
                </span>
              )}
            </div>

            {/* Book Title */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
              }}
            >
              {product.name}
            </h2>

            {/* Tagline */}
            <p
              style={{
                fontSize: '1.05rem',
                color: '#94A3B8',
                fontWeight: 600,
                lineHeight: 1.5,
                fontStyle: 'italic',
                marginBottom: '1.5rem',
              }}
            >
              "{product.tagline}"
            </p>

            {/* Book Detailed Description */}
            <p
              style={{
                fontSize: '1.02rem',
                color: '#CBD5E1',
                lineHeight: 1.75,
                marginBottom: '1.75rem',
              }}
            >
              {product.fullDesc}
            </p>

            {/* Key Features List */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
                What You'll Master:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }}>
                {product.features.slice(0, 4).map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      fontSize: '0.88rem',
                      color: '#E2E8F0',
                      lineHeight: 1.4,
                    }}
                  >
                    <Check size={16} style={{ color: '#4ADE80', flexShrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════
              BOTTOM PRICING & ACTIONS BAR
          ════════════════════════════════════════════ */}
          <div
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.6)',
              borderRadius: '20px',
              padding: '1.25rem 1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.2rem' }}>
                Price
              </span>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                {product.pricing}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Wishlist Button */}
              {onToggleWishlist && (
                <button
                  onClick={() => onToggleWishlist(product)}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    border: `1px solid ${isInWishlist ? '#EF4444' : 'rgba(255, 255, 255, 0.15)'}`,
                    backgroundColor: isInWishlist ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: isInWishlist ? '#EF4444' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  title="Add to Wishlist"
                >
                  <Heart size={18} fill={isInWishlist ? '#EF4444' : 'none'} />
                </button>
              )}

              {/* Add to Cart Button */}
              {onAddToCart && (
                <button
                  onClick={() => onAddToCart(product)}
                  style={{
                    padding: '0.7rem 1.1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
                >
                  <ShoppingCart size={17} /> Add to Cart
                </button>
              )}

              {/* Buy Now (€100) Button */}
              {onBuyNow && (
                <button
                  onClick={() => { handleClose(); onBuyNow(product); }}
                  style={{
                    padding: '0.7rem 1.4rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(99, 102, 241, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
                  }}
                >
                  <Zap size={17} /> Buy Now ({product.pricing})
                </button>
              )}

              {/* Direct PDF View Link */}
              {product.pdfUrl && (
                <a
                  href={product.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.7rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(74, 222, 128, 0.15)',
                    border: '1px solid rgba(74, 222, 128, 0.3)',
                    color: '#4ADE80',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Download size={16} /> PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
