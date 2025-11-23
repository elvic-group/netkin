
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, ChevronDown, Search, Play, Pause, Volume2, VolumeX, Maximize, Minimize, MessageSquare, PlayCircle, Share2, Check, Plus, Sparkles, Download, WifiOff, Film, PictureInPicture, Send, Star, User as UserIcon, Lock, SkipForward, SkipBack, Gauge, Clock, Cast } from 'lucide-react';
import { Movie, User } from '../types';
import { NAV_LINKS, CATALOG_MOVIES, CATALOG_TV_SHOWS, POPULAR_MOVIES, ACTION_MOVIES, ADVENTURE_MOVIES, LATEST_MOVIES } from '../constants';
import MoviePosterGenerator from './MoviePosterGenerator';
import MovieVideoGenerator from './MovieVideoGenerator';
import Notification from './Notification';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  watchlist?: string[];
  onToggleWatchlist?: (movieId: string) => void;
  onMovieClick?: (movie: Movie) => void;
  user?: User | null;
  onNavigate?: (page: 'landing' | 'news' | 'movies' | 'tvshows' | 'signin' | 'mylist') => void;
  initialView?: 'overview' | 'loading' | 'playing';
  progress?: number;
  onProgressUpdate?: (movieId: string, time: number, duration: number) => void;
  userRating?: number;
  onRate?: (movieId: string, rating: number) => void;
}

// Sample video URL for demonstration
const VIDEO_URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

// Parental Control Utilities
const RATINGS_ORDER = ['G', 'PG', 'PG-13', 'TV-14', 'R', 'TV-MA', 'NC-17'];
const DEFAULT_MAX_RATING = 'PG-13'; // Default safety level
const PIN = '1234';

