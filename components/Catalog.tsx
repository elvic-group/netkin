
import React, { useState, useEffect } from 'react';
import { ChevronDown, PlayCircle, Plus, Check } from 'lucide-react';
import { GENRES } from '../constants';
import { Movie } from '../types';

interface CatalogProps {
    onMovieClick?: (movie: Movie) => void;
    movies: Movie[];
}

const Catalog: React.FC<CatalogProps> = ({ onMovieClick, movies }) => {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('netkin_watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse watchlist", e);
      }
    }
  }, []);

  const toggleWatchlist = (e: React.MouseEvent, movieId: string) => {
    e.stopPropagation();
    let newWatchlist;
    if (watchlist.includes(movieId)) {
      newWatchlist = watchlist.filter(id => id !== movieId);
    } else {
      newWatchlist = [...watchlist, movieId];
    }
    setWatchlist(newWatchlist);
    localStorage.setItem('netkin_watchlist', JSON.stringify(newWatchlist));
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-32 md:pt-32 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 flex-shrink-0">
         <div className="flex flex-col space-y-4">
             {GENRES.map((genre) => (
                 <button 
                    key={genre} 
                    className={`text-left text-[10px] font-bold tracking-widest uppercase transition-colors
                        ${genre === 'ADVENTURE' ? 'text-netkin-red' : 'text-white hover:text-gray-300'}`}
                 >
                     {genre}
                 </button>
             ))}
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
          {/* Top Bar */}
          <div className="flex justify-end mb-8">
              <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Sort by</span>
                  <button className="bg-[#1F2024] px-4 py-2 flex items-center gap-4">
                      <span className="text-white text-[10px] font-bold tracking-widest uppercase">Popular</span>
                      <ChevronDown size={14} className="text-white" />
                  </button>
              </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {movies.map((movie) => {
                 const isInWatchlist = watchlist.includes(movie.id);
                 return (
                 <div 
                    key={movie.id} 
                    className="group cursor-pointer"
                    onClick={() => onMovieClick && onMovieClick(movie)}
                 >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] bg-[#1a1a1a] overflow-hidden mb-4">
                        <img 
                            src={movie.image} 
                            alt={movie.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100" 
                        />
                        
                        {/* Rating Badge */}
                        <div className="absolute top-0 right-0 bg-netkin-red px-2 py-2 z-10">
                            <span className="text-white text-xs font-bold block">{movie.rating}</span>
                        </div>

                        {/* Watchlist Button */}
                        <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                                onClick={(e) => toggleWatchlist(e, movie.id)}
                                className={`p-2 rounded-full transition-colors ${isInWatchlist ? 'bg-netkin-red text-white' : 'bg-black/60 text-white hover:bg-netkin-red'}`}
                                title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                            >
                                {isInWatchlist ? <Check size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                            </button>
                        </div>

                        {/* Hover Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                             <PlayCircle size={48} strokeWidth={1} className="text-white/80 fill-white/10" />
                        </div>
                    </div>

                    {/* Metadata */}
                    <div>
                        <p className="text-netkin-red text-[10px] font-bold uppercase tracking-widest mb-1">
                            {movie.genre}
                        </p>
                        <h3 className="text-white text-xs font-black uppercase tracking-wider mb-1 leading-tight">
                            {movie.title}
                        </h3>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            {movie.year} - {movie.author}
                        </p>
                    </div>
                </div>
              )})}
          </div>

          {/* Reload Button */}
          <div className="mt-16 flex justify-center">
               <button className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold py-4 px-16 tracking-widest uppercase transition-colors shadow-lg">
                    Reload
                </button>
          </div>

      </div>
    </div>
  );
};

export default Catalog;
