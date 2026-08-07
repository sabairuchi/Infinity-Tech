import type { ServiceItem, ProjectItem, BlogPost, Testimonial, ProcessStep } from '../types';

export const CLIENT_LOGOS = [
  { name: 'NovaWorks', label: 'NovaWorks' },
  { name: 'Apex Labs', label: 'Apex Labs' },
  { name: 'GreenByte', label: 'GreenByte' },
  { name: 'UrbanCore', label: 'UrbanCore' },
  { name: 'Vertex Studio', label: 'Vertex Studio' },
  { name: 'CloudNest', label: 'CloudNest' },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    category: 'Engineering',
    shortDesc: 'Custom high-performance web applications, scalable SaaS portals, and progressive enterprise websites built for maximum speed and conversion.',
    fullDesc: 'We architect and build tailored web applications using modern, reliable frameworks. From complex enterprise SaaS applications to customer portals, our solutions deliver lightning-fast response times, seamless responsiveness, and resilient security.',
    iconName: 'Globe',
    benefits: [
      'High-speed page load metrics and optimized Core Web Vitals',
      'SEO-ready architecture built for high search rankings',
      'Enterprise security & data encryption protocols',
      'Seamless multi-device responsiveness'
    ],
    features: [
      'Single-Page Applications (SPA) & Server-Side Rendering (SSR)',
      'Custom Content Management & Admin Dashboards',
      'RESTful & GraphQL API Integration',
      'Performance Auditing & Load Testing'
    ],
    process: [
      'Technical Discovery & Architecture Design',
      'Front-End & Back-End Concurrent Build',
      'API Integration & Database Optimization',
      'Comprehensive QA & Production Deployment'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Tailwind/CSS']
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    category: 'Engineering',
    shortDesc: 'Native and cross-platform mobile applications for iOS & Android with intuitive user flows and real-time offline synchronization.',
    fullDesc: 'Empower your mobile users with sleek, responsive native and hybrid mobile apps. We craft mobile experiences that integrate deeply with device APIs, biometric security, and push notification networks.',
    iconName: 'Smartphone',
    benefits: [
      'Cross-platform codebase efficiency reducing time-to-market',
      'Smooth 60fps animations and native touch responses',
      'Offline caching & background data synchronization',
      'End-to-end App Store & Play Store publication'
    ],
    features: [
      'iOS (Swift) & Android (Kotlin) / React Native Apps',
      'Push Notification & In-App Messaging Systems',
      'Biometric Authentication (FaceID/Fingerprint)',
      'In-App Payments & Subscription Engine'
    ],
    process: [
      'UX Wireframing & Mobile Navigation Mapping',
      'Cross-Platform App Development',
      'Device Testing & API Sync Verification',
      'App Store Optimization & Release Strategy'
    ],
    techStack: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'GraphQL', 'SQLite']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Design',
    shortDesc: 'Human-centered UI/UX design systems, interactive prototypes, and conversion-oriented product interfaces designed to engage users.',
    fullDesc: 'Great software starts with empathetic, research-backed design. We turn complex user journeys into elegant, intuitive interfaces backed by atomic design systems and interactive prototypes.',
    iconName: 'Palette',
    benefits: [
      'Significantly higher user retention and lower churn',
      'Accessible, WCAG 2.1 AA compliant color contrast & markup',
      'Scalable design systems that accelerate future development',
      'Data-driven UX optimizations based on real user feedback'
    ],
    features: [
      'User Research, Personas & Journey Mapping',
      'High-Fidelity Wireframes & Clickable Prototypes',
      'Comprehensive Component Design Systems in Figma',
      'Usability Testing & Conversion Rate Optimization (CRO)'
    ],
    process: [
      'User Interviews & Qualitative Competitor Audits',
      'Information Architecture & Low-Fi Sketching',
      'High-Fidelity UI Design & Micro-Animations',
      'Developer Handoff & Token Specification'
    ],
    techStack: ['Figma', 'Adobe CC', 'Principle', 'Design Tokens', 'Storybook']
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    category: 'Infrastructure',
    shortDesc: 'Scalable cloud infrastructure, automated CI/CD deployment pipelines, and multi-region microservices monitoring.',
    fullDesc: 'Modernize your server infrastructure with robust cloud architecture. We design auto-scaling, fault-tolerant cloud environments that optimize operational costs while keeping your data ultra-secure.',
    iconName: 'Cloud',
    benefits: [
      '99.99% operational uptime with automatic failover',
      'Infrastructure as Code (IaC) for zero-downtime releases',
      'Optimized cloud billing to reduce unnecessary cloud spending',
      'Automated daily backups and disaster recovery protocols'
    ],
    features: [
      'AWS, Google Cloud & Azure Architecture Design',
      'Docker Containerization & Kubernetes Orchestration',
      'Continuous Integration & Continuous Deployment (CI/CD)',
      '24/7 Monitoring, Logging & Intrusion Detection'
    ],
    process: [
      'Cloud Architecture Audit & Security Baseline',
      'Environment Provisioning with Terraform',
      'Application Migration & Pipeline Automation',
      'Stress Testing & Monitoring Setup'
    ],
    techStack: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    category: 'Intelligence',
    shortDesc: 'Custom AI workflows, LLM integration, intelligent document extraction, and business process automation built for operational speed.',
    fullDesc: 'Harness practical artificial intelligence to automate repetitive tasks, power intelligent search, and extract actionable insights from unstructured business data.',
    iconName: 'Cpu',
    benefits: [
      'Reduce operational manual labor hours by up to 70%',
      'Accelerate customer response times with AI assistants',
      'Standardized automated data processing with minimal error rates',
      'Secure, private AI model deployments preserving data privacy'
    ],
    features: [
      'Custom LLM Integration & Retrieval-Augmented Generation (RAG)',
      'Intelligent Document & Invoice Extraction',
      'Automated Workflow Pipelines (n8n / Python)',
      'Predictive Analytics & Customer Churn Modeling'
    ],
    process: [
      'Workflow Bottleneck Analysis & Feasibility Study',
      'Model Fine-Tuning & Data Pipeline Setup',
      'System Integration with ERP/CRM Systems',
      'Staff Training & continuous Accuracy Calibration'
    ],
    techStack: ['Python', 'OpenAI API', 'LangChain', 'Pinecone', 'FastAPI', 'PyTorch']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Growth',
    shortDesc: 'Data-backed search engine optimization (SEO), performance marketing, content strategy, and multi-channel growth funnels.',
    fullDesc: 'Turn digital platforms into steady customer engines. We engineer targeted marketing campaigns, organic SEO strategies, and high-converting landing pages that drive qualified traffic and measurable ROI.',
    iconName: 'TrendingUp',
    benefits: [
      'Consistent qualified lead generation for sales teams',
      'Lower customer acquisition costs (CAC) through SEO',
      'Transparent analytics dashboards tracking exact conversion paths',
      'Brand positioning that establishes market leadership'
    ],
    features: [
      'Technical SEO & On-Page Keyword Optimization',
      'PPC Advertising (Google Ads, Meta & LinkedIn)',
      'Conversion Rate Optimization (CRO) & A/B Testing',
      'Content Marketing & Technical Whitepaper Strategy'
    ],
    process: [
      'Market Research & Target Audience Profiling',
      'SEO & Content Funnel Strategy Blueprint',
      'Campaign Launch & Multi-Variant Creative Testing',
      'Weekly Optimization & Monthly Performance Reporting'
    ],
    techStack: ['Google Analytics 4', 'Semrush', 'Looker Studio', 'Ahrefs', 'Meta Ads Manager']
  }
];

