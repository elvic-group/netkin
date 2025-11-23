
import React, { useState, useEffect } from 'react';
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
import { POPULAR_MOVIES, ACTION_MOVIES, ADVENTURE_MOVIES, CATALOG_MOVIES, CATALOG_TV_SHOWS } from './constants';
import { Movie, User } from './types';

function App() {
  // Load user from local storage if exists
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('netkin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Start on signin if no user, otherwise news.
  const [page, setPage] = useState<'landing' | 'news' | 'movies' | 'tvshows' | 'signin'>(user ? 'news' : 'signin');
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Persist user state
  useEffect(() => {
    if (user) {
        localStorage.setItem('netkin_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('netkin_user');
    }
  }, [user]);

  const handleLogin = (email: string) => {
    // Simple mock login logic
    const newUser: User = {
        email,
        name: email.split('@')[0]
    };
    setUser(newUser);
    setPage('news'); // Redirect to news/dashboard after login
  };

  const handleLogout = () => {
    setUser(null);
    setPage('landing');
  };

  const handleMovieClick = (movie: Movie) => {
      setSelectedMovie(movie);
  };

  return (
    <div className="min-h-screen bg-netkin-dark font-sans text-white selection:bg-netkin-red selection:text-white flex flex-col">
      <Navbar 
        onNavigate={setPage} 
        currentPage={page} 
        user={user} 
        onLogout={handleLogout}
        onSearchSelect={handleMovieClick}
      />
      
      <div className="flex-grow flex flex-col">
        {page === 'landing' && (
          <>
            <Hero />
            <Features />
            <Gallery />
            <Pricing />
            <Newsletter />
          </>
        )}

        {page === 'news' && (
          <>
            <MovieHero />
            <LatestRelease />
            <MovieSection title="Popular" movies={POPULAR_MOVIES} onMovieClick={handleMovieClick} />
            <MovieSection title="Action" movies={ACTION_MOVIES} onMovieClick={handleMovieClick} />
            <MovieSection title="Adventure" movies={ADVENTURE_MOVIES} onMovieClick={handleMovieClick} />
            
            <div className="bg-netkin-dark py-16 flex justify-center border-t border-white/5">
                <button className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold py-4 px-16 tracking-widest uppercase transition-colors shadow-lg">
                    Reload
                </button>
            </div>
          </>
        )}

        {page === 'movies' && (
          <Catalog movies={CATALOG_MOVIES} onMovieClick={handleMovieClick} />
        )}

        {page === 'tvshows' && (
          <Catalog movies={CATALOG_TV_SHOWS} onMovieClick={handleMovieClick} />
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
          />
      )}
    </div>
  );
}

export default App;
