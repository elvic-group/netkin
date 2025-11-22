import { MonitorPlay, Smartphone, Coffee, WifiOff } from 'lucide-react';
import { PricingPlan, Feature, NavLink, Movie } from './types';

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
    icon: Coffee,
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
  "https://picsum.photos/id/1018/400/600",
  "https://picsum.photos/id/1011/400/600",
  "https://picsum.photos/id/1059/400/600",
  "https://picsum.photos/id/1074/400/600",
  "https://picsum.photos/id/1029/400/600",
];

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=300&q=80",
];

export const LATEST_MOVIES: Movie[] = [
  {
    id: 'l1',
    title: 'THE FAIR WEATHER FELON',
    genre: 'DOCUMENTARY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1535581652167-4d66e2b613dd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'l2',
    title: 'THE HITMAN',
    genre: 'DRAMA',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '7.9',
    image: 'https://images.unsplash.com/photo-1531384698654-7f6e477ca221?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'l3',
    title: 'THE FAIR WEATHER FELON',
    genre: 'SHORT',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.1',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80'
  },
];

export const POPULAR_MOVIES: Movie[] = [
  {
    id: 'p1',
    title: 'THE FAIR WEATHER FELON',
    genre: 'ADVENTURE',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1516475429286-465d815a0df7?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'p2',
    title: 'THE FAIR WEATHER FELON',
    genre: 'ACTION',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'p3',
    title: 'THE FAIR WEATHER FELON',
    genre: 'COMEDY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1560130958-da5f965c2919?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'p4',
    title: 'THE FAIR WEATHER FELON',
    genre: 'DOCUMENTARY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=500&q=80'
  },
];

export const ACTION_MOVIES: Movie[] = [
  {
    id: 'a1',
    title: 'THE FAIR WEATHER FELON',
    genre: 'ADVENTURE',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1596727147705-54a9d6ed27e6?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'a2',
    title: 'THE FAIR WEATHER FELON',
    genre: 'DOCUMENTARY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'a3',
    title: 'THE FAIR WEATHER FELON',
    genre: 'ACTION',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1533518463841-d62e1fc91373?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'a4',
    title: 'THE FAIR WEATHER FELON',
    genre: 'COMEDY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'a5',
    title: 'THE FAIR WEATHER FELON',
    genre: 'DOCUMENTARY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1517604931442-71053e68cc23?auto=format&fit=crop&w=500&q=80'
  },
];

export const ADVENTURE_MOVIES: Movie[] = [
  {
    id: 'adv1',
    title: 'THE FAIR WEATHER FELON',
    genre: 'ADVENTURE',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'adv2',
    title: 'THE FAIR WEATHER FELON',
    genre: 'DOCUMENTARY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'adv3',
    title: 'THE FAIR WEATHER FELON',
    genre: 'ACTION',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'adv4',
    title: 'THE FAIR WEATHER FELON',
    genre: 'COMEDY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80'
  },
];
