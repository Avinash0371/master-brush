export type Colour = {
  id: string;
  name: string;
  slug?: string;
  hex: string;
  rgb?: string;
  family: string;
  description?: string;
  themes?: string[];
  mood?: string; // Changed from mood_tags array to single string for simplicity in static data, or keep optional
  mood_tags?: string[];
  finish?: string;
  popularity?: number;
  isTrending?: boolean;
  sample_images?: string[];
  contrast_info?: Record<string, unknown>;
};

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  pincode: string;
  address: string;
  service_type: string;
  area_estimate?: string;
  preferred_date?: string;
  color_pref?: string[];
  notes?: string;
};

export type PainterApplicationPayload = {
  full_name: string;
  phone: string;
  email: string;
  city: string;
  years_experience: number;
  skills: string[];
  preferred_zones?: string[];
  expected_rate?: string;
  terms_accepted: boolean;
};

export type VisualiserProject = {
  id: string;
  title: string;
  thumbnail_url?: string;
  share_token: string;
};
