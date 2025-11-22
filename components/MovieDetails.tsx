
import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronRight, Search, Play, Pause, Volume2, Maximize, MessageSquare, PlayCircle } from 'lucide-react';
import { Movie } from '../types';
import { NAV_LINKS } from '../constants';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const [viewState, setViewState] = useState<'overview' | 'loading' | 'playing'>('overview');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (viewState === 'loading') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setViewState('playing');
            return 100;
          }
          return prev + 1;
        });
      }, 30); // Simulates ~3 seconds loading
      return () => clearInterval(interval);
    }
  }, [viewState]);

  const handleWatchClick = () => {
    setViewState('loading');
    setProgress(0);
  };

  // Helper to calculate circular progress stroke
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[100] bg-black font-sans text-white overflow-hidden">
      
      {/* Navbar (Replicated/Overlay) */}
      <div className="absolute top-0 left-0 w-full px-8 py-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="flex items-center gap-12 pointer-events-auto">
           <button onClick={onClose} className="flex items-center gap-2 group">
             <span className="text-3xl font-black italic tracking-tighter text-white">Netkin</span>
             <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <span key={link.label} className={`text-[10px] font-bold tracking-[0.2em] uppercase ${link.target === 'catalog' ? 'text-netkin-red' : 'text-gray-400'}`}>
                {link.label}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6 pointer-events-auto">
          <Search size={18} strokeWidth={3} className="text-white cursor-pointer hover:text-netkin-red" />
          <button className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 hover:text-netkin-red">
            Sign Up
          </button>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
         <img 
           src={movie.image.replace('w=500', 'w=1920').replace('w=600', 'w=1920')} 
           alt={movie.title} 
           className={`w-full h-full object-cover transition-all duration-1000 ${viewState === 'loading' ? 'opacity-20 scale-105' : 'opacity-60'}`}
         />
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Close Button (Content Area) */}
      {viewState !== 'loading' && (
          <button 
            onClick={onClose}
            className="absolute top-32 right-12 md:right-24 z-50 p-2 text-white hover:text-netkin-red transition-colors"
          >
            <X size={32} strokeWidth={1} />
          </button>
      )}

      {/* === OVERVIEW STATE === */}
      {viewState === 'overview' && (
        <div className="absolute inset-0 flex items-center justify-end px-8 md:px-24 z-10">
           <div className="w-full max-w-xl relative pt-20">
              
              {/* Tabs */}
              <div className="flex gap-8 mb-8 border-b border-white/10">
                  <button className="pb-4 border-b-2 border-netkin-red text-xs font-bold uppercase tracking-widest text-white">
                      Overview
                  </button>
                  <button className="pb-4 border-b-2 border-transparent text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                      Details
                  </button>
              </div>

              {/* Tags */}
              <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">
                      {movie.genre}
                  </span>
                   <span className="px-3 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">
                      PG
                  </span>
                   <span className="px-3 py-1 bg-netkin-red text-[10px] font-bold uppercase tracking-wider text-white">
                      {movie.rating}
                  </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-black uppercase leading-[0.9] tracking-tight mb-2">
                  {movie.title}
              </h1>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tight mb-6 text-gray-400">
                  With {movie.author}
              </h2>

              {/* Meta */}
              <p className="text-[10px] font-bold text-netkin-red uppercase tracking-widest mb-6">
                  {movie.year} <span className="text-gray-500 mx-2">{movie.author}</span> <span className="text-white">2H 44MIN</span>
              </p>

              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed mb-10">
                  Dom braves the remote wilderness of Namibia while on the hunt for Africa's largest, deadliest scorpion-parabuthus villosus