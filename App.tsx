import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LatestRelease from './components/LatestRelease';
import MovieSection from './components/MovieSection';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import { POPULAR_MOVIES, ACTION_MOVIES, ADVENTURE_MOVIES } from './constants';

function App() {
  const [page, setPage] = useState<'home' | 'signin'>('home');

  return (
    <div className="min-h-screen bg-netkin-dark font-sans text-white selection:bg-netkin-red selection:text-white flex flex-col">
      <Navbar onNavigate={setPage} currentPage={page} />
      
      <div className="flex-grow flex flex-col">
        {page === 'home' ? (
          <>
            <Hero />
            <LatestRelease />
            <MovieSection title="Popular" movies={POPULAR_MOVIES} />
            <MovieSection title="Action" movies={ACTION_MOVIES} />
            <MovieSection title="Adventure" movies={ADVENTURE_MOVIES} />
            
            {/* Bottom Reload Button Area */}
            <div className="bg-netkin-dark py-16 flex justify-center border-t border-white/5">
                <button className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold py-4 px-16 tracking-widest uppercase transition-colors shadow-lg">
                    Reload
                </button>
            </div>
          </>
        ) : (
          <SignIn />
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
