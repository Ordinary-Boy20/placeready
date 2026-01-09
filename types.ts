
export interface User {
  id: string;
  name: string;
  email: string;
  branch: string;
  section: string; // The primary domain
  year: 1 | 2 | 3 | 4;
  yearLabel: string;
  role: 'junior' | 'senior' | 'admin';
  skills: string[];
  college?: string;
  graduationYear?: number;
  currentCompany?: string;
  linkedinUrl?: string;
  bio?: string;
  isVerified?: boolean;
}

export interface Question {
  id: string;
  text: string;
  section: string; // domain
  category: 'Tech' | 'Non-Tech' | 'General';
  authorId: string;
  authorName: string;
  authorRole: string;
  askedByYear: number; // Hierarchical reference
  timestamp: string;
}

export interface Answer {
  id: string;
  questionId: string;
  text: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorCompany?: string;
  authorYear: number;
  timestamp: string;
  isVerified: boolean;
}

// ... rest of interfaces (Company, LearningPost, etc) stay same
export type LearningType = 'Interview Learning' | 'Preparation Tip' | 'Experience' | 'Advice';
export interface SeniorLearningPost {
  id: string;
  title: string;
  type: LearningType;
  company: string;
  role: string;
  year: string;
  imageUrl?: string;
  whatIDid: string;
  whatWentWrong: string;
  whatILearned: string;
  keyTakeaway: string;
  seniorId: string;
  seniorName: string;
  seniorCompany?: string;
  seniorCollege?: string;
  isApproved: boolean;
  createdAt: string;
}
export interface SeniorMistake {
  id: string;
  title: string;
  mistake: string;
  consequence: string;
  lesson: string;
  category: 'Interview' | 'Exam' | 'DSA' | 'Resume' | 'Skills' | 'Internship' | 'General';
  seniorId: string;
  seniorName: string;
  isApproved: boolean;
  createdAt: string;
}
export interface Guideline {
  id: string;
  category: 'DSA' | 'HR' | 'DBMS';
  question: string;
  advice: string;
  author: string;
  authorId?: string;
  authorRole: 'Senior' | 'Alumni' | 'Placed';
  likes: number;
}
export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  branch: string[];
  placedCount: number;
  eligibility: {
    cgpa: number;
    skills: string[];
  };
  process: string[];
  mustHaveSkills: string[];
  goodToHaveSkills: string[];
  seniorInsights: string[];
  preparationPriority: string[];
}
