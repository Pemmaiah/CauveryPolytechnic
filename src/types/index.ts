export type AnimationType = 
  | 'kenburns' 
  | 'zoom-in' 
  | 'zoom-out' 
  | 'pan-left' 
  | 'pan-right' 
  | 'pan-up' 
  | 'pan-down' 
  | 'cinematic-scale' 
  | 'fade';

export interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mediaType: 'image' | 'video';
  imageUrl: string;
  videoUrl?: string;
  posterUrl?: string;
  buttonText: string;
  buttonUrl: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  animationType: AnimationType;
  animationDuration?: number; // seconds
  slideDuration?: number; // seconds
  overlayOpacity?: number; // 0.1 - 0.9
  textPosition: 'left' | 'center' | 'right';
  displayOrder: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  pageId?: string;
  order: number;
  active: boolean;
  parentId?: string | null;
  target?: '_self' | '_blank';
  children?: MenuItem[];
}

export interface PageItem {
  id: string;
  title: string;
  slug: string;
  featuredImage?: string;
  content: string;
  layout: 'full' | 'sidebar' | 'full-width';
  status: 'published' | 'draft';
  seoTitle?: string;
  seoDescription?: string;
  metaDescription?: string;
  seoKeywords?: string;
  sidebarWidgets?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullContent: string;
  featuredImage: string;
  category: string;
  author: string;
  publishedDate: string;
  priority?: boolean | number;
  status: 'published' | 'draft';
  isTickerItem?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  registrationUrl?: string;
  status: 'published' | 'draft';
  order?: number;
  category?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  storagePath?: string;
  category: string;
  displayOrder: number;
  active: boolean;
  uploadedAt?: string;
  createdAt?: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  images: string[];
  category: string;
  displayOrder: number;
  active: boolean;
  features?: string[];
}

export interface ProgrammeItem {
  id: string;
  name: string;
  code: string;
  duration: string;
  intake: number;
  eligibility: string;
  description: string;
  highlights: string[];
  careers: string[];
  image: string;
  syllabusUrl?: string;
  active: boolean;
  displayOrder: number;
  hodName?: string;
  hodMessage?: string;
}

export interface AicteItem {
  id: string;
  title: string;
  category: string; // 'AICTE EOA Letters' | 'DTE Affiliation Orders' | 'Mandatory Disclosures' | 'Governance & Committees'
  academicYear: string;
  documentUrl?: string;
  fileUrl?: string;
  pdfData?: string; // Stored PDF Base64 / Data URL
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  referenceNumber?: string;
  issueDate?: string;
  description?: string;
  active?: boolean;
  displayOrder?: number;
  date?: string;
  uploadDate?: string;
  uploadedAt?: string;
}

export type AicteDocumentItem = AicteItem;

export interface AdmissionApplication {
  id: string;
  applicationNumber?: string;
  applicationId?: string;
  fullName?: string;
  studentName?: string;
  dob?: string;
  dateOfBirth?: string;
  gender: 'Male' | 'Female' | 'Other' | string;
  parentName: string;
  phone?: string;
  mobile?: string;
  alternatePhone?: string;
  email: string;
  address: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  category?: string;
  sslcBoard?: string;
  sslcSchool?: string;
  schoolName?: string;
  sslcPercentage?: number | string;
  marksPercentage?: string;
  sslcPassingYear?: number | string;
  coursePreference1?: string;
  coursePreference2?: string;
  programme?: string;
  previousQualification?: string;
  hostelRequired?: boolean;
  transportRequired?: boolean;
  message?: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'New' | 'Under Review' | 'Contacted' | 'Approved' | 'Rejected';
  createdAt: string;
  appliedAt?: string;
  notes?: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  mobile?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'responded' | 'replied';
  createdAt: string;
  notes?: string;
}

export interface TickerItem {
  id: string;
  text: string;
  link?: string;
  active: boolean;
  order: number;
  badge?: string;
  isFlash?: boolean;
  priority?: boolean;
}

export interface WhyUsItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  displayOrder: number;
  active: boolean;
}

export type HomeSectionType = 
  | 'hero_slider' 
  | 'principal_welcome' 
  | 'why_us' 
  | 'programmes' 
  | 'admission_cta' 
  | 'events' 
  | 'news' 
  | 'facilities' 
  | 'gallery' 
  | 'contact_map' 
  | 'map_contact'
  | 'custom_block'
  | 'stats_counter'
  | 'testimonials'
  | 'video_showcase';

export interface HomeSection {
  id: string;
  sectionType: HomeSectionType;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeText?: string;
  content?: string;
  imageUrl?: string;
  secondaryImageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  backgroundStyle?: 'white' | 'light' | 'slate' | 'dark' | 'gradient' | 'brand' | 'amber';
  theme?: 'white' | 'light' | 'slate' | 'dark' | 'gradient' | 'brand' | 'amber';
  imagePosition?: 'left' | 'right' | 'top' | 'background' | 'none';
  enabled: boolean;
  displayOrder: number;
  customData?: {
    principalName?: string;
    principalQualification?: string;
    principalPhoto?: string;
    quote?: string;
    highlights?: string[];
    checklist?: string[];
    stats?: any[];
    videoUrl?: string;
    mapEmbed?: string;
    yearsOfExcellence?: string;
    activeStudents?: string;
    placementPercent?: string;
    facultyCount?: string;
    labsCount?: string;
    googleMapEmbed?: string;
    address?: string;
    phone?: string;
    email?: string;
    [key: string]: any;
  };
  updatedAt?: string;
}

export interface FooterConfig {
  aboutText: string;
  quickLinks: { label: string; url: string }[];
  importantLinks: { label: string; url: string }[];
  address: string;
  phone: string;
  mobile: string;
  email: string;
  officeHours: string;
  copyrightText: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface WebsiteSettings {
  collegeName: string;
  tagline?: string;
  shortCode?: string;
  trustName?: string;
  aicteCode?: string;
  dteCode?: string;
  logo?: string;
  logoDisplayMode?: 'both' | 'logo_only' | 'text_only';
  logoHeight?: number; // e.g. 48 - 80px
  logoShape?: 'rounded' | 'square' | 'circle';
  trustLogo?: string;
  favicon?: string;
  affiliation?: string;
  dsaApproved?: boolean;
  aicteApproved?: boolean;
  dsaCode?: string;
  address: string;
  district?: string;
  state?: string;
  pincode?: string;
  phone: string;
  mobile: string;
  email: string;
  admissionEmail?: string;
  website?: string;
  principalName?: string;
  principalQualification?: string;
  principalMessage?: string;
  principalPhoto?: string;
  googleMapUrl?: string;
  googleMapEmbed?: string;
  statsYears?: number;
  statsAlumni?: number;
  statsPlacementRate?: number;
  statsFaculty?: number;
  socialMedia?: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    twitter: string;
  };
  stats?: {
    students: string;
    faculty: string;
    placementPercent: string;
    labsCount: string;
    yearsOfExcellence: string;
  };
  tickerSpeed?: number;
}

export type CollegeSettings = WebsiteSettings;

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'superadmin' | 'admin' | 'editor';
  createdAt?: string;
  lastLogin?: string;
}

export interface AdminCredentials {
  username: string;
  password?: string;
  email?: string;
  updatedAt?: string;
}
