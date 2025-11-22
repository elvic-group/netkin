import React from 'react';
import { Search } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  onNavigate?: (page: 'home' | 'signin') => void;
  currentPage?: 'home' | 'signin';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const handleNavClick = (e: React.MouseEvent, page: 'home' | 'signin') => {
    e.preventDefault();
    if (onNavigate) onNavigate(page);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <button 
          onClick={(e) => handleNavClick(e, 'home')}
          className="text-3xl font-black italic tracking-tighter text-white hover:scale-105 transition-transform"
        >
          Netkin
        </button>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs font-bold tracking-widest uppercase hover:text-white transition-colors pb-1 ${
                link.active ? 'text-netkin-red border-b-2 border-netkin-red' : 'text-gray-300'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-white hover:text-netkin-red transition-colors">
          <Search size={20} />
        </button>
        <button 
          onClick={(e) => handleNavClick(e, currentPage === 'signin' ? 'home' : 'signin')}
          className={`text-xs font-bold uppercase tracking-widest transition-colors px-6 py-2 border-2 ${
            currentPage === 'signin' 
              ? 'border-netkin-red text-white bg-netkin-red hover:bg-red-700' 
              : 'border-gray-500 text-gray-300 hover:text-white hover:border-white'
          }`}
        >
          {currentPage === 'signin' ? 'Back to Home' : 'Sign Up'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;