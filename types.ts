
import { LucideIcon } from 'lucide-react';

export interface User {
  email: string;
  name?: string;
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  isKid: boolean;
  watchlist: string[]; // Array of Movie IDs
  history: string[]; // Array of Movie IDs (recently watched)
  ratings: Record<string, number>; // MovieID -> Rating (1-5)
  progress: Record<string, number>; // MovieID -> Seconds watched
}

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  target?: 'landing' | 'news' | 'movies' | 'tvshows' | 'signin' | 'mylist';
}

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PricingFeature {
  name: string;
  description?: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  price: number;
  currency: string;
  period: string;
  features: PricingFeature[];
  isPremium: boolean;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: string;
  author: string;
  rating: string; // IMDB/Global rating
  image: string;
  contentRating?: string;
}
