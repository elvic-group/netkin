import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-netkin-dark font-sans text-white selection:bg-netkin-red selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <Pricing />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;