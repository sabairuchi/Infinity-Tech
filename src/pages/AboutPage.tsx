import React from 'react';
import type { PageRoute } from '../types';
import { COMPANY_STATS } from '../data';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { CTASection } from '../components/CTASection';
import { Target, Compass, Award, ShieldCheck, Heart, Users } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const values = [
    {
      icon: Award,
      title: 'Engineering Excellence',
      desc: 'We never settle for good enough. We adhere to enterprise-grade coding standards, rigorous testing, and continuous optimization.'
    },
    {
      icon: ShieldCheck,
      title: 'Radical Transparency',
      desc: 'Clear communication, predictable milestone timelines, and open-book development progress at every step of your project lifecycle.'
    },
    {
      icon: Heart,
      title: 'Human-Centered Design',
      desc: 'Technology is meant to serve people. We craft interfaces and workflows that feel effortless, intuitive, and visually empowering.'
    },
    {
      icon: Users,
      title: 'True Partnership',
      desc: 'We treat your product as our own, offering strategic technical counsel to ensure your software generates measurable business ROI.'
    }
  ];

  return (
    <div>

      {/* About Hero */}
      <section style={{ backgroundColor: '#F7FAF5', padding: 'clamp(3.5rem, 6vw, 5.5rem) 0', borderBottom: '1px solid #DCE8D3' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="badge-pill" style={{ marginBottom: '1.25rem' }}>
              <span className="dot" /> ABOUT DIGIRO
            </span>
            <h1 className="heading-lg" style={{ marginBottom: '1.5rem', color: '#21372F' }}>
              Building Software That Powers the <span style={{ color: '#899255' }}>Future</span>
            </h1>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: '#5F685F', lineHeight: 1.6 }}>
              We are a team of senior engineers, product designers, and technical strategists dedicated to turning complex business challenges into sleek digital products.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story & Culture */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            
            <div>
              <span className="badge-pill" style={{ marginBottom: '1rem' }}>
                <span className="dot" /> OUR JOURNEY
              </span>
              <h2 className="heading-md" style={{ marginBottom: '1.25rem' }}>
                Founded on Innovation, Driven by Results
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#5F685F', fontSize: '1rem', lineHeight: 1.7 }}>
                <p>
                  Started in 2018, Digiro was founded with a clear directive: bridge the gap between heavy enterprise backend engineering and human-centered design aesthetic.
                </p>
                <p>
                  Over the past 8+ years, we have scaled from a specialized consultancy into a full-service software agency serving global leaders across healthcare, fintech, e-commerce, and SaaS.
                </p>
                <p>
                  We take pride in building scalable architectures, maintaining long-term client relationships, and shipping code that stands the test of time.
                </p>
              </div>
            </div>

            <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #DCE8D3', boxShadow: '0 20px 40px rgba(33, 55, 47, 0.08)' }}>
              <img src="/assets/about_team_culture.png" alt="Digiro Agency Studio" style={{ width: '100%', height: 'auto' }} />
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#F7FAF5', borderTop: '1px solid #DCE8D3', borderBottom: '1px solid #DCE8D3' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Mission */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #DCE8D3' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '12px', backgroundColor: '#F0F5ED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid #DCE8D3' }}>
                <Target size={26} color="#899255" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#21372F', marginBottom: '0.85rem' }}>
                Our Mission
              </h3>
              <p style={{ color: '#5F685F', lineHeight: 1.6, fontSize: '0.975rem' }}>
                To empower companies around the globe by building resilient, beautifully designed digital products that accelerate growth, streamline operations, and deliver immense value to their end users.
              </p>
            </div>

            {/* Vision */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #DCE8D3' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '12px', backgroundColor: '#F0F5ED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid #DCE8D3' }}>
                <Compass size={26} color="#899255" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#21372F', marginBottom: '0.85rem' }}>
                Our Vision
              </h3>
              <p style={{ color: '#5F685F', lineHeight: 1.6, fontSize: '0.975rem' }}>
                To set the benchmark for human-designed digital software solutions, creating an ecosystem where technology feels intuitive, accessible, and boundless in possibility.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge-pill" style={{ marginBottom: '1rem' }}>
              <span className="dot" /> OUR PRINCIPLES
            </span>
            <h2 className="heading-md">Values That Guide Us</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {values.map((val, i) => {
              const IconComp = val.icon;
              return (
                <div key={i} style={{ backgroundColor: '#FFFFFF', border: '1px solid #DCE8D3', padding: '2rem 1.5rem', borderRadius: '14px' }}>
                  <div style={{ marginBottom: '1rem', color: '#899255' }}>
                    <IconComp size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#21372F', marginBottom: '0.65rem' }}>
                    {val.title}
                  </h3>
                  <p style={{ color: '#5F685F', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#365648', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {COMPANY_STATS.map((stat, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 800, color: '#BEEA9A' }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <span style={{ fontSize: '0.95rem', color: '#DCE8D3', marginTop: '0.4rem', display: 'block' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection onNavigate={onNavigate} />

    </div>
  );
};
