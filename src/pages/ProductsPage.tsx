import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { PageRoute, ProductItem } from '../types';
import { PRODUCTS_DATA, PRODUCT_CATEGORIES, FEATURED_PRODUCT_IDS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductFilter } from '../components/ProductFilter';
import { CTASection } from '../components/CTASection';
import {
  ArrowRight, Package, Shield, Zap,
  BarChart3, Globe, Users, Layers, Star,
  CheckCircle2
} from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenProductModal: (product: ProductItem) => void;
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

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate, onOpenProductModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const hero = useScrollReveal();
  const featured = useScrollReveal();
  const grid = useScrollReveal();
  const whyChoose = useScrollReveal();
  const stats = useScrollReveal();

  /* ───── Filtering ───── */
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PRODUCTS_DATA.length };
    PRODUCTS_DATA.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  /* ───── Featured products ───── */
  const featuredProducts = useMemo(
    () => PRODUCTS_DATA.filter((p) => FEATURED_PRODUCT_IDS.includes(p.id)),
    [],
  );

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
                if (el) el.scrollIntoView({ behavior: 'smooth' });
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
            <button
              onClick={() => onNavigate('contact')}
              className="btn"
              style={{
                padding: '0.95rem 2rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#BEEA9A';
                e.currentTarget.style.color = '#BEEA9A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              Request a Demo
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
          FEATURED PRODUCTS
      ════════════════════════════════════════════ */}
      <section
        ref={featured.ref}
        style={{
          backgroundColor: '#F7FAF5',
          padding: 'clamp(4rem, 7vw, 6rem) 0',
          borderBottom: '1px solid #DCE8D3',
        }}
      >
        <div className="container">
          <div
            style={{
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: '3rem',
              opacity: featured.visible ? 1 : 0,
              transform: featured.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span className="badge-pill" style={{ marginBottom: '1rem' }}>
              <span className="dot" /> FEATURED
            </span>
            <h2 className="heading-md" style={{ color: '#21372F', marginBottom: '1rem' }}>
              Our Most Popular <span style={{ color: '#899255' }}>Products</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#5F685F', lineHeight: 1.6 }}>
              These flagship products power thousands of businesses worldwide.
              Discover what makes them the preferred choice for growth-oriented teams.
            </p>
          </div>

          {/* Featured Products — horizontal cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {featuredProducts.map((product, i) => (
              <FeaturedProductCard
                key={product.id}
                product={product}
                index={i}
                onViewDetails={onOpenProductModal}
                parentVisible={featured.visible}
              />
            ))}
          </div>
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
          <div
            style={{
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: '2.5rem',
              opacity: grid.visible ? 1 : 0,
              transform: grid.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span className="badge-pill" style={{ marginBottom: '1rem' }}>
              <span className="dot" /> FULL CATALOG
            </span>
            <h2 className="heading-md" style={{ color: '#21372F', marginBottom: '1rem' }}>
              Explore All <span style={{ color: '#899255' }}>Products</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#5F685F', lineHeight: 1.6 }}>
              Browse our complete product suite. Filter by category to find the perfect tool for your needs.
            </p>
          </div>

          {/* Filter Bar */}
          <ProductFilter
            categories={PRODUCT_CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            productCounts={productCounts}
          />

          {/* Product Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onOpenProductModal}
                index={i}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: '#5F685F',
              }}
            >
              <Package size={48} style={{ color: '#DCE8D3', marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No products found in this category.</p>
              <p style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>Try selecting a different filter.</p>
            </div>
          )}
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
              <span className="dot" /> WHY INFINITY TECH
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
   Featured Product Card (horizontal layout)
   ─────────────────────────────────────────────── */
interface FeaturedCardProps {
  product: ProductItem;
  index: number;
  onViewDetails: (product: ProductItem) => void;
  parentVisible: boolean;
}

const FeaturedProductCard: React.FC<FeaturedCardProps> = ({ product, index, onViewDetails, parentVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isReversed = index % 2 !== 0;

  const statusColor = product.status === 'Live' ? '#4CAF50' : '#FF9800';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: `1px solid ${isHovered ? '#A8C36E' : '#DCE8D3'}`,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '0',
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
        boxShadow: isHovered
          ? '0 20px 50px rgba(33, 55, 47, 0.12)'
          : '0 4px 20px rgba(33, 55, 47, 0.05)',
      }}
    >
      {/* Image */}
      <div
        style={{
          order: isReversed ? 2 : 1,
          position: 'relative',
          overflow: 'hidden',
          minHeight: '280px',
          backgroundColor: '#F7FAF5',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            display: 'flex',
            gap: '8px',
          }}
        >
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(33,55,47,0.85)',
              color: '#BEEA9A',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            ★ Featured
          </span>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255,255,255,0.92)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: statusColor,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusColor }} />
            {product.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          order: isReversed ? 1 : 2,
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#899255',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.5rem',
          }}
        >
          {product.category}
        </span>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
            fontWeight: 800,
            color: '#21372F',
            marginBottom: '0.5rem',
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontSize: '0.95rem',
            color: '#899255',
            fontWeight: 600,
            fontStyle: 'italic',
            marginBottom: '1rem',
          }}
        >
          {product.tagline}
        </p>

        <p
          style={{
            fontSize: '1rem',
            color: '#5F685F',
            lineHeight: 1.65,
            marginBottom: '1.5rem',
          }}
        >
          {product.shortDesc}
        </p>

        {/* Key benefits */}
        <div style={{ marginBottom: '1.5rem' }}>
          {product.benefits.slice(0, 3).map((b, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                marginBottom: '0.6rem',
                fontSize: '0.92rem',
                color: '#365648',
              }}
            >
              <CheckCircle2 size={16} style={{ color: '#899255', flexShrink: 0, marginTop: '3px' }} />
              <span>{b}</span>
            </div>
          ))}
        </div>

        {/* Pricing + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#21372F' }}>
            {product.pricing}
          </span>
          <button
            onClick={() => onViewDetails(product)}
            className="btn btn-primary"
            style={{ padding: '0.7rem 1.5rem', fontSize: '0.92rem', borderRadius: '10px' }}
          >
            View Details <ArrowRight size={16} />
          </button>
        </div>
      </div>
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
