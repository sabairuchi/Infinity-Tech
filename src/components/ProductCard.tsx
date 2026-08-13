import React, { useState, useRef, useEffect } from 'react';
import type { ProductItem } from '../types';
import { Check, Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  onViewDetails: (product: ProductItem) => void;
  index: number;
  onAddToCart?: (product: ProductItem) => void;
  onBuyNow?: (product: ProductItem) => void;
  onToggleWishlist?: (product: ProductItem) => void;
  isInWishlist?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  index,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const statusColor = product.status === 'Live'
    ? '#4CAF50'
    : product.status === 'Beta'
      ? '#FF9800'
      : '#9E9E9E';

  return (
    <div
      ref={cardRef}
      onClick={() => onViewDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: `1px solid ${isHovered ? '#A8C36E' : '#DCE8D3'}`,
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isVisible
          ? isHovered ? 'translateY(-8px)' : 'translateY(0)'
          : 'translateY(40px)',
        opacity: isVisible ? 1 : 0,
        boxShadow: isHovered
          ? '0 20px 50px rgba(33, 55, 47, 0.15)'
          : '0 4px 20px rgba(33, 55, 47, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Product Image */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '220px',
          backgroundColor: '#071326',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = 'none';
            const fallbackEl = document.getElementById(`card-fallback-${product.id}`);
            if (fallbackEl) fallbackEl.style.display = 'flex';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Custom Book Cover Styled Fallback */}
        <div
          id={`card-fallback-${product.id}`}
          style={{
            display: 'none',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #071326 0%, #0D2240 50%, #071326 100%)',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '1rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3776AB 0%, #FFD43B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              color: '#071326',
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
            }}
          >
            Py
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.04em' }}>
            PYTHON <span style={{ color: '#FFD43B' }}>FOR DATA</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#BEEA9A', marginTop: '0.25rem', fontWeight: 600 }}>
            DATA ANALYSIS & VISUALIZATION
          </div>
        </div>

        {/* Status Badge */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(6px)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: statusColor,
            letterSpacing: '0.02em',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: statusColor,
              animation: product.status === 'Live' ? 'pulseSubtle 2s ease-in-out infinite' : 'none',
            }}
          />
          {product.status}
        </div>

        {/* Action overlay buttons: Cart icon BEFORE Like / Wishlist icon */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 5,
          }}
        >
          {onAddToCart && (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
              aria-label="Add to Cart"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(4px)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#21372F',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              title="Add to Cart"
            >
              <ShoppingCart size={17} />
            </button>
          )}

          {onToggleWishlist && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
              aria-label="Toggle Wishlist"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(4px)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isInWishlist ? '#E53935' : '#21372F',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              title="Wishlist / Like"
            >
              <Heart size={18} fill={isInWishlist ? '#E53935' : 'none'} />
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: '1.5rem 1.5rem 0.85rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#21372F',
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h3>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#899255',
              backgroundColor: '#F0F5ED',
              padding: '4px 10px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            v{product.version}
          </span>
        </div>

        <p
          style={{
            fontSize: '0.9rem',
            color: '#899255',
            fontWeight: 600,
            fontStyle: 'italic',
            marginBottom: '0.75rem',
          }}
        >
          {product.tagline}
        </p>

        <p
          style={{
            fontSize: '0.95rem',
            color: '#5F685F',
            lineHeight: 1.65,
            marginBottom: '1.25rem',
            flex: 1,
          }}
        >
          {product.shortDesc}
        </p>

        {/* Key Benefits Preview */}
        <div style={{ marginBottom: '1.25rem' }}>
          {product.benefits.slice(0, 2).map((benefit, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                fontSize: '0.88rem',
                color: '#365648',
              }}
            >
              <Check
                size={16}
                style={{
                  color: '#899255',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Preview */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '0.85rem',
          }}
        >
          {product.techStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#5F685F',
                backgroundColor: '#F7FAF5',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid #DCE8D3',
              }}
            >
              {tech}
            </span>
          ))}
          {product.techStack.length > 4 && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#899255',
                backgroundColor: '#F0F5ED',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              +{product.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Centered Olive Green Price */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid #F0F5ED',
            paddingTop: '0.85rem',
            paddingBottom: '0.2rem',
          }}
        >
          <span
            style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#899255',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            {product.pricing}
          </span>
        </div>
      </div>
    </div>
  );
};
