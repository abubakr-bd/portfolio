export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Website' | 'Video' | 'Motion' | 'Branding' | 'Graphic Design' | 'Business / Startup';
  client: string;
  year: string;
  role: string;
  shortDescription: string;
  featured: boolean;
  published: boolean;
  problem: string;
  idea: string;
  process: string;
  result: string;
  personalContribution: string;
  outcome: string;
  thumbnail: string;
  gallery: string[];
  videos?: string[];
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  order?: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  skills: string[];
  logo?: string;
  order: number;
}

export interface CurrentlyBuilding {
  id: string;
  project: string;
  whatItIs: string;
  role: string;
  status: 'BUILDING' | 'EXPERIMENT' | 'ACTIVE' | 'PAUSED' | 'COMING SOON';
  link?: string;
  progress?: number;
  tags: string[];
  order: number;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedDate: string;
  author: string;
  readingTime: string;
  featured: boolean;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company: string;
  role: string;
  avatar?: string;
  featured: boolean;
  rating?: number;
}

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  skills: {
    name: string;
    level: string;
    icon?: string;
    note?: string;
  }[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface SiteSettings {
  name: string;
  title: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  location: string;
  coordinates: string;
  age: string;
  email: string;
  phone: string;
  whatsapp: string;
  profileImage: string;
  profileCutout: string;
  originImage: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    behance?: string;
    youtube?: string;
    x?: string;
  };
  stats: {
    projectsCompleted: number;
    clientsWorldwide: number;
    yearsBuilding: number;
    productsLaunched: number;
    reachCount: string;
  };
  visionStatement: string;
  visionDetails: string;
  originStory: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  availableForWork: boolean;
}

export interface DatabaseSchema {
  settings: SiteSettings;
  projects: Project[];
  experience: Experience[];
  currentlyBuilding: CurrentlyBuilding[];
  journal: JournalArticle[];
  testimonials: Testimonial[];
  skills: SkillCategory[];
  messages: Message[];
}
