// Country Response Types
export type CountriesResponse = {
  data: CountriesDatum[];
};

export type CountriesDatum = {
  code: string;
  display_name: string;
  reach_stats: Reachstats;
};

export type Reachstats = {
  num_daily_impressions: number;
  num_devices: number;
  num_households: number;
  num_persons: number;
};

// Platform Response Types
export type PlatformsResponse = {
  data: PlatformsDatum[];
};

export type PlatformsDatum = {
  code: string;
  display_name: string;
  has_global_taxonomy: boolean;
  supported_countries: string[];
};

// Audience Response Types
export type AudiencesResponse = {
  data: AudienceDatum[];
  meta: Meta;
};

export type Meta = object;

export type AudienceDatum = {
  categories: Category[];
  code: string;
  display_name: string;
};

export type Category = {
  audiences: Audience[];
  code: string;
  display_name: string;
};

export type Audience = {
  code: string;
  composition: string[];
  description?: string;
  display_name: string;
};
