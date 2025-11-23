
import { MonitorPlay, Smartphone, Coffee, WifiOff } from 'lucide-react';
import { PricingPlan, Feature, NavLink, Movie, Profile } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'HOME', href: '#', target: 'landing' },
  { label: 'MOVIES', href: '#', target: 'movies' },
  { label: 'TV SHOWS', href: '#', target: 'tvshows' },
  { label: 'MY LIST', href: '#', target: 'mylist' },
  { label: 'NEWS', href: '#', target: 'news' },
];

export const DEFAULT_PROFILES: Profile[] = [
  {
    id: 'p1',
    name: 'Main User',
    avatar: 'https://i.pravatar.cc/150?u=p1',
    isKid: false,
    watchlist: [],
    history: [],
    ratings: {},
    progress: {}
  },
  {
    id: 'p2',
    name: 'Kids',
    avatar: 'https://i.pravatar.cc/150?u=p2',
    isKid: true,
    watchlist: [],
    history: [],
    ratings: {},
    progress: {}
  }
];

export const GENRES = [
    "POPULAR", "ACTION", "ADVENTURE", "ANIMATION", "BIOGRAPHY", "COMEDY",
    "CRIME", "DOCUMENTARY", "DRAMA", "FAMILY", "FANTASY", "FILM-NOIR",
    "HISTORY", "HORROR", "MUSIC", "MUSICAL", "MYSTERY", "ROMANCE",
    "SCI-FI", "SHORT", "THRILL", "WAR", "WESTERN"
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
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517604931442-71053e68cc23?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=400&q=80",
];

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1503951914296-3a5a5b01151e?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1535581652167-4d66e2b613dd?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80",
];

export const HERO_MOVIE: Movie = {
  id: 'hero1',
  title: 'CONGOLESE',
  genre: 'DOCUMENTARY',
  year: '2018',
  author: 'JOHANNES DOE',
  rating: '8.9',
  image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1500&q=80',
  contentRating: 'R'
};

export const LATEST_MOVIES: Movie[] = [
  {
    id: 'l1',
    title: 'THE FAIR WEATHER FELON',
    genre: 'DOCUMENTARY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=600&q=80',
    contentRating: 'PG-13'
  },
  {
    id: 'l2',
    title: 'THE HITMAN',
    genre: 'DRAMA',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '7.9',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    contentRating: 'R'
  },
  {
    id: 'l3',
    title: 'SILENT ECHO',
    genre: 'SHORT',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.1',
    image: 'https://images.unsplash.com/photo-1531384698654-7f6e477ca221?auto=format&fit=crop&w=600&q=80',
    contentRating: 'PG'
  },
];

export const POPULAR_MOVIES: Movie[] = [
  {
    id: 'p1',
    title: 'DESERT STORM',
    genre: 'ADVENTURE',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=500&q=80',
    contentRating: 'PG-13'
  },
  {
    id: 'p2',
    title: 'CYBER CHASE',
    genre: 'ACTION',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80',
    contentRating: 'PG-13'
  },
  {
    id: 'p3',
    title: 'LAUGH TRACK',
    genre: 'COMEDY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=500&q=80',
    contentRating: 'PG'
  },
  {
    id: 'p4',
    title: 'WILD EARTH',
    genre: 'DOCUMENTARY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=80',
    contentRating: 'G'
  },
];

export const ACTION_MOVIES: Movie[] = [
  {
    id: 'a1',
    title: 'SPEED RUN',
    genre: 'ACTION',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1596727147705-54a9d6ed27e6?auto=format&fit=crop&w=500&q=80',
    contentRating: 'PG-13'
  },
  {
    id: 'a2',
    title: 'NIGHT SHIFT',
    genre: 'THRILL',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&w=500&q=80',
    contentRating: 'R'
  },
  {
    id: 'a3',
    title: 'URBAN LEGEND',
    genre: 'ACTION',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1533518463841-d62e1fc91373?auto=format&fit=crop&w=500&q=80',
    contentRating: 'PG-13'
  },
  {
    id: 'a4',
    title: 'STAND UP',
    genre: 'COMEDY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=500&q=80',
    contentRating: 'PG-13'
  },
  {
    id: 'a5',
    title: 'NEON NIGHTS',
    genre: 'SCI-FI',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1517604931442-71053e68cc23?auto=format&fit=crop&w=500&q=80',
    contentRating: 'PG'
  },
];

export const ADVENTURE_MOVIES: Movie[] = [
  {
    id: 'adv1',
    title: 'MOUNTAIN TOP',
    genre: 'ADVENTURE',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=500&q=80',
    contentRating: 'PG'
  },
  {
    id: 'adv2',
    title: 'DEEP BLUE',
    genre: 'DOCUMENTARY',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=500&q=80',
    contentRating: 'G'
  },
  {
    id: 'adv3',
    title: 'THE CLIMB',
    genre: 'ACTION',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=500&q=80',
    contentRating: 'PG-13'
  },
  {
    id: 'adv4',
    title: 'LOST CITY',
    genre: 'ADVENTURE',
    year: '2018',
    author: 'JOHANNES DOE',
    rating: '8.5',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=500&q=80',
    contentRating: 'PG-13'
  },
];

export const CATALOG_MOVIES: Movie[] = [
    // === ORIGINAL & POPULAR ===
    {
        id: 'c1',
        title: 'THE FAIR WEATHER FELON',
        genre: 'ADVENTURE',
        year: '2018',
        author: 'JOHANNES DOE',
        rating: '8.5',
        image: 'https://images.unsplash.com/photo-1503951914296-3a5a5b01151e?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'c2',
        title: 'THE LAST STAND',
        genre: 'ACTION',
        year: '2019',
        author: 'JOHANNES DOE',
        rating: '7.8',
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },
    {
        id: 'c3',
        title: 'MIDNIGHT IN PARIS',
        genre: 'ROMANCE',
        year: '2018',
        author: 'JOHANNES DOE',
        rating: '8.2',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    
    // === DOCUMENTARY ===
    {
        id: 'doc1',
        title: 'PLANET EARTH',
        genre: 'DOCUMENTARY',
        year: '2016',
        author: 'BBC EARTH',
        rating: '9.4',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
        contentRating: 'G'
    },
    {
        id: 'doc2',
        title: 'INTO THE WILD',
        genre: 'DOCUMENTARY',
        year: '2019',
        author: 'NAT GEO',
        rating: '8.7',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'doc3',
        title: 'THE CREATORS',
        genre: 'DOCUMENTARY',
        year: '2020',
        author: 'ART STUDIOS',
        rating: '8.2',
        image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'doc4',
        title: 'FOOD INC',
        genre: 'DOCUMENTARY',
        year: '2008',
        author: 'ROBERT KENNER',
        rating: '7.8',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },

    // === COMEDY ===
    {
        id: 'com1',
        title: 'SUMMER VACATION',
        genre: 'COMEDY',
        year: '2015',
        author: 'JOHN HUGHES',
        rating: '7.5',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'com2',
        title: 'OFFICE PARTY',
        genre: 'COMEDY',
        year: '2016',
        author: 'DIRECTOR X',
        rating: '6.9',
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },
    {
        id: 'com3',
        title: 'STAND UP SPECIAL',
        genre: 'COMEDY',
        year: '2021',
        author: 'COMEDIAN A',
        rating: '8.0',
        image: 'https://images.unsplash.com/photo-1585672288998-090c25c68b5e?auto=format&fit=crop&w=500&q=80',
        contentRating: 'MA'
    },
    {
        id: 'com4',
        title: 'GAME NIGHT',
        genre: 'COMEDY',
        year: '2018',
        author: 'J. FRANCIS',
        rating: '7.2',
        image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },

    // === ANIMATION ===
    {
        id: 'anim1',
        title: 'NEON TOKYO',
        genre: 'ANIMATION',
        year: '2022',
        author: 'K. TANAKA',
        rating: '8.8',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'anim2',
        title: 'FOREST SPIRITS',
        genre: 'ANIMATION',
        year: '2020',
        author: 'MIYAZAKI',
        rating: '9.0',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
        contentRating: 'G'
    },
    {
        id: 'anim3',
        title: 'ROBOT DREAMS',
        genre: 'ANIMATION',
        year: '2023',
        author: 'A. SMITH',
        rating: '8.5',
        image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },

    // === FAMILY ===
    {
        id: 'fam1',
        title: 'PUPPY LOVE',
        genre: 'FAMILY',
        year: '2019',
        author: 'D. GREEN',
        rating: '7.5',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=500&q=80',
        contentRating: 'G'
    },
    {
        id: 'fam2',
        title: 'SUMMER CAMP',
        genre: 'FAMILY',
        year: '2021',
        author: 'M. CAMPBELL',
        rating: '7.2',
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'fam3',
        title: 'THE MAGIC SHOW',
        genre: 'FAMILY',
        year: '2018',
        author: 'L. MAGIC',
        rating: '8.0',
        image: 'https://images.unsplash.com/photo-1557425493-6f90ae4659fc?auto=format&fit=crop&w=500&q=80',
        contentRating: 'G'
    },

    // === HISTORY ===
    {
        id: 'hist1',
        title: 'THE ROMAN EMPIRE',
        genre: 'HISTORY',
        year: '2015',
        author: 'R. RIDLEY',
        rating: '8.6',
        image: 'https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },
    {
        id: 'hist2',
        title: 'INDUSTRIAL AGE',
        genre: 'HISTORY',
        year: '2017',
        author: 'BBC',
        rating: '8.2',
        image: 'https://images.unsplash.com/photo-1574687008641-6f33b6a27e4a?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'hist3',
        title: 'VIKING LEGENDS',
        genre: 'HISTORY',
        year: '2019',
        author: 'H. HIRST',
        rating: '8.7',
        image: 'https://images.unsplash.com/photo-1535581652167-4d66e2b613dd?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },

    // === MUSIC / MUSICAL ===
    {
        id: 'mus1',
        title: 'LIVE IN LONDON',
        genre: 'MUSIC',
        year: '2022',
        author: 'THE BAND',
        rating: '9.1',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'mus2',
        title: 'BROADWAY NIGHTS',
        genre: 'MUSICAL',
        year: '2018',
        author: 'A. WEBBER',
        rating: '8.4',
        image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'mus3',
        title: 'JAZZ CAFE',
        genre: 'MUSIC',
        year: '2020',
        author: 'D. CHAZELLE',
        rating: '8.5',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },

    // === FILM-NOIR ===
    {
        id: 'fn1',
        title: 'SHADOW PLAY',
        genre: 'FILM-NOIR',
        year: '1950',
        author: 'O. WELLES',
        rating: '8.9',
        image: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'fn2',
        title: 'RAINY STREETS',
        genre: 'FILM-NOIR',
        year: '2021',
        author: 'MODERN NOIR',
        rating: '7.8',
        image: 'https://images.unsplash.com/photo-1517732306149-e8f129dc9954?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },
    {
        id: 'fn3',
        title: 'THE DETECTIVE',
        genre: 'FILM-NOIR',
        year: '2019',
        author: 'J. HUSTON',
        rating: '8.1',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },

    // === MYSTERY ===
    {
        id: 'mys1',
        title: 'THE LOCKED ROOM',
        genre: 'MYSTERY',
        year: '2018',
        author: 'A. CHRISTIE',
        rating: '8.3',
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'mys2',
        title: 'FOGGY HARBOR',
        genre: 'MYSTERY',
        year: '2020',
        author: 'S. HOLMES',
        rating: '7.9',
        image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'mys3',
        title: 'SECRET KEY',
        genre: 'MYSTERY',
        year: '2022',
        author: 'D. BROWN',
        rating: '7.5',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },

    // === FANTASY ===
    {
        id: 'fant1',
        title: 'THE MAGICIAN',
        genre: 'FANTASY',
        year: '2016',
        author: 'JOHANNES DOE',
        rating: '8.4',
        image: 'https://images.unsplash.com/photo-1515634918659-524e9b156553?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'fant2',
        title: 'DRAGON SLAYER',
        genre: 'FANTASY',
        year: '2019',
        author: 'R. R. MARTIN',
        rating: '8.8',
        image: 'https://images.unsplash.com/photo-1599492537622-09df5878d36c?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },
    {
        id: 'fant3',
        title: 'ELVEN WOODS',
        genre: 'FANTASY',
        year: '2021',
        author: 'J. R. TOLKIEN',
        rating: '9.0',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },

    // === HORROR ===
    {
        id: 'hor1',
        title: 'DARK CORNERS',
        genre: 'HORROR',
        year: '2021',
        author: 'JOHANNES DOE',
        rating: '6.9',
        image: 'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },
    {
        id: 'hor2',
        title: 'HAUNTED HOUSE',
        genre: 'HORROR',
        year: '2018',
        author: 'J. WANN',
        rating: '7.4',
        image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },
    {
        id: 'hor3',
        title: 'ZOMBIE RUN',
        genre: 'HORROR',
        year: '2015',
        author: 'G. ROMERO',
        rating: '7.8',
        image: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },

    // === WAR ===
    {
        id: 'war1',
        title: 'WAR ZONE',
        genre: 'WAR',
        year: '2014',
        author: 'JOHANNES DOE',
        rating: '8.3',
        image: 'https://images.unsplash.com/photo-1555679427-1f6dfcce943b?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },
    {
        id: 'war2',
        title: 'BATTLEFIELD',
        genre: 'WAR',
        year: '2019',
        author: 'S. SPIELBERG',
        rating: '8.9',
        image: 'https://images.unsplash.com/photo-1579965342575-16428a7c8d71?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },
    {
        id: 'war3',
        title: 'SOLDIER STORY',
        genre: 'WAR',
        year: '2016',
        author: 'C. NOLAN',
        rating: '8.5',
        image: 'https://images.unsplash.com/photo-1615818497922-6558f657e3a7?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },

    // === WESTERN ===
    {
        id: 'west1',
        title: 'WESTERN WINDS',
        genre: 'WESTERN',
        year: '2013',
        author: 'JOHANNES DOE',
        rating: '7.7',
        image: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'west2',
        title: 'GUNSMOKE',
        genre: 'WESTERN',
        year: '1960',
        author: 'J. WAYNE',
        rating: '8.2',
        image: 'https://images.unsplash.com/photo-1590420485404-f86d22b8ab85?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'west3',
        title: 'DESERT RIDER',
        genre: 'WESTERN',
        year: '2018',
        author: 'C. EASTWOOD',
        rating: '8.0',
        image: 'https://images.unsplash.com/photo-1542762905-f93ba80c0786?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },

    // === SHORT ===
    {
        id: 'short1',
        title: 'BRIEF ENCOUNTER',
        genre: 'SHORT',
        year: '2022',
        author: 'INDIE',
        rating: '7.5',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'short2',
        title: '5 MINUTE THRILL',
        genre: 'SHORT',
        year: '2023',
        author: 'STUDENT',
        rating: '8.1',
        image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'short3',
        title: 'URBAN POETRY',
        genre: 'SHORT',
        year: '2021',
        author: 'ARTIST',
        rating: '7.9',
        image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=500&q=80',
        contentRating: 'G'
    },

    // === BIOGRAPHY ===
    {
        id: 'bio1',
        title: 'THE ARTIST',
        genre: 'BIOGRAPHY',
        year: '2015',
        author: 'JOHANNES DOE',
        rating: '9.0',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'bio2',
        title: 'ROYAL LIFE',
        genre: 'BIOGRAPHY',
        year: '2019',
        author: 'P. MORGAN',
        rating: '8.5',
        image: 'https://images.unsplash.com/photo-1577047271281-5a425e239924?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'bio3',
        title: 'THE INVENTOR',
        genre: 'BIOGRAPHY',
        year: '2014',
        author: 'M. TYLDUM',
        rating: '8.8',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    
    // === OTHERS ===
    {
        id: 'c4',
        title: 'DEEP SPACE',
        genre: 'SCI-FI',
        year: '2020',
        author: 'JOHANNES DOE',
        rating: '8.9',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'c5',
        title: 'THE RACER',
        genre: 'ACTION',
        year: '2017',
        author: 'JOHANNES DOE',
        rating: '7.5',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'c8',
        title: 'CITY LIGHTS',
        genre: 'DRAMA',
        year: '2019',
        author: 'JOHANNES DOE',
        rating: '8.0',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&w=500&q=80',
        contentRating: 'R'
    },
    {
        id: 'c9',
        title: 'WILDERNESS',
        genre: 'ADVENTURE',
        year: '2018',
        author: 'JOHANNES DOE',
        rating: '8.1',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG'
    },
    {
        id: 'c10',
        title: 'THE PROPOSAL',
        genre: 'ROMANCE',
        year: '2009',
        author: 'A. FLETCHER',
        rating: '7.6',
        image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    },
    {
        id: 'c11',
        title: 'LOVE STORY',
        genre: 'ROMANCE',
        year: '2020',
        author: 'A. DIRECTOR',
        rating: '7.0',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80',
        contentRating: 'PG-13'
    }
];

export const CATALOG_TV_SHOWS: Movie[] = [
    {
        id: 'tv1',
        title: 'STRANGER THINGS',
        genre: 'SCI-FI',
        year: '2016',
        author: 'DUFFER BROS',
        rating: '9.2',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-14'
    },
    {
        id: 'tv2',
        title: 'BREAKING BAD',
        genre: 'CRIME',
        year: '2008',
        author: 'VINCE GILLIGAN',
        rating: '9.5',
        image: 'https://images.unsplash.com/photo-1465528987236-2551ac716706?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-MA'
    },
    {
        id: 'tv3',
        title: 'THE OFFICE',
        genre: 'COMEDY',
        year: '2005',
        author: 'GREG DANIELS',
        rating: '9.0',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-14'
    },
    {
        id: 'tv4',
        title: 'GAME OF THRONES',
        genre: 'FANTASY',
        year: '2011',
        author: 'D.B. WEISS',
        rating: '9.3',
        image: 'https://images.unsplash.com/photo-1599492537622-09df5878d36c?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-MA'
    },
    {
        id: 'tv5',
        title: 'THE MANDALORIAN',
        genre: 'SCI-FI',
        year: '2019',
        author: 'JON FAVREAU',
        rating: '8.7',
        image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-14'
    },
    {
        id: 'tv6',
        title: 'THE CROWN',
        genre: 'DRAMA',
        year: '2016',
        author: 'PETER MORGAN',
        rating: '8.6',
        image: 'https://images.unsplash.com/photo-1577047271281-5a425e239924?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-MA'
    },
    {
        id: 'tv7',
        title: 'BLACK MIRROR',
        genre: 'SCI-FI',
        year: '2011',
        author: 'CHARLIE BROOKER',
        rating: '8.8',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-MA'
    },
    {
        id: 'tv8',
        title: 'THE WITCHER',
        genre: 'FANTASY',
        year: '2019',
        author: 'LAUREN SCHMIDT',
        rating: '8.2',
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-MA'
    },
    {
        id: 'tv9',
        title: 'FRIENDS',
        genre: 'COMEDY',
        year: '1994',
        author: 'DAVID CRANE',
        rating: '8.9',
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-14'
    },
    {
        id: 'tv10',
        title: 'SHERLOCK',
        genre: 'CRIME',
        year: '2010',
        author: 'MARK GATISS',
        rating: '9.1',
        image: 'https://images.unsplash.com/photo-1505765050816-6316d76d25f4?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-14'
    },
    {
        id: 'tv11',
        title: 'WESTWORLD',
        genre: 'SCI-FI',
        year: '2016',
        author: 'JONATHAN NOLAN',
        rating: '8.5',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e596e35?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-MA'
    },
    {
        id: 'tv12',
        title: 'BETTER CALL SAUL',
        genre: 'CRIME',
        year: '2015',
        author: 'VINCE GILLIGAN',
        rating: '8.9',
        image: 'https://images.unsplash.com/photo-1565857322089-5e28a8744866?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-MA'
    },
    {
        id: 'tv13',
        title: 'PLANET EARTH',
        genre: 'DOCUMENTARY',
        year: '2006',
        author: 'BBC',
        rating: '9.4',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
        contentRating: 'G'
    },
    {
        id: 'tv14',
        title: 'FAMILY GUY',
        genre: 'ANIMATION',
        year: '1999',
        author: 'S. MACFARLANE',
        rating: '8.1',
        image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?auto=format&fit=crop&w=500&q=80',
        contentRating: 'TV-14'
    }
];
