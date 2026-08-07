import React from 'react';
import type { PageRoute, ServiceItem } from '../types';
import { SERVICES_DATA } from '../data';
import { CTASection } from '../components/CTASection';
import { CheckCircle2, ArrowRight, Globe, Smartphone, Palette, Cloud, Cpu, TrendingUp } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenServiceModal: (service: ServiceItem) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenServiceModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe size={32} color="#899255" />;
      case 'Smartphone': return <Smartphone size={32} color="#899255" />;
      case 'Palette': return <Palette size={32} color="#899255" />;
      case 'Cloud': return <Cloud size={32} color="#899255" />;
      case 'Cpu': return <Cpu size={32} color="#899255" />;
      case 'TrendingUp': return <TrendingUp size={32} color="#899255" />;
      default: return <Globe size={32} color="#899255" />;
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>

      {/* Services Hero Banner */}
      <section style={{ backgroundColor: '#F7FAF5', padding: 'clamp(3.5rem, 6vw, 5.5rem) 0', borderBottom: '1px solid #DCE8D3' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="badge-pill" style={{ marginBottom: '1.25rem' }}>
            <span className="dot" /> OUR SERVICES
          </span>
          <h1 className="heading-lg" style={{ marginBottom: '1.5rem', color: '#21372F' }}>
            Tailored Engineering & Digital <span style={{ color: '#899255' }}>Solutions</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: '#5F685F', lineHeight: 1.6 }}>
            We engineer custom software applications, cloud architectures, and digital experiences that drive enterprise efficiency and customer growth.
          </p>
        </div>
      </section>

      {/* Services Detailed List */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                id={service.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #DCE8D3',
                  padding: 'clamp(2rem, 4vw, 3.5rem)',
                  boxShadow: '0 10px 30px rgba(33, 55, 47, 0.05)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '3rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
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

                  <span className="badge-pill" style={{ marginBottom: '0.75rem' }}>
                    <span className="dot" /> {service.category}
                  </span>

                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#21372F', marginBottom: '1rem' }}>
                    {service.title}
                  </h2>

                  <p style={{ color: '#5F685F', fontSize: '1.025rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {service.fullDesc}
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => onOpenServiceModal(service)}
                      className="btn btn-primary"
                      style={{ padding: '0.75rem 1.6rem' }}
                    >
                      Service Details <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Benefits & Deliverables Box */}
                <div style={{ backgroundColor: '#F7FAF5', border: '1px solid #DCE8D3', padding: '2rem', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#21372F', marginBottom: '1.25rem' }}>
                    Key Deliverables & Advantages:
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
                    {service.benefits.map((b, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.925rem', color: '#21372F' }}>
                        <CheckCircle2 size={18} color="#899255" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid #DCE8D3', paddingTop: '1.25rem' }}>
                    <strong style={{ display: 'block', fontSize: '0.85rem', color: '#5F685F', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Tech Stack:
                    </strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {service.techStack.map((tech) => (
                        <span key={tech} style={{ padding: '0.25rem 0.65rem', backgroundColor: '#FFFFFF', border: '1px solid #DCE8D3', color: '#365648', fontSize: '0.775rem', fontWeight: 600, borderRadius: '4px' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />

    </div>
  );
};
