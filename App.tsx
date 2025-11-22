import React, { useState } from 'react';
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
import { POPULAR_MOVIES, ACTION_MOVIES, ADVENTURE_MOVIES } from './constants';

function App() {
  // Default to 'landing' to match the requested design
  const [page, setPage] = useState<'landing' | 'movies' | 'signin'>('landing');

  return (
    <div className="min-h-screen bg-netkin-dark font-sans text-white selection:bg-netkin-red selection:text-white flex flex-col">
      <Navbar onNavigate={setPage} currentPage={page} />
      
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

        {page === 'movies' && (
          <>
            <MovieHero />
            <LatestRelease />
            <MovieSection title="Popular" movies={POPULAR_MOVIES} />
            <MovieSection title="Action" movies={ACTION_MOVIES} />
            <MovieSection title="Adventure" movies={ADVENTURE_MOVIES} />
            
            <div className="bg-netkin-dark py-16 flex justify-center border-t border-white/5">
                <button className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold py-4 px-16 tracking-widest uppercase transition-colors shadow-lg">
                    Reload
                </button>
            </div>
          </>
        )}

        {page === 'signin' && (
          <SignIn />
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;