import React from 'react';
import { ChevronRight, PlayCircle } from 'lucide-react';
import { Movie } from '../types';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies, onMovieClick }) => {
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
            
            <button className="border border-white/20 px-6 py-2 text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white hover:text-netkin-dark transition-colors">
                All
            </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
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
                        <div className="absolute top-0 right-0 bg-netkin-red px-2 py-2">
                            <span className="text-white text-xs font-bold block">{movie.rating}</span>
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
            ))}
             {/* Navigation Arrow (Visual only as per design grid) */}
             <div className="hidden md:flex items-center justify-center">
                <button className="text-white/20 hover:text-white transition-colors">
                    <ChevronRight size={48} strokeWidth={1} />
                </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default MovieSection;