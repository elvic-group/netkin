
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, PlayCircle, Plus, Check, RefreshCw, Play, Filter } from 'lucide-react';
import { GENRES } from '../constants';
import { Movie } from '../types';

interface CatalogProps {
    onMovieClick?: (movie: Movie) => void;
    movies: Movie[];
    watchlist?: string[];
    onToggleWatchlist?: (movieId: string) => void;
    initialGenre?: string;
}

type SortOption = 'Popularity' | 'Year (Newest)' | 'Year (Oldest)' | 'Rating (High to Low)' | 'A-Z';

const Catalog: React.FC<CatalogProps> = ({ onMovieClick, movies, watchlist = [], onToggleWatchlist, initialGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState(initialGenre || 'All Genres');
  const [sortOption, setSortOption] = useState<SortOption>('Popularity');
  const [minRating, setMinRating] = useState(0);
  
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  
  // Local state for movies to allow "reloading/shuffling"
  const [localMovies, setLocalMovies] = useState<Movie[]>(movies);
  const [isReloading, setIsReloading] = useState(false);

  // Sync genre state if prop changes
  useEffect(() => {
      if (initialGenre) {
          setSelectedGenre(initialGenre);
      }
  }, [initialGenre]);

  // Sync local movies if prop changes
  useEffect(() => {
      setLocalMovies(movies);
  }, [movies]);

  const handleReload = () => {
      setIsReloading(true);
      setTimeout(() => {
          const shuffled = [...localMovies].sort(() => Math.random() - 0.5);
          setLocalMovies(shuffled);
          setIsReloading(false);
      }, 800);
  };

  const processedMovies = useMemo(() => {
      let result = [...localMovies];

      // Filter Genre
      if (selectedGenre !== 'All Genres') {
          result = result.filter(m => m.genre.toUpperCase() === selectedGenre.toUpperCase());
      }

      // Filter Rating
      if (minRating > 0) {
          result = result.filter(m => parseFloat(m.rating) >= minRating);
      }

      // Sort
      switch (sortOption) {
          case 'Year (Newest)':
              result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
              break;
          case 'Year (Oldest)':
              result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
              break;
          case 'Rating (High to Low)':
              result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
              break;
          case 'A-Z':
              result.sort((a, b) => a.title.localeCompare(b.title));
              break;
          case 'Popularity':
          default:
               // Assuming default list order is roughly popularity or random
              break;
      }
      return result;

  }, [localMovies, selectedGenre, sortOption, minRating]);
  
  return (
    <div className="container mx-auto px-4 md:px-8 py-32 md:pt-32 flex flex-col md:flex-row gap-8">
      {/* Sidebar - Advanced Filters */}
      <div className="w-full md:w-1/5 flex-shrink-0 hidden md:block">
         <div className="sticky top-32">
             <div className="mb-8">
                 <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Filter size={12} /> Filters
                 </h3>
                 <div className="mb-6">
                     <label className="text-[10px] font-bold text-white uppercase tracking-wider block mb-2">
                         Min Rating: {minRating > 0 ? `${minRating}+` : 'Any'}
                     </label>
                     <input 
                        type="range" 
                        min="0" 
                        max="9" 
                        step="1"
                        value={minRating}
                        onChange={(e) => setMinRating(parseInt(e.target.value))}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-netkin-red"
                     />
                     <div className="flex justify-between text-[8px] text-gray-500 mt-1 font-bold">
                         <span>0</span>
                         <span>9+</span>
                     </div>
                 </div>
             </div>

             <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Genres</h3>
             <div className="flex flex-col space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                 <button 
                    onClick={() => setSelectedGenre('All Genres')}
                    className={`text-left text-[10px] font-bold tracking-widest uppercase transition-colors
                        ${selectedGenre === 'All Genres' ? 'text-netkin-red' : 'text-white hover:text-gray-300'}`}
                 >
                     All Genres
                 </button>
                 {GENRES.map((genre) => (
                     <button 
                        key={genre} 
                        onClick={() => setSelectedGenre(genre)}
                        className={`text-left text-[10px] font-bold tracking-widest uppercase transition-colors
                            ${selectedGenre === genre ? 'text-netkin-red' : 'text-white hover:text-gray-300'}`}
                     >
                         {genre}
                     </button>
                 ))}
             </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
          {/* Top Bar */}
          <div className="flex justify-end mb-8 z-20 relative gap-4 flex-wrap">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Sort By</span>
                  <div className="relative">
                      <button 
                        onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                        className="bg-[#1F2024] px-4 py-2 flex items-center gap-4 min-w-[160px] justify-between border border-white/10 hover:border-white/30 transition-colors"
                      >
                          <span className="text-white text-[10px] font-bold tracking-widest uppercase truncate">
                            {sortOption}
                          </span>
                          <ChevronDown size={14} className={`text-white transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isSortDropdownOpen && (
                          <div className="absolute top-full right-0 mt-2 w-full min-w-[160px] bg-[#1F2024] border border-white/10 shadow-2xl z-30">
                              {['Popularity', 'Year (Newest)', 'Year (Oldest)', 'Rating (High to Low)', 'A-Z'].map((opt) => (
                                  <button
                                    key={opt}
                                    onClick={() => { setSortOption(opt as SortOption); setIsSortDropdownOpen(false); }}
                                    className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors ${sortOption === opt ? 'text-netkin-red' : 'text-white'}`}
                                  >
                                      {opt}
                                  </button>
                              ))}
                          </div>
                      )}
                  </div>
              </div>

              {/* Genre Dropdown (Mobile) */}
              <div className="md:hidden flex items-center gap-4">
                  <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Genre</span>
                  <div className="relative">
                      <button 
                        onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                        className="bg-[#1F2024] px-4 py-2 flex items-center gap-4 min-w-[160px] justify-between border border-white/10 hover:border-white/30 transition-colors"
                      >
                          <span className="text-white text-[10px] font-bold tracking-widest uppercase truncate">
                            {selectedGenre}
                          </span>
                          <ChevronDown size={14} className={`text-white transition-transform duration-300 ${isGenreDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isGenreDropdownOpen && (
                          <div className="absolute top-full right-0 mt-2 w-full min-w-[160px] bg-[#1F2024] border border-white/10 shadow-2xl z-30 max-h-60 overflow-y-auto custom-scrollbar">
                              <button
                                onClick={() => { setSelectedGenre('All Genres'); setIsGenreDropdownOpen(false); }}
                                className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors ${selectedGenre === 'All Genres' ? 'text-netkin-red' : 'text-white'}`}
                              >
                                  All Genres
                              </button>
                              {GENRES.map(genre => (
                                  <button
                                    key={genre}
                                    onClick={() => { setSelectedGenre(genre); setIsGenreDropdownOpen(false); }}
                                    className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors ${selectedGenre === genre ? 'text-netkin-red' : 'text-white'}`}
                                  >
                                      {genre}
                                  </button>
                              ))}
                          </div>
                      )}
                  </div>
              </div>
          </div>

          {/* Grid */}
          {processedMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {processedMovies.map((movie) => {
                     const isInWatchlist = watchlist.includes(movie.id);
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
                            {onToggleWatchlist && (
                                <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie.id); }}
                                        className={`p-2 rounded-full transition-colors ${isInWatchlist ? 'bg-netkin-red text-white' : 'bg-black/60 text-white hover:bg-netkin-red'}`}
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
                        </div>
    
                        {/* Metadata */}
                        <div>
                             <div className="flex justify-between items-center mb-1">
                                <p className="text-netkin-red text-[10px] font-bold uppercase tracking-widest">
                                    {movie.genre}
                                </p>
                                <span className="text-green-500 text-[10px] font-black tracking-tighter">{matchScore}% Match</span>
                            </div>
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
          ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-4">No content found matching filters</p>
                  <button 
                    onClick={() => { setSelectedGenre('All Genres'); setMinRating(0); }}
                    className="text-netkin-red text-xs font-bold uppercase tracking-widest hover:underline"
                  >
                      Reset Filters
                  </button>
              </div>
          )}

          {/* Reload Button */}
          {processedMovies.length > 0 && (
              <div className="mt-16 flex justify-center">
                   <button 
                        onClick={handleReload}
                        disabled={isReloading}
                        className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold py-4 px-16 tracking-widest uppercase transition-colors shadow-lg flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                        {isReloading ? (
                            <>
                                <RefreshCw size={16} className="animate-spin" /> Reloading...
                            </>
                        ) : (
                            'Reload'
                        )}
                    </button>
              </div>
          )}

      </div>
    </div>
  );
};

export default Catalog;
