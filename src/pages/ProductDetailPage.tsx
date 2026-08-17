import React, { useEffect, useState } from 'react';
import type { PageRoute, ProductItem } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CTASection } from '../components/CTASection';
import {
  ArrowLeft, Check, Zap, ShoppingCart, Heart, BookOpen, Target, Users, Code, Star,
  Shield, Download, Sparkles, ArrowRight
} from 'lucide-react';

interface ProductDetailPageProps {
  product: ProductItem | null;
  onNavigate: (page: PageRoute, targetId?: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onBuyNow?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onToggleWishlist?: (product: ProductItem) => void;
  isInWishlist?: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigate,
  onSelectProduct,
  onBuyNow,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(product);

  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  // Fallback to first product if none specified
  const currentProduct = selectedProduct || PRODUCTS_DATA[0];
  const coverImg = currentProduct.coverImage || currentProduct.image;

  // Filter out current product for related products section
  const relatedProducts = PRODUCTS_DATA.filter((p) => p.id !== currentProduct.id).slice(0, 3);

  const statusColor = currentProduct.status === 'Live'
    ? '#4CAF50'
    : currentProduct.status === 'Beta'
      ? '#FF9800'
      : '#9E9E9E';

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      
      {/* ════════════════════════════════════════════
          BREADCRUMB / BACK BAR
      ════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: '#1B2E27',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '1.2rem 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            onClick={() => onNavigate('products')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#DCE8D3',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '0.55rem 1.25rem',
              borderRadius: '10px',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#899255';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#899255';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#DCE8D3';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <ArrowLeft size={18} /> Back to Products
          </button>

          {/* Breadcrumb Path */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#94A3B8' }}>
            <span
              onClick={() => onNavigate('home')}
              style={{ cursor: 'pointer', color: '#DCE8D3', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#BEEA9A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#DCE8D3')}
            >
              Home
            </span>
            <span>/</span>
            <span
              onClick={() => onNavigate('products')}
              style={{ cursor: 'pointer', color: '#DCE8D3', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#BEEA9A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#DCE8D3')}
            >
              Products
            </span>
            <span>/</span>
            <span style={{ color: '#BEEA9A', fontWeight: 600 }}>{currentProduct.name}</span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          PRODUCT HERO / MAIN SECTION
      ════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: '#21372F',
          color: '#FFFFFF',
          padding: 'clamp(3rem, 6vw, 5rem) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Gradients */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,195,110,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)',
              alignItems: 'start',
            }}
          >
            {/* ───── LEFT COLUMN: Product Cover Display ───── */}
            <div>
              <div
                style={{
                  backgroundColor: '#070D19',
                  borderRadius: '24px',
                  padding: '2.5rem 2rem',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 195, 110, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Status Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(6px)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: statusColor,
                    zIndex: 5,
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: statusColor,
                    }}
                  />
                  {currentProduct.status}
                </div>

                <div
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#071326',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                    marginBottom: '1.5rem',
                  }}
                >
                  <img
                    src={coverImg}
                    alt={currentProduct.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedAlt && currentProduct.id === 'mastering-react') {
                        target.dataset.triedAlt = 'true';
                        target.src = '/assets/react cover page.png';
                      } else {
                        target.style.display = 'none';
                        const fallbackEl = document.getElementById(`detail-left-fallback-${currentProduct.id}`);
                        if (fallbackEl) fallbackEl.style.display = 'flex';
                      }
                    }}
                    style={{
                      width: '100%',
                      maxHeight: '480px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />

                  {/* Styled CSS Cover Fallback */}
                  <div
                    id={`detail-left-fallback-${currentProduct.id}`}
                    style={{
                      display: 'none',
                      width: '100%',
                      minHeight: '400px',
                      background: currentProduct.id === 'advanced-ux-design'
                        ? 'linear-gradient(135deg, #0B192C 0%, #1E3E62 50%, #000000 100%)'
                        : currentProduct.id === 'mastering-react'
                          ? 'linear-gradient(135deg, #0A192F 0%, #112240 50%, #020C1B 100%)'
                          : 'linear-gradient(135deg, #071326 0%, #0D2240 50%, #071326 100%)',
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
                        background: currentProduct.id === 'advanced-ux-design'
                          ? 'linear-gradient(135deg, #FF5722 0%, #FF9800 100%)'
                          : currentProduct.id === 'mastering-react'
                            ? 'linear-gradient(135deg, #61DAFB 0%, #007ACC 100%)'
                            : 'linear-gradient(135deg, #3776AB 0%, #FFD43B 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        fontSize: '2rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {currentProduct.id === 'advanced-ux-design' ? 'UX' : currentProduct.id === 'mastering-react' ? '⚛' : 'Py'}
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                      {currentProduct.id === 'advanced-ux-design' ? (
                        <>ADVANCED <span style={{ color: '#FF7043' }}>UX DESIGN</span></>
                      ) : currentProduct.id === 'mastering-react' ? (
                        <>MASTERING <span style={{ color: '#61DAFB' }}>REACT</span></>
                      ) : (
                        <>PYTHON <span style={{ color: '#FFD43B' }}>FOR DATA</span></>
                      )}
                    </h2>
                    <p style={{ color: '#BEEA9A', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.5rem' }}>
                      {currentProduct.tagline}
                    </p>
                  </div>
                </div>

                {/* Quick Info Badges */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 0.85rem', borderRadius: '10px', fontSize: '0.82rem', color: '#DCE8D3', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Download size={14} color="#BEEA9A" /> Digital Download
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 0.85rem', borderRadius: '10px', fontSize: '0.82rem', color: '#DCE8D3', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Shield size={14} color="#BEEA9A" /> Lifetime Access
                  </div>
                </div>
              </div>
            </div>

            {/* ───── RIGHT COLUMN: Product Meta & Purchase Box ───── */}
            <div>
              {/* Category Pill & Version */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 1.1rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(190, 234, 154, 0.15)',
                    border: '1px solid rgba(190, 234, 154, 0.3)',
                    color: '#BEEA9A',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  <BookOpen size={14} /> {currentProduct.category}
                </span>

                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#DCE8D3',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  v{currentProduct.version}
                </span>
              </div>

              {/* Title & Tagline */}
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.75rem',
                }}
              >
                {currentProduct.name}
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                  color: '#BEEA9A',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  marginBottom: '1.75rem',
                }}
              >
                {currentProduct.tagline}
              </p>

              {/* Price & Primary Call to Action Box */}
              <div
                style={{
                  backgroundColor: 'rgba(7, 13, 25, 0.65)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '1.75rem',
                  border: '1px solid rgba(190, 234, 154, 0.25)',
                  marginBottom: '2rem',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#BEEA9A', lineHeight: 1 }}>
                    {currentProduct.pricing}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#DCE8D3', fontWeight: 500 }}>
                    One-time payment • Instant Download
                  </span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {onBuyNow && (
                    <button
                      onClick={() => onBuyNow(currentProduct)}
                      style={{
                        flex: '1 1 200px',
                        padding: '1rem 1.8rem',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: '#899255',
                        color: '#FFFFFF',
                        fontSize: '1.05rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.6rem',
                        boxShadow: '0 8px 24px rgba(137,146,85,0.4)',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#A8C36E';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#899255';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Zap size={20} /> Buy Now
                    </button>
                  )}

                  {onAddToCart && (
                    <button
                      onClick={() => onAddToCart(currentProduct)}
                      style={{
                        flex: '1 1 180px',
                        padding: '1rem 1.5rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                  )}

                  {onToggleWishlist && (
                    <button
                      onClick={() => onToggleWishlist(currentProduct)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '12px',
                        border: `1px solid ${isInWishlist ? '#EF4444' : 'rgba(255, 255, 255, 0.2)'}`,
                        backgroundColor: isInWishlist ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        color: isInWishlist ? '#EF4444' : '#FFFFFF',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease',
                      }}
                      title="Toggle Wishlist"
                    >
                      <Heart size={20} fill={isInWishlist ? '#EF4444' : 'none'} />
                    </button>
                  )}
                </div>
              </div>

              {/* Tech Stack Preview Badges */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#DCE8D3', fontWeight: 600, display: 'block', marginBottom: '0.6rem' }}>
                  KEY TECHNOLOGIES & COVERAGE:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {currentProduct.techStack.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#BEEA9A',
                        backgroundColor: 'rgba(190, 234, 154, 0.1)',
                        border: '1px solid rgba(190, 234, 154, 0.2)',
                        padding: '4px 12px',
                        borderRadius: '6px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PRODUCT DETAILS & SPECIFICATIONS
      ════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          {/* Detailed Description */}
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="badge-pill" style={{ marginBottom: '1rem' }}>
              <span className="dot" /> OVERVIEW
            </span>
            <h2 className="heading-md" style={{ color: '#21372F', marginBottom: '1.5rem' }}>
              About <span style={{ color: '#899255' }}>{currentProduct.name}</span>
            </h2>

            <div style={{ fontSize: '1.1rem', color: '#5F685F', lineHeight: 1.8 }}>
              {currentProduct.fullDesc.split('\n\n').map((paragraph, idx) => (
                <p key={idx} style={{ marginBottom: '1.25rem' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* WHAT YOU'LL LEARN SECTION */}
          {currentProduct.whatYoullLearn && currentProduct.whatYoullLearn.length > 0 && (
            <div
              style={{
                backgroundColor: '#F7FAF5',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid #DCE8D3',
                marginBottom: '3rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#21372F',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '1.5rem',
                }}
              >
                <Target size={24} color="#899255" /> What You'll Learn & Master
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {currentProduct.whatYoullLearn.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      backgroundColor: '#FFFFFF',
                      padding: '1rem 1.25rem',
                      borderRadius: '14px',
                      border: '1px solid #DCE8D3',
                      fontSize: '0.98rem',
                      color: '#21372F',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      boxShadow: '0 2px 8px rgba(33, 55, 47, 0.04)',
                    }}
                  >
                    <Check size={18} style={{ color: '#899255', flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WHO THIS BOOK IS FOR SECTION */}
          {currentProduct.whoThisBookIsFor && currentProduct.whoThisBookIsFor.length > 0 && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid #DCE8D3',
                marginBottom: '3rem',
                boxShadow: '0 4px 20px rgba(33, 55, 47, 0.06)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#21372F',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '1.5rem',
                }}
              >
                <Users size={24} color="#899255" /> Who This Product Is Designed For
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {currentProduct.whoThisBookIsFor.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      backgroundColor: '#F7FAF5',
                      padding: '1rem 1.25rem',
                      borderRadius: '14px',
                      border: '1px solid #DCE8D3',
                      fontSize: '0.98rem',
                      color: '#21372F',
                      fontWeight: 600,
                      lineHeight: 1.5,
                    }}
                  >
                    <Sparkles size={18} style={{ color: '#899255', flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WHY THIS PRODUCT BANNER */}
          {currentProduct.whyPython && (
            <div
              style={{
                backgroundColor: '#21372F',
                color: '#FFFFFF',
                borderRadius: '24px',
                padding: '2.5rem',
                marginBottom: '3rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#BEEA9A', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Code size={22} /> {currentProduct.id === 'python-for-data' ? 'Why Python for Data?' : 'Why Choose This Product?'}
              </h4>
              <p style={{ fontSize: '1.05rem', color: '#DCE8D3', lineHeight: 1.75 }}>
                {currentProduct.whyPython}
              </p>
            </div>
          )}

          {/* CLOSING BANNER / QUOTE */}
          <div
            style={{
              backgroundColor: '#F0F5ED',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid #A8C36E',
              textAlign: 'center',
              marginBottom: '3.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#899255', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              <Star size={20} fill="#899255" /> {currentProduct.id === 'mastering-react' ? 'BUILD BETTER. SHIP FASTER.' : currentProduct.id === 'advanced-ux-design' ? 'GREAT DESIGN IS HOW IT WORKS.' : 'TURN DATA INTO INSIGHT. INSIGHT INTO IMPACT.'}
            </div>
            <p style={{ fontSize: '1.05rem', color: '#5F685F', fontStyle: 'italic', fontWeight: 500 }}>
              {currentProduct.closingQuote || 'Elevate your software capabilities with production-ready tools and guides from Digiro.'}
            </p>
          </div>

          {/* SPECIFICATIONS & METADATA GRID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              backgroundColor: '#F7FAF5',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid #DCE8D3',
            }}
          >
            <div>
              <span style={{ fontSize: '0.82rem', color: '#899255', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>
                Category
              </span>
              <span style={{ fontSize: '1.05rem', color: '#21372F', fontWeight: 800 }}>
                {currentProduct.category}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.82rem', color: '#899255', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>
                Format
              </span>
              <span style={{ fontSize: '1.05rem', color: '#21372F', fontWeight: 800 }}>
                {currentProduct.format || 'Digital Download (PDF / Package)'}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.82rem', color: '#899255', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>
                Ideal For
              </span>
              <span style={{ fontSize: '1.05rem', color: '#21372F', fontWeight: 800 }}>
                {currentProduct.idealFor || 'Developers, Designers & Enterprises'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════
          RELATED PRODUCTS RECOMMENDATION SECTION
      ════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: '#F7FAF5',
          padding: 'clamp(4rem, 7vw, 6rem) 0',
          borderTop: '1px solid #DCE8D3',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem auto' }}>
            <span className="badge-pill" style={{ marginBottom: '0.75rem' }}>
              <span className="dot" /> EXPLORE MORE
            </span>
            <h2 className="heading-md" style={{ color: '#21372F', marginBottom: '0.75rem' }}>
              Related <span style={{ color: '#899255' }}>Products</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#5F685F' }}>
              Discover other high-impact digital guides and tools built to scale your skills.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {relatedProducts.map((p, index) => (
              <ProductCard
                key={p.id}
                product={p}
                onViewDetails={(item) => {
                  onSelectProduct(item);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                index={index}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={false}
              />
            ))}
          </div>

          {/* View All Products Button */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => onNavigate('products')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#21372F',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 16px rgba(33, 55, 47, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#899255';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#21372F';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View Catalog <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA SECTION
      ════════════════════════════════════════════ */}
      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
