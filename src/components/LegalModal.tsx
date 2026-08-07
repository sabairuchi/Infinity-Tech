import React from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface LegalModalProps {
  title: string;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ title, type, onClose }) => {
  if (!type) return null;

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
          maxWidth: '750px',
          width: '100%',
          maxHeight: '85vh',
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
          aria-label="Close Modal"
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <ShieldAlert size={24} color="#899255" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#21372F' }}>
            {title}
          </h2>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#5F685F', marginBottom: '1.5rem' }}>
          Last Updated: August 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.95rem', color: '#21372F', lineHeight: 1.6 }}>
          {type === 'privacy' ? (
            <>
              <p>
                At <strong>Infinity Tech</strong>, protecting your privacy and business data is paramount. This Privacy Policy outlines how we collect, process, and safeguard information when you use our website or engage our software development services.
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#365648' }}>1. Information We Collect</h3>
              <p>
                We collect personal information that you voluntarily provide to us through contact forms, newsletter subscriptions, or service inquiries. This includes your name, business email address, phone number, company name, and project scope details.
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#365648' }}>2. How We Use Information</h3>
              <p>
                Information collected is used strictly to respond to customer inquiries, deliver contracted software development services, provide technical updates, and improve user experiences across our digital properties. We never sell or lease customer data.
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#365648' }}>3. Data Security</h3>
              <p>
                We implement industry-standard encryption protocols (TLS/SSL), access controls, and security auditing to ensure your information remains confidential and protected against unauthorized access.
              </p>
            </>
          ) : (
            <>
              <p>
                These Terms of Service govern your access to and use of the website and digital consulting services provided by <strong>Infinity Tech</strong>. By accessing our services, you agree to comply with these terms.
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#365648' }}>1. Intellectual Property</h3>
              <p>
                All website content, custom graphic elements, proprietary brand assets, and code frameworks displayed on this platform are owned by Infinity Tech or licensed to us. Custom client work product ownership is transferred as specified in individual Master Services Agreements.
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#365648' }}>2. Limitation of Liability</h3>
              <p>
                Infinity Tech provides digital consulting and software development services on an "as is" and "as available" basis. While we maintain rigorous quality assurance standards, we are not liable for incidental or consequential damages resulting from third-party server outages or improper usage.
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#365648' }}>3. Governing Law</h3>
              <p>
                These terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.
              </p>
            </>
          )}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
