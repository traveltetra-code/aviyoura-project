
export type TourCategory = 'Domestic' | 'International';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  category: TourCategory;
  destination: string;
  bannerImage: string;
  shortDescription: string;
  highlights: string[]; 
  tourHighlights: string[]; 
  itinerary: ItineraryDay[];
  cost: string;
  duration: string;
  bestTimeToVisit: string;
  gallery: string[];
  isActive: boolean;
}

export interface VisaService {
  id: string;
  type: string;
  country: string;
  description: string;
  image?: string;
  requirements: string[];
  isActive: boolean;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message?: string;
  subject: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  feedback: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  resumeText: string; // Base64 or plain text note
  status: 'new' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface SiteSettings {
  // Brand & Contact
  contactEmail: string;
  contactPhone: string;
  address: string;
  logo?: string; 
  
  // Hero Section
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBannerImage: string;
  heroPrimaryBtnText: string;
  heroPrimaryBtnLink: string;
  heroSecondaryBtnText: string;
  heroSecondaryBtnLink: string;

  // Category Banners
  domesticListingBanner: string;
  internationalListingBanner: string;
  
  // Stats
  statsValue: string;
  statsLabel: string;
  showStatsCard: boolean;
  
  // Section Headings
  featuredToursHeading: string;
  featuredToursSubheading: string;
  testimonialsHeading: string;
  testimonialsSubheading: string;
  testimonialSectionImage: string;
  
  // Visibility Toggles
  showFeaturedTours: boolean;
  showTestimonials: boolean;
  showCtaSection: boolean;

  // Social Media
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;

  // Legal Content
  termsOfService?: string;
  privacyPolicy?: string;
}
