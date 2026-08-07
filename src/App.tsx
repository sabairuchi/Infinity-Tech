import React, { useState, useEffect } from 'react';
import type { PageRoute, ServiceItem, ProjectItem, BlogPost, ProductItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { ProductsPage } from './pages/ProductsPage';

// Modals
import { ServiceModal } from './components/ServiceModal';
import { ProjectModal } from './components/ProjectModal';
import { BlogModal } from './components/BlogModal';
import { LegalModal } from './components/LegalModal';
import { ProductModal } from './components/ProductModal';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageRoute>('home');
  
  // Modal states
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [legalModalState, setLegalModalState] = useState<{ title: string; type: 'privacy' | 'terms' | null }>({ title: '', type: null });
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Handle URL hash changes & back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (['home', 'about', 'services', 'portfolio', 'blog', 'contact', 'products'].includes(hash)) {
        setActivePage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute, targetId?: string) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      
      {/* Sticky Header Navbar */}
      <Navbar activePage={activePage} onNavigate={navigateTo} />

      {/* Main Dynamic View Content */}
      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenServiceModal={(service) => setSelectedService(service)}
            onOpenProjectModal={(project) => setSelectedProject(project)}
            onOpenBlogModal={(post) => setSelectedBlog(post)}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onOpenServiceModal={(service) => setSelectedService(service)}
          />
        )}

        {activePage === 'portfolio' && (
          <PortfolioPage
            onNavigate={navigateTo}
            onOpenProjectModal={(project) => setSelectedProject(project)}
          />
        )}

        {activePage === 'blog' && (
          <BlogPage
            onNavigate={navigateTo}
            onOpenBlogModal={(post) => setSelectedBlog(post)}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}

        {activePage === 'products' && (
          <ProductsPage
            onNavigate={navigateTo}
            onOpenProductModal={(product) => setSelectedProduct(product)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenLegalModal={(title, type) => setLegalModalState({ title, type })}
      />

      {/* Interactive Lightbox / Detail Modals */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onNavigate={navigateTo}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <BlogModal
        post={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />

      <LegalModal
        title={legalModalState.title}
        type={legalModalState.type}
        onClose={() => setLegalModalState({ title: '', type: null })}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onNavigate={navigateTo}
      />

    </div>
  );
};

export default App;
