
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LATEST_MOVIES } from '../constants';
import { Movie } from '../types';

interface LatestReleaseProps {
    onMovieClick?: (movie: Movie) => void;
}

const LatestRelease: React.FC<LatestReleaseProps> = ({ onMovieClick }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? LATEST_MOVIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === LATEST_MOVIES.length - 1 ? 0 : prev + 1));
  };

  const getMovie = (offset: number) => {
      const index = (activeIndex + offset + LATEST_MOVIES.length) % LATEST_MOVIES.length;
      return LATEST_MOVIES[index];
  };

  const prevMovie = getMovie(-1);
  const currentMovie = getMovie(0);
  const nextMovie = getMovie(1);

  return (
    <section className="bg-[#111112] py-16 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-8">
        
        {/* Section Header */}
        <div className="mb-12">
             <div className="inline-block border border-white/20 px-6 py-3">
                <span className="text-xs font-bold tracking-widest uppercase text-white">Latest Release</span>
             </div>
        </div>

        {/* Carousel Layout */}
        <div className="relative flex items-center gap-4 select-none">
            
            {/* Left Arrow */}
            <button 
                onClick={handlePrev}
                className="text-netkin-red hover:text-white transition-colors p-2 -ml-4 z-20 hover:scale-110 transform duration-200"
            >
                <ChevronLeft size={40} strokeWidth={1.5} />
            </button>

            <div className="flex-grow flex gap-0 items-center justify-center relative h-[450px]">
                
                {/* Item 1 (Previous/Left) */}
                <div 
                    className="absolute left-0 w-1/4 h-64 opacity-40 scale-90 origin-right filter grayscale brightness-50 transition-all duration-500 ease-in-out transform -translate-x-1/4 cursor-pointer"
                    onClick={() => onMovieClick && onMovieClick(prevMovie)}
                >
                     <img src={prevMovie.image} className="w-full h-full object-cover rounded-sm" alt={prevMovie.title} />
                </div>

                {/* Item 2 (Active/Center) */}
                <div 
                    className="relative w-full md:w-1/2 h-full z-10 shadow-2xl mx-4 cursor-pointer group transition-all duration-500 ease-in-out"
                    onClick={() => onMovieClick && onMovieClick(currentMovie)}
                >
                    <div className="w-full h-full overflow-hidden rounded-sm">
                        <img src={currentMovie.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={currentMovie.title} />
                    </div>
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                         <p className="text-netkin-red text-xs font-bold uppercase tracking-widest mb-2">
                             {currentMovie.genre}
                         </p>
                         <h3 className="text-3xl font-black uppercase text-white mb-2 tracking-tight">
                             {currentMovie.title}
                         </h3>
                         <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                             {currentMovie.year} - {currentMovie.author}
                         </p>
                    </div>
                </div>

                {/* Item 3 (Next/Right) */}
                <div 
                    className="absolute right-0 w-1/4 h-64 opacity-100 scale-95 cursor-pointer group transition-all duration-500 ease-in-out transform translate-x-1/4"
                    onClick={() => onMovieClick && onMovieClick(nextMovie)}
                >
                     <img src={nextMovie.image} className="w-full h-full object-cover rounded-sm" alt={nextMovie.title} />
                     <div className="absolute bottom-0 left-0 w-full p-4 bg-black/60 rounded-b-sm">
                         <p className="text-netkin-red text-[10px] font-bold uppercase tracking-widest mb-1">
                             {nextMovie.genre}
                         </p>
                         <h3 className="text-sm font-bold uppercase text-white leading-tight mb-1 truncate">
                             {nextMovie.title}
                         </h3>
                         <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">
                             {nextMovie.year} - {nextMovie.author}
                         </p>
                    </div>
                </div>
            </div>

            {/* Right Arrow */}
            <button 
                onClick={handleNext}
                className="text-white hover:text-netkin-red transition-colors p-2 -mr-4 z-20 hover:scale-110 transform duration-200"
            >
                <ChevronRight size={40} strokeWidth={1.5} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default LatestRelease;
