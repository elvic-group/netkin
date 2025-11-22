import React from 'react';
import { Search } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <div className="text-3xl font-black italic tracking-tighter text-white">
          Netkin
        </div>

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
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white hover:text-gray-300">
          Sign Up
        </a>
      </div>
    </nav>
  );
};

export default Navbar;