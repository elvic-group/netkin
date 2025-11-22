
import React, { useState } from 'react';
import { Search, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { NavLink, User } from '../types';

interface NavbarProps {
  onNavigate?: (page: 'landing' | 'news' | 'movies' | 'tvshows' | 'signin') => void;
  currentPage?: 'landing' | 'news' | 'movies' | 'tvshows' | 'signin';
  user?: User | null;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, target?: 'landing' | 'news' | 'movies' | 'tvshows' | 'signin') => {
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
            onClick={(e) => handleNavClick(e, user ? 'news' : 'landing')}
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
