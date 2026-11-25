export type ProjectCategory =
  | 'All'
  | 'Instagram Creatives'
  | 'Social Media Campaigns'
  | 'SEO Projects'
  | 'Website Designs'
  | 'AI Experiments'
  | 'Content Strategy'
  | 'Marketing Research';

export type ProjectNature = 'Academic Project' | 'Concept Study' | 'Self-Initiated Board';

export interface ProfileEducation {
  degree: string;
  institution: string;
  graduationYear: string;
}

export interface ProfileData {
  name: string;
  roleTitle: string;
  heroHeadline: string;
  heroIntro: string;
  aboutIntro: string;
  location: string;
  phone: string;
  email: string;
  linkedinUrl: string;
  nextAuraLiveDemoUrl: string;
  nextAuraGithubUrl: string;
  photoUrl: string;
  resumePdfUrl: string;
  education: ProfileEducation;
  interests: string[];
  technicalSkills: string[];
  strengths: string[];
  languages: string[];
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  subtitle: string;
  skills: {
    name: string;
    context: string;
  }[];
}

export interface ProjectViewItem {
  number: string;
  title: string;
  caption: string;
  imageUrl: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  nature: ProjectNature;
  proofStatus: string;
  aspectClass: 'aspect-[16/9]' | 'aspect-[3/4]' | 'aspect-[4/3]' | 'aspect-square';
  imageUrl: string;
  imageAlt: string;
  secondaryImageUrl?: string;
  secondaryImageAlt?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  shortDescription: string;
  brief: string;
  overview: string;
  problemAndObjective: string;
  creativeConcept: string;
  process: string[];
  views?: ProjectViewItem[];
  viewGroups?: unknown[];
  toolsUsed: string[];
  contribution: string[];
  deliverables: string[];
  learnings: string;
  finalOutcome: string;
  tags: string[];
}

export interface AILabWorkflow {
  id: string;
  number: string;
  title: string;
  tools: string;
  description: string;
  samplePrompt: string;
  outputFocus: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  collaborationType: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  collaborationType?: string;
  message?: string;
}
