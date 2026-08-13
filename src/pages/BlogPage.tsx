import React, { useState } from 'react';
import type { PageRoute, BlogPost } from '../types';
import { BLOG_POSTS } from '../data';
import { CTASection } from '../components/CTASection';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBlogModal: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenBlogModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Engineering', 'Design', 'Strategy'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div>

      {/* Hero Banner */}
      <section style={{ backgroundColor: '#F7FAF5', padding: 'clamp(3.5rem, 6vw, 5.5rem) 0', borderBottom: '1px solid #DCE8D3' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="badge-pill" style={{ marginBottom: '1.25rem' }}>
            <span className="dot" /> INSIGHTS & ARTICLES
          </span>
          <h1 className="heading-lg" style={{ marginBottom: '1.5rem', color: '#21372F' }}>
            Thoughts on Technology & <span style={{ color: '#899255' }}>Digital Growth</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: '#5F685F', lineHeight: 1.6 }}>
            Explore technical deep dives, UX design principles, software architecture strategies, and digital transformation guides written by our senior engineering team.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section style={{ padding: 'clamp(3rem, 5vw, 5rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3.5rem', maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
            {/* Search Input Bar */}
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                placeholder="Search articles, keywords, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem 1rem 3.2rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #DCE8D3',
                  backgroundColor: '#F7FAF5',
                  color: '#21372F',
                  outline: 'none',
                }}
              />
              <Search size={20} color="#899255" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* Category Tags */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '0.5rem 1.25rem',
                      borderRadius: '9999px',
                      border: '1px solid',
                      borderColor: isSelected ? '#899255' : '#DCE8D3',
                      backgroundColor: isSelected ? '#899255' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#21372F',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Article Grid */}
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#5F685F' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>No articles match your search query.</p>
              <p style={{ fontSize: '0.95rem' }}>Try searching for alternate keywords like "Web Dev", "UI/UX", or "Strategy".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="btn btn-outline"
                style={{ marginTop: '1.5rem' }}
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => onOpenBlogModal(post)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #DCE8D3',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 16px 32px rgba(33, 55, 47, 0.08)';
                    e.currentTarget.style.borderColor = '#899255';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#DCE8D3';
                  }}
                >
                  <div>
                    <div style={{ height: '220px', overflow: 'hidden', backgroundColor: '#F0F5ED' }}>
                      <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ padding: '1.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem', color: '#5F685F', marginBottom: '0.85rem' }}>
                        <span style={{ color: '#899255', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {post.category}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={14} /> {post.date}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={14} /> {post.readTime}</span>
                        </div>
                      </div>

                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#21372F', marginBottom: '0.85rem', lineHeight: 1.35 }}>
                        {post.title}
                      </h3>

                      <p style={{ color: '#5F685F', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  <div style={{ padding: '0 1.75rem 1.75rem 1.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#899255', fontWeight: 700, fontSize: '0.9rem' }}>
                    Read Article <ArrowRight size={18} />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <CTASection onNavigate={onNavigate} />

    </div>
  );
};
