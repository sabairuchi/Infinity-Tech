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

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'python-for-data',
    name: 'Python for Data',
    tagline: 'The Complete Guide to Data Analysis, Manipulation, and Visualization',
    category: 'E-Books',
    shortDesc: 'Python for Data is your all-in-one guide to harnessing the power of Python for data analysis, manipulation, and visualization. Master pandas, Matplotlib, NumPy, scikit-learn, and real-world workflows.',
    fullDesc: "Python for Data is your all-in-one guide to harnessing the power of Python for data analysis, manipulation, and visualization. Whether you're a beginner looking to build a strong foundation or an experienced developer wanting to sharpen your data skills, this book takes you step-by-step through the tools, techniques, and real-world workflows used by data professionals. From working with data using pandas to creating insightful visualizations with Matplotlib, this book blends clear explanations with practical examples to help you turn raw data into meaningful insights.",
    image: '/assets/python_for_data_cover.jpg',
    coverImage: '/assets/python_for_data_cover.jpg',
    descriptionImage: '/assets/python_for_data_description.jpg',
    pdfUrl: '/assets/python_for_data.pdf',
    pricing: '€100',
    status: 'Live',
    version: '1.0',
    isEBook: true,
    pageCount: 28,
    author: 'Dr. Alex Chen',
    features: [
      '28-page comprehensive guide covering data analysis, manipulation, and visualization',
      'Step-by-step setup for Python, NumPy, pandas, Matplotlib, scikit-learn, and JupyterLab',
      'In-depth breakdown of DataFrames, Series, missing data handling, and grouping',
      'Complete guide to Matplotlib charts, line plots, histograms, and multi-panel figures',
      'Introduction to Machine Learning, train/test split, and Scikit-learn pipelines',
      'Includes Quick Reference Cheat Sheet and practice notes for instant real-world application',
    ],
    benefits: [
      'Build a rock-solid foundation in Python data analysis and visualization',
      'Master essential tools used by top data analysts and data scientists globally',
      'Transform raw messy datasets into clean, actionable insights and business intelligence',
      'Turn data into insight, and insight into high-impact business decisions',
    ],
    techStack: ['Python 3', 'NumPy', 'pandas', 'Matplotlib', 'scikit-learn', 'JupyterLab', '28 Pages PDF'],
    useCases: ['Aspiring Data Analysts & Scientists', 'Students & Academic Research', 'Developers Expanding Data Skills', 'Enterprise Business Intelligence'],
    integrations: ['Instant PDF Download', 'Mobile & Tablet Viewers', 'Print Ready', 'Jupyter Notebook Friendly'],
  },
];

export const FEATURED_PRODUCT_IDS: string[] = ['python-for-data'];
