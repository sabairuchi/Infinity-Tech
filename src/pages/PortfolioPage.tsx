import React, { useState } from 'react';
import type { PageRoute, ProjectItem } from '../types';
import { PORTFOLIO_DATA } from '../data';
import { CTASection } from '../components/CTASection';
import { ArrowRight, Filter } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate, onOpenProjectModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Web', 'Mobile', 'UI/UX', 'E-commerce'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ paddingTop: '80px' }}>

      {/* Hero Header */}
      <section style={{ backgroundColor: '#F7FAF5', padding: 'clamp(3.5rem, 6vw, 5.5rem) 0', borderBottom: '1px solid #DCE8D3' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="badge-pill" style={{ marginBottom: '1.25rem' }}>
            <span className="dot" /> OUR PORTFOLIO
          </span>
          <h1 className="heading-lg" style={{ marginBottom: '1.5rem', color: '#21372F' }}>
            Work That Delivers <span style={{ color: '#899255' }}>Impact</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: '#5F685F', lineHeight: 1.6 }}>
            Explore our curated showcase of web applications, mobile platforms, design systems, and e-commerce software developed for high-performing brands.
          </p>
        </div>
      </section>

      {/* Portfolio Grid & Filter Bar */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#5F685F', fontSize: '0.9rem', marginRight: '0.5rem' }}>
              <Filter size={16} /> Filter by:
            </div>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.55rem 1.3rem',
                    borderRadius: '9999px',
                    border: '1px solid',
                    borderColor: isSelected ? '#899255' : '#DCE8D3',
                    backgroundColor: isSelected ? '#899255' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#21372F',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onOpenProjectModal(project)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DCE8D3',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 12px rgba(33, 55, 47, 0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 18px 36px rgba(33, 55, 47, 0.1)';
                  e.currentTarget.style.borderColor = '#899255';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(33, 55, 47, 0.04)';
                  e.currentTarget.style.borderColor = '#DCE8D3';
                }}
              >
                <div style={{ height: '250px', overflow: 'hidden', position: 'relative', backgroundColor: '#F7FAF5' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#21372F',
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#21372F', marginBottom: '0.65rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: '#5F685F', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                      {project.shortDesc}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {project.techStack.slice(0, 3).map((t) => (
                        <span key={t} style={{ padding: '0.2rem 0.6rem', backgroundColor: '#F0F5ED', color: '#365648', fontSize: '0.75rem', fontWeight: 600, borderRadius: '4px' }}>
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span style={{ padding: '0.2rem 0.6rem', backgroundColor: '#F0F5ED', color: '#5F685F', fontSize: '0.75rem', fontWeight: 600, borderRadius: '4px' }}>
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F5ED', paddingTop: '1rem', color: '#899255', fontWeight: 700, fontSize: '0.9rem' }}>
                      <span>View Case Details</span>
                      <ArrowRight size={18} />
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
