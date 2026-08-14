import React, { useState } from 'react';
import type { PageRoute, ContactFormData } from '../types';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Web Development',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project or inquiry';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Format WhatsApp message to send directly to contact number +91 93155 82116
    const whatsappMsg = `*New Inquiry from Digiro Website*\n\n*Full Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'N/A'}\n*Company:* ${formData.company || 'N/A'}\n*Service Requested:* ${formData.service}\n\n*Message:*\n${formData.message}`;
    const whatsappUrl = `https://wa.me/919315582116?text=${encodeURIComponent(whatsappMsg)}`;

    // Automatically open WhatsApp chat in new tab
    window.open(whatsappUrl, '_blank');

    // Real API call to Express backend
    try {
      const customApi = import.meta.env.VITE_API_BASE_URL;
      const apiUrl = customApi
        ? `${customApi.replace(/\/$/, '')}/api/contact`
        : (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
            ? '/api/contact'
            : 'http://localhost:5000/api/contact');

      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => {});
      
      setSubmittedData({ ...formData });
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Web Development',
        message: '',
      });
      setErrors({});
    } catch (err: any) {
      setSubmittedData({ ...formData });
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Web Development',
        message: '',
      });
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div>

      {/* Hero Banner */}
      <section style={{ backgroundColor: '#F7FAF5', padding: 'clamp(3.5rem, 6vw, 5.5rem) 0', borderBottom: '1px solid #DCE8D3' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="badge-pill" style={{ marginBottom: '1.25rem' }}>
            <span className="dot" /> CONTACT US
          </span>
          <h1 className="heading-lg" style={{ marginBottom: '1.5rem', color: '#21372F' }}>
            Let's Build Something <span style={{ color: '#899255' }}>Great Together</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: '#5F685F', lineHeight: 1.6 }}>
            Have a project in mind, need technical architecture advice, or want to explore potential collaboration? Send us a message and our lead team will respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
            
            {/* Left Contact Details & Map Component */}
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#21372F', marginBottom: '1.25rem' }}>
                Contact Information
              </h2>
              <p style={{ color: '#5F685F', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                Whether you are a global enterprise or a scaling startup, our team is ready to discuss your digital software requirements.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F0F5ED', border: '1px solid #DCE8D3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} color="#899255" />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#21372F', marginBottom: '0.2rem' }}>Email Inquiry</strong>
                    <a href="mailto:contact@digiro.in" style={{ color: '#899255', fontWeight: 600, fontSize: '0.95rem' }}>
                      contact@digiro.in
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F0F5ED', border: '1px solid #DCE8D3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} color="#899255" />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#21372F', marginBottom: '0.2rem' }}>Phone Line</strong>
                    <a href="tel:+919315582116" style={{ color: '#899255', fontWeight: 600, fontSize: '0.95rem' }}>
                      +91 93155 82116
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F0F5ED', border: '1px solid #DCE8D3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} color="#899255" />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#21372F', marginBottom: '0.2rem' }}>Headquarters</strong>
                    <span style={{ color: '#5F685F', fontSize: '0.95rem', lineHeight: 1.5, display: 'block' }}>
                      100 Technology Plaza, Suite 400<br />San Francisco, CA 94107
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F0F5ED', border: '1px solid #DCE8D3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} color="#899255" />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#21372F', marginBottom: '0.2rem' }}>Business Hours</strong>
                    <span style={{ color: '#5F685F', fontSize: '0.95rem' }}>
                      Monday – Saturday: 9:30 AM – 6:30 PM
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Interactive Form Container */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #DCE8D3',
                padding: 'clamp(1.75rem, 3.5vw, 3rem)',
                boxShadow: '0 12px 36px rgba(33, 55, 47, 0.06)',
              }}
            >
              {isSuccess ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', animation: 'fadeInUp 0.3s ease forwards' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#EBF4E5', color: '#899255', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#21372F', marginBottom: '0.75rem' }}>
                    Message Sent Successfully!
                  </h3>
                  <p style={{ color: '#5F685F', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Thank you, <strong>{submittedData?.name}</strong>. Our business engineering team has received your message and will get back to you at <strong>{submittedData?.email}</strong> shortly.
                  </p>
                  
                  <div style={{ backgroundColor: '#F7FAF5', padding: '1rem', borderRadius: '10px', border: '1px solid #DCE8D3', textAlign: 'left', fontSize: '0.875rem', color: '#21372F', marginBottom: '2rem' }}>
                    <strong style={{ display: 'block', color: '#365648', marginBottom: '0.3rem' }}>Submission Summary:</strong>
                    <div>Service: {submittedData?.service}</div>
                    {submittedData?.company && <div>Company: {submittedData.company}</div>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {submittedData && (
                      <a
                        href={`https://wa.me/919315582116?text=${encodeURIComponent(`*New Inquiry from Digiro Website*\n\n*Full Name:* ${submittedData.name}\n*Email:* ${submittedData.email}\n*Phone:* ${submittedData.phone || 'N/A'}\n*Company:* ${submittedData.company || 'N/A'}\n*Service Requested:* ${submittedData.service}\n\n*Message:*\n${submittedData.message}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn"
                        style={{
                          width: '100%',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          backgroundColor: '#25D366',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          padding: '0.85rem',
                          borderRadius: '8px',
                          border: 'none',
                        }}
                      >
                        <MessageCircle size={18} /> Open WhatsApp Chat (+91 93155 82116)
                      </a>
                    )}
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn"
                      style={{
                        width: '100%',
                        backgroundColor: '#F0F5ED',
                        color: '#21372F',
                        border: '1px solid #DCE8D3',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#21372F', marginBottom: '0.5rem' }}>
                    Send Us a Message
                  </h3>

                  {/* Name Input */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#21372F', marginBottom: '0.4rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: errors.name ? '#C53030' : '#DCE8D3',
                        backgroundColor: '#F7FAF5',
                        color: '#21372F',
                        outline: 'none',
                      }}
                    />
                    {errors.name && (
                      <span style={{ color: '#C53030', fontSize: '0.8rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={14} /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#21372F', marginBottom: '0.4rem' }}>
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sarah@company.com"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          fontSize: '0.95rem',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: errors.email ? '#C53030' : '#DCE8D3',
                          backgroundColor: '#F7FAF5',
                          color: '#21372F',
                          outline: 'none',
                        }}
                      />
                      {errors.email && (
                        <span style={{ color: '#C53030', fontSize: '0.8rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <AlertCircle size={14} /> {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#21372F', marginBottom: '0.4rem' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          fontSize: '0.95rem',
                          borderRadius: '8px',
                          border: '1px solid #DCE8D3',
                          backgroundColor: '#F7FAF5',
                          color: '#21372F',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Company & Service Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#21372F', marginBottom: '0.4rem' }}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          fontSize: '0.95rem',
                          borderRadius: '8px',
                          border: '1px solid #DCE8D3',
                          backgroundColor: '#F7FAF5',
                          color: '#21372F',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#21372F', marginBottom: '0.4rem' }}>
                        Interested Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          fontSize: '0.95rem',
                          borderRadius: '8px',
                          border: '1px solid #DCE8D3',
                          backgroundColor: '#F7FAF5',
                          color: '#21372F',
                          outline: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Cloud Solutions">Cloud Solutions</option>
                        <option value="AI & Automation">AI & Automation</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#21372F', marginBottom: '0.4rem' }}>
                      Project Details & Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project goals, technical requirements, timeline..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: errors.message ? '#C53030' : '#DCE8D3',
                        backgroundColor: '#F7FAF5',
                        color: '#21372F',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                    {errors.message && (
                      <span style={{ color: '#C53030', fontSize: '0.8rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={14} /> {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      fontSize: '1rem',
                      marginTop: '0.5rem',
                      opacity: isSubmitting ? 0.75 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
