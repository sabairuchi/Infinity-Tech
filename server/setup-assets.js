import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateEbookPdf } from './generate-pdf.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicAssetsDir = path.join(__dirname, '..', 'public', 'assets');
const distAssetsDir = path.join(__dirname, '..', 'dist', 'assets');

// Generated cover image path from artifact directory
const artifactImage = 'C:\\Users\\kisha\\.gemini\\antigravity-ide\\brain\\b6a48fdb-8a97-47df-8120-a6f5448e7210\\cloud_computing_blueprint_1786428611634.png';
const targetImagePublic = path.join(publicAssetsDir, 'cloud_computing_blueprint.png');
const targetPdfPublic = path.join(publicAssetsDir, 'cloud-computing-blueprint.pdf');

export function ensureAssetsExist() {
  try {
    if (!fs.existsSync(publicAssetsDir)) {
      fs.mkdirSync(publicAssetsDir, { recursive: true });
    }

    // 1. Copy generated image cover if present
    if (fs.existsSync(artifactImage)) {
      fs.copyFileSync(artifactImage, targetImagePublic);
      console.log(`[Setup Assets] Copied cover image to ${targetImagePublic}`);
    }

    // 2. Generate PDF eBook
    const chapters = [
      {
        title: 'CHAPTER 1: INTRODUCTION TO CLOUD COMPUTING',
        lines: [
          'CHAPTER 1: INTRODUCTION TO CLOUD COMPUTING',
          '--------------------------------------------------',
          'Cloud computing is the delivery of computing services over the internet.',
          'Instead of buying expensive computers, servers, or storage devices, users can',
          'access these resources whenever they need them through an internet connection.',
          '',
          'In simple words, cloud computing allows you to use technology without owning',
          'all the physical hardware. The cloud service provider manages the infrastructure,',
          'while users focus on their work, applications, or business.',
          '',
          'Key Milestones:',
          '- 1960s: Time-sharing concept introduced by John McCarthy.',
          '- 1990s: Internet growth enabled initial online hosting services.',
          '- 2006: Amazon launched AWS renting compute power & storage.',
          '- 2010: Microsoft Azure launched for enterprise applications.',
          '- 2011: Google expanded cloud services with GCP.',
          '- Today: Cloud powers global businesses, healthcare, finance, AI, and education.',
          '',
          '5 Core Characteristics:',
          '1. On-Demand Self-Service',
          '2. Broad Network Access',
          '3. Resource Pooling',
          '4. Rapid Elasticity',
          '5. Measured Service',
        ]
      },
      {
        title: 'CHAPTER 2: CLOUD SERVICE MODELS',
        lines: [
          'CHAPTER 2: CLOUD SERVICE MODELS (IaaS, PaaS, SaaS)',
          '--------------------------------------------------',
          'Cloud computing provides different types of services tailored to user requirements:',
          '',
          '1. Infrastructure as a Service (IaaS):',
          '   - Offers virtualized computing resources like servers, storage, networking.',
          '   - User manages OS, software, applications, and security settings.',
          '   - Examples: AWS EC2, Azure VMs, Google Compute Engine.',
          '',
          '2. Platform as a Service (PaaS):',
          '   - Provides a complete development and deployment environment.',
          '   - Provider manages infrastructure, OS, and runtime.',
          '   - Developers focus on writing code and application logic.',
          '   - Examples: Heroku, AWS Elastic Beanstalk, Google App Engine.',
          '',
          '3. Software as a Service (SaaS):',
          '   - Ready-to-use software accessed over a web browser or mobile app.',
          '   - Provider manages application code, servers, updates, and maintenance.',
          '   - Examples: Gmail, Google Docs, Microsoft 365, Zoom, Dropbox.',
        ]
      },
      {
        title: 'CHAPTER 3: CLOUD DEPLOYMENT MODELS',
        lines: [
          'CHAPTER 3: CLOUD DEPLOYMENT MODELS',
          '--------------------------------------------------',
          'A cloud deployment model defines where infrastructure is located, who owns it,',
          'and who has access to it:',
          '',
          '1. Public Cloud:',
          '   - Infrastructure owned and managed by third-party cloud providers.',
          '   - Resources shared among multiple organizations (multitenancy).',
          '   - Highly scalable and cost-effective.',
          '',
          '2. Private Cloud:',
          '   - Dedicated infrastructure used exclusively by a single organization.',
          '   - Hosted on-premises or by a third-party provider.',
          '   - Ideal for banks, hospitals, and government agencies needing high security.',
          '',
          '3. Hybrid Cloud:',
          '   - Combines public and private clouds, allowing data/apps to be shared.',
          '   - Offers flexibility and compliance optimization for enterprises.',
          '',
          '4. Community Cloud:',
          '   - Shared by several organizations with common goals or regulatory needs.',
        ]
      },
      {
        title: 'CHAPTER 4: CLOUD INFRASTRUCTURE & VIRTUALIZATION',
        lines: [
          'CHAPTER 4: CLOUD INFRASTRUCTURE',
          '--------------------------------------------------',
          'Cloud infrastructure is a combination of hardware and software resources:',
          '- Data Centers: Secure facilities housing thousands of high-performance servers.',
          '- Virtualization: Technology that allows one physical server to run multiple',
          '  independent Virtual Machines (VMs), maximizing hardware utilization.',
          '- Containers: Lightweight packaging (e.g. Docker, Kubernetes) that shares the',
          '  host OS kernel, enabling fast startup times and consistent environments.',
          '- Cloud Storage: Object Storage (S3), File Storage, and Block Storage (EBS).',
          '- Cloud Networking: IP addresses, DNS, Firewalls, Load Balancers.',
        ]
      },
      {
        title: 'CHAPTER 5: MAJOR CLOUD PLATFORMS (AWS, AZURE, GCP)',
        lines: [
          'CHAPTER 5: MAJOR CLOUD PLATFORMS',
          '--------------------------------------------------',
          'Three primary platforms dominate the global cloud market:',
          '',
          '1. Amazon Web Services (AWS) [Launched 2006]:',
          '   - World\'s largest cloud provider with 200+ fully featured services.',
          '   - Key Services: EC2 (Compute), S3 (Storage), RDS (Database), Lambda (Serverless).',
          '',
          '2. Microsoft Azure [Launched 2010]:',
          '   - Seamlessly integrates with Microsoft enterprise software ecosystem.',
          '   - Key Services: Azure VMs, Azure SQL Database, Azure Functions, Entra ID.',
          '',
          '3. Google Cloud Platform (GCP) [Launched 2011]:',
          '   - Industry leader in data analytics, AI, ML, and Kubernetes container orchestration.',
          '   - Key Services: Compute Engine, Cloud Storage, BigQuery, GKE.',
        ]
      },
      {
        title: 'CHAPTER 6: CLOUD SECURITY & IAM',
        lines: [
          'CHAPTER 6: CLOUD SECURITY & IDENTITY MANAGEMENT',
          '--------------------------------------------------',
          'Cloud security protects cloud systems, applications, and data from cyber threats:',
          '',
          'Shared Responsibility Model:',
          '- Cloud Provider: Responsible for security OF the cloud (physical data centers,',
          '  hardware infrastructure, host hypervisors).',
          '- Customer: Responsible for security IN the cloud (user accounts, permissions,',
          '  data encryption, OS patches, network configuration).',
          '',
          'Identity and Access Management (IAM):',
          '- Controls WHO can access WHICH resources and WHAT actions they can perform.',
          '- Enforces Principle of Least Privilege.',
          '- Requires Multi-Factor Authentication (MFA) and strong encryption keys.',
        ]
      },
      {
        title: 'CHAPTER 7: CLOUD STORAGE & DATABASES',
        lines: [
          'CHAPTER 7: CLOUD STORAGE & DATABASES',
          '--------------------------------------------------',
          'Database Architectures in Cloud:',
          '',
          '1. Relational SQL Databases:',
          '   - Structured table-based data with strict schema and ACID compliance.',
          '   - Examples: MySQL, PostgreSQL, Microsoft SQL Server, Oracle.',
          '   - Managed Services: AWS RDS, Azure SQL, Google Cloud SQL.',
          '',
          '2. Non-Relational NoSQL Databases:',
          '   - Flexible dynamic schema for unstructured, high-scale, real-time data.',
          '   - Examples: MongoDB, Amazon DynamoDB, Firebase Firestore.',
          '',
          'Backup & Disaster Recovery (DR):',
          '- Backup & Restore, Data Replication, Failover strategies to eliminate single points of failure.',
        ]
      },
      {
        title: 'CHAPTER 8: REAL-WORLD CLOUD APPLICATIONS',
        lines: [
          'CHAPTER 8: REAL-WORLD APPLICATIONS & INDUSTRY IMPACT',
          '--------------------------------------------------',
          'Cloud computing powers critical daily services across industries:',
          '- Education: Virtual classrooms, digital libraries, remote assignment submission.',
          '- Healthcare: Electronic Health Records (EHR), HIPAA-compliant telehealth, medical AI.',
          '- Financial Services: Instant digital payments, AI fraud detection, high-frequency trading.',
          '- E-Commerce: Auto-scaling during sales events, global CDN, personalized recommendations.',
        ]
      },
      {
        title: 'CHAPTER 9: CLOUD CAREERS & CERTIFICATIONS',
        lines: [
          'CHAPTER 9: CLOUD CAREERS & CERTIFICATIONS',
          '--------------------------------------------------',
          'Career Opportunities in Cloud:',
          '- Cloud Engineer, Cloud Architect, DevOps Engineer, Cloud Security Specialist.',
          '',
          'Top Industry Certifications:',
          '1. AWS Certified Cloud Practitioner / Solutions Architect',
          '2. Microsoft Certified: Azure Fundamentals (AZ-900)',
          '3. Google Cloud Digital Leader / Associate Cloud Engineer',
          '',
          'Roadmap for Success: Learn Fundamentals -> Master Scripting/Linux -> Build Hands-On',
          'Projects -> Earn Certifications -> Create Portfolio.',
        ]
      },
      {
        title: 'CHAPTER 10: FUTURE OF CLOUD COMPUTING & CONCLUSION',
        lines: [
          'CHAPTER 10: FUTURE OF CLOUD COMPUTING & CONCLUSION',
          '--------------------------------------------------',
          'Emerging Trends Shaping the Next Decade:',
          '- Artificial Intelligence (AI) & Machine Learning (ML) integration.',
          '- Edge Computing: Processing data closer to the source for ultra-low latency.',
          '- Serverless Architecture: Event-driven execution without managing server instances.',
          '- Internet of Things (IoT): Connecting billions of smart devices securely.',
          '',
          '==================================================',
          'Thank you for downloading Cloud Computing Blueprint!',
          'Publisher: Digiro Digital Solutions',
          'Keep Learning. Keep Building. Keep Growing.',
          '==================================================',
        ]
      }
    ];

    generateEbookPdf(targetPdfPublic, 'Cloud Computing Blueprint', chapters);

  } catch (err) {
    console.error('[Setup Assets Error]', err);
  }
}

// Run immediately if called directly
if (process.argv[1] && process.argv[1].endsWith('setup-assets.js')) {
  ensureAssetsExist();
}
