import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://picsum.photos/id/971/1920/1080")' }} 
      >
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Vignette/Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-netkin-dark via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Navigation Arrows */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wide mb-6 drop-shadow-lg uppercase max-w-4xl leading-tight">
          A Feeling. An Experience. Where You Want.
        </h1>
        <p className="text-gray-200 text-sm md:text-base font-light max-w-xl mb-10 leading-relaxed drop-shadow-md">
          Movies, series, children's favorites and sports. Stream or watch offline.<br />
          Exit whenever you want.
        </p>
        <button className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold py-4 px-10 tracking-widest uppercase transition-colors shadow-lg">
          Try a free month
        </button>
      </div>

      {/* Bottom Layout */}
      <div className="absolute bottom-12 left-0 w-full px-12 md:px-24 flex items-end justify-between">
        
        {/* Left: Current Item Info */}
        <div className="hidden md:block">
          <h3 className="text-white font-black uppercase text-sm tracking-widest mb-1">
            The Fair Weather Felon
          </h3>
          <p className="text-netkin-red text-xs font-bold uppercase tracking-wider">
            Documentary
          </p>
        </div>

        {/* Center/Right: Thumbnails */}
        <div className="hidden lg:flex gap-4">
            {HERO_IMAGES.map((img, idx) => (
                <div key={idx} className={`relative w-32 h-20 overflow-hidden border-b-2 ${idx === 1 ? 'border-white' : 'border-transparent opacity-50'}`}>
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </div>
            ))}
        </div>

        {/* Right: Dots */}
        <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-netkin-red"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;