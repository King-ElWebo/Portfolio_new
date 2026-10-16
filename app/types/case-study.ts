import type { LocalizedString } from "./project";

export interface CaseStudyLookbookEntry {
  image: string;
  title: LocalizedString;
  category: LocalizedString;
}

export interface CaseStudyStoreAtmosphereEntry {
  image: string;
  caption: LocalizedString;
}

export interface CaseStudyAdminPillar {
  number: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface CaseStudyTransformationImage {
  src: string;
  year?: string;
  label: LocalizedString;
  caption: LocalizedString;
}

export interface CaseStudyVisualExperience {
  kicker: LocalizedString;
  heading: LocalizedString;
  subheadline: LocalizedString;
  desktopShowcase: {
    src: string;
    alt: LocalizedString;
    caption: LocalizedString;
  };
  mobileShowcase: {
    src: string;
    alt: LocalizedString;
    caption: LocalizedString;
  };
  lookbookKicker?: LocalizedString;
  lookbookDescription?: LocalizedString;
  lookbook: CaseStudyLookbookEntry[];
  atmosphereKicker?: LocalizedString;
  atmosphereDescription?: LocalizedString;
  storeAtmosphere: CaseStudyStoreAtmosphereEntry[];
}

export interface CaseStudyAdminSection {
  kicker: LocalizedString;
  heading: LocalizedString;
  subheadline: LocalizedString;
  narrative: LocalizedString;
  systemLabel?: LocalizedString;
  screenshot: {
    src: string;
    alt: LocalizedString;
    caption: LocalizedString;
  };
  pillars: CaseStudyAdminPillar[];
}

export interface CaseStudyClosingSection {
  kicker: LocalizedString;
  heading: LocalizedString;
  narrative: LocalizedString;
  achievements: LocalizedString[];
  techStack: string[];
  techRationale: LocalizedString;
  statusNote: LocalizedString;
  externalButtonLabel?: LocalizedString;
}

export interface CaseStudyData {
  slug: string;
  projectId: string;
  indexKicker: LocalizedString;
  title: string;
  headline: LocalizedString;
  subheadline: LocalizedString;
  year: string;
  client: LocalizedString;
  role: LocalizedString;
  scope: LocalizedString;
  statusBadge: LocalizedString;
  statusUpcoming: boolean;
  liveUrl: string;
  displayDomain?: string;

  // Chapter 01 — Hero
  heroImage: {
    src: string;
    alt: LocalizedString;
    caption: LocalizedString;
  };

  // Chapter 02 — The Challenge & Transformation (Optional)
  transformation?: {
    kicker: LocalizedString;
    heading: LocalizedString;
    narrative: LocalizedString;
    historicalImage?: CaseStudyTransformationImage;
    redesignImage?: CaseStudyTransformationImage;
  };

  // Chapter 03 — The Digital Experience (Main Visual Section)
  visualExperience: CaseStudyVisualExperience;

  // Chapter 04 — The Engine / CMS / Specialist Architecture
  adminCms: CaseStudyAdminSection;

  // Chapter 05 — Outcome & Technology
  closing: CaseStudyClosingSection;

  nextProject: {
    title: string;
    slug: string;
    descriptor: LocalizedString;
    kicker: LocalizedString;
  };
}
