import React, { useEffect, useState } from 'react';
import type { ProductItem, PageRoute } from '../types';
import {
  X, Check, ArrowRight, Layers, Zap, Globe, Users,
  Shield, BarChart3, Puzzle, Star, Download, ShoppingCart, Heart, BookOpen, FileText
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
  const [activeTab, setActiveTab] = useState<'details' | 'cover' | 'description'>('details');

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
  const coverImg = product.coverImage || product.image;
  const descImg = product.descriptionImage;

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
          maxWidth: '920px',
          width: '100%',
          maxHeight: '92vh',
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
            src={coverImg}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80';
            }}
            style={{
              width: '100%',
              height: '300px',
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
              background: 'linear-gradient(to top, rgba(33,55,47,0.9), transparent)',
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
              {product.author && (
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(137,146,85,0.4)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  By {product.author}
                </span>
              )}
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
          
          {/* Cover & Description Page View Selector */}
          {(coverImg || descImg) && (
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '1.75rem',
                borderBottom: '1px solid #DCE8D3',
                paddingBottom: '0.75rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => setActiveTab('details')}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'details' ? '#899255' : '#F0F5ED',
                  color: activeTab === 'details' ? '#FFFFFF' : '#365648',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <FileText size={16} /> Overview Details
              </button>
              {coverImg && (
                <button
                  onClick={() => setActiveTab('cover')}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: activeTab === 'cover' ? '#899255' : '#F0F5ED',
                    color: activeTab === 'cover' ? '#FFFFFF' : '#365648',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <BookOpen size={16} /> Cover Page
                </button>
              )}
              {descImg && (
                <button
                  onClick={() => setActiveTab('description')}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: activeTab === 'description' ? '#899255' : '#F0F5ED',
                    color: activeTab === 'description' ? '#FFFFFF' : '#365648',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <FileText size={16} /> Description Page
                </button>
              )}
            </div>
          )}

          {/* Cover Page Tab View */}
          {activeTab === 'cover' && coverImg && (
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#21372F', marginBottom: '1rem' }}>
                Book Cover Page
              </h3>
              <img
                src={coverImg}
                alt="Book Cover Page"
                style={{
                  maxWidth: '100%',
                  maxHeight: '650px',
                  borderRadius: '16px',
                  boxShadow: '0 12px 35px rgba(33,55,47,0.18)',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}

          {/* Description Page Tab View */}
          {activeTab === 'description' && descImg && (
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#21372F', marginBottom: '1rem' }}>
                Full Product Description Graphic
              </h3>
              <img
                src={descImg}
                alt="Full Description Graphic"
                style={{
                  maxWidth: '100%',
                  maxHeight: '850px',
                  borderRadius: '16px',
                  boxShadow: '0 12px 35px rgba(33,55,47,0.18)',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}

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

          {/* Both Images Side by Side Preview for eBooks */}
          {product.isEBook && coverImg && descImg && activeTab === 'details' && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#21372F', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={18} color="#899255" /> Book Preview & Infographic
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                <div
                  onClick={() => setActiveTab('cover')}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #DCE8D3',
                    backgroundColor: '#F7FAF5',
                    padding: '0.75rem',
                    textAlign: 'center',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <img
                    src={coverImg}
                    alt="Cover Preview"
                    style={{ width: '100%', height: '320px', objectFit: 'contain', borderRadius: '10px' }}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#899255', marginTop: '0.5rem', display: 'block' }}>
                    Click to Enlarge Cover Page
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('description')}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #DCE8D3',
                    backgroundColor: '#F7FAF5',
                    padding: '0.75rem',
                    textAlign: 'center',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <img
                    src={descImg}
                    alt="Description Graphic Preview"
                    style={{ width: '100%', height: '320px', objectFit: 'contain', borderRadius: '10px' }}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#899255', marginTop: '0.5rem', display: 'block' }}>
                    Click to Enlarge Description Page
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Pricing CTA Bar with Cart, Wishlist, Buy Now */}
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
                Pricing
              </span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#21372F' }}>
                {product.pricing}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Wishlist Button */}
              {onToggleWishlist && (
                <button
                  onClick={() => onToggleWishlist(product)}
                  style={{
                    padding: '0.75rem 1.1rem',
                    borderRadius: '12px',
                    border: `1px solid ${isInWishlist ? '#E53935' : '#DCE8D3'}`,
                    backgroundColor: '#FFFFFF',
                    color: isInWishlist ? '#E53935' : '#21372F',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                  }}
                  title="Toggle Wishlist"
                >
                  <Heart size={18} fill={isInWishlist ? '#E53935' : 'none'} />
                  {isInWishlist ? 'Wishlisted' : 'Wishlist'}
                </button>
              )}

              {/* Cart Button */}
              {onAddToCart && (
                <button
                  onClick={() => onAddToCart(product)}
                  className="btn btn-outline"
                  style={{
                    padding: '0.75rem 1.3rem',
                    fontSize: '0.95rem',
                    borderRadius: '12px',
                    gap: '0.4rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              )}

              {/* Buy Now Button */}
              {onBuyNow && (
                <button
                  onClick={() => { handleClose(); onBuyNow(product); }}
                  className="btn btn-primary"
                  style={{
                    padding: '0.75rem 1.6rem',
                    fontSize: '0.95rem',
                    backgroundColor: '#899255',
                    borderRadius: '12px',
                    gap: '0.4rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <Zap size={18} /> Buy Now ({product.pricing})
                </button>
              )}

              {/* PDF Direct View/Download Button */}
              {product.pdfUrl && (
                <a
                  href={product.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.75rem 1.2rem',
                    borderRadius: '12px',
                    backgroundColor: '#21372F',
                    color: '#BEEA9A',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Download size={18} /> View PDF
                </a>
              )}
            </div>
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
              {product.isEBook ? (
                <button
                  onClick={() => { handleClose(); if (onBuyNow) onBuyNow(product); }}
                  className="btn btn-primary"
                  style={{ padding: '0.8rem 2rem' }}
                >
                  Download eBook PDF <Download size={18} />
                </button>
              ) : (
                <button
                  onClick={() => { handleClose(); onNavigate('contact'); }}
                  className="btn btn-primary"
                  style={{ padding: '0.8rem 2rem' }}
                >
                  Get Started <ArrowRight size={18} />
                </button>
              )}
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
