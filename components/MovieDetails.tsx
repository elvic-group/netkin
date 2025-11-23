
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, ChevronDown, ChevronRight, Search, Play, Pause, Volume2, VolumeX, Maximize, Minimize, MessageSquare, PlayCircle, Share2, Check, Plus, Sparkles, Download, WifiOff, Film } from 'lucide-react';
import { Movie } from '../types';
import { NAV_LINKS, CATALOG_MOVIES, CATALOG_TV_SHOWS, POPULAR_MOVIES, ACTION_MOVIES, ADVENTURE_MOVIES, LATEST_MOVIES } from '../constants';
import MoviePosterGenerator from './MoviePosterGenerator';
import MovieVideoGenerator from './MovieVideoGenerator';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  watchlist?: string[];
  onToggleWatchlist?: (movieId: string) => void;
  onMovieClick?: (movie: Movie) => void;
}

// Sample video URL for demonstration
const VIDEO_URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose, watchlist = [], onToggleWatchlist, onMovieClick }) => {
  const [viewState, setViewState] = useState<'overview' | 'loading' | 'playing'>('overview');
  const [progress, setProgress] = useState(0);
  
  // Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Share State
  const [isCopied, setIsCopied] = useState(false);

  // Generator State
  const [showGenerator, setShowGenerator] = useState(false);
  const [showVideoGenerator, setShowVideoGenerator] = useState(false);

  // Download State
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'downloaded'>('idle');

  const isInWatchlist = watchlist.includes(movie.id);

  // Reset state when movie changes
  useEffect(() => {
    setViewState('overview');
    setProgress(0);
    setIsPlaying(false);
    setShowGenerator(false);
    setShowVideoGenerator(false);
    setDownloadStatus('idle');
  }, [movie]);

  // Filter Similar Movies (Memoized for performance)
  const similarMovies = useMemo(() => {
      const allMovies = [...CATALOG_MOVIES, ...CATALOG_TV_SHOWS, ...POPULAR_MOVIES, ...ACTION_MOVIES, ...ADVENTURE_MOVIES, ...LATEST_MOVIES];
      const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());
      return uniqueMovies
        .filter(m => m.genre === movie.genre && m.id !== movie.id)
        .slice(0, 6); // Increased from 4 to 6
  }, [movie.genre, movie.id]);

  // Mock Cast Data
  const castMembers = useMemo(() => [
      { name: movie.author, role: 'Director' },
      { name: 'Johannes Doe', role: 'Lead Actor' },
      { name: 'Sarah Smith', role: 'Support' },
      { name: 'Michael Bay-ish', role: 'Producer' },
      { name: 'Emily Blunt-like', role: 'Actress' }
  ], [movie]);

  // Loading Simulation
  useEffect(() => {
    if (viewState === 'loading') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setViewState('playing');
            return 100;
          }
          // Non-linear progress for realism
          const increment = Math.random() * 2 + 0.5; 
          return Math.min(prev + increment, 100);
        });
      }, 30); 
      return () => clearInterval(interval);
    }
  }, [viewState]);

  // Autoplay when entering playing state
  useEffect(() => {
    if (viewState === 'playing' && videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Autoplay prevented:", e));
    }
  }, [viewState]);

  // Helper: Hide controls after inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    if (viewState === 'playing' && isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleWatchClick = () => {
    setViewState('loading');
    setProgress(0);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      // Resume from saved progress
      const savedTime = localStorage.getItem(`netkin_progress_${movie.id}`);
      if (savedTime) {
        const time = parseFloat(savedTime);
        // Only resume if not finished (arbitrary buffer of 5 seconds from end)
        if (!isNaN(time) && time < videoRef.current.duration - 5) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
      // Save progress to local storage
      if (time > 0) {
        localStorage.setItem(`netkin_progress_${movie.id}`, time.toString());
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
      const handleFullscreenChange = () => {
          setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/watch/${movie.id}`;
    
    if (navigator.share) {
        navigator.share({
            title: movie.title,
            text: `Watch ${movie.title} on Netkin`,
            url: shareUrl,
        }).catch(() => {
             // Fallback if user cancels or share fails
        });
    } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => console.error('Failed to copy:', err));
    }
  };

  const handleDownload = () => {
      if (downloadStatus === 'idle') {
          setDownloadStatus('downloading');
          // Simulate download
          setTimeout(() => {
              setDownloadStatus('downloaded');
          }, 2500);
      }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const mStr = m < 10 ? `0${m}` : `${m}`;
    const sStr = s < 10 ? `0${s}` : `${s}`;
    return `${h}:${mStr}:${sStr}`;
  };

  // Loading Circle Calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black font-sans text-white overflow-hidden select-none group"
      onMouseMove={handleMouseMove}
      onClick={() => viewState === 'playing' && togglePlay()}
    >
      
      {/* === NAVBAR (Overlay) === */}
      {/* Only show navbar in overview or if controls are visible in playing */}
      <div className={`absolute top-0 left-0 w-full px-8 py-6 flex items-center justify-between z-50 transition-opacity duration-500 ${viewState === 'playing' && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${viewState === 'playing' ? 'bg-gradient-to-b from-black/90 to-transparent' : 'bg-transparent'}`}>
        <div className="flex items-center gap-12" onClick={(e) => e.stopPropagation()}>
           <button onClick={onClose} className="flex items-center gap-2 group">
             <span className="text-3xl font-black italic tracking-tighter text-white">Netkin</span>
             <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </button>
          {viewState !== 'playing' && (
            <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                <span key={link.label} className={`text-[10px] font-bold tracking-[0.2em] uppercase ${link.target === 'movies' ? 'text-netkin-red' : 'text-gray-400'}`}>
                    {link.label}
                </span>
                ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
           {viewState === 'playing' && (
               <button onClick={onClose} className="hover:text-netkin-red transition-colors">
                   <X size={24} />
               </button>
           )}
           {viewState !== 'playing' && (
             <>
                <Search size={18} strokeWidth={3} className="text-white cursor-pointer hover:text-netkin-red" />
                <button className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 hover:text-netkin-red">
                    Sign Up
                </button>
             </>
           )}
        </div>
      </div>

      {/* === VIDEO PLAYER === */}
      <video 
        ref={videoRef}
        src={VIDEO_URL}
        className={`absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-500 ${viewState === 'playing' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
            setIsPlaying(false);
            localStorage.removeItem(`netkin_progress_${movie.id}`);
        }}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
            setIsBuffering(false);
            setIsPlaying(true);
        }}
        onCanPlay={() => setIsBuffering(false)}
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
      />

      {/* === BUFFERING INDICATOR === */}
      {viewState === 'playing' && isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
            <div className="w-16 h-16 border-4 border-white/20 border-t-netkin-red rounded-full animate-spin drop-shadow-lg"></div>
        </div>
      )}

      {/* === BACKGROUND IMAGE (Overview / Loading) === */}
      {viewState !== 'playing' && (
        <div className="absolute inset-0 z-0">
           <img 
             src={movie.image.replace('w=500', 'w=1920').replace('w=600', 'w=1920')} 
             alt={movie.title} 
             className={`w-full h-full object-cover transition-all duration-1000 ${viewState === 'loading' ? 'opacity-20 scale-105 blur-sm' : 'opacity-40'}`}
           />
           <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
      )}

      {/* === CLOSE BUTTON (Overview) === */}
      {viewState === 'overview' && (
          <button 
            onClick={onClose}
            className="absolute top-32 right-12 md:right-24 z-50 p-2 text-white hover:text-netkin-red transition-colors"
          >
            <X size={32} strokeWidth={1} />
          </button>
      )}

      {/* === OVERVIEW STATE === */}
      {viewState === 'overview' && (
        <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar">
           <div className="min-h-full flex items-center justify-end px-8 md:px-24 py-24">
               <div className="w-full max-w-xl relative pt-10">
                  
                  {/* Tabs */}
                  <div className="flex gap-8 mb-8 border-b border-white/10">
                      <button className="pb-4 border-b-2 border-netkin-red text-xs font-bold uppercase tracking-widest text-white">
                          Overview
                      </button>
                      <button className="pb-4 border-b-2 border-transparent text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                          Details
                      </button>
                      <button className="pb-4 border-b-2 border-transparent text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                          Reviews
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
                  <p className="text-sm text-gray-300 leading-relaxed mb-10 max-w-md">
                      Dom braves the remote wilderness of Namibia while on the hunt for Africa's largest, deadliest scorpion-parabuthus villosus, commonly known as the black hairy thick-tailed scorpion.
                      <br /><br />
                      This beast can not only kill a human but also spray its venom.
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col gap-4 mb-12">
                      {/* Row 1: Primary Actions */}
                      <div className="flex items-stretch gap-4 flex-wrap">
                          <button 
                            onClick={handleWatchClick}
                            className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold px-8 h-[50px] tracking-widest uppercase transition-colors shadow-lg flex items-center justify-center"
                          >
                              Watch Trailer
                          </button>

                          <div className="flex border border-white/20 hover:border-white/40 transition-colors h-[50px]">
                              <button className="flex items-center px-6 bg-transparent text-[10px] font-bold text-white tracking-widest uppercase h-full">
                                  1080P <ChevronDown size={12} className="ml-2" />
                              </button>
                          </div>

                          <div className="flex border border-white/20 px-6 items-center hover:border-white/40 transition-colors h-[50px]">
                              <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                                  247/600 Peers
                              </span>
                          </div>

                          {/* Watchlist Button */}
                          {onToggleWatchlist && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie.id); }}
                                className={`w-[50px] h-[50px] border border-white/20 flex items-center justify-center transition-colors ${isInWatchlist ? 'bg-white/10 text-netkin-red border-white/40' : 'hover:bg-white/5 text-white hover:border-white/40'}`}
                                title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                            >
                                {isInWatchlist ? <Check size={20} /> : <Plus size={20} />}
                            </button>
                          )}
                      </div>

                      {/* Row 2: Secondary Tools */}
                      <div className="flex items-center gap-4">
                          {/* Download Button */}
                          <button 
                              onClick={handleDownload}
                              className={`w-[50px] h-[50px] border border-white/20 flex items-center justify-center transition-colors ${downloadStatus === 'downloaded' ? 'text-green-500 border-green-500/50' : 'text-white hover:bg-white/5 hover:border-white/40'}`}
                              title="Download for Offline Viewing"
                              disabled={downloadStatus === 'downloading'}
                          >
                              {downloadStatus === 'downloading' ? (
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              ) : downloadStatus === 'downloaded' ? (
                                  <WifiOff size={20} />
                              ) : (
                                  <Download size={20} />
                              )}
                          </button>

                          {/* Share Button */}
                          <button 
                              onClick={handleShare}
                              className="w-[50px] h-[50px] border border-white/20 flex items-center justify-center text-white hover:bg-white/5 hover:border-white/40 transition-colors"
                              title="Share"
                          >
                              {isCopied ? <Check size={20} className="text-netkin-red" /> : <Share2 size={20} />}
                          </button>

                          {/* AI Poster Generator Button */}
                          <button 
                              onClick={() => setShowGenerator(true)}
                              className="w-[50px] h-[50px] border border-white/20 flex items-center justify-center text-white hover:bg-white/5 hover:border-white/40 transition-colors group"
                              title="Remix Poster with AI"
                          >
                              <Sparkles size={20} className="group-hover:text-netkin-red transition-colors" />
                          </button>

                          {/* AI Video Generator Button */}
                          <button 
                              onClick={() => setShowVideoGenerator(true)}
                              className="w-[50px] h-[50px] border border-white/20 flex items-center justify-center text-white hover:bg-white/5 hover:border-white/40 transition-colors group"
                              title="Generate Teaser with Veo"
                          >
                              <Film size={20} className="group-hover:text-netkin-red transition-colors" />
                          </button>
                      </div>
                  </div>

                  {/* TOP CAST */}
                  <div className="mb-10 border-t border-white/10 pt-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Top Cast</h3>
                      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                          {castMembers.map((person, idx) => (
                              <div key={idx} className="flex items-center gap-3 min-w-[140px] bg-white/5 p-2 pr-4 rounded-sm hover:bg-white/10 transition-colors cursor-default">
                                  <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                                      <img src={`https://i.pravatar.cc/100?u=${movie.id}${idx}`} className="w-full h-full object-cover opacity-80" alt={person.name} />
                                  </div>
                                  <div className="flex flex-col">
                                      <span className="text-[9px] font-bold text-white uppercase tracking-wide">{person.name}</span>
                                      <span className="text-[8px] font-medium text-gray-500 uppercase tracking-wider">{person.role}</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* MORE LIKE THIS SECTION */}
                  {similarMovies.length > 0 && (
                    <div className="pt-8 border-t border-white/10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">More Like This</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {similarMovies.map(m => (
                                <div key={m.id} onClick={() => onMovieClick && onMovieClick(m)} className="cursor-pointer group">
                                    <div className="aspect-video overflow-hidden mb-2 bg-gray-900 relative">
                                        <img src={m.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"/>
                                        <div className="absolute top-1 right-1 bg-netkin-red px-1">
                                            <span className="text-[8px] font-bold text-white">{m.rating}</span>
                                        </div>
                                    </div>
                                    <h4 className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-netkin-red transition-colors truncate">{m.title}</h4>
                                    <span className="text-[9px] text-gray-600 uppercase font-bold">{m.year}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                  )}

               </div>
           </div>
        </div>
      )}

      {/* === LOADING STATE === */}
      {viewState === 'loading' && (
         <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80 backdrop-blur-sm">
             <div className="relative w-48 h-48 flex items-center justify-center">
                 <svg className="w-full h-full -rotate-90">
                     <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="#333"
                        strokeWidth="4"
                        fill="transparent"
                     />
                     <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="#E50914"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-100 ease-out"
                     />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-5xl font-black text-white">
                         {Math.round(progress)}<span className="text-2xl align-top">%</span>
                     </span>
                 </div>
             </div>
             <p className="mt-8 text-xs font-bold tracking-[0.2em] uppercase text-white animate-pulse">
                 Please Wait ...
             </p>
         </div>
      )}

      {/* === PLAYING STATE CONTROLS === */}
      {viewState === 'playing' && (
        <div 
            className={`absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black via-black/80 to-transparent z-50 transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Progress Bar */}
            <div className="relative w-full h-1 bg-gray-700 mb-6 group cursor-pointer">
                <div 
                  className="absolute h-full bg-netkin-red" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
                <div 
                  className="absolute h-3 w-3 bg-white rounded-full -mt-1 shadow-lg transform scale-0 group-hover:scale-100 transition-transform"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                ></div>
                <input 
                   type="range" 
                   min="0" 
                   max={duration || 100} 
                   value={currentTime}
                   onChange={handleSeek}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button onClick={togglePlay} className="text-white hover:text-netkin-red transition-colors">
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                    </button>
                    
                    <span className="text-xs font-bold text-white tracking-widest font-mono">
                        {formatTime(currentTime)}<span className="text-gray-500 mx-1">/</span>{formatTime(duration)}
                    </span>

                    {/* Visual volume bar simulation */}
                    <div className="flex items-center gap-1 ml-4">
                       <div className="w-12 h-1 bg-netkin-red"></div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button onClick={toggleMute} className="text-white hover:text-netkin-red transition-colors">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>

                    <button className="text-white hover:text-netkin-red transition-colors flex items-center gap-2">
                         <MessageSquare size={20} />
                         <div className="flex flex-col items-start">
                             <span className="text-[8px] font-bold uppercase text-gray-400 leading-none">Subtitles</span>
                             <span className="text-[10px] font-bold uppercase text-white leading-none">English (CC)</span>
                         </div>
                    </button>

                    <button onClick={toggleFullscreen} className="text-white hover:text-netkin-red transition-colors ml-4">
                         {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* === POSTER GENERATOR MODAL === */}
      {showGenerator && (
          <MoviePosterGenerator movie={movie} onClose={() => setShowGenerator(false)} />
      )}

      {/* === VIDEO GENERATOR MODAL === */}
      {showVideoGenerator && (
          <MovieVideoGenerator movie={movie} onClose={() => setShowVideoGenerator(false)} />
      )}

    </div>
  );
};

export default MovieDetails;
