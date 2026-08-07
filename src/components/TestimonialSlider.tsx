import React, { useState, useEffect, useRef } from 'react';
import type { Testimonial } from '../types';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoplay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #DCE8D3',
        padding: 'clamp(2rem, 4vw, 3.5rem)',
        boxShadow: '0 12px 32px rgba(33, 55, 47, 0.06)',
        position: 'relative',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      <div style={{ position: 'absolute', top: '2rem', right: '2.5rem', color: '#DCE8D3', opacity: 0.8 }}>
        <Quote size={64} />
      </div>

      <div style={{ minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* Rating Stars */}
        <div>
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
            {Array.from({ length: activeTestimonial.rating }).map((_, idx) => (
              <Star key={idx} size={20} fill="#899255" color="#899255" />
            ))}
          </div>

          {/* Testimonial Quote */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#21372F',
              lineHeight: 1.6,
              fontStyle: 'italic',
              marginBottom: '2rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            "{activeTestimonial.quote}"
          </p>
        </div>

        {/* Client Author Info */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={activeTestimonial.avatar}
              alt={activeTestimonial.name}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #899255',
              }}
            />
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#21372F' }}>
                {activeTestimonial.name}
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#5F685F' }}>
                {activeTestimonial.role}, <strong style={{ color: '#365648' }}>{activeTestimonial.company}</strong>
              </p>
            </div>
          </div>

          {/* Controls: Prev / Next buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid #DCE8D3',
                backgroundColor: '#F7FAF5',
                color: '#21372F',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#899255';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F7FAF5';
                e.currentTarget.style.color = '#21372F';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid #DCE8D3',
                backgroundColor: '#F7FAF5',
                color: '#21372F',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#899255';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F7FAF5';
                e.currentTarget.style.color = '#21372F';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

      </div>

      {/* Pagination Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              width: idx === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: idx === currentIndex ? '#899255' : '#DCE8D3',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

    </div>
  );
};
