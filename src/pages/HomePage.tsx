import React from 'react';
import type { PageRoute, ServiceItem, ProjectItem, BlogPost } from '../types';
import { SERVICES_DATA, PORTFOLIO_DATA, BLOG_POSTS, CLIENT_LOGOS, TESTIMONIALS_DATA, PROCESS_STEPS, COMPANY_STATS } from '../data';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { CTASection } from '../components/CTASection';
import { ArrowRight, Globe, Smartphone, Palette, Cloud, Cpu, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute, targetId?: string) => void;
  onOpenServiceModal: (service: ServiceItem) => void;
  onOpenProjectModal: (project: ProjectItem) => void;
  onOpenBlogModal: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenServiceModal,
  onOpenProjectModal,
  onOpenBlogModal,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe size={28} color="#899255" />;
      case 'Smartphone': return <Smartphone size={28} color="#899255" />;
      case 'Palette': return <Palette size={28} color="#899255" />;
      case 'Cloud': return <Cloud size={28} color="#899255" />;
      case 'Cpu': return <Cpu size={28} color="#899255" />;
      case 'TrendingUp': return <TrendingUp size={28} color="#899255" />;
      default: return <Sparkles size={28} color="#899255" />;
    }
  };

  return (
    <div style={{ paddingTop: '80px', overflowX: 'hidden' }}>

      {/* 1. HERO SECTION */}
      <section
        style={{
          backgroundColor: '#F7FAF5',
          position: 'relative',
          padding: 'clamp(3rem, 6vw, 6rem) 0',
          borderBottom: '1px solid #DCE8D3',
          overflow: 'hidden',
        }}
      >
        {/* Ambient Subtle Green Background Blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(190, 234, 154, 0.4) 0%, rgba(247, 250, 245, 0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 195, 110, 0.25) 0%, rgba(247, 250, 245, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div style={{ animation: 'fadeInUp 0.8s ease forwards' }}>
              <div className="badge-pill" style={{ marginBottom: '1.25rem' }}>
                <span className="dot" /> WELCOME TO DIGIRO
              </div>

              <h1
                className="heading-lg"
                style={{
                  color: '#21372F',
                  fontWeight: 800,
                  marginBottom: '1.25rem',
                  lineHeight: 1.15,
                }}
              >
                We Build Digital Solutions That Drive{' '}
                <span style={{ color: '#899255', position: 'relative' }}>
                  Success
                  <svg
                    style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '8px' }}
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,15 Q50,5 100,15" stroke="#A8C36E" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                  color: '#5F685F',
                  marginBottom: '2rem',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                }}
              >
                We help businesses transform ideas into powerful digital products with innovative design, development and strategy.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <button
                  onClick={() => onNavigate('contact')}
                  className="btn btn-primary"
                  style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
                >
                  Get Started <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => onNavigate('portfolio')}
                  className="btn btn-outline"
                  style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
                >
                  View Our Work
                </button>
              </div>

              {/* Happy Clients Avatar Stack */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100',
                    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Happy Client Avatar"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px solid #FFFFFF',
                        marginLeft: i > 0 ? '-12px' : '0',
                        objectFit: 'cover',
                      }}
                    />
                  ))}
                </div>
                <div>
                  <span style={{ display: 'block', fontWeight: 700, color: '#21372F', fontSize: '0.95rem' }}>
                    100+ Happy Clients
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#5F685F' }}>Worldwide Trust</span>
                </div>
              </div>
            </div>

            {/* Right Side: Floating Abstract 3D Tech Visual */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '520px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(33, 55, 47, 0.12)',
                  border: '1px solid #DCE8D3',
                  backgroundColor: '#FFFFFF',
                }}
                className="animate-float"
              >
                <img
                  src="/assets/hero_tech_3d.png"
                  alt="Digiro 3D Technology Illustration"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />

                {/* Floating Tech Chips */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid #DCE8D3',
                    boxShadow: '0 8px 20px rgba(33, 55, 47, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#899255' }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#5F685F', fontWeight: 600 }}>SYSTEM STATUS</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#21372F' }}>99.99% Uptime SLA</span>
                  </div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    backgroundColor: '#365648',
                    color: '#FFFFFF',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(33, 55, 47, 0.2)',
                  }}
                >
                  <Sparkles size={14} color="#BEEA9A" /> ISO Certified Agency
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY SECTION */}
      <section style={{ padding: '3rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0F5ED' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#5F685F', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Trusted by innovative businesses worldwide
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(2rem, 5vw, 4rem)',
              opacity: 0.75,
            }}
          >
            {CLIENT_LOGOS.map((client) => (
              <span
                key={client.name}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#365648',
                  letterSpacing: '-0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#A8C36E' }} />
                {client.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge-pill" style={{ marginBottom: '1rem' }}>
              <span className="dot" /> OUR EXPERTISE
            </span>
            <h2 className="heading-md" style={{ marginBottom: '1rem' }}>
              Services That Create Impact
            </h2>
            <p style={{ color: '#5F685F', fontSize: '1.05rem', lineHeight: 1.6 }}>
              We partner with visionary companies to engineer resilient software, elevate brand experiences, and unlock technical competitive advantages.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                onClick={() => onOpenServiceModal(service)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DCE8D3',
                  padding: '2.25rem 2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = '#899255';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(33, 55, 47, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#DCE8D3';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '14px',
                      backgroundColor: '#F0F5ED',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                      border: '1px solid #DCE8D3',
                    }}
                  >
                    {getIcon(service.iconName)}
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#21372F', marginBottom: '0.85rem' }}>
                    {service.title}
                  </h3>

                  <p style={{ color: '#5F685F', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {service.shortDesc}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#899255',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  Learn More <ChevronRight size={18} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button onClick={() => onNavigate('services')} className="btn btn-outline">
              Explore All Services <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#F7FAF5', borderTop: '1px solid #DCE8D3', borderBottom: '1px solid #DCE8D3' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            
            <div>
              <span className="badge-pill" style={{ marginBottom: '1rem' }}>
                <span className="dot" /> WHY DIGIRO
              </span>

              <h2 className="heading-md" style={{ marginBottom: '1.25rem' }}>
                Your Success Is Our Mission
              </h2>

              <p style={{ color: '#5F685F', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                We combine creativity, technology and strategy to deliver digital solutions that help businesses grow. Our multi-disciplinary engineering approach guarantees top-tier code quality, speed, and continuous reliability.
              </p>

              {/* Statistical Animated Counters Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.75rem' }}>
                {COMPANY_STATS.map((stat, i) => (
                  <div key={i} style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #DCE8D3' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#899255', lineHeight: 1 }}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#21372F', marginTop: '0.35rem', display: 'block' }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(33, 55, 47, 0.1)',
                  border: '1px solid #DCE8D3',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <img
                  src="/assets/about_team_culture.png"
                  alt="Digiro Engineering Team Culture"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div>
              <span className="badge-pill" style={{ marginBottom: '1rem' }}>
                <span className="dot" /> SELECTED WORK
              </span>
              <h2 className="heading-md">Our Recent Work</h2>
            </div>

            <button onClick={() => onNavigate('portfolio')} className="btn btn-outline">
              View All Projects <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {PORTFOLIO_DATA.slice(0, 3).map((project) => (
              <div
                key={project.id}
                onClick={() => onOpenProjectModal(project)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DCE8D3',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(33, 55, 47, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative', backgroundColor: '#F7FAF5' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(4px)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#21372F',
                    }}
                  >
                    {project.category}
                  </div>
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#21372F', marginBottom: '0.6rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: '#5F685F', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                      {project.shortDesc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F5ED', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#899255', fontWeight: 600 }}>View Case Study</span>
                    <ArrowRight size={16} color="#899255" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR PROCESS */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#F7FAF5', borderTop: '1px solid #DCE8D3', borderBottom: '1px solid #DCE8D3' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge-pill" style={{ marginBottom: '1rem' }}>
              <span className="dot" /> HOW WE WORK
            </span>
            <h2 className="heading-md" style={{ marginBottom: '1rem' }}>
              Our Proven 5-Step Process
            </h2>
            <p style={{ color: '#5F685F', fontSize: '1.05rem', lineHeight: 1.6 }}>
              From initial discovery to launch and beyond, our streamlined methodology ensures transparency, risk mitigation, and rapid delivery.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              position: 'relative',
            }}
          >
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DCE8D3',
                  padding: '2rem 1.5rem',
                  position: 'relative',
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#899255', lineHeight: 1, marginBottom: '1rem' }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#21372F', marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#5F685F', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge-pill" style={{ marginBottom: '1rem' }}>
              <span className="dot" /> CLIENT FEEDBACK
            </span>
            <h2 className="heading-md">What Our Clients Say</h2>
          </div>

          <TestimonialSlider testimonials={TESTIMONIALS_DATA} />
        </div>
      </section>

      {/* 8. BLOG / INSIGHTS */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#F7FAF5', borderTop: '1px solid #DCE8D3' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div>
              <span className="badge-pill" style={{ marginBottom: '1rem' }}>
                <span className="dot" /> LATEST INSIGHTS
              </span>
              <h2 className="heading-md">Thought Leadership</h2>
            </div>
            <button onClick={() => onNavigate('blog')} className="btn btn-outline">
              Read All Articles <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div
                key={post.id}
                onClick={() => onOpenBlogModal(post)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DCE8D3',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(33, 55, 47, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#F0F5ED' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#5F685F', marginBottom: '0.75rem' }}>
                      <span style={{ color: '#899255', fontWeight: 600 }}>{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#21372F', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                      {post.title}
                    </h3>
                    <p style={{ color: '#5F685F', fontSize: '0.875rem', lineHeight: 1.6 }}>
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#899255', fontWeight: 600, fontSize: '0.875rem' }}>
                  Read Article <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA SECTION */}
      <CTASection onNavigate={onNavigate} />

    </div>
  );
};
