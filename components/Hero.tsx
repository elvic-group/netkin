import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[850px] bg-black overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=2000&q=80" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Vignette / Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-netkin-dark via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      </div>

      {/* Navigation Arrows */}
      <button className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20 hidden md:block">
        <ChevronLeft size={48} strokeWidth={0.5} />
      </button>
      <button className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20 hidden md:block">
        <ChevronRight size={48} strokeWidth={0.5} />
      </button>

      {/* Main Content Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4 mt-[-50px]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6 max-w-4xl leading-tight drop-shadow-lg">
          A Feeling. An Experience. Where You Want.
        </h1>
        
        <p className="text-gray-200 text-sm font-medium mb-10 max-w-xl leading-relaxed drop-shadow-md">
          Movies, series, children's favorites and sports. Stream or watch offline. <br/>
          Exit whenever you want.
        </p>

        <button className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold py-4 px-10 tracking-widest uppercase transition-all transform hover:scale-105 shadow-xl">
          Try a Free Month
        </button>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 w-full p-12 md:p-16 flex justify-between items-end z-20">
        
        {/* Movie Info Left */}
        <div className="hidden md:block">
          <h3 className="text-white text-sm font-black uppercase tracking-widest mb-1">
            The Fair Weather Felon
          </h3>
          <p className="text-netkin-red text-[10px] font-bold uppercase tracking-widest">
            Documentary
          </p>
        </div>

        {/* Indicators Right */}
        <div className="flex items-center gap-3 md:mr-12">
          {/* Small preview images/dots */}
           <div className="flex gap-2 mb-2">
              <div className="w-24 h-14 border-2 border-white overflow-hidden hidden md:block">
                 <img src={HERO_IMAGES[0]} className="w-full h-full object-cover" />
              </div>
              <div className="w-24 h-14 opacity-50 overflow-hidden hidden md:block">
                 <img src={HERO_IMAGES[1]} className="w-full h-full object-cover" />
              </div>
              <div className="w-24 h-14 opacity-50 overflow-hidden hidden md:block">
                 <img src={HERO_IMAGES[2]} className="w-full h-full object-cover" />
              </div>
           </div>
           
           {/* Mobile Dots */}
           <div className="flex md:hidden gap-2">
             <div className="w-2 h-2 bg-white rounded-full"></div>
             <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
             <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;