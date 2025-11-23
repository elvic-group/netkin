
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Menu, X, LogOut, User as UserIcon, PlayCircle } from 'lucide-react';
import { NAV_LINKS, CATALOG_MOVIES, CATALOG_TV_SHOWS, POPULAR_MOVIES, ACTION_MOVIES, ADVENTURE_MOVIES, LATEST_MOVIES } from '../constants';
import { NavLink, User, Movie } from '../types';

interface NavbarProps {
  onNavigate?: (page: 'landing' | 'news' | 'movies' | 'tvshows' | 'signin' | 'mylist') => void;
  currentPage?: 'landing' | 'news' | 'movies' | 'tvshows' | 'signin' | 'mylist';
  user?: User | null;
  onLogout?: () => void;
  onSearchSelect?: (movie: Movie) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, user, onLogout, onSearchSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Combine all movies for search, memoized to prevent recreation on every render
  const allContent = useMemo(() => [
      ...CATALOG_MOVIES, 
      ...CATALOG_TV_SHOWS, 
      ...LATEST_MOVIES, 
      ...POPULAR_MOVIES, 
      ...ACTION_MOVIES, 
      ...ADVENTURE_MOVIES
  ], []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleNavClick = (e: React.MouseEvent, target?: 'landing' | 'news' | 'movies' | 'tvshows' | 'signin' | 'mylist') => {
    e.preventDefault();
    
    let finalTarget = target;

    // UX Improvement: If user is logged in, "HOME" (landing) should go to "NEWS" (Dashboard)
    if (user && target === 'landing') {
        finalTarget = 'news';
    }

    if (onNavigate && finalTarget) {
      onNavigate(finalTarget);
    }
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const lowerQuery = query.toLowerCase();
      // Filter by title, genre, or author, case insensitive
      const filtered = allContent.filter(m => 
        m.title.toLowerCase().includes(lowerQuery) ||
        m.genre.toLowerCase().includes(lowerQuery) ||
        m.author.toLowerCase().includes(lowerQuery)
      );
      
      // Deduplicate by title to avoid showing the same movie multiple times from different lists
      const uniqueMovies = Array.from(new Map(filtered.map(m => [m.title, m])).values());
      
      setSearchResults(uniqueMovies.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // If there are results, select the first one on enter
      if (searchResults.length > 0 && onSearchSelect) {
          onSearchSelect(searchResults[0]);
          closeSearch();
      }
  };

  const selectSearchResult = (movie: Movie) => {
      if (onSearchSelect) {
          onSearchSelect(movie);
      }
      closeSearch();
  };

  const closeSearch = () => {
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
  };

  const isLinkActive = (link: NavLink) => {
    if (link.active) return true;
    if (link.target === currentPage) return true;
    // Highlight HOME/NEWS if on dashboard
    if (user && link.target === 'landing' && currentPage === 'news') return true;
    return false;
  };

  // Background logic: Solid on Catalog pages or when scrolled, transparent gradient on Hero pages at top
  const isHeroPage = currentPage === 'landing' || currentPage === 'news';
  const bgClass = (isHeroPage && !isScrolled) 
    ? 'bg-gradient-to-b from-black/90 to-transparent' 
    : 'bg-netkin-dark shadow-md border-b border-white/5';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between transition-all duration-300 ${bgClass}`}>
        <div className="flex items-center gap-12 flex-grow">
          {/* Logo - Click to Home */}
          <button 
            onClick={(e) => handleNavClick(e, 'landing')}
            className="flex items-center gap-2 group flex-shrink-0"
          >
             <span className="text-3xl font-black italic tracking-tighter text-white group-hover:scale-105 transition-transform">Netkin</span>
             {/* Simple Triangle Play icon simulation for logo */}
             <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </button>

          {/* Desktop Links / Search Bar */}
          <div className="hidden md:flex items-center gap-8 flex-grow relative">
            {isSearchOpen ? (
                <div className="w-full max-w-2xl relative animate-in fade-in slide-in-from-top-2 duration-300">
                    <form onSubmit={handleSearchSubmit} className="relative w-full">
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Titles, people, genres"
                            className="w-full bg-black/50 border border-white/30 text-white px-4 py-2 text-sm font-bold tracking-wide focus:outline-none focus:border-netkin-red placeholder-gray-500"
                        />
                        <button 
                            type="button"
                            onClick={closeSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            <X size={16} />
                        </button>
                    </form>

                    {/* Suggestions Dropdown */}
                    {(searchResults.length > 0 || (searchQuery.length > 1 && searchResults.length === 0)) && (
                        <div className="absolute top-full left-0 w-full bg-[#1F2024] border border-white/10 shadow-2xl mt-1 z-50">
                            {searchResults.length > 0 ? (
                                searchResults.map(movie => (
                                    <div 
                                        key={movie.id}
                                        onClick={() => selectSearchResult(movie)}
                                        className="flex items-center gap-4 p-3 hover:bg-white/5 cursor-pointer group border-b border-white/5 last:border-none transition-colors"
                                    >
                                        <div className="w-10 h-14 bg-gray-800 flex-shrink-0 overflow-hidden">
                                            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-netkin-red transition-colors">
                                                {movie.title}
                                            </span>
                                            <span className="text-[10px] text-gray-500 uppercase font-bold">
                                                {movie.year} • {movie.genre}
                                            </span>
                                        </div>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                            <PlayCircle size={20} className="text-netkin-red" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">No results found</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                NAV_LINKS.map((link) => (
                <button
                    key={link.label}
                    onClick={(e) => handleNavClick(e, link.target)}
                    className={`text-[10px] font-bold tracking-[0.2em] uppercase hover:text-white transition-colors pb-1 ${
                    isLinkActive(link)
                        ? 'text-netkin-red' 
                        : 'text-gray-400'
                    }`}
                >
                    {link.label}
                </button>
                ))
            )}
          </div>
        </div>

        <div className="flex items-center gap-6 pl-8">
          {!isSearchOpen && (
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-netkin-red transition-colors"
            >
                <Search size={18} strokeWidth={3} />
            </button>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-netkin-red transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-white/80">
                    <UserIcon size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{user.name || user.email}</span>
                </div>
                <button 
                    onClick={onLogout}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all px-4 py-2 border border-white/20 text-gray-400 hover:text-white hover:border-white/40"
                >
                    <LogOut size={14} />
                    Log Out
                </button>
            </div>
          ) : (
            <button 
                onClick={(e) => handleNavClick(e, 'signin')}
                className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] transition-all px-8 py-3 border border-white/20 text-netkin-red hover:bg-netkin-red hover:text-white hover:border-netkin-red bg-black/20"
            >
                Sign Up
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-netkin-dark/95 z-40 flex flex-col items-center justify-center md:hidden backdrop-blur-sm">
          <div className="flex flex-col gap-8 text-center">
             {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`text-2xl font-black tracking-widest uppercase hover:text-netkin-red transition-colors ${
                   isLinkActive(link) ? 'text-netkin-red' : 'text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="w-12 h-1 bg-gray-800 mx-auto my-4"></div>
            
            {user ? (
                 <button 
                    onClick={() => {
                        if(onLogout) onLogout();
                        setIsMenuOpen(false);
                    }}
                    className="text-lg font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                >
                    Log Out
                </button>
            ) : (
                <button 
                    onClick={(e) => handleNavClick(e, 'signin')}
                    className="text-lg font-bold uppercase tracking-widest text-netkin-red hover:text-white transition-colors"
                >
                    Sign Up
                </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
