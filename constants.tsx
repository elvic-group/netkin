import { MonitorPlay, Smartphone, Coffee, WifiOff, X, Check } from 'lucide-react';
import { PricingPlan, Feature, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'MOVIES', href: '#' },
  { label: 'TV SHOWS', href: '#' },
  { label: 'NEWS', href: '#', active: true },
];

export const FEATURES: Feature[] = [
  {
    id: '1',
    icon: MonitorPlay,
    title: 'CHOOSE HOW YOU WANT TO SEE THE CONTENT',
    description: 'On mobile phone, computer, tablet and smart TV. Via Apple TV or game console. When it suits you.',
  },
  {
    id: '2',
    icon: WifiOff,
    title: 'SEE OFFLINE',
    description: 'On mobile phones and tablets, you can save what you want to see offline. Then you can look at it even if you do not have access to the Internet!',
  },
  {
    id: '3',
    icon: Coffee, // Metaphor for exiting/relaxing
    title: 'EXIT WHENEVER YOU WANT',
    description: 'With us, you get full flexibility. You can terminate Netkin at any time.',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'LIGHT',
    price: 299,
    currency: 'KR',
    period: '/ MONTH',
    isPremium: false,
    features: [
      { name: 'Sport', description: 'All our sports rights', included: true },
      { name: 'Fighting', description: 'UFC, MMA and boxing', included: true },
      { name: 'Series', description: 'Our entire range of offers', included: true },
      { name: 'Children Series', description: 'Many famous children\'s series', included: true },
      { name: 'Movies', description: 'Lots of movies', included: false },
    ]
  },
  {
    name: 'PREMIUM',
    price: 350,
    currency: 'KR',
    period: '/ MONTH',
    isPremium: true,
    features: [
      { name: 'Sport', description: 'All our sports rights', included: true },
      { name: 'Fighting', description: 'UFC, MMA and boxing', included: true },
      { name: 'Series', description: 'Our entire range of offers', included: true },
      { name: 'Children Series', description: 'Many famous children\'s series', included: true },
      { name: 'Movies', description: 'Lots of movies', included: true },
    ]
  }
];

export const GALLERY_IMAGES = [
  "https://picsum.photos/id/1018/400/600", // Nature/Sunset
  "https://picsum.photos/id/1011/400/600", // Kids/People
  "https://picsum.photos/id/1059/400/600", // Crowd
  "https://picsum.photos/id/1074/400/600", // Lion
  "https://picsum.photos/id/1029/400/600", // Street/Market
];

export const HERO_IMAGES = [
  "https://picsum.photos/id/100/300/200",
  "https://picsum.photos/id/200/300/200",
  "https://picsum.photos/id/300/300/200",
];