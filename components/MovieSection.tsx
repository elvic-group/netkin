
import React from 'react';
import { ChevronRight, PlayCircle, Plus, Check, Play } from 'lucide-react';
import { Movie } from '../types';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
  watchlist?: string[];
  onToggleWatchlist?: (movieId: string) => void;
  onViewAll?: () => void;
  progress?: Record<string, number>; // Map of movie ID to progress percentage (0-100)
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies, onMovieClick, watchlist = [], onToggleWatchlist, onViewAll, progress = {} }) => {
  return (
    <section className="bg-netkin-dark py-12 border-b border-white/5">
      <div className="container mx-auto px-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
            <div className="flex flex-col">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-2">
                    {title}
                </h2>
                <div className="w-8 h-1 bg-netkin-red"></div>
            </div>
            
            <button 
                onClick={onViewAll}
                className="border border-white/20 px-6 py-2 text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white hover:text-netkin-dark transition-colors"
            >
                All
            </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {movies.map((movie) => {
                const isInWatchlist = watchlist.includes(movie.id);
                const progressPercent = progress[movie.id];
                // Deterministic "Match %" for visual flair based on ID char code
                const matchScore = 85 + (movie.id.charCodeAt(0) % 15); 
                
                return (
                <div 
                    key={movie.id} 
                    className="group cursor-pointer relative z-10"
                    onClick={() => {
                        if (onMovieClick) onMovieClick(movie);
                    }}
                >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] bg-[#1a1a1a] overflow-hidden mb-2">
                        <img 
                            src={movie.image} 
                            alt={movie.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100" 
                        />
                        
                        {/* Rating Badge */}
                        <div className="absolute top-0 right-0 bg-netkin-red px-2 py-2 z-10 shadow-md">
                            <span className="text-white text-xs font-bold block">{movie.rating}</span>
                        </div>

                        {/* Watchlist Button (Functional) */}
                        {onToggleWatchlist && (
                            <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie.id); }}
                                    className={`p-2 rounded-full transition-colors shadow-lg ${isInWatchlist ? 'bg-netkin-red text-white' : 'bg-black/60 text-white hover:bg-netkin-red'}`}
                                    title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                                >
                                    {isInWatchlist ? <Check size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                                </button>
                            </div>
                        )}

                        {/* Hover Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[1px] pointer-events-none">
                             <div className="bg-netkin-red/90 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl pointer-events-auto">
                                <Play size={28} fill="currentColor" className="text-white ml-1" />
                             </div>
                        </div>

                        {/* Progress Bar Overlay */}
                        {progressPercent !== undefined && progressPercent > 0 && (
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 z-20">
                             <div 
                               className="h-full bg-netkin-red" 
                               style={{ width: `${progressPercent}%` }}
                             ></div>
                          </div>
                        )}
                    </div>

                    {/* Metadata */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                             <p className="text-netkin-red text-[10px] font-bold uppercase tracking-widest">
                                {movie.genre}
                            </p>
                            <span className="text-green-500 text-[10px] font-black tracking-tighter">
                                {matchScore}% Match
                            </span>
                        </div>
                        <h3 className="text-white text-xs font-black uppercase tracking-wider mb-1 leading-tight truncate">
                            {movie.title}
                        </h3>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            {movie.year} - {movie.author}
                        </p>
                    </div>
                </div>
            )})}
             {/* Navigation Arrow (Visual only) */}
             <div className="hidden md:flex items-center justify-center">
                <button 
                    onClick={onViewAll}
                    className="text-white/20 hover:text-white transition-colors"
                >
                    <ChevronRight size={48} strokeWidth={1} />
                </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default MovieSection;
