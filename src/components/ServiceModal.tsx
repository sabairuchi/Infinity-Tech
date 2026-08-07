import React from 'react';
import type { ServiceItem, PageRoute } from '../types';
import { X, CheckCircle2, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onNavigate: (page: PageRoute) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onNavigate }) => {
  if (!service) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        backgroundColor: 'rgba(33, 55, 47, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(33, 55, 47, 0.25)',
          position: 'relative',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          animation: 'fadeInUp 0.3s ease forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close Service Modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#F0F5ED',
            border: '1px solid #DCE8D3',
            color: '#21372F',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <X size={20} />
        </button>

        <span className="badge-pill" style={{ marginBottom: '0.75rem' }}>
          <span className="dot" /> {service.category}
        </span>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#21372F', marginBottom: '1rem' }}>
          {service.title}
        </h2>

        <p style={{ color: '#5F685F', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          {service.fullDesc}
        </p>

        {/* Benefits Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#21372F', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color="#899255" /> Key Business Benefits
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {service.benefits.map((b, i) => (
              <div
                key={i}
                style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: '#F7FAF5',
                  border: '1px solid #DCE8D3',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  fontSize: '0.925rem',
                  color: '#21372F',
                }}
              >
                <CheckCircle2 size={18} color="#899255" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Deliverables */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#21372F', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="#899255" /> Core Deliverables & Capability
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {service.features.map((f, i) => (
              <li
                key={i}
                style={{
                  fontSize: '0.95rem',
                  color: '#5F685F',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#899255' }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#21372F', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} color="#899255" /> Frameworks & Tools
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {service.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '0.35rem 0.85rem',
                  backgroundColor: '#EBF4E5',
                  color: '#21372F',
                  border: '1px solid #DCE8D3',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F0F5ED', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={onClose} className="btn btn-outline" style={{ padding: '0.7rem 1.4rem' }}>
            Close
          </button>
          
          <button
            onClick={() => {
              onClose();
              onNavigate('contact');
            }}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.6rem' }}
          >
            Request Service Quote <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};
