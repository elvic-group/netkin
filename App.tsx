
import React, { useState, useEffect, useMemo } from 'react';
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
import { POPULAR_MOVIES, ACTION_MOVIES, ADVENTURE_MOVIES, CATALOG_MOVIES, CATALOG_TV_SHOWS, HERO_MOVIE, LATEST_MOVIES } from './constants';
import { Movie, User } from './types';

function App() {
  // --- User State ---
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('netkin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // --- Navigation State ---
  const [page, setPage] = useState<'landing' | 'news' | 'movies' | 'tvshows' | 'signin'>(user ? 'news' : 'signin');
  
  // --- Modal/Overlay State ---
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // --- Watchlist State ---
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('netkin_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Notification State ---
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Persist user state
  useEffect(() => {
    if (user) {
        localStorage.setItem('netkin_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('netkin_user');
    }
  }, [user]);

  // Persist watchlist state
  useEffect(() => {
    localStorage.setItem('netkin_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // --- Actions ---

  const handleLogin = (email: string) => {
    const newUser: User = {
        email,
        name: email.split('@')[0]
    };
    setUser(newUser);
    setPage('news');
    showNotification(`Welcome back, ${newUser.name}!`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('landing');
    showNotification('Logged out successfully.', 'success');
  };

  const handleMovieClick = (movie: Movie) => {
      setSelectedMovie(movie);
  };

  const toggleWatchlist = (movieId: string) => {
    setWatchlist(prev => {
      const exists = prev.includes(movieId);
      if (exists) {
        showNotification('Removed from watchlist', 'success');
        return prev.filter(id => id !== movieId);
      } else {
        showNotification('Added to watchlist', 'success');
        return [...prev, movieId];
      }
    });
  };

  const handleSubscribe = (planName: string) => {
    if (!user) {
      setPage('signin');
      showNotification('Please sign in to subscribe.', 'error');
    } else {
      showNotification(`Subscribed to ${planName} plan!`, 'success');
    }
  };

  const handleNewsletterSubmit = (email: string) => {
    if (email.includes('@')) {
      showNotification('Thanks for subscribing to our newsletter!', 'success');
    } else {
      showNotification('Please enter a valid email.', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  // Aggregate all movies for watchlist lookup
  const allMovies = useMemo(() => [
    ...CATALOG_MOVIES, 
    ...CATALOG_TV_SHOWS, 
    ...LATEST_MOVIES, 
    ...POPULAR_MOVIES, 
    ...ACTION_MOVIES, 
    ...ADVENTURE_MOVIES
  ], []);

  const watchlistMovies = useMemo(() => {
    // Deduplicate movies by ID before mapping
    const uniqueMovies = new Map(allMovies.map(m => [m.id, m]));
    return watchlist.map(id => uniqueMovies.get(id)).filter((m): m is Movie => !!m);
  }, [watchlist, allMovies]);

  return (
    <div className="min-h-screen bg-netkin-dark font-sans text-white selection:bg-netkin-red selection:text-white flex flex-col">
      <Navbar 
        onNavigate={setPage} 
        currentPage={page} 
        user={user} 
        onLogout={handleLogout}
        onSearchSelect={handleMovieClick}
      />

      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
      
      <div className="flex-grow flex flex-col">
        {page === 'landing' && (
          <>
            <Hero onCtaClick={() => setPage('signin')} />
            <Features />
            <Gallery />
            <Pricing onSubscribe={handleSubscribe} />
            <Newsletter onSubmit={handleNewsletterSubmit} />
          </>
        )}

        {page === 'news' && (
          <>
            <MovieHero onWatchClick={() => handleMovieClick(HERO_MOVIE)} />
            <LatestRelease onMovieClick={handleMovieClick} />
            
            {watchlistMovies.length > 0 && (
              <MovieSection 
                title="My Watchlist" 
                movies={watchlistMovies} 
                onMovieClick={handleMovieClick} 
                watchlist={watchlist}
                onToggleWatchlist={toggleWatchlist}
              />
            )}

            <MovieSection 
              title="Popular" 
              movies={POPULAR_MOVIES} 
              onMovieClick={handleMovieClick} 
              watchlist={watchlist}
              onToggleWatchlist={toggleWatchlist}
            />
            <MovieSection 
              title="Action" 
              movies={ACTION_MOVIES} 
              onMovieClick={handleMovieClick} 
              watchlist={watchlist}
              onToggleWatchlist={toggleWatchlist}
            />
            <MovieSection 
              title="Adventure" 
              movies={ADVENTURE_MOVIES} 
              onMovieClick={handleMovieClick} 
              watchlist={watchlist}
              onToggleWatchlist={toggleWatchlist}
            />
            
            <div className="bg-netkin-dark py-16 flex justify-center border-t border-white/5">
                <button className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold py-4 px-16 tracking-widest uppercase transition-colors shadow-lg">
                    Reload
                </button>
            </div>
          </>
        )}

        {page === 'movies' && (
          <Catalog 
            movies={CATALOG_MOVIES} 
            onMovieClick={handleMovieClick} 
            watchlist={watchlist}
            onToggleWatchlist={toggleWatchlist}
          />
        )}

        {page === 'tvshows' && (
          <Catalog 
            movies={CATALOG_TV_SHOWS} 
            onMovieClick={handleMovieClick} 
            watchlist={watchlist}
            onToggleWatchlist={toggleWatchlist}
          />
        )}

        {page === 'signin' && (
          <SignIn onLogin={handleLogin} />
        )}
      </div>
      
      <Footer />

      {/* Movie Details Overlay */}
      {selectedMovie && (
          <MovieDetails 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)}
            watchlist={watchlist}
            onToggleWatchlist={toggleWatchlist}
            onMovieClick={handleMovieClick}
          />
      )}
    </div>
  );
}

export default App;
