import React, { useEffect, useState } from 'react';
import type { ProductItem, PageRoute } from '../types';
import {
  X, Check, Zap, Download, ShoppingCart, Heart, BookOpen, Target, Users, Code, Star
} from 'lucide-react';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onNavigate?: (page: PageRoute) => void;
  onBuyNow?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onToggleWishlist?: (product: ProductItem) => void;
  isInWishlist?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onBuyNow,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) => {
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

  const coverImg = product.coverImage || product.image;

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: isVisible ? 'rgba(7, 12, 23, 0.8)' : 'rgba(7, 12, 23, 0)',
        backdropFilter: isVisible ? 'blur(12px)' : 'blur(0px)',
        transition: 'all 0.35s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {/* Custom Scrollbar Global Style for the Right Scrollable Column */}
      <style>{`
        .custom-modal-scroller::-webkit-scrollbar {
          width: 8px;
        }
        .custom-modal-scroller::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 9999px;
        }
        .custom-modal-scroller::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 9999px;
        }
        .custom-modal-scroller::-webkit-scrollbar-thumb:hover {
          background: #6366F1;
        }
      `}</style>

      {/* 2-Column Dark Reference Card Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          borderRadius: '28px',
          maxWidth: '1060px',
          width: '100%',
          maxHeight: '92vh',
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(24px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.12)',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
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
            zIndex: 30,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6366F1';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.9)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={20} />
        </button>

        {/* ════════════════════════════════════════════
            LEFT COLUMN: Book Cover Display
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
            background: 'radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.15) 0%, #070D19 75%)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '520px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.18)',
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
                  maxHeight: '520px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />

              {/* Styled CSS Cover Fallback */}
              <div
                id={`modal-left-fallback-${product.id}`}
                style={{
                  display: 'none',
                  width: '100%',
                  minHeight: '440px',
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
                <p style={{ color: '#BEEA9A', fontSize: '0.85rem', fontWeight 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.5rem', maxWidth: '320px' }}>
                  THE COMPLETE GUIDE TO DATA ANALYSIS, MANIPULATION, AND VISUALIZATION
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            RIGHT COLUMN: Scrollable Book Details & Reference Buttons
        ════════════════════════════════════════════ */}
        <div
          className="custom-modal-scroller"
          style={{
            flex: '1 1 480px',
            padding: '2.5rem 2.5rem 2rem 2.2rem',
            maxHeight: '92vh',
            overflowY: 'auto',
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

              {product.author && (
                <span
                  style={{
                    fontSize: '0.84rem',
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
                marginBottom: '0.65rem',
              }}
            >
              {product.name}
            </h2>

            {/* Subtitle / Tagline */}
            <p
              style={{
                fontSize: '1.05rem',
                color: '#94A3B8',
                fontWeight: 600,
                lineHeight: 1.5,
                marginBottom: '1.5rem',
              }}
            >
              {product.tagline}
            </p>

            {/* Detailed Description Paragraphs */}
            <div style={{ fontSize: '1.02rem', color: '#CBD5E1', lineHeight: 1.75, marginBottom: '2rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#F8FAFC' }}>{product.name}</strong> is your all-in-one guide to harnessing the power of Python for data analysis, manipulation, and visualization.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Whether you're a beginner looking to build a strong foundation or an experienced developer wanting to sharpen your data skills, this book takes you step-by-step through the tools, techniques, and real-world workflows used by data professionals.
              </p>
              <p>
                From working with data using pandas to creating insightful visualizations with matplotlib, this book blends clear explanations with practical examples to help you turn raw data into meaningful insights.
              </p>
            </div>

            {/* WHAT YOU'LL LEARN SECTION */}
            {product.whatYoullLearn && product.whatYoullLearn.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: '#6366F1',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <Target size={18} color="#6366F1" /> WHAT YOU'LL LEARN
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {product.whatYoullLearn.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        fontSize: '0.92rem',
                        color: '#E2E8F0',
                        lineHeight: 1.45,
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <Check size={16} style={{ color: '#38BDF8', flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WHO THIS BOOK IS FOR SECTION */}
            {product.whoThisBookIsFor && product.whoThisBookIsFor.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: '#38BDF8',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <Users size={18} color="#38BDF8" /> WHO THIS BOOK IS FOR
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {product.whoThisBookIsFor.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        fontSize: '0.92rem',
                        color: '#E2E8F0',
                        lineHeight: 1.45,
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <Check size={16} style={{ color: '#6366F1', flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WHY PYTHON? SECTION */}
            {product.whyPython && (
              <div
                style={{
                  backgroundColor: 'rgba(99, 102, 241, 0.08)',
                  borderRadius: '14px',
                  padding: '1.2rem 1.4rem',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  marginBottom: '2rem',
                }}
              >
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#A5B4FC', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  <Code size={18} /> WHY PYTHON?
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.65 }}>
                  {product.whyPython}
                </p>
              </div>
            )}

            {/* CLOSING BANNER */}
            <div
              style={{
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                borderRadius: '14px',
                padding: '1.25rem 1.4rem',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                marginBottom: '2rem',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#38BDF8', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                <Star size={18} fill="#38BDF8" /> TURN DATA INTO INSIGHT. INSIGHT INTO IMPACT.
              </div>
              <p style={{ fontSize: '0.92rem', color: '#94A3B8', fontStyle: 'italic' }}>
                Let Python be your partner in the journey from data to decisions.
              </p>
            </div>

            {/* METADATA INFO LIST */}
            <div style={{ marginBottom: '2rem', fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.8 }}>
              <p>
                <strong style={{ color: '#F8FAFC' }}>Category:</strong> {product.category}
              </p>
              <p>
                <strong style={{ color: '#F8FAFC' }}>Format:</strong> {product.format || 'Digital Download (PDF - 28 Pages)'}
              </p>
              <p>
                <strong style={{ color: '#F8FAFC' }}>Ideal For:</strong> {product.idealFor || 'Students, educators, science lovers, developers, and lifelong learners.'}
              </p>
            </div>
          </div>

          {/* ════════════════════════════════════════════
              BOTTOM BUTTONS SECTION
          ════════════════════════════════════════════ */}
          <div
            style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {/* Top Row: Pricing Box (€100) + Buy Now Button */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div
                style={{
                  backgroundColor: '#1E2430',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  padding: '0.85rem 1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38BDF8', lineHeight: 1 }}>
                  {product.pricing}
                </span>
              </div>

              {onBuyNow && (
                <button
                  onClick={() => { handleClose(); onBuyNow(product); }}
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.8rem',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)',
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 24px rgba(56, 189, 248, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(56, 189, 248, 0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(56, 189, 248, 0.35)';
                  }}
                >
                  <Zap size={18} /> Buy Now
                </button>
              )}
            </div>

            {/* Bottom Row: Add to Cart Button + Wishlist / Like Button */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {onAddToCart && (
                <button
                  onClick={() => onAddToCart(product)}
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.4rem',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: '#1E2430',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2A3344')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1E2430')}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              )}

              {onToggleWishlist && (
                <button
                  onClick={() => onToggleWishlist(product)}
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.4rem',
                    borderRadius: '14px',
                    border: `1px solid ${isInWishlist ? '#EF4444' : 'rgba(255, 255, 255, 0.15)'}`,
                    backgroundColor: isInWishlist ? 'rgba(239, 68, 68, 0.15)' : '#1E2430',
                    color: isInWishlist ? '#EF4444' : '#FFFFFF',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isInWishlist) e.currentTarget.style.backgroundColor = '#2A3344';
                  }}
                  onMouseLeave={(e) => {
                    if (!isInWishlist) e.currentTarget.style.backgroundColor = '#1E2430';
                  }}
                >
                  <Heart size={18} fill={isInWishlist ? '#EF4444' : 'none'} /> {isInWishlist ? 'Liked' : 'Like'}
                </button>
              )}

              {product.pdfUrl && (
                <a
                  href={product.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.85rem 1.2rem',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(74, 222, 128, 0.15)',
                    border: '1px solid rgba(74, 222, 128, 0.3)',
                    color: '#4ADE80',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
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