// Playback Constants
const INTRO_DURATION = 30; // Seconds
const OUTRO_THRESHOLD = 60; // Seconds from end

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const CAST_DEVICES = ["Living Room TV", "Bedroom TV", "Office Display"];

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose, watchlist = [], onToggleWatchlist, onMovieClick, user, onNavigate, initialView = 'overview', progress: initialProgress = 0, onProgressUpdate, userRating = 0, onRate }) => {
  // View State
  const [viewState, setViewState] = useState<'overview' | 'loading' | 'playing'>('overview');
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'reviews'>('overview');
  const [loadingPercent, setLoadingPercent] = useState(0);
  
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
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showNextOverlay, setShowNextOverlay] = useState(false);
  const [nextCountdown, setNextCountdown] = useState(10);
  
  // Cast State
  const [isCastModalOpen, setIsCastModalOpen] = useState(false);
  const [castingTo, setCastingTo] = useState<string | null>(null);

  // Data State
  const [quality, setQuality] = useState('1080P');
  const [isQualityOpen, setIsQualityOpen] = useState(false);
  const [peerCount, setPeerCount] = useState(0);
  const [reviews, setReviews] = useState([
    { user: 'Sarah J.', rating: 5, text: 'Absolutely stunning visuals and a gripping story. A must watch!', date: '2 days ago' },
    { user: 'Mike T.', rating: 4, text: 'Great direction, though the pacing was a bit slow in the middle.', date: '1 week ago' },
    { user: 'CinemaFan99', rating: 5, text: 'The best performance I have seen this year.', date: '2 weeks ago' }
  ]);
  const [newReview, setNewReview] = useState('');

  // Share State
  const [isCopied, setIsCopied] = useState(false);

  // Generator State
  const [showGenerator, setShowGenerator] = useState(false);
  const [showVideoGenerator, setShowVideoGenerator] = useState(false);

  // Download State
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'downloaded'>('idle');

  // Parental Control State
  const [isLocked, setIsLocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Local Notification State
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const isInWatchlist = watchlist.includes(movie.id);

  // Determine if content is restricted based on rating
  useEffect(() => {
      if (movie.contentRating) {
          const movieRank = RATINGS_ORDER.indexOf(movie.contentRating);
          const maxRank = RATINGS_ORDER.indexOf(DEFAULT_MAX_RATING);
          if (movieRank > maxRank) {
              setIsLocked(true);
          } else {
              setIsLocked(false);
          }
      }
  }, [movie]);

  const handleUnlock = (e: React.FormEvent) => {
      e.preventDefault();
      if (pinInput === PIN) {
          setIsLocked(false);
          setShowPinModal(false);
          setPinError(false);
      } else {
          setPinError(true);
          setPinInput('');
      }
  };

  // Reset state when movie changes
  useEffect(() => {
    const isContentRestricted = movie.contentRating && RATINGS_ORDER.indexOf(movie.contentRating) > RATINGS_ORDER.indexOf(DEFAULT_MAX_RATING);
    
    if (initialView === 'loading' && isContentRestricted) {
        setViewState('overview'); 
    } else {
        setViewState(initialView);
    }

    setActiveTab('overview');
    setLoadingPercent(0);
    setIsPlaying(false);
    setShowGenerator(false);
    setShowVideoGenerator(false);
    setDownloadStatus('idle');
    setPeerCount(Math.floor(Math.random() * (800 - 100 + 1)) + 100);
    setShowPinModal(false);
    setPinInput('');
    setShowNextOverlay(false);
    setNextCountdown(10);
    setCastingTo(null);
    setIsCastModalOpen(false);
  }, [movie, initialView]);

  // Filter Similar Movies (Memoized)
  const similarMovies = useMemo(() => {
      const allMovies = [...CATALOG_MOVIES, ...CATALOG_TV_SHOWS, ...POPULAR_MOVIES, ...ACTION_MOVIES, ...ADVENTURE_MOVIES, ...LATEST_MOVIES];
      const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());
      return uniqueMovies
        .filter(m => m.genre === movie.genre && m.id !== movie.id)
        .slice(0, 6); 
  }, [movie.genre, movie.id]);

  // Use Effect for Next Video Countdown
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (showNextOverlay && nextCountdown > 0) {
      timer = setInterval(() => {
        setNextCountdown(prev => prev - 1);
      }, 1000);
    } else if (showNextOverlay && nextCountdown === 0) {
      // Auto-play next similar movie
      if (similarMovies.length > 0 && onMovieClick) {
         onMovieClick(similarMovies[0]);
      }
    }
    return () => clearInterval(timer);
  }, [showNextOverlay, nextCountdown, similarMovies, onMovieClick]);

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
        setLoadingPercent(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setViewState('playing');
            return 100;
          }
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
    if (isLocked) {
        setShowPinModal(true);
        return;
    }
    setViewState('loading');
    setLoadingPercent(0);
  };

  const handleTrailerClick = () => {
    setViewState('loading');
    setLoadingPercent(0);
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
      // Resume from saved progress or prop
      if (initialProgress > 0 && initialProgress < videoRef.current.duration - 5) {
         videoRef.current.currentTime = initialProgress;
         setCurrentTime(initialProgress);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
        // Next Episode Logic - Show overlay in last 10 seconds
        if (duration > 0 && duration - time < 10 && !showNextOverlay) {
           setShowNextOverlay(true);
        }
      }
      if (onProgressUpdate) {
          onProgressUpdate(movie.id, time, videoRef.current.duration);
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

  const skip = (seconds: number) => {
      if (videoRef.current) {
          videoRef.current.currentTime = Math.min(Math.max(videoRef.current.currentTime + seconds, 0), duration);
          setCurrentTime(videoRef.current.currentTime);
      }
  }

  const changeSpeed = (speed: number) => {
      if (videoRef.current) {
          videoRef.current.playbackRate = speed;
          setPlaybackRate(speed);
          setShowSpeedMenu(false);
      }
  }

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
  
  const togglePip = async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
      } else if (videoRef.current) {
          await videoRef.current.requestPictureInPicture();
      }
  };

  // Cast Handlers
  const toggleCastModal = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsCastModalOpen(!isCastModalOpen);
  }

  const handleCast = (device: string) => {
      setCastingTo(device);
      setIsCastModalOpen(false);
      setNotification({ message: `Connected to ${device}`, type: 'success' });
  }

  const stopCasting = () => {
      setCastingTo(null);
      setIsCastModalOpen(false);
      setNotification({ message: 'Casting stopped', type: 'success' });
  }

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
        }).catch(() => {});
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
          setTimeout(() => {
              setDownloadStatus('downloaded');
          }, 2500);
      }
  };
  
  const handleReviewSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newReview.trim()) return;
      setReviews(prev => [{
          user: user?.name || 'You',
          rating: 5,
          text: newReview,
          date: 'Just now'
      }, ...prev]);
      setNewReview('');
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

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (loadingPercent / 100) * circumference;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black font-sans text-white overflow-hidden select-none group"
      onMouseMove={handleMouseMove}
      onClick={() => viewState === 'playing' && togglePlay()}
    >
      
      {/* Local Notifications */}
      {notification && (
         <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}

      {/* Generators Overlay */}
      {showGenerator && <MoviePosterGenerator movie={movie} onClose={() => setShowGenerator(false)} />}
      {showVideoGenerator && <MovieVideoGenerator movie={movie} onClose={() => setShowVideoGenerator(false)} />}
      
      {/* PIN Unlock Modal */}
      {showPinModal && (
          <div className="absolute inset-0 z-[70] bg-black/95 flex items-center justify-center backdrop-blur-md">
              <div className="bg-[#1F2024] p-8 rounded-lg shadow-2xl w-full max-w-sm border border-white/10">
                  <div className="flex flex-col items-center mb-6">
                      <Lock size={48} className="text-netkin-red mb-4" />
                      <h3 className="text-xl font-black uppercase text-white tracking-widest text-center">
                          Parental Control
                      </h3>
                      <p className="text-gray-400 text-xs text-center mt-2">
                          Enter PIN to watch this {movie.contentRating} rated content.
                      </p>
                  </div>
                  <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                      <input 
                          type="password" 
                          maxLength={4}
                          value={pinInput}
                          onChange={(e) => setPinInput(e.target.value)}
                          placeholder="Enter 4-digit PIN"
                          className="bg-black/50 border border-white/20 text-center text-2xl tracking-[0.5em] text-white p-4 rounded focus:outline-none focus:border-netkin-red"
                          autoFocus
                      />
                      {pinError && <p className="text-netkin-red text-xs font-bold text-center">Incorrect PIN</p>}
                      <div className="flex gap-2 mt-2">
                          <button 
                              type="button" 
                              onClick={() => { setShowPinModal(false); setPinInput(''); }}
                              className="flex-1 py-3 text-xs font-bold uppercase tracking-widest border border-white/20 hover:bg-white/10"
                          >
                              Cancel
                          </button>
                          <button 
                              type="submit" 
                              className="flex-1 py-3 text-xs font-bold uppercase tracking-widest bg-netkin-red hover:bg-red-700 text-white"
                          >
                              Unlock
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* === NAVBAR (Overlay) === */}
      <div className={`absolute top-0 left-0 w-full px-8 py-6 flex items-center justify-between z-50 transition-opacity duration-500 ${viewState === 'playing' && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${viewState === 'playing' ? 'bg-gradient-to-b from-black/90 to-transparent' : 'bg-transparent'}`}>
        <div className="flex items-center gap-12" onClick={(e) => e.stopPropagation()}>
           <button onClick={onClose} className="flex items-center gap-2 group">
             <span className="text-3xl font-black italic tracking-tighter text-white group-hover:scale-105 transition-transform">Netkin</span>
          </button>
          
          {/* Nav Links in Overlay (only visible in overview) */}
          {viewState === 'overview' && (
              <div className="hidden md:flex items-center gap-8">
                  {NAV_LINKS.filter(l => l.target !== 'signin').map((link) => (
                      <button
                        key={link.label}
                        onClick={() => { onClose(); if(onNavigate) onNavigate(link.target as any); }}
                        className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </button>
                  ))}
              </div>
          )}
        </div>

        <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
           {/* Conditional Auth Button/User Info */}
           {viewState === 'overview' && (
               user ? (
                   <div className="hidden md:flex items-center gap-2 text-white/80">
                       <UserIcon size={16} />
                       <span className="text-[10px] font-bold uppercase tracking-wider">{user.name}</span>
                   </div>
               ) : (
                  <button 
                    onClick={() => { onClose(); if(onNavigate) onNavigate('signin'); }}
                    className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] transition-all px-6 py-2 border border-white/20 text-netkin-red hover:bg-netkin-red hover:text-white"
                  >
                    Sign Up
                  </button>
               )
           )}

           <button onClick={onClose} className="text-white hover:text-netkin-red transition-colors">
               <X size={24} />
           </button>
        </div>
      </div>

      {/* === VIDEO PLAYER === */}
      <video 
        ref={videoRef}
        src={VIDEO_URL}
        className={`absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-500 ${viewState === 'playing' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
            setIsBuffering(false);
            setIsPlaying(true);
        }}
        onCanPlay={() => setIsBuffering(false)}
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
      />

      {/* === CASTING OVERLAY === */}
      {castingTo && viewState === 'playing' && (
          <div className="absolute inset-0 z-40 bg-black/90 flex flex-col items-center justify-center animate-in fade-in duration-500">
              <div className="relative">
                  <div className="absolute inset-0 bg-netkin-red/20 blur-xl rounded-full animate-pulse"></div>
                  <Cast size={64} className="text-netkin-red relative z-10" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-white mt-8 mb-2">Casting to {castingTo}</h3>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Video is playing on your external display</p>
          </div>
      )}

      {/* === NEXT EPISODE OVERLAY === */}
      {showNextOverlay && viewState === 'playing' && (
        <div className="absolute bottom-24 right-8 bg-black/80 backdrop-blur border border-white/20 p-6 rounded-lg z-[60] max-w-sm animate-in slide-in-from-right duration-500">
           <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Up Next</h4>
           {similarMovies[0] && (
             <div className="flex gap-4">
               <div className="w-24 aspect-video bg-gray-800">
                 <img src={similarMovies[0].image} className="w-full h-full object-cover" />
               </div>
               <div>
                  <h3 className="font-bold text-sm mb-1">{similarMovies[0].title}</h3>
                  <p className="text-xs text-netkin-red font-bold">Playing in {nextCountdown}s</p>
               </div>
             </div>
           )}
           <div className="mt-4 flex gap-2">
             <button 
                onClick={(e) => { e.stopPropagation(); if (similarMovies[0] && onMovieClick) onMovieClick(similarMovies[0]); }}
                className="bg-white text-black px-4 py-2 text-xs font-bold uppercase"
             >
               Play Now
             </button>
             <button 
               onClick={(e) => { e.stopPropagation(); setShowNextOverlay(false); }}
               className="border border-white/30 text-white px-4 py-2 text-xs font-bold uppercase hover:bg-white/10"
             >
               Cancel
             </button>
           </div>
        </div>
      )}

      {/* === BACKGROUND IMAGE === */}
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

      {/* === OVERVIEW STATE === */}
      {viewState === 'overview' && (
        <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar">
           <div className="min-h-full flex items-center justify-end px-8 md:px-24 py-24">
               <div className="w-full max-w-xl relative pt-10">
                  
                  {/* Tabs */}
                  <div className="flex gap-8 mb-8 border-b border-white/10">
                      <button 
                        onClick={() => setActiveTab('overview')}
                        className={`pb-4 border-b-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'overview' ? 'border-netkin-red text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
                      >
                          Overview
                      </button>
                      <button 
                        onClick={() => setActiveTab('details')}
                        className={`pb-4 border-b-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'details' ? 'border-netkin-red text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
                      >
                          Details
                      </button>
                      <button 
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-4 border-b-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'reviews' ? 'border-netkin-red text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
                      >
                          Reviews
                      </button>
                  </div>

                  {activeTab === 'overview' && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex gap-3 mb-6">
                            <span className="px-3 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">
                                {movie.genre}
                            </span>
                            <span className="px-3 py-1 bg-netkin-red text-[10px] font-bold uppercase tracking-wider text-white">
                                {movie.rating}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black uppercase leading-[0.9] tracking-tight mb-2">
                            {movie.title}
                        </h1>

                        <div className="flex items-center gap-2 mb-6">
                           {[1, 2, 3, 4, 5].map((star) => (
                             <button 
                               key={star}
                               onClick={() => onRate && onRate(movie.id, star)}
                               className="hover:scale-110 transition-transform"
                             >
                               <Star size={20} className={star <= userRating ? "text-yellow-400 fill-current" : "text-gray-600"} />
                             </button>
                           ))}
                           <span className="text-xs text-gray-400 ml-2">Rate this title</span>
                        </div>

                        <p className="text-sm text-gray-300 leading-relaxed mb-10 max-w-md">
                            Dom braves the remote wilderness of Namibia while on the hunt for Africa's largest, deadliest scorpion.
                        </p>

                        <div className="flex flex-col gap-4 mb-12">
                            {/* Quality & Peers Row */}
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsQualityOpen(!isQualityOpen)}
                                        className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white transition-colors border border-white/20 px-3 py-1"
                                    >
                                        {quality} <ChevronDown size={14} />
                                    </button>
                                    {isQualityOpen && (
                                        <div className="absolute top-full left-0 mt-2 bg-[#1F2024] border border-white/10 rounded shadow-xl z-30 w-full">
                                            {['720P', '1080P', '4K'].map(q => (
                                                <button
                                                    key={q}
                                                    onClick={() => { setQuality(q); setIsQualityOpen(false); }}
                                                    className="block w-full text-left px-4 py-2 text-xs font-bold hover:bg-white/10 hover:text-netkin-red transition-colors text-gray-300"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="text-[10px] font-bold text-green-500 tracking-wider flex items-center gap-2">
                                    <WifiOff size={14} /> {peerCount} / 600 PEERS
                                </div>
                            </div>

                            <div className="flex items-stretch gap-4 flex-wrap">
                                <button 
                                    onClick={handleWatchClick}
                                    className={`${isLocked ? 'bg-gray-800 cursor-not-allowed text-gray-400' : 'bg-netkin-red hover:bg-red-700 text-white'} text-xs font-bold px-8 h-[50px] tracking-widest uppercase transition-colors shadow-lg flex items-center justify-center gap-2`}
                                >
                                    {isLocked ? (
                                        <>
                                            <Lock size={14} /> Rated {movie.contentRating}
                                        </>
                                    ) : (
                                        <>
                                            <Play size={14} fill="currentColor" /> {initialProgress > 0 ? 'RESUME' : 'WATCH NOW'}
                                        </>
                                    )}
                                </button>
                                
                                {!isLocked && (
                                    <button 
                                        onClick={handleTrailerClick}
                                        className="bg-white hover:bg-gray-200 text-black text-xs font-bold px-8 h-[50px] tracking-widest uppercase transition-colors shadow-lg flex items-center justify-center gap-2"
                                    >
                                        WATCH TRAILER
                                    </button>
                                )}
                                
                                {onToggleWatchlist && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie.id); }}
                                        className={`w-[50px] h-[50px] border border-white/20 flex items-center justify-center transition-colors ${isInWatchlist ? 'bg-white/10 text-netkin-red border-white/40' : 'hover:bg-white/5 text-white hover:border-white/40'}`}
                                    >
                                        {isInWatchlist ? <Check size={20} /> : <Plus size={20} />}
                                    </button>
                                )}
                                
                                <button 
                                    onClick={handleShare}
                                    className="w-[50px] h-[50px] border border-white/20 flex items-center justify-center text-white hover:bg-white/5 hover:border-white/40 transition-colors"
                                >
                                    {isCopied ? <Check size={20} className="text-netkin-red" /> : <Share2 size={20} />}
                                </button>
                            </div>
                            
                            <div className="flex gap-4 mt-2">
                                <button 
                                    onClick={() => setShowGenerator(true)}
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:underline"
                                >
                                    <Sparkles size={14} className="text-netkin-red" /> Remix Poster
                                </button>
                                <button 
                                    onClick={() => setShowVideoGenerator(true)}
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:underline"
                                >
                                    <Film size={14} className="text-netkin-red" /> Generate Teaser
                                </button>
                                <button 
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:underline"
                                >
                                    {downloadStatus === 'downloaded' ? (
                                        <><Check size={14} className="text-green-500" /> Downloaded</>
                                    ) : (
                                        <><Download size={14} className={downloadStatus === 'downloading' ? 'animate-bounce text-netkin-red' : 'text-gray-400'} /> Download</>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Top Cast */}
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
                      </div>
                  )}
                  
                  {activeTab === 'details' && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                          {/* Details Content */}
                          <div className="grid grid-cols-2 gap-8 text-sm">
                             <div>
                                <h4 className="text-gray-500 font-bold uppercase text-xs mb-2">Director</h4>
                                <p className="text-white font-medium">{movie.author}</p>
                             </div>
                             <div>
                                <h4 className="text-gray-500 font-bold uppercase text-xs mb-2">Genre</h4>
                                <p className="text-white font-medium">{movie.genre}</p>
                             </div>
                             <div>
                                <h4 className="text-gray-500 font-bold uppercase text-xs mb-2">Year</h4>
                                <p className="text-white font-medium">{movie.year}</p>
                             </div>
                             <div>
                                <h4 className="text-gray-500 font-bold uppercase text-xs mb-2">Maturity Rating</h4>
                                <p className="text-white font-medium border border-white/20 inline-block px-2 py-1 text-xs">{movie.contentRating || 'Not Rated'}</p>
                             </div>
                          </div>
                      </div>
                  )}

                  {activeTab === 'reviews' && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                           <form onSubmit={handleReviewSubmit} className="mb-8 relative">
                              <input 
                                type="text" 
                                placeholder="Write a review..." 
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-netkin-red rounded-sm"
                              />
                              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-netkin-red transition-colors">
                                  <Send size={16} />
                              </button>
                          </form>
                          {reviews.map((r, i) => (
                             <div key={i} className="mb-4 pb-4 border-b border-white/5">
                                <div className="flex justify-between text-xs mb-1">
                                   <span className="font-bold">{r.user}</span>
                                   <span className="text-gray-500">{r.date}</span>
                                </div>
                                <p className="text-gray-300 text-sm">{r.text}</p>
                             </div>
                          ))}
                      </div>
                  )}

                  {/* MORE LIKE THIS */}
                  {similarMovies.length > 0 && (
                    <div className="pt-8 border-t border-white/10 mt-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">More Like This</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {similarMovies.map(m => (
                                <div key={m.id} onClick={() => onMovieClick && onMovieClick(m)} className="cursor-pointer group">
                                    <div className="aspect-video overflow-hidden mb-2 bg-gray-900 relative">
                                        <img src={m.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"/>
                                    </div>
                                    <h4 className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-netkin-red transition-colors truncate">{m.title}</h4>
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
         <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-40 bg-black/90 backdrop-blur-sm">
             <div className="relative w-48 h-48 flex items-center justify-center">
                 <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
                     <circle cx="96" cy="96" r={radius} stroke="#333" strokeWidth="4" fill="transparent" />
                     <circle cx="96" cy="96" r={radius} stroke="#E50914" strokeWidth="4" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-100 ease-out" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-5xl font-black text-white">{Math.round(loadingPercent)}%</span>
                 </div>
             </div>
             <p className="mt-8 text-xs font-bold tracking-[0.2em] uppercase text-white animate-pulse">Please Wait ...</p>
         </div>
      )}

      {/* === PLAYING STATE CONTROLS === */}
      {viewState === 'playing' && (
        <div 
            className={`absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black via-black/80 to-transparent z-50 transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="relative w-full h-1 bg-gray-700 mb-6 group cursor-pointer">
                <div className="absolute h-full bg-netkin-red" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                <input type="range" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button onClick={togglePlay} className="text-white hover:text-netkin-red">
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                    </button>
                    
                    <button onClick={() => skip(-10)} className="text-white hover:text-netkin-red">
                        <SkipBack size={20} />
                    </button>
                    <button onClick={() => skip(10)} className="text-white hover:text-netkin-red">
                        <SkipForward size={20} />
                    </button>

                    <span className="text-xs font-bold text-white tracking-widest font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    {/* Speed Control */}
                    <div className="relative">
                        <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="flex items-center gap-1 text-white text-xs font-bold">
                           <Gauge size={16} /> {playbackRate}x
                        </button>
                        {showSpeedMenu && (
                            <div className="absolute bottom-full mb-2 bg-[#1F2024] border border-white/10 rounded overflow-hidden">
                                {PLAYBACK_SPEEDS.map(speed => (
                                    <button 
                                        key={speed} 
                                        onClick={() => changeSpeed(speed)}
                                        className={`block w-full px-4 py-2 text-xs hover:bg-white/10 ${playbackRate === speed ? 'text-netkin-red' : 'text-white'}`}
                                    >
                                        {speed}x
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Cast Control */}
                    <div className="relative">
                        <button 
                            onClick={toggleCastModal} 
                            className={`transition-colors ${castingTo ? 'text-netkin-red' : 'text-white hover:text-netkin-red'}`}
                        >
                            <Cast size={20} fill={castingTo ? "currentColor" : "none"} />
                        </button>
                        
                        {isCastModalOpen && (
                            <div className="absolute bottom-full mb-4 right-0 w-48 bg-[#1F2024] border border-white/10 rounded-md shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
                                <div className="p-3 border-b border-white/10">
                                    <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Cast to Device</p>
                                </div>
                                <div className="flex flex-col">
                                    {CAST_DEVICES.map(device => (
                                        <button 
                                            key={device} 
                                            onClick={() => handleCast(device)}
                                            className={`text-left px-4 py-3 text-xs font-bold hover:bg-white/10 transition-colors ${castingTo === device ? 'text-netkin-red' : 'text-white'}`}
                                        >
                                            {device}
                                        </button>
                                    ))}
                                    {castingTo && (
                                        <button 
                                            onClick={stopCasting}
                                            className="text-left px-4 py-3 text-xs font-bold text-gray-400 hover:text-white border-t border-white/5 hover:bg-white/5 transition-colors"
                                        >
                                            Stop Casting
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <button onClick={toggleMute} className="text-white hover:text-netkin-red">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <button onClick={togglePip} className="text-white hover:text-netkin-red"><PictureInPicture size={20} /></button>
                    <button onClick={toggleFullscreen} className="text-white hover:text-netkin-red ml-4">
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
