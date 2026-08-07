import React, { useState, useEffect } from 'react';
import type { PageRoute, ServiceItem, ProjectItem, BlogPost, ProductItem, CartItem, DownloadItem } from './types';
import { PRODUCTS_DATA } from './data/products';
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
import { MyProductsPage } from './pages/MyProductsPage';

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

  // User Cart, Wishlist, Downloads State
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS_DATA[0], quantity: 1 }, // Infinity Analytics
    { product: PRODUCTS_DATA[1], quantity: 1 }, // Infinity CRM
  ]);
  const [wishlist, setWishlist] = useState<ProductItem[]>([
    PRODUCTS_DATA[2], // Infinity Commerce
    PRODUCTS_DATA[3], // Infinity TaskFlow
  ]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: 'dl-1',
      product: PRODUCTS_DATA[0],
      version: '3.2',
      licenseKey: 'INF-ANALYTICS-8842-X91A-PRO',
      downloadSize: '142 MB',
      datePurchased: 'Aug 5, 2026',
    },
    {
      id: 'dl-2',
      product: PRODUCTS_DATA[4],
      version: '2.3',
      licenseKey: 'INF-HEALTH-3391-B72Z-ENT',
      downloadSize: '215 MB',
      datePurchased: 'Jul 28, 2026',
    },
  ]);

  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleToggleWishlist = (product: ProductItem) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleMoveToCartFromWishlist = (product: ProductItem) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id);
  };

  const handleCheckoutSuccess = (purchasedProducts: ProductItem[]) => {
    const newDownloads: DownloadItem[] = purchasedProducts.map((product, idx) => ({
      id: `dl-new-${Date.now()}-${idx}`,
      product,
      version: product.version,
      licenseKey: `INF-${product.name.replace(/\s+/g, '').toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-KEY`,
      downloadSize: `${120 + Math.floor(Math.random() * 150)} MB`,
      datePurchased: 'Today',
    }));

    setDownloads((prev) => [...newDownloads, ...prev]);
    setCart([]);
  };

  // Handle URL hash changes & back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (['home', 'about', 'services', 'portfolio', 'blog', 'contact', 'products', 'my-products'].includes(hash)) {
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
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        cartCount={cart.reduce((a, c) => a + c.quantity, 0)}
      />

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
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map((w) => w.id)}
          />
        )}

        {activePage === 'my-products' && (
          <MyProductsPage
            onNavigate={navigateTo}
            cart={cart}
            wishlist={wishlist}
            downloads={downloads}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onMoveToCartFromWishlist={handleMoveToCartFromWishlist}
            onViewProductDetails={(product) => setSelectedProduct(product)}
            onCheckoutSuccess={handleCheckoutSuccess}
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
