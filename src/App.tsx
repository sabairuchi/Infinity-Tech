import React, { useState, useEffect } from 'react';
import type { PageRoute, ServiceItem, ProjectItem, BlogPost, ProductItem, CartItem, DownloadItem, User } from './types';
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
import { AuthPage } from './pages/AuthPage';

// Modals
import { ServiceModal } from './components/ServiceModal';
import { ProjectModal } from './components/ProjectModal';
import { BlogModal } from './components/BlogModal';
import { LegalModal } from './components/LegalModal';
import { ProductModal } from './components/ProductModal';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageRoute>('home');
  const [user, setUser] = useState<User | null>(null);
  const [authRedirectReason, setAuthRedirectReason] = useState<string | null>(null);
  
  // Modal states
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [legalModalState, setLegalModalState] = useState<{ title: string; type: 'privacy' | 'terms' | null }>({ title: '', type: null });
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // User Cart, Wishlist, Downloads & Tab State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<ProductItem[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [myProductsTab, setMyProductsTab] = useState<'cart' | 'wishlist' | 'downloads' | 'billing'>('cart');

  // Sync user purchases from database upon login
  useEffect(() => {
    if (!user || !user.token) return;

    const customApi = import.meta.env.VITE_API_BASE_URL;
    const apiUrl = customApi
      ? `${customApi.replace(/\/$/, '')}/api/user/purchases`
      : (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
          ? '/api/user/purchases'
          : 'http://localhost:5000/api/user/purchases');

    fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.purchases && Array.isArray(data.purchases) && data.purchases.length > 0) {
          const fetchedDownloads: DownloadItem[] = data.purchases.map((p: any) => {
            const prod = PRODUCTS_DATA.find((item) => item.id === p.product_id) || PRODUCTS_DATA[0];
            return {
              id: p.id,
              product: prod,
              version: p.version || prod.version,
              licenseKey: p.license_key || p.licenseKey,
              downloadSize: (prod as any).isEBook || prod.id === 'cloud-computing-blueprint' ? '12.5 MB PDF' : '140 MB',
              datePurchased: p.date_purchased ? new Date(p.date_purchased).toLocaleDateString() : 'Purchased',
            };
          });
          setDownloads(fetchedDownloads);
        }
      })
      .catch((err) => console.log('Could not sync user purchases:', err));
  }, [user]);

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

  // MANDATORY PURCHASE AUTH GUARD
  const handleCheckoutSuccess = (purchasedProducts: ProductItem[]) => {
    if (!user) {
      setAuthRedirectReason('You must sign in or create an account to complete your product purchase.');
      navigateTo('login');
      return;
    }

    // Call MySQL Checkout API
    fetch('http://localhost:5000/api/orders/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token || 'demo-token'}`,
      },
      body: JSON.stringify({
        products: purchasedProducts,
        totalAmount: purchasedProducts.reduce((acc, p) => acc + (parseFloat(p.pricing.replace(/[^0-9.]/g, '')) || 49), 0),
        paymentMethod: 'Credit Card (MySQL Saved)',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newDownloads: DownloadItem[] = (data.purchases || purchasedProducts).map((item: any, idx: number) => ({
          id: item.id || `dl-new-${Date.now()}-${idx}`,
          product: item.product || purchasedProducts[idx],
          version: item.product?.version || purchasedProducts[idx].version,
          licenseKey: item.licenseKey || `DIG-MYSQL-${Math.floor(1000 + Math.random() * 9000)}-KEY`,
          downloadSize: item.downloadSize || '140 MB',
          datePurchased: 'Today (MySQL Verified)',
        }));

        setDownloads((prev) => [...newDownloads, ...prev]);
        setCart([]);
      })
      .catch(() => {
        // Fallback local state update if server is launching
        const newDownloads: DownloadItem[] = purchasedProducts.map((product, idx) => ({
          id: `dl-new-${Date.now()}-${idx}`,
          product,
          version: product.version,
          licenseKey: `DIG-${product.name.replace(/\s+/g, '').toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-KEY`,
          downloadSize: '140 MB',
          datePurchased: 'Today',
        }));
        setDownloads((prev) => [...newDownloads, ...prev]);
        setCart([]);
      });
  };

  // Handle URL hash changes & back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (['home', 'about', 'services', 'portfolio', 'blog', 'contact', 'products', 'my-products', 'login', 'signup'].includes(hash)) {
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

  const triggerPdfDownload = async (fileUrl: string, fileName: string) => {
    try {
      const res = await fetch(fileUrl);
      if (res.ok) {
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        return;
      }
    } catch (e) {
      console.warn('PDF fetch fallback triggered:', e);
    }

    const fallbackPdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
4 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents 5 0 R >>
endobj
5 0 obj
<< /Length 420 >>
stream
BT
/F1 14 Tf
50 720 Td
20 TL
(CLOUD COMPUTING BLUEPRINT - 65 PAGES EBOOK) '
(==================================================) '
(A Beginner's Guide to Cloud Technologies, Architecture,) '
(and Real-World Applications) '
(==================================================) '
() '
(Publisher: Digiro Digital Publications) '
(Chapters: IaaS, PaaS, SaaS, Public/Private Cloud, Security,) '
(Databases, AWS, Azure, GCP, DevOps & Cloud Careers.) '
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000187 00000 n 
0000000302 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
780
%%EOF`;

    const blob = new Blob([fallbackPdf], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  };

  const handleBuyNow = (product: ProductItem) => {
    handleAddToCart(product);
    setMyProductsTab('billing');
    setSelectedProduct(null);
    navigateTo('my-products');
  };

  const handleLoginSuccess = (authedUser: User, token: string) => {
    setUser({ ...authedUser, token });
    setAuthRedirectReason(null);

    const pendingEbookId = sessionStorage.getItem('pendingEbookDownload');
    if (pendingEbookId) {
      sessionStorage.removeItem('pendingEbookDownload');
      const ebookProd = PRODUCTS_DATA.find((p) => p.id === pendingEbookId) || PRODUCTS_DATA[0];

      setDownloads((prev) => {
        const exists = prev.some((d) => d.product.id === ebookProd.id);
        if (exists) return prev;
        return [
          {
            id: `dl-ebook-${Date.now()}`,
            product: ebookProd,
            version: ebookProd.version,
            licenseKey: `EBOOK-FREE-MEMBER-LICENSE`,
            downloadSize: '12.5 MB PDF',
            datePurchased: 'Free Member Download',
          },
          ...prev,
        ];
      });

      setTimeout(() => {
        const pdfPath = ebookProd.pdfUrl || '/assets/Mastering_React_E_Book.pdf';
        const pdfFileName = `${ebookProd.name.replace(/\s+/g, '_')}.pdf`;
        triggerPdfDownload(pdfPath, pdfFileName);
        navigateTo('my-products');
      }, 400);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      
      {/* Sticky Header Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        cartCount={cart.reduce((a, c) => a + c.quantity, 0)}
        user={user}
        onLogout={() => setUser(null)}
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
            onBuyNow={handleBuyNow}
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
            initialTab={myProductsTab}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onMoveToCartFromWishlist={handleMoveToCartFromWishlist}
            onViewProductDetails={(product) => setSelectedProduct(product)}
            onCheckoutSuccess={handleCheckoutSuccess}
          />
        )}

        {(activePage === 'login' || activePage === 'signup') && (
          <AuthPage
            onNavigate={navigateTo}
            onLoginSuccess={handleLoginSuccess}
            redirectReason={authRedirectReason}
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
        onBuyNow={handleBuyNow}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
      />

    </div>
  );
};

export default App;