export const PORTFOLIO_DATA: ProjectItem[] = [
  {
    id: 'fintrack-dashboard',
    title: 'FinTrack Dashboard',
    category: 'Web',
    shortDesc: 'Real-time financial intelligence dashboard for enterprise CFOs and treasury managers.',
    fullDesc: 'FinTrack is a real-time web platform enabling financial leaders to consolidate multiple bank accounts, track liquidity, automate invoice reconciliation, and forecast cash flow with predictive AI modeling.',
    client: 'FinTrack Global Ltd',
    year: '2025',
    image: '/assets/fintrack_dashboard.png',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'],
    liveUrl: '#',
    keyFeatures: [
      'Multi-currency cash flow consolidation',
      'Automated bank feed synchronization',
      'Custom financial reporting & PDF export',
      'Role-based security & audit trails'
    ],
    impact: 'Reduced monthly closing cycle from 12 days to under 4 hours for enterprise clients.'
  },
  {
    id: 'medicare-plus',
    title: 'MediCare+',
    category: 'Mobile',
    shortDesc: 'Telehealth mobile app connecting patients with medical specialists for instant virtual consultations.',
    fullDesc: 'MediCare+ provides patients with instant video consultations, prescription delivery management, vital tracking through smartwatch integrations, and HIPAA-compliant medical record storage.',
    client: 'MediCare Health Network',
    year: '2025',
    image: '/assets/medicare_plus.png',
    techStack: ['React Native', 'WebRTC', 'Node.js', 'Firebase', 'Swift'],
    liveUrl: '#',
    keyFeatures: [
      'HD Video consultations with WebRTC',
      'Apple HealthKit & Google Fit integration',
      'Digital e-Prescription generation',
      'Encrypted messaging with care teams'
    ],
    impact: 'Over 150,000 patient consultations conducted with a 4.9/5 store rating.'
  },
  {
    id: 'urbanstyle-ecommerce',
    title: 'UrbanStyle Store',
    category: 'E-commerce',
    shortDesc: 'Headless e-commerce web platform engineered for high-velocity fashion retail.',
    fullDesc: 'UrbanStyle required a headless e-commerce revamp capable of supporting flash sales with sub-second page loads, instant visual product filtering, and localized multi-currency checkout.',
    client: 'UrbanStyle Apparel',
    year: '2024',
    image: '/assets/urbanstyle_ecommerce.png',
    techStack: ['Next.js', 'Shopify Storefront API', 'Tailwind', 'Stripe', 'Vercel'],
    liveUrl: '#',
    keyFeatures: [
      'Sub-500ms global page loading times',
      'Instant faceted search with Algolia',
      'One-click Apple Pay & Google Pay checkout',
      'Inventory synchronization across 4 warehouses'
    ],
    impact: 'Boosted mobile conversion rates by 42% and increased average order value by 18%.'
  },
  {
    id: 'cloudnest-platform',
    title: 'CloudNest Portal',
    category: 'Web',
    shortDesc: 'Infrastructure management console for containerized microservice deployments.',
    fullDesc: 'CloudNest allows engineering teams to visualize cluster health, orchestrate automated blue/green deployments, and monitor API gateway latency across AWS and GCP environments.',
    client: 'CloudNest Systems',
    year: '2024',
    image: '/assets/hero_tech_3d.png',
    techStack: ['React', 'Go', 'Kubernetes API', 'Docker', 'Prometheus'],
    liveUrl: '#',
    keyFeatures: [
      'Visual Kubernetes cluster node mapping',
      'Automated rollbacks on elevated error thresholds',
      'Real-time CPU & memory telemetry',
      'Slack & PagerDuty incident integration'
    ],
    impact: 'Simplified multi-cloud deployment workflows for over 80 dev teams.'
  },
  {
    id: 'vertex-ai-assistant',
    title: 'Vertex Customer Intelligence',
    category: 'UI/UX',
    shortDesc: 'AI-driven customer support copilot interface designed for enterprise support desks.',
    fullDesc: 'We designed the user interface and interaction patterns for Vertex, an AI copilot that assists support agents by auto-generating ticket resolutions and searching internal knowledge bases in real time.',
    client: 'Vertex Studio',
    year: '2025',
    image: '/assets/about_team_culture.png',
    techStack: ['Figma', 'React', 'OpenAI API', 'Design Tokens'],
    liveUrl: '#',
    keyFeatures: [
      'Context-aware answer recommendations',
      'One-click agent tone adjustment',
      'Unified multi-channel inbox layout',
      'Dark and light mode design systems'
    ],
    impact: 'Cut average first-response times from 14 minutes down to 45 seconds.'
  },
  {
    id: 'greencore-iot',
    title: 'GreenCore Smart Energy',
    category: 'Web',
    shortDesc: 'Industrial IoT monitoring dashboard tracking energy consumption across manufacturing plants.',
    fullDesc: 'GreenCore delivers real-time IoT sensor telemetry, identifying energy anomalies, peak load spikes, and equipment maintenance schedules for smart factories.',
    client: 'GreenByte Industrial',
    year: '2024',
    image: '/assets/fintrack_dashboard.png',
    techStack: ['Vue.js', 'TimescaleDB', 'MQTT', 'Node.js', 'D3.js'],
    liveUrl: '#',
    keyFeatures: [
      'Real-time MQTT sensor data streaming',
      'Predictive maintenance alerts',
      'Carbon footprint emission reporting',
      'Interactive factory floor heatmaps'
    ],
    impact: 'Helped client factories reduce monthly power consumption by 24%.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'NovaWorks Inc.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    quote: 'Infinity Tech transformed our complex software requirements into a sleek, intuitive product. Their attention to design details, performance, and communication made working together effortless.'
  },
  {
    id: '2',
    name: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'Apex Labs',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    quote: 'The engineering depth of the Infinity Tech team is top-tier. They rebuilt our cloud architecture and web application on time and within budget. We saw an immediate 3x increase in system throughput.'
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'Head of Marketing',
    company: 'UrbanCore Retail',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    quote: 'Our new e-commerce platform launched without a single glitch during our peak holiday sale. Infinity Tech deliver solutions that are robust, beautiful, and truly drive business results.'
  },
  {
    id: '4',
    name: 'David Chen',
    role: 'Founder & CEO',
    company: 'GreenByte Systems',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    quote: 'Finding an agency that excels at both high-end UI design and complex back-end engineering is rare. Infinity Tech is our go-to partner for all digital product builds.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'We dive deep into your business goals, target audience, technical constraints, and competitive market landscape.',
    details: [
      'Stakeholder alignment sessions',
      'User persona definition',
      'Technical feasibility audit',
      'Project scope & milestone roadmap'
    ]
  },
  {
    number: '02',
    title: 'Plan',
    description: 'We map out the system architecture, component structures, data models, and user journeys.',
    details: [
      'Information architecture blueprinting',
      'Wireframing core application screens',
      'Tech stack selection & database schema',
      'Sprint cadence & timeline definition'
    ]
  },
  {
    number: '03',
    title: 'Design',
    description: 'Our design team crafts high-fidelity interfaces and interactive prototypes that embody your brand identity.',
    details: [
      'Custom UI component design system',
      'Clickable prototype testing',
      'Micro-animations & transition design',
      'WCAG accessibility verification'
    ]
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Engineers write clean, modular, tested code using agile bi-weekly sprints with continuous integration.',
    details: [
      'Front-end & back-end engineering',
      'Automated unit & end-to-end testing',
      'REST & GraphQL API integrations',
      'Performance benchmarking'
    ]
  },
  {
    number: '05',
    title: 'Launch',
    description: 'We deploy your platform to production, monitor real-world telemetry, and provide continuous support.',
    details: [
      'Zero-downtime production deployment',
      'Post-launch telemetry & monitoring',
      'Documentation & team training',
      'Ongoing optimization & updates'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'modern-web-applications',
    title: 'How Businesses Can Scale With Modern Web Applications',
    slug: 'scaling-with-modern-web-apps',
    category: 'Engineering',
    date: 'August 2, 2026',
    readTime: '5 min read',
    author: {
      name: 'Alex Rivera',
      role: 'Lead Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    summary: 'Discover how serverless architectures, modern JavaScript frameworks, and component design patterns enable digital businesses to scale effortlessly while maintaining sub-second speeds.',
    content: [
      'In today’s fast-moving digital economy, speed and scalability are no longer nice-to-have features; they are foundational business metrics. Customers expect instant page loads, zero downtime, and fluid interactions across all devices.',
      'Legacy monolithic architectures often choke under sudden traffic spikes and slow down product development velocity. By transitioning to modular, component-based architectures with API-first integrations, organizations can push updates faster with near-zero friction.',
      'Edge deployment networks and intelligent client-side caching ensure that users receive instant responses regardless of their global geographic location.',
      'Investing in a modern web application codebase provides long-term dividend yields by drastically reducing maintenance debt and accelerating future feature delivery.'
    ],
    image: '/assets/blog_web_apps.png',
    tags: ['Web Dev', 'Architecture', 'SaaS', 'Scalability']
  },
  {
    id: 'why-ui-ux-matters',
    title: 'Why Good UI/UX Matters: Turning Visitors Into Customers',
    slug: 'why-good-ui-ux-matters',
    category: 'Design',
    date: 'July 24, 2026',
    readTime: '4 min read',
    author: {
      name: 'Maya Lin',
      role: 'Head of Product Design',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200'
    },
    summary: 'A look into how intuitive user interface patterns, micro-interactions, and visual hierarchy directly influence conversion rates and customer loyalty.',
    content: [
      'First impressions in the digital world occur in fractions of a second. If a user encounters confusing navigation, visually cluttered layouts, or slow responses, they leave without taking action.',
      'Human-centered design is not merely about aesthetics; it is about reducing cognitive load. When an interface clearly guides the user’s eye toward the next logical step, conversion happens naturally.',
      'Micro-animations—such as subtle button hover states, smooth page transitions, and responsive input feedback—reassure users that the platform is responsive and trustworthy.',
      'Consistently auditing your platform for accessibility (WCAG) ensures that every single visitor, regardless of physical ability or device constraint, can enjoy a flawless user experience.'
    ],
    image: '/assets/blog_ui_ux.png',
    tags: ['UI/UX', 'Product Design', 'CRO', 'Accessibility']
  },
  {
    id: 'building-better-digital-products',
    title: 'Building Better Digital Products: A Strategic Guide for 2026',
    slug: 'building-better-digital-products',
    category: 'Strategy',
    date: 'July 15, 2026',
    readTime: '6 min read',
    author: {
      name: 'Daniel Vance',
      role: 'Managing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    summary: 'Key strategies for product managers and founders to validate ideas quickly, optimize sprint iterations, and deliver software users truly love.',
    content: [
      'Building digital software products requires balancing vision with market realities. The most successful products start small, validate core user hypotheses, and iterate based on real usage data.',
      'Aligning cross-functional teams around a unified design system and technical blueprint prevents costly rework down the line.',
      'Automating testing and continuous integration (CI/CD) allows product teams to ship small code improvements daily rather than nerve-wracking quarterly releases.',
      'By focusing relentlessly on user outcomes rather than output velocity alone, companies build enduring digital assets that stand out in crowded markets.'
    ],
    image: '/assets/blog_digital_products.png',
    tags: ['Product Strategy', 'Agile', 'Engineering', 'Innovation']
  }
];

export const COMPANY_STATS = [
  { label: 'Years Experience', value: 8, suffix: '+' },
  { label: 'Projects Completed', value: 250, suffix: '+' },
  { label: 'Happy Clients', value: 120, suffix: '+' },
  { label: 'Tech Experts', value: 20, suffix: '+' },
];
