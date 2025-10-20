export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}

export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export interface AboutData {
  title: string;
  bio: string;
  image?: string;
  resumeLink?: string;
  highlights: string[];
}

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  logo?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
  featured: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  image?: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

export interface ContactData {
  title: string;
  subtitle: string;
  email: string;
  phone?: string;
  social: SocialLink[];
  formEnabled: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  theme: ThemeConfig;
  hero: HeroData;
  about: AboutData;
  experience: ExperienceData[];
  projects: ProjectData[];
  skills: SkillCategory[];
  blog: BlogPost[];
  testimonials: Testimonial[];
  contact: ContactData;
  sectionVisibility: SectionVisibility;
}

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  experience: boolean;
  projects: boolean;
  skills: boolean;
  blog: boolean;
  testimonials: boolean;
  contact: boolean;
}

export interface AdminConfig {
  pinHash: string;
  githubToken?: string;
  githubRepo?: string;
  githubOwner?: string;
}

