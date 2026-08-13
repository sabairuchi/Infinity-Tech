import React from 'react';
import { Filter } from 'lucide-react';

interface ProductFilterProps {
  categories: readonly string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  productCounts: Record<string, number>;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  productCounts,
}) => {
  if (!productCounts || !productCounts['All'] || productCounts['All'] === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.65rem',
        flexWrap: 'wrap',
        marginBottom: '3.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: '#5F685F',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginRight: '0.5rem',
        }}
      >
        <Filter size={16} /> Filter:
      </div>

      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        const count = cat === 'All' ? productCounts['All'] : productCounts[cat] || 0;

        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            style={{
              padding: '0.55rem 1.2rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: isSelected ? 700 : 500,
              border: isSelected ? '2px solid #899255' : '2px solid #DCE8D3',
              backgroundColor: isSelected ? '#899255' : '#FFFFFF',
              color: isSelected ? '#FFFFFF' : '#365648',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transform: isSelected ? 'scale(1.04)' : 'scale(1)',
              boxShadow: isSelected ? '0 4px 14px rgba(137, 146, 85, 0.3)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = '#A8C36E';
                e.currentTarget.style.backgroundColor = '#F7FAF5';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = '#DCE8D3';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }
            }}
          >
            {cat}
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : '#F0F5ED',
                color: isSelected ? '#FFFFFF' : '#899255',
                padding: '2px 7px',
                borderRadius: '9999px',
                minWidth: '22px',
                textAlign: 'center',
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
