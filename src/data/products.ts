import type { ProductItem } from '../types';

export const PRODUCT_CATEGORIES = [
  'All',
  'E-Books',
  'SaaS Platforms',
  'Enterprise Tools',
  'Mobile Apps',
  'AI & Automation',
  'E-commerce',
] as const;

export const PRODUCTS_DATA: ProductItem[] = [];

export const FEATURED_PRODUCT_IDS: string[] = [];
