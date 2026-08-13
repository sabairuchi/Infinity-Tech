import React, { useState, useEffect } from 'react';
import type { PageRoute, ProductItem, CartItem, DownloadItem } from '../types';
import {
  ShoppingCart, Heart, Download, Trash2, ArrowRight, Check,
  Copy, CheckCircle2, ShieldCheck, Plus, Minus, CreditCard, Receipt
} from 'lucide-react';

interface MyProductsPageProps {
  onNavigate: (page: PageRoute) => void;
  cart: CartItem[];
  wishlist: ProductItem[];
  downloads: DownloadItem[];
  initialTab?: 'cart' | 'wishlist' | 'downloads' | 'billing';
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCartFromWishlist: (product: ProductItem) => void;
  onViewProductDetails: (product: ProductItem) => void;
  onCheckoutSuccess: (purchasedProducts: ProductItem[]) => void;
}

export const MyProductsPage: React.FC<MyProductsPageProps> = ({
  onNavigate,
  cart,
  wishlist,
  downloads,
  initialTab = 'cart',
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  onRemoveFromWishlist,
  onMoveToCartFromWishlist,
  onViewProductDetails,
  onCheckoutSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'cart' | 'wishlist' | 'downloads' | 'billing'>(initialTab);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'paypal' | 'bank' | 'upi'>('card');
  const [copiedLicenseId, setCopiedLicenseId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Helper to parse price number from string like "From $49/mo" or "$99"
  const parsePrice = (priceStr: string): number => {
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 49;
  };

  const subtotal = cart.reduce((acc, item) => acc + parsePrice(item.product.pricing) * item.quantity, 0);
  const discountAmount = discountApplied ? subtotal * 0.15 : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const handleCopyLicense = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedLicenseId(id);
    setTimeout(() => setCopiedLicenseId(null), 2500);
  };

  const handleDownload = async (item: DownloadItem) => {
    setDownloadingId(item.id);
    setTimeout(async () => {
      setDownloadingId(null);
      if (item.product.isEBook || item.product.id === 'cloud-computing-blueprint') {
        try {
          const targetPdf = item.product.pdfUrl || '/assets/Mastering_React_E_Book.pdf';
          const fileName = `${item.product.name.replace(/\s+/g, '_')}.pdf`;
          const res = await fetch(targetPdf);
          if (res.ok) {
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const element = document.createElement('a');
            element.href = blobUrl;
            element.download = fileName;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
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
(${item.product.name.toUpperCase()} - EBOOK) '
(==================================================) '
(${item.product.tagline}) '
(==================================================) '
() '
(Publisher: Digiro Digital Publications) '
(Format: PDF Digital Download) '
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
        const element = document.createElement('a');
        element.href = blobUrl;
        element.download = `${item.product.name.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      } else {
        const element = document.createElement('a');
        const file = new Blob([`Digiro License File\nProduct: ${item.product.name}\nVersion: ${item.version}\nLicense Key: ${item.licenseKey}`], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${item.product.id}-v${item.version}-installer.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }, 500);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'DIGIRO15' || couponCode.trim().toUpperCase() === 'INFINITY15' || couponCode.trim().toUpperCase() === 'SAVE15') {
      setDiscountApplied(true);
    } else {
      alert('Use promo code DIGIRO15 for 15% off!');
    }
  };

  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
      onCheckoutSuccess(cart.map((c) => c.product));
      setActiveTab('downloads');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '85vh', backgroundColor: '#FFFFFF' }}>

      {/* Hero Banner Header */}
      <section
        style={{
          backgroundColor: '#21372F',
          padding: 'clamp(3rem, 5vw, 4.5rem) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(190, 234, 154, 0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <span className="badge-pill" style={{ marginBottom: '0.75rem', backgroundColor: 'rgba(190, 234, 154, 0.15)', color: '#BEEA9A' }}>
                <span className="dot" /> USER WORKSPACE
              </span>
              <h1 className="heading-lg" style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>
                My <span style={{ color: '#BEEA9A' }}>Products Portal</span>
              </h1>
              <p style={{ color: '#DCE8D3', fontSize: '1.05rem', maxWidth: '520px' }}>
                Manage your active cart, saved wishlist, and software license downloads all in one place.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div style={{ textAlign: 'center', padding: '0 0.5rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#BEEA9A', display: 'block' }}>{cart.reduce((a, c) => a + c.quantity, 0)}</span>
                <span style={{ fontSize: '0.75rem', color: '#DCE8D3', textTransform: 'uppercase', letterSpacing: '0.04em' }}>In Cart</span>
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
              <div style={{ textAlign: 'center', padding: '0 0.5rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>{wishlist.length}</span>
                <span style={{ fontSize: '0.75rem', color: '#DCE8D3', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Wishlist</span>
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
              <div style={{ textAlign: 'center', padding: '0 0.5rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#A8C36E', display: 'block' }}>{downloads.length}</span>
                <span style={{ fontSize: '0.75rem', color: '#DCE8D3', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Tabs */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0' }}>
        <div className="container">

          {/* Navigation Tab Bar */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              borderBottom: '2px solid #F0F5ED',
              marginBottom: '3rem',
              overflowX: 'auto',
            }}
          >
            <button
              onClick={() => setActiveTab('cart')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: activeTab === 'cart' ? 700 : 500,
                color: activeTab === 'cart' ? '#899255' : '#5F685F',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'cart' ? '3px solid #899255' : '3px solid transparent',
                cursor: 'pointer',
                marginBottom: '-2px',
                transition: 'all 0.2s ease',
              }}
            >
              <ShoppingCart size={20} /> My Cart
              <span
                style={{
                  backgroundColor: activeTab === 'cart' ? '#899255' : '#F0F5ED',
                  color: activeTab === 'cart' ? '#FFFFFF' : '#5F685F',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                {cart.reduce((a, c) => a + c.quantity, 0)}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: activeTab === 'wishlist' ? 700 : 500,
                color: activeTab === 'wishlist' ? '#899255' : '#5F685F',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'wishlist' ? '3px solid #899255' : '3px solid transparent',
                cursor: 'pointer',
                marginBottom: '-2px',
                transition: 'all 0.2s ease',
              }}
            >
              <Heart size={20} /> Wishlist
              <span
                style={{
                  backgroundColor: activeTab === 'wishlist' ? '#899255' : '#F0F5ED',
                  color: activeTab === 'wishlist' ? '#FFFFFF' : '#5F685F',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('downloads')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: activeTab === 'downloads' ? 700 : 500,
                color: activeTab === 'downloads' ? '#899255' : '#5F685F',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'downloads' ? '3px solid #899255' : '3px solid transparent',
                cursor: 'pointer',
                marginBottom: '-2px',
                transition: 'all 0.2s ease',
              }}
            >
              <Download size={20} /> Downloads & Licenses
              <span
                style={{
                  backgroundColor: activeTab === 'downloads' ? '#899255' : '#F0F5ED',
                  color: activeTab === 'downloads' ? '#FFFFFF' : '#5F685F',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                {downloads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: activeTab === 'billing' ? 700 : 500,
                color: activeTab === 'billing' ? '#899255' : '#5F685F',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'billing' ? '3px solid #899255' : '3px solid transparent',
                cursor: 'pointer',
                marginBottom: '-2px',
                transition: 'all 0.2s ease',
              }}
            >
              <CreditCard size={20} /> Billing & Checkout
              <span
                style={{
                  backgroundColor: activeTab === 'billing' ? '#899255' : '#F0F5ED',
                  color: activeTab === 'billing' ? '#FFFFFF' : '#5F685F',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                {cart.length}
              </span>
            </button>
          </div>

          {/* TAB 1: CART */}
          {activeTab === 'cart' && (
            <div>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1.5rem', backgroundColor: '#F7FAF5', borderRadius: '20px', border: '1px dashed #DCE8D3' }}>
                  <ShoppingCart size={54} color="#A8C36E" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#21372F', marginBottom: '0.5rem' }}>Your Cart is Empty</h3>
                  <p style={{ color: '#5F685F', marginBottom: '1.75rem', maxWidth: '420px', margin: '0 auto 1.75rem auto' }}>
                    Explore our suite of enterprise digital products and add solutions to your cart.
                  </p>
                  <button onClick={() => onNavigate('products')} className="btn btn-primary">
                    Browse Products Catalog <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
                  
                  {/* Cart Items List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {cart.map((item) => {
                      const unitPrice = parsePrice(item.product.pricing);
                      const itemTotal = unitPrice * item.quantity;
                      return (
                        <div
                          key={item.product.id}
                          style={{
                            display: 'flex',
                            gap: '1.25rem',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '16px',
                            border: '1px solid #DCE8D3',
                            padding: '1.25rem',
                            alignItems: 'center',
                            boxShadow: '0 4px 16px rgba(33, 55, 47, 0.04)',
                            flexWrap: 'wrap',
                          }}
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            style={{ width: '90px', height: '80px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, minWidth: '180px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#899255', textTransform: 'uppercase' }}>
                              {item.product.category}
                            </span>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#21372F', margin: '0.2rem 0' }}>
                              {item.product.name}
                            </h4>
                            <span style={{ fontSize: '0.9rem', color: '#5F685F', fontWeight: 600 }}>
                              ${unitPrice} / license
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F7FAF5', padding: '0.3rem 0.6rem', borderRadius: '8px', border: '1px solid #DCE8D3' }}>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#21372F', display: 'flex', alignItems: 'center' }}
                            >
                              <Minus size={16} />
                            </button>
                            <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#21372F', display: 'flex', alignItems: 'center' }}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <div style={{ textAlign: 'right', minWidth: '90px' }}>
                            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#21372F', display: 'block' }}>
                              ${itemTotal}
                            </span>
                            <button
                              onClick={() => onRemoveFromCart(item.product.id)}
                              style={{ background: 'none', border: 'none', color: '#E53935', fontSize: '0.825rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <button onClick={onClearCart} style={{ background: 'none', border: 'none', color: '#5F685F', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}>
                        Clear Cart
                      </button>
                      <button onClick={() => onNavigate('products')} style={{ background: 'none', border: 'none', color: '#899255', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                        + Add More Products
                      </button>
                    </div>
                  </div>

                  {/* Summary Sidebar */}
                  <div
                    style={{
                      backgroundColor: '#F7FAF5',
                      borderRadius: '20px',
                      border: '1px solid #DCE8D3',
                      padding: '1.75rem',
                      boxShadow: '0 6px 20px rgba(33, 55, 47, 0.05)',
                    }}
                  >
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#21372F', marginBottom: '1.25rem' }}>Order Summary</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#5F685F' }}>
                      <span>Subtotal</span>
                      <span style={{ fontWeight: 600, color: '#21372F' }}>${subtotal}</span>
                    </div>

                    {discountApplied && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#4CAF50' }}>
                        <span>Promo Discount (15%)</span>
                        <span style={{ fontWeight: 600 }}>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', color: '#5F685F' }}>
                      <span>Estimated Tax & Support</span>
                      <span style={{ fontWeight: 600, color: '#4CAF50' }}>FREE</span>
                    </div>

                    {/* Promo Input */}
                    <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <input
                        type="text"
                        placeholder="Promo Code (DIGIRO15)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '0.65rem 0.9rem',
                          borderRadius: '8px',
                          border: '1px solid #DCE8D3',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      />
                      <button type="submit" className="btn btn-outline" style={{ padding: '0.65rem 1rem', fontSize: '0.85rem' }}>
                        Apply
                      </button>
                    </form>

                    <div style={{ borderTop: '1px solid #DCE8D3', paddingTop: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#21372F' }}>Total Amount</span>
                      <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#899255' }}>${total.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => setActiveTab('billing')}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', gap: '0.6rem' }}
                    >
                      Proceed to Billing & Checkout <ArrowRight size={18} />
                    </button>

                    <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#5F685F', fontSize: '0.82rem' }}>
                      <ShieldCheck size={16} color="#899255" /> 256-Bit Encrypted Instant Deployment
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1.5rem', backgroundColor: '#F7FAF5', borderRadius: '20px', border: '1px dashed #DCE8D3' }}>
                  <Heart size={54} color="#A8C36E" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#21372F', marginBottom: '0.5rem' }}>Your Wishlist is Empty</h3>
                  <p style={{ color: '#5F685F', marginBottom: '1.75rem', maxWidth: '420px', margin: '0 auto 1.75rem auto' }}>
                    Save products to your wishlist while exploring our software catalog.
                  </p>
                  <button onClick={() => onNavigate('products')} className="btn btn-primary">
                    Explore Software Catalog <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
                  {wishlist.map((product) => (
                    <div
                      key={product.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '20px',
                        border: '1px solid #DCE8D3',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 4px 16px rgba(33, 55, 47, 0.05)',
                      }}
                    >
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#899255', textTransform: 'uppercase' }}>
                          {product.category}
                        </span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#21372F', margin: '0.3rem 0' }}>
                          {product.name}
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: '#5F685F', marginBottom: '1.25rem', flex: 1, lineHeight: 1.5 }}>
                          {product.shortDesc}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #F0F5ED' }}>
                          <span style={{ fontWeight: 800, color: '#21372F', fontSize: '1.1rem' }}>{product.pricing}</span>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => onRemoveFromWishlist(product.id)}
                              style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #DCE8D3', background: '#F7FAF5', color: '#E53935', cursor: 'pointer' }}
                              title="Remove from wishlist"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button
                              onClick={() => onMoveToCartFromWishlist(product)}
                              className="btn btn-primary"
                              style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div>
              <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#21372F' }}>Purchased Licenses & Digital Builds</h3>
                  <p style={{ color: '#5F685F', fontSize: '0.95rem' }}>Access software installer files and activation license keys for your organization.</p>
                </div>
              </div>

              {downloads.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1.5rem', backgroundColor: '#F7FAF5', borderRadius: '20px', border: '1px dashed #DCE8D3' }}>
                  <Download size={54} color="#A8C36E" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#21372F', marginBottom: '0.5rem' }}>No Active Downloads</h3>
                  <p style={{ color: '#5F685F', marginBottom: '1.75rem' }}>Purchase software licenses from our catalog to get instant download access.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {downloads.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '20px',
                        border: '1px solid #DCE8D3',
                        padding: '1.75rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        alignItems: 'center',
                        boxShadow: '0 4px 18px rgba(33, 55, 47, 0.05)',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                        <img src={item.product.image} alt={item.product.name} style={{ width: '80px', height: '75px', borderRadius: '12px', objectFit: 'cover' }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#F0F5ED', color: '#899255', padding: '2px 8px', borderRadius: '6px' }}>
                              v{item.version}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#4CAF50', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <CheckCircle2 size={13} /> Active License
                            </span>
                          </div>
                          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#21372F' }}>{item.product.name}</h4>
                          <span style={{ fontSize: '0.85rem', color: '#5F685F' }}>Purchased: {item.datePurchased} • Size: {item.downloadSize}</span>
                        </div>
                      </div>

                      {/* License Key Box */}
                      <div style={{ backgroundColor: '#F7FAF5', padding: '0.9rem 1.1rem', borderRadius: '12px', border: '1px solid #DCE8D3' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#5F685F', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.25rem' }}>
                          License Activation Key
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                          <code style={{ fontFamily: 'monospace', fontWeight: 700, color: '#21372F', fontSize: '0.95rem', letterSpacing: '0.05em' }}>
                            {item.licenseKey}
                          </code>
                          <button
                            onClick={() => handleCopyLicense(item.licenseKey, item.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedLicenseId === item.id ? '#4CAF50' : '#899255', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.82rem', fontWeight: 600 }}
                          >
                            {copiedLicenseId === item.id ? <Check size={16} /> : <Copy size={16} />}
                            {copiedLicenseId === item.id ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      {/* Download Action Button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button
                          onClick={() => onViewProductDetails(item.product)}
                          className="btn btn-outline"
                          style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
                        >
                          Documentation
                        </button>
                        <button
                          onClick={() => handleDownload(item)}
                          disabled={downloadingId === item.id}
                          className="btn btn-primary"
                          style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', gap: '0.5rem' }}
                        >
                          <Download size={18} />
                          {downloadingId === item.id ? 'Preparing PDF...' : (item.product.isEBook ? 'Download PDF' : 'Download Build')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BILLING & CHECKOUT */}
          {activeTab === 'billing' && (
            <div>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1.5rem', backgroundColor: '#F7FAF5', borderRadius: '20px', border: '1px dashed #DCE8D3' }}>
                  <Receipt size={54} color="#899255" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#21372F', marginBottom: '0.5rem' }}>No Items Selected for Billing</h3>
                  <p style={{ color: '#5F685F', marginBottom: '1.75rem', maxWidth: '420px', margin: '0 auto 1.75rem auto' }}>
                    Select a product from our catalog or click "Buy Now" to reach the billing section.
                  </p>
                  <button onClick={() => onNavigate('products')} className="btn btn-primary">
                    Browse Products Catalog <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
                  
                  {/* Billing Details & Payment Method Options */}
                  <div style={{ backgroundColor: '#F7FAF5', borderRadius: '20px', border: '1px solid #DCE8D3', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#21372F', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      💳 Payment & Billing Details
                    </h3>

                    {/* Payment Method Selector */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#21372F', marginBottom: '0.5rem' }}>
                        Select Payment Method
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                        {[
                          { id: 'card', label: '💳 Credit Card' },
                          { id: 'paypal', label: '🅿️ PayPal' },
                          { id: 'bank', label: '🏦 Wire Transfer' },
                          { id: 'upi', label: '📲 UPI / Scan' },
                        ].map((pm) => (
                          <button
                            key={pm.id}
                            type="button"
                            onClick={() => setSelectedPaymentMethod(pm.id as any)}
                            style={{
                              padding: '0.75rem',
                              borderRadius: '12px',
                              border: selectedPaymentMethod === pm.id ? '2px solid #899255' : '1px solid #DCE8D3',
                              backgroundColor: selectedPaymentMethod === pm.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                              color: '#21372F',
                              fontWeight: 700,
                              fontSize: '0.88rem',
                              cursor: 'pointer',
                              textAlign: 'center',
                              boxShadow: selectedPaymentMethod === pm.id ? '0 4px 12px rgba(137, 146, 85, 0.15)' : 'none',
                            }}
                          >
                            {pm.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Card & Billing Form */}
                    <form onSubmit={handleConfirmCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                          Cardholder Full Name
                        </label>
                        <input
                          type="text"
                          required
                          defaultValue="Ruchi Kumari"
                          placeholder="Name as printed on card"
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #DCE8D3', fontSize: '0.9rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                          Card Number
                        </label>
                        <input
                          type="text"
                          required
                          defaultValue="•••• •••• •••• 4242"
                          placeholder="4532 0123 4567 8910"
                          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #DCE8D3', fontSize: '0.9rem', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            required
                            defaultValue="12/28"
                            placeholder="MM/YY"
                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #DCE8D3', fontSize: '0.9rem', outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#21372F', marginBottom: '0.35rem' }}>
                            CVC / Security Code
                          </label>
                          <input
                            type="text"
                            required
                            defaultValue="888"
                            placeholder="123"
                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #DCE8D3', fontSize: '0.9rem', outline: 'none' }}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessingCheckout}
                        className="btn btn-primary"
                        style={{ marginTop: '1rem', width: '100%', padding: '0.95rem', fontSize: '1.05rem', fontWeight: 700 }}
                      >
                        {isProcessingCheckout ? 'Processing Billing...' : `Pay & Access Downloads (€${total.toFixed(2)}) →`}
                      </button>
                    </form>
                  </div>

                  {/* Order Summary & Items List */}
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #DCE8D3', padding: '1.75rem', boxShadow: '0 6px 20px rgba(33, 55, 47, 0.05)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#21372F', marginBottom: '1.25rem' }}>
                      Selected Products ({cart.length})
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                      {cart.map((item) => (
                        <div key={item.product.id} style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', paddingBottom: '0.85rem', borderBottom: '1px solid #F0F5ED' }}>
                          <img src={item.product.image} alt={item.product.name} style={{ width: '54px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#21372F' }}>{item.product.name}</div>
                            <div style={{ fontSize: '0.78rem', color: '#5F685F' }}>Qty: {item.quantity} × {item.product.pricing}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid #DCE8D3', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#21372F' }}>Total Amount</span>
                      <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#899255' }}>€{total.toFixed(2)}</span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
