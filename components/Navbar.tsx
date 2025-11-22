import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { NavLink } from '../types';

interface NavbarProps {
  onNavigate?: (page: 'landing' | 'movies' | 'signin') => void;
  currentPage?: 'landing' | 'movies' | 'signin';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, target?: 'landing' | 'movies' | 'signin') => {
    e.preventDefault();
    if (onNavigate && target) {
      onNavigate(target);
    }
    setIsMenuOpen(false);
  };

  const isLinkActive = (link: NavLink) => {
    if (link.active) return true;
    if (link.target === currentPage) return true;
    return false;
  };

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <button 
            onClick={(e) => handleNavClick(e, 'landing')}
            className="flex items-center gap-2 group"
          >
             <span className="text-3xl font-black italic tracking-tighter text-white group-hover:scale-105 transition-transform">Netkin</span>
             {/* Simple Triangle Play icon simulation for logo */}
             <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
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
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-white hover:text-netkin-red transition-colors">
            <Search size={18} strokeWidth={3} />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-netkin-red transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button 
            onClick={(e) => handleNavClick(e, currentPage === 'signin' ? 'landing' : 'signin')}
            className={`hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] transition-all px-6 py-3 border-2 ${
              currentPage === 'signin' 
                ? 'border-netkin-red text-white bg-netkin-red hover:bg-red-700' 
                : 'border-gray-600 text-gray-300 hover:text-white hover:border-white'
            }`}
          >
            {currentPage === 'signin' ? 'Close' : 'Sign Up'}
          </button>
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
            <button 
                onClick={(e) => handleNavClick(e, currentPage === 'signin' ? 'landing' : 'signin')}
                className="text-lg font-bold uppercase tracking-widest text-white hover:text-netkin-red transition-colors"
            >
                {currentPage === 'signin' ? 'Close' : 'Sign Up'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;