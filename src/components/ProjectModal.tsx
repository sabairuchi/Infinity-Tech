import React from 'react';
import type { ProjectItem } from '../types';
import { X, CheckCircle2, Calendar, User, Tag } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

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
          maxWidth: '850px',
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
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close Project Modal"
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

        {/* Project Image */}
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '1.75rem',
            border: '1px solid #DCE8D3',
            backgroundColor: '#F7FAF5',
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: 'auto', maxHeight: '380px', objectFit: 'cover' }}
          />
        </div>

        {/* Category & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className="badge-pill">
            <span className="dot" /> {project.category}
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#21372F', marginBottom: '1rem' }}>
          {project.title}
        </h2>

        {/* Quick Meta */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            padding: '1rem 0',
            borderTop: '1px solid #F0F5ED',
            borderBottom: '1px solid #F0F5ED',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            color: '#5F685F',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={16} color="#899255" /> <span>Client: <strong>{project.client}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} color="#899255" /> <span>Year: <strong>{project.year}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Tag size={16} color="#899255" /> <span>Domain: <strong>{project.category} Application</strong></span>
          </div>
        </div>

        {/* Detailed Overview */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#21372F', marginBottom: '0.5rem' }}>
            Project Overview
          </h3>
          <p style={{ color: '#5F685F', lineHeight: 1.6, fontSize: '0.975rem' }}>
            {project.fullDesc}
          </p>
        </div>

        {/* Key Features */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#21372F', marginBottom: '0.75rem' }}>
            Key Features & Solutions Delivered
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {project.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  backgroundColor: '#F7FAF5',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #DCE8D3',
                  fontSize: '0.9rem',
                  color: '#21372F',
                }}
              >
                <CheckCircle2 size={18} color="#899255" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#21372F', marginBottom: '0.6rem' }}>
            Technologies Used
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '0.3rem 0.8rem',
                  backgroundColor: '#365648',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Business Impact Box */}
        <div
          style={{
            backgroundColor: '#F0F5ED',
            borderLeft: '4px solid #899255',
            padding: '1rem 1.25rem',
            borderRadius: '4px',
            marginBottom: '1.75rem',
          }}
        >
          <strong style={{ display: 'block', color: '#21372F', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
            Business Impact:
          </strong>
          <span style={{ color: '#365648', fontSize: '0.95rem', fontWeight: 600 }}>
            {project.impact}
          </span>
        </div>

        {/* Live Action */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose} className="btn btn-outline" style={{ padding: '0.7rem 1.4rem' }}>
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
