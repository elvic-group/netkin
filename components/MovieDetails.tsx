
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronRight, Search, Play, Pause, Volume2, VolumeX, Maximize, Minimize, MessageSquare, PlayCircle } from 'lucide-react';
import { Movie } from '../types';
import { NAV_LINKS } from '../constants';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

// Sample video URL for demonstration
const VIDEO_URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const [viewState, setViewState] = useState<'overview' | 'loading' | 'playing'>('overview');
  const [progress, setProgress] = useState(0);
  
  // Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
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
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
      />

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
        <div className="absolute inset-0 flex items-center justify-end px-8 md:px-24 z-10">
           <div className="w-full max-w-xl relative pt-10 md:pt-20">
              
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
              <p className="text-sm text-gray-300 leading-relaxed mb-10 max-w-md">
                  Dom braves the remote wilderness of Namibia while on the hunt for Africa's largest, deadliest scorpion-parabuthus villosus, commonly known as the black hairy thick-tailed scorpion.
                  <br /><br />
                  This beast can not only kill a human but also spray its venom.
              </p>

              {/* Actions */}
              <div className="flex items-center gap-4 mb-12">
                  <button 
                    onClick={handleWatchClick}
                    className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold py-4 px-10 tracking-widest uppercase transition-colors shadow-lg"
                  >
                      Watch Trailer
                  </button>

                  <div className="flex border border-white/20">
                      <button className="flex items-center px-4 py-3 bg-transparent text-[10px] font-bold text-white tracking-widest uppercase hover:bg-white/5">
                          1080P <ChevronDown size={12} className="ml-2" />
                      </button>
                  </div>

                   <div className="flex border border-white/20 px-4 py-3">
                       <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                           247/600 Peers
                       </span>
                  </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4">
                  <div className="w-32 h-20 bg-gray-800 overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
                  </div>
                  <div className="w-32 h-20 bg-gray-800 overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
                  </div>
                   <div className="w-10 flex items-center justify-center">
                        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <ChevronRight size={20} />
                        </button>
                   </div>
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

    </div>
  );
};

export default MovieDetails;
