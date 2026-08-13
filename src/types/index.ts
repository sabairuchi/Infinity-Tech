export type PageRoute = 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact' | 'products' | 'my-products' | 'login' | 'signup';

export interface User {
  id: string | number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone?: string;
  company?: string;
  token?: string;
  googleId?: string;
  profileImage?: string;
  authProvider?: 'email' | 'google';
  isNewUser?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  coverImage?: string;
  descriptionImage?: string;
  pdfUrl?: string;
  author?: string;
  pricing: string;
  status: 'Live' | 'Beta' | 'Coming Soon';
  version: string;
  features: string[];
  benefits: string[];
  techStack: string[];
  useCases: string[];
  integrations: string[];
  isEBook?: boolean;
  pageCount?: number;
  whatYoullLearn?: string[];
  whoThisBookIsFor?: string[];
  whyPython?: string;
  closingQuote?: string;
  format?: string;
  idealFor?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface DownloadItem {
  id: string;
  product: ProductItem;
  version: string;
  licenseKey: string;
  downloadSize: string;
  datePurchased: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  benefits: string[];
  features: string[];
  process: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web' | 'Mobile' | 'UI/UX' | 'E-commerce';
  shortDesc: string;
  fullDesc: string;
  client: string;
  year: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  keyFeatures: string[];
  impact: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  content: string[];
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}
