import { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
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