import React from 'react';
import type { BlogPost } from '../types';
import { X, Calendar, Clock } from 'lucide-react';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  if (!post) return null;

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
        <button
          onClick={onClose}
          aria-label="Close Article Reader"
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

        <span className="badge-pill" style={{ marginBottom: '1rem' }}>
          <span className="dot" /> {post.category}
        </span>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#21372F', marginBottom: '1rem', lineHeight: 1.3 }}>
          {post.title}
        </h1>

        {/* Author & Meta Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid #F0F5ED' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: '#21372F' }}>{post.author.name}</strong>
              <span style={{ fontSize: '0.8rem', color: '#5F685F' }}>{post.author.role}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.85rem', color: '#5F685F', marginLeft: 'auto' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={15} color="#899255" /> {post.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={15} color="#899255" /> {post.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem', border: '1px solid #DCE8D3' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
        </div>

        {/* Article Body Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.025rem', color: '#21372F', lineHeight: 1.7, marginBottom: '2rem' }}>
          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid #F0F5ED', paddingTop: '1.5rem' }}>
          <strong style={{ fontSize: '0.85rem', color: '#5F685F' }}>Tags:</strong>
          {post.tags.map((tag) => (
            <span key={tag} style={{ padding: '0.25rem 0.75rem', backgroundColor: '#F0F5ED', color: '#365648', fontSize: '0.8rem', fontWeight: 600, borderRadius: '9999px' }}>
              #{tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};
