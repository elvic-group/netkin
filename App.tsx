
import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieHero from './components/MovieHero';
import LatestRelease from './components/LatestRelease';
import MovieSection from './components/MovieSection';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Catalog from './components/Catalog';
import MovieDetails from './components/MovieDetails';
import Notification from './components/Notification';
import ProfileSelector from './components/ProfileSelector';
import { POPULAR_MOVIES, ACTION_MOVIES, ADVENTURE_MOVIES, CATALOG_MOVIES, CATALOG_TV_SHOWS, HERO_MOVIE, LATEST_MOVIES, DEFAULT_PROFILES } from './constants';
import { Movie, User, Profile } from './types';

function App() {
  // --- Global User & Profile State ---
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('netkin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [profiles, setProfiles] = useState<Profile[]>(() => {
      const saved = localStorage.getItem('netkin_profiles');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);

  // --- Derived State (Current Profile) ---
  const activeProfile = useMemo(() => 
      profiles.find(p => p.id === activeProfileId) || null
  , [profiles, activeProfileId]);

  // --- Navigation State ---
  const [page, setPage] = useState<'landing' | 'news' | 'movies' | 'tvshows' | 'signin' | 'mylist'>(user ? 'news' : 'landing');
  
  // --- App Content State ---
  const [catalogGenre, setCatalogGenre] = useState<string | undefined>(undefined);
  const [dashboardPopular, setDashboardPopular] = useState<Movie[]>(POPULAR_MOVIES);
  const [dashboardAction, setDashboardAction] = useState<Movie[]>(ACTION_MOVIES);
  const [dashboardAdventure, setDashboardAdventure] = useState<Movie[]>(ADVENTURE_MOVIES);
  const [isReloading, setIsReloading] = useState(false);

  // --- Modal/Overlay State ---
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [initialMovieDetailsView, setInitialMovieDetailsView] = useState<'overview' | 'loading'>('overview');
  
  // --- Notification State ---
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // --- Persistence ---
  useEffect(() => {
    if (user) localStorage.setItem('netkin_user', JSON.stringify(user));
    else localStorage.removeItem('netkin_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('netkin_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [page]);

  // --- Helper: Get Movie by ID ---
  const allMovies = useMemo(() => [
    HERO_MOVIE,
    ...CATALOG_MOVIES, 
    ...CATALOG_TV_SHOWS, 
    ...LATEST_MOVIES, 
    ...POPULAR_MOVIES, 
    ...ACTION_MOVIES, 
    ...ADVENTURE_MOVIES
  ], []);

  const getMovieById = (id: string) => allMovies.find(m => m.id === id);

  // --- Computed Lists based on Active Profile ---
  const watchlistMovies = useMemo(() => {
      if (!activeProfile) return [];
      return activeProfile.watchlist.map(id => getMovieById(id)).filter((m): m is Movie => !!m);
  }, [activeProfile, allMovies]);

  const continueWatchingMovies = useMemo(() => {
      if (!activeProfile) return [];
      // Get movies with progress > 0
      return Object.keys(activeProfile.progress)
          .map(id => getMovieById(id))
          .filter((m): m is Movie => !!m && (activeProfile.progress[m.id] > 0));
  }, [activeProfile, allMovies]);

  const historyMovies = useMemo(() => {
      if (!activeProfile) return [];
      return activeProfile.history.slice(0, 8).map(id => getMovieById(id)).filter((m): m is Movie => !!m);
  }, [activeProfile, allMovies]);

  const recommendedMovies = useMemo(() => {
      if (!activeProfile || activeProfile.history.length === 0) return [];
      const lastWatchedId = activeProfile.history[0];
      const lastWatched = getMovieById(lastWatchedId);
      if (!lastWatched) return [];
      
      // Recommend based on genre of last watched
      return allMovies
        .filter(m => m.genre === lastWatched.genre && m.id !== lastWatched.id)
        .slice(0, 6);
  }, [activeProfile, allMovies]);


  // --- Actions ---

  const handleProfileSelect = (id: string) => {
      setActiveProfileId(id);
      setPage('news');
      showNotification(`Welcome, ${profiles.find(p => p.id === id)?.name}!`, 'success');
  };

  const handleLogin = (email: string) => {
    const newUser: User = { email, name: email.split('@')[0] };
    setUser(newUser);
    // Auto-select first profile for smoother UX
    setActiveProfileId('p1');
    setPage('news');
    showNotification(`Welcome back, ${newUser.name}!`, 'success');
  };

  const handleBrowseAsGuest = () => {
      setPage('news');
      showNotification('Browsing as Guest', 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveProfileId(null);
    setPage('landing');
    showNotification('Logged out successfully.', 'success');
  };

  const updateProfileData = (updater: (profile: Profile) => Profile) => {
      if (!activeProfileId) return;
      setProfiles(prev => prev.map(p => 
          p.id === activeProfileId ? updater(p) : p
      ));
  };

  const toggleWatchlist = (movieId: string) => {
    if (!activeProfileId) {
        showNotification("Please sign in to use My List", "error");
        return;
    }
    updateProfileData(p => {
        const exists = p.watchlist.includes(movieId);
        showNotification(exists ? 'Removed from My List' : 'Added to My List', 'success');
        return {
            ...p,
            watchlist: exists ? p.watchlist.filter(id => id !== movieId) : [movieId, ...p.watchlist]
        };
    });
  };

  const handleProgressUpdate = (movieId: string, time: number, duration: number) => {
      if (!activeProfileId) return;
      updateProfileData(p => {
          const newHistory = [movieId, ...p.history.filter(id => id !== movieId)];
          // If finished (95%), remove progress but keep in history
          if (time / duration > 0.95) {
              const { [movieId]: _, ...restProgress } = p.progress;
              return { ...p, history: newHistory, progress: restProgress };
          }
          return {
              ...p,
              history: newHistory,
              progress: { ...p.progress, [movieId]: time }
          };
      });
  };

  const handleRate = (movieId: string, rating: number) => {
      if (!activeProfileId) {
           showNotification("Please sign in to rate movies", "error");
           return;
      }
      updateProfileData(p => ({
          ...p,
          ratings: { ...p.ratings, [movieId]: rating }
      }));
      showNotification(`Rated ${rating} stars`, 'success');
  };

  const handleNavigate = (target: any) => {
      let finalTarget = target;
      if (user && target === 'landing') finalTarget = 'news';
      if (finalTarget === 'movies' || finalTarget === 'tvshows') setCatalogGenre(undefined);
      setPage(finalTarget);
  };

  const handleMovieClick = (movie: Movie, startPlaying = false) => {
      setInitialMovieDetailsView(startPlaying ? 'loading' : 'overview');
      setSelectedMovie(movie);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const handleDashboardReload = () => {
      setIsReloading(true);
      setTimeout(() => {
          setDashboardPopular(prev => [...prev].sort(() => Math.random() - 0.5));
          setDashboardAction(prev => [...prev].sort(() => Math.random() - 0.5));
          setDashboardAdventure(prev => [...prev].sort(() => Math.random() - 0.5));
          setIsReloading(false);
      }, 1000);
  };

  // --- Render Logic ---

  // 1. Landing Page (Not logged in)
  if (!user && page === 'landing') {
      return (
        <div className="min-h-screen bg-netkin-dark font-sans text-white">
            <Navbar onNavigate={handleNavigate} currentPage={page} />
            <Hero onCtaClick={() => setPage('signin')} />
            <Features />
            <Gallery />
            <Pricing onSubscribe={() => setPage('signin')} />
            <Newsletter />
            <Footer />
        </div>
      );
  }

  // 2. Sign In Page
  if (page === 'signin') {
      return (
          <div className="min-h-screen bg-netkin-dark font-sans text-white flex flex-col">
              <Navbar onNavigate={handleNavigate} currentPage={page} />
              <SignIn onLogin={handleLogin} onBrowseAsGuest={handleBrowseAsGuest} />
              <Footer />
          </div>
      );
  }

  // 3. Profile Selection (Logged in, no profile selected)
  if (user && !activeProfileId) {
      return <ProfileSelector profiles={profiles} onSelectProfile={handleProfileSelect} onManageProfiles={() => {}} />;
  }

  // 4. Main App (Logged in & Profile Active OR Guest Mode)
  return (
    <div className="min-h-screen bg-netkin-dark font-sans text-white selection:bg-netkin-red selection:text-white flex flex-col">
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={page} 
        user={user} 
        onLogout={handleLogout}
        onSearchSelect={handleMovieClick}
      />

      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
      
      <div className="flex-grow flex flex-col">
        {page === 'news' && (
          <>
            <MovieHero 
              onWatchClick={() => handleMovieClick(HERO_MOVIE)} 
              onPlayClick={() => handleMovieClick(HERO_MOVIE, true)} 
            />
            
            {/* Continue Watching */}
            {continueWatchingMovies.length > 0 && (
                <MovieSection 
                    title="Continue Watching" 
                    movies={continueWatchingMovies} 
                    onMovieClick={(m) => handleMovieClick(m, true)}
                    watchlist={activeProfile?.watchlist}
                    onToggleWatchlist={toggleWatchlist}
                    progress={activeProfile?.progress}
                />
            )}

            <LatestRelease onMovieClick={handleMovieClick} />
            
            {/* Recommendations */}
            {recommendedMovies.length > 0 && activeProfile && activeProfile.history.length > 0 && (
                <MovieSection 
                    title={`Because you watched ${getMovieById(activeProfile.history[0])?.title}`}
                    movies={recommendedMovies} 
                    onMovieClick={handleMovieClick}
                    watchlist={activeProfile.watchlist}
                    onToggleWatchlist={toggleWatchlist}
                />
            )}

            {/* Recently Watched */}
            {historyMovies.length > 0 && (
                <MovieSection 
                    title="Watch It Again"
                    movies={historyMovies} 
                    onMovieClick={handleMovieClick}
                    watchlist={activeProfile?.watchlist}
                    onToggleWatchlist={toggleWatchlist}
                />
            )}

            <MovieSection 
              title="Popular" 
              movies={dashboardPopular} 
              onMovieClick={handleMovieClick} 
              watchlist={activeProfile?.watchlist}
              onToggleWatchlist={toggleWatchlist}
              onViewAll={() => handleNavigate('movies')}
            />
            
            <MovieSection 
              title="Action Movies" 
              movies={dashboardAction} 
              onMovieClick={handleMovieClick} 
              watchlist={activeProfile?.watchlist}
              onToggleWatchlist={toggleWatchlist}
              onViewAll={() => { handleNavigate('movies'); setCatalogGenre('ACTION'); }}
            />

            <MovieSection 
              title="Adventure" 
              movies={dashboardAdventure} 
              onMovieClick={handleMovieClick} 
              watchlist={activeProfile?.watchlist}
              onToggleWatchlist={toggleWatchlist}
              onViewAll={() => { handleNavigate('movies'); setCatalogGenre('ADVENTURE'); }}
            />
            
            {/* Reload Content Button */}
            <div className="bg-netkin-dark py-8 flex justify-center border-t border-white/5">
                <button 
                    onClick={handleDashboardReload}
                    disabled={isReloading}
                    className="bg-netkin-red text-white text-xs font-bold py-4 px-16 tracking-widest uppercase flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isReloading ? <RefreshCw size={16} className="animate-spin" /> : 'Refresh Feed'}
                </button>
            </div>
          </>
        )}

        {(page === 'movies' || page === 'tvshows') && (
          <Catalog 
            movies={page === 'movies' ? CATALOG_MOVIES : CATALOG_TV_SHOWS} 
            onMovieClick={handleMovieClick} 
            watchlist={activeProfile?.watchlist}
            onToggleWatchlist={toggleWatchlist}
            initialGenre={catalogGenre}
          />
        )}
        
        {page === 'mylist' && (
             <Catalog 
                movies={watchlistMovies} 
                onMovieClick={handleMovieClick} 
                watchlist={activeProfile?.watchlist}
                onToggleWatchlist={toggleWatchlist}
             />
        )}
      </div>
      
      <Footer />

      {/* Movie Details Overlay - Now works for Guest users too */}
      {selectedMovie && (
          <MovieDetails 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)}
            watchlist={activeProfile ? activeProfile.watchlist : []}
            onToggleWatchlist={toggleWatchlist}
            onMovieClick={handleMovieClick}
            user={user}
            onNavigate={handleNavigate}
            initialView={initialMovieDetailsView}
            progress={activeProfile ? (activeProfile.progress[selectedMovie.id] || 0) : 0}
            onProgressUpdate={handleProgressUpdate}
            userRating={activeProfile ? (activeProfile.ratings[selectedMovie.id] || 0) : 0}
            onRate={handleRate}
          />
      )}
    </div>
  );
}

export default App;
