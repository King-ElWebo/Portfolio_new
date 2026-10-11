export type ProjectKind = "client_project" | "independent_concept";

export type ProjectPublicationStatus = "draft" | "published" | "preview_fixture";

export interface LocalizedString {
  de: string;
  en: string;
}

export interface ProjectEntry {
  /** Unique project identifier */
  id: string;
  /** URL-friendly slug for future /work/:slug route */
  slug: string;
  /** Classification: client project vs independent concept */
  kind: ProjectKind;
  /** Publication lifecycle state */
  status: ProjectPublicationStatus;
  /** Project index for display (e.g. "01") */
  indexNumber: string;
  /** Main project title */
  title: string;
  /** Concise descriptor following em-dash, e.g. "Luxury Commerce, Design System" */
  descriptor: LocalizedString;
  /** Category or discipline tags displayed in header, e.g. "Client Project · Brand, Platform" */
  categoryLabel: LocalizedString;
  /** 1-2 sentence description */
  summary: LocalizedString;
  /** Primary cover/preview image URL or asset path */
  image: string;
  /** Accessible alt text */
  imageAlt: LocalizedString;
  /** Optional role description */
  role?: LocalizedString;
  /** Completion or publication year */
  year?: string;
  /** Optional external live URL */
  liveUrl?: string;
  /** Whether a dedicated case study page is planned/available */
  hasCaseStudy: boolean;
  /** Discipline / tech tags */
  tags?: string[];
  /** Explicit flag indicating whether this is an illustrative preview fixture */
  isPreviewFixture: boolean;
}

export type ProjectFilterCategory = "all" | "client_project" | "independent_concept";
