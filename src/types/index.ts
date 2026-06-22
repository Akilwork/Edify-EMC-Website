// ─── Service Types ────────────────────────────────────────────
export interface Service {
  id:          string;
  title:       string;
  description: string;
  icon:        string;
  slug:        string;
}

// ─── Case Study Types ─────────────────────────────────────────
export interface CaseStudy {
  id:          string;
  title:       string;
  client:      string;
  industry:    string;
  summary:     string;
  image:       string;
  slug:        string;
  tags:        string[];
}

// ─── Team Member Types ────────────────────────────────────────
export interface TeamMember {
  id:       string;
  name:     string;
  role:     string;
  bio:      string;
  image:    string;
  linkedin?: string;
}

// ─── Testimonial Types ────────────────────────────────────────
export interface Testimonial {
  id:         string;
  quote:      string;
  author:     string;
  title:      string;
  company:    string;
  avatar?:    string;
}

// ─── Navigation Types ─────────────────────────────────────────
export interface NavLink {
  label: string;
  href:  string;
  external?: boolean;
}
