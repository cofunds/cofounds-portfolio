"use client";

import type React from "react";
import { createContext, useContext, type ErrorInfo, Component } from "react";

// ============ 🔹 Atomic Interfaces 🔹 ============

// Basic reusable interfaces
export interface Link {
  id: string;
  linkUrl: string;
  linkTitle: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface UserSkill {
  id: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  skill: Skill;
}

export interface ProjectLink {
  id: string;
  linkUrl: string;
  linkTitle: string;
}

export interface ProjectSkill {
  id: string;
  skill: Skill;
}

// Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  linkName: string | null;
  startedAt: string; // ISO date string
  endAt: string | null;
  previewImageUrl: string | null;
  projectLinks: ProjectLink[];
  projectSkillset: ProjectSkill[];
}

// Experience interface
export interface Experience {
  id: string;
  title: string;
  companyName: string;
  description: string;
  startedAt: string; // ISO date string
  endAt: string | null;
  logoURL: string | null;
}

// Certificate interface
export interface Certificate {
  id: string;
  title: string;
  description: string;
  link: string;
  filePath: string | null;
  startedAt: string;
  endAt: string | null;
  logoURL: string | null;
  location: string | null;
  linkName: string | null;
}

// Education interface
export interface Degree {
  id: string;
  name: string;
}

export interface Education {
  id: string;
  eduFrom: string;
  eduFromLink: string;
  startedAt: string;
  endAt: string;
  logoURL: string | null;
  degree: Degree;
}

// ============ 🔹 Root API Interface 🔹 ============

export interface UserProfile {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  profileImage: string;
  headerText: string;
  headerImage: string;
  description: string;
  skillset: UserSkill[];
  projects: Project[];
  experience: Experience[];
  links: Link[];
  certificates: Certificate[];
  education: Education[];
  template?: string; // Optional template ID from API
}

// ============ 🔹 Transformed Portfolio Data 🔹 ============

export interface PortfolioData {
  // Basic Info
  username: string;
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  email: string;
  phone: string;

  // Profile Images
  avatarUrl: string;
  profileImage: string;
  headerImage: string;

  // Descriptions
  description: string;
  headerText: string;
  summary: string;

  // Location (for template-01)
  url: string;
  location: string;
  locationLink: string;

  // Navigation
  navbar: any[];

  // Skills - Keep both formats for flexibility
  skills: string[]; // Simple string array for template-01
  skillset: UserSkill[]; // Full skill objects with levels for template-02

  // Links/Social
  links: Link[]; // Raw links array for template-02
  contact: {
    email?: string;
    social: Record<
      string,
      {
        name: string;
        url: string;
        navbar: boolean;
      }
    >;
  };

  // Work Experience - Keep both formats
  work: TransformedWork[]; // Transformed for template-01
  experience: Experience[]; // Raw for template-02

  // Education
  education: TransformedEducation[]; // Transformed for template-01
  educationRaw: Education[]; // Raw for template-02

  // Projects - Keep both formats
  projects: TransformedProject[]; // Transformed for template-01
  projectsRaw: Project[]; // Raw for template-02

  // Certificates/Hackathons
  hackathons: TransformedCertificate[]; // Transformed for template-01
  certificates: Certificate[]; // Raw for template-02

  // Template Selection
  templateId?: string; // Template ID for multi-template support
}

// Transformed interfaces for UI components
export interface TransformedWork {
  company: string;
  title: string;
  href: string;
  logoUrl: string;
  badges: string[];
  start: string;
  end: string | null;
  description: string;
}

export interface TransformedEducation {
  school: string;
  degree: string;
  href: string;
  logoUrl: string;
  start: string;
  end: string;
}

export interface TransformedProject {
  title: string;
  description: string;
  dates: string;
  technologies: string[];
  image: string;
  video: string;
  links: TransformedLink[];
  href: string;
}

export interface TransformedCertificate {
  title: string;
  description: string;
  location: string;
  dates: string;
  image: string;
  links: TransformedLink[];
}

export interface TransformedLink {
  type: string;
  href: string;
  linkTitle?: string;
}

interface PortfolioDataContextType {
  portfolioData: PortfolioData | null;
  isLoading: boolean;
  error: string | null;
}

const PortfolioDataContext = createContext<
  PortfolioDataContextType | undefined
>(undefined);

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (context === undefined) {
    throw new Error(
      "usePortfolioData must be used within a PortfolioDataProvider"
    );
  }
  return context;
};

interface PortfolioDataProviderProps {
  children: React.ReactNode;
  portfolioData: PortfolioData | null;
  isLoading: boolean;
  error: string | null;
}

// Error Boundary for Portfolio components
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class PortfolioErrorBoundary extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      "Portfolio Error Boundary caught an error:",
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground">
              There was an error displaying this section. Please refresh the
              page.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export const PortfolioDataProvider: React.FC<PortfolioDataProviderProps> = ({
  children,
  portfolioData,
  isLoading,
  error,
}) => (
  <PortfolioErrorBoundary>
    <PortfolioDataContext.Provider value={{ portfolioData, isLoading, error }}>
      {children}
    </PortfolioDataContext.Provider>
  </PortfolioErrorBoundary>
);
