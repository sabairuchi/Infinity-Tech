import React, { useState, useRef, useEffect } from 'react';
import type { PageRoute, ProductItem } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CTASection } from '../components/CTASection';
import {
  ArrowRight, Package, Shield, Zap,
  BarChart3, Globe, Users, Layers, Star
} from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenProductModal: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onBuyNow?: (product: ProductItem) => void;
  onToggleWishlist?: (product: ProductItem) => void;
  wishlistIds?: string[];
}

/* ───── Scroll reveal hook ───── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ───── Why Choose Our Products section data ───── */
const WHY_CHOOSE = [
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 compliant infrastructure with end-to-end encryption, role-based access, and comprehensive audit trails.' },
  { icon: Zap, title: 'Lightning Performance', desc: 'Sub-second response times across all products, built on edge-deployed infrastructure for global speed.' },
  { icon: BarChart3, title: 'Actionable Analytics', desc: 'Every product includes built-in analytics dashboards so you can measure impact from day one.' },
  { icon: Globe, title: 'Global Scale', desc: 'Multi-region deployments with 99.99% uptime SLA, supporting teams and customers worldwide.' },
  { icon: Users, title: 'Dedicated Support', desc: 'Priority onboarding, dedicated account managers, and 24/7 technical support for enterprise plans.' },
  { icon: Layers, title: 'Seamless Integrations', desc: 'Connect with 200+ tools you already use through our pre-built connectors and open API.' },
];

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onNavigate,
  onOpenProductModal,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const hero = useScrollReveal();
  const grid = useScrollReveal();
  const whyChoose = useScrollReveal();
  const stats = useScrollReveal();


  return (
    <div style={{ paddingTop: '80px' }}>

      {/* ════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════ */}
      <section
        ref={hero.ref}
        style={{
          backgroundColor: '#21372F',
          padding: 'clamp(4rem, 8vw, 6.5rem) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(190,234,154,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }}
        />

        {/* Decorative gradient blob */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,195,110,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-25%',
            left: '-8%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(190,234,154,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '820px',
            opacity: hero.visible ? 1 : 0,
            transform: hero.visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(190,234,154,0.15)',
              border: '1px solid rgba(190,234,154,0.25)',
              color: '#BEEA9A',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            <Package size={16} /> Our Products
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            Software That Drives{' '}
            <span style={{ color: '#BEEA9A' }}>Results</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#DCE8D3',
              lineHeight: 1.65,
              marginBottom: '2.5rem',
            }}
          >
            From analytics platforms to AI automation tools — discover our suite of
            production-grade software products built for modern businesses that demand
            reliability, speed, and scale.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const el = document.getElementById('products-grid');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn"
              style={{
                padding: '0.95rem 2rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                backgroundColor: '#899255',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 8px 24px rgba(137,146,85,0.35)',
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
              Explore Products <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════ */}
      <section
        ref={stats.ref}
        style={{
          backgroundColor: '#FFFFFF',
          padding: '2.5rem 0',
          borderBottom: '1px solid #DCE8D3',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            opacity: stats.visible ? 1 : 0,
            transform: stats.visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {[
            { icon: Package, value: '8+', label: 'Products' },
            { icon: Users, value: '10K+', label: 'Active Users' },
            { icon: Globe, value: '25+', label: 'Countries' },
            { icon: Star, value: '99.9%', label: 'Uptime SLA' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1.5rem',
              }}
            >
              <stat.icon size={22} color="#899255" />
              <div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#21372F', display: 'block', lineHeight: 1.2 }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: '0.82rem', color: '#5F685F', fontWeight: 500 }}>
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════
          ALL PRODUCTS GRID
      ════════════════════════════════════════════ */}
      <section
        id="products-grid"
        ref={grid.ref}
        style={{
          backgroundColor: '#FFFFFF',
          padding: 'clamp(4rem, 7vw, 6rem) 0',
        }}
      >
        <div className="container">




          {/* Product Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem',
            }}
          >
            {PRODUCTS_DATA.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onOpenProductModal}
                index={i}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WHY CHOOSE OUR PRODUCTS
      ════════════════════════════════════════════ */}
      <section
        ref={whyChoose.ref}
        style={{
          backgroundColor: '#F7FAF5',
          padding: 'clamp(4rem, 7vw, 6rem) 0',
          borderTop: '1px solid #DCE8D3',
        }}
      >
        <div className="container">
          <div
            style={{
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: '3.5rem',
              opacity: whyChoose.visible ? 1 : 0,
              transform: whyChoose.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span className="badge-pill" style={{ marginBottom: '1rem' }}>
              <span className="dot" /> WHY DIGIRO
            </span>
            <h2 className="heading-md" style={{ color: '#21372F', marginBottom: '1rem' }}>
              Built for <span style={{ color: '#899255' }}>Modern Businesses</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#5F685F', lineHeight: 1.6 }}>
              Every product is crafted with the same commitment to quality, performance, and security
              that our enterprise clients expect.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {WHY_CHOOSE.map((item, i) => (
              <WhyChooseCard key={i} item={item} index={i} parentVisible={whyChoose.visible} />
            ))}
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



/* ───────────────────────────────────────────────
   Why Choose Card
   ─────────────────────────────────────────────── */
interface WhyChooseCardProps {
  item: { icon: React.FC<any>; title: string; desc: string };
  index: number;
  parentVisible: boolean;
}

const WhyChooseCard: React.FC<WhyChooseCardProps> = ({ item, index, parentVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        padding: '2rem',
        border: `1px solid ${isHovered ? '#A8C36E' : '#DCE8D3'}`,
        boxShadow: isHovered
          ? '0 12px 35px rgba(33,55,47,0.1)'
          : '0 2px 10px rgba(33,55,47,0.04)',
        transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
        transform: parentVisible
          ? isHovered ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(30px)',
        opacity: parentVisible ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          backgroundColor: isHovered ? '#899255' : '#F0F5ED',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          transition: 'all 0.3s ease',
        }}
      >
        <item.icon size={24} color={isHovered ? '#FFFFFF' : '#899255'} />
      </div>

      <h4
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#21372F',
          marginBottom: '0.75rem',
        }}
      >
        {item.title}
      </h4>

      <p
        style={{
          fontSize: '0.95rem',
          color: '#5F685F',
          lineHeight: 1.6,
        }}
      >
        {item.desc}
      </p>
    </div>
  );
};
