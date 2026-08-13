import type { ProductItem } from '../types';
import { PYTHON_FOR_DATA_COVER_BASE64, PYTHON_FOR_DATA_DESC_BASE64 } from './pythonDataAssets';

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
    image: PYTHON_FOR_DATA_COVER_BASE64,
    coverImage: PYTHON_FOR_DATA_COVER_BASE64,
    descriptionImage: PYTHON_FOR_DATA_DESC_BASE64,
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
    whatYoullLearn: [
      'Set up Python for data analysis',
      'Load, clean, and explore data with pandas',
      'Manipulate and transform data efficiently',
      'Visualize data with powerful charts and plots',
      'Work with real-world datasets and case studies',
      'Build end-to-end data analysis projects',
    ],
    whoThisBookIsFor: [
      'Aspiring data analysts and data scientists',
      'Students and professionals in any field',
      'Developers who want to level up their data skills',
      'Anyone who wants to make sense of data using Python',
    ],
    whyPython: 'Python is the language of data. Its simple syntax, rich ecosystem, and powerful libraries make it the go-to choice for data professionals worldwide.',
    closingQuote: 'TURN DATA INTO INSIGHT. INSIGHT INTO IMPACT. Let Python be your partner in the journey from data to decisions.',
    format: 'Digital Download (PDF)',
    idealFor: 'Aspiring data analysts, students, developers, data scientists, and lifelong learners.',
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
