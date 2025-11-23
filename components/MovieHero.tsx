
import React from 'react';
import { PlayCircle } from 'lucide-react';
import { HERO_IMAGES } from '../constants';

interface MovieHeroProps {
    onWatchClick?: () => void;
    onPlayClick?: () => void;
}

const MovieHero: React.FC<MovieHeroProps> = ({ onWatchClick, onPlayClick }) => {
  return (
    <div className="relative w-full h-[800px] bg-netkin-dark overflow-hidden flex items-center">
      
      {/* Right Side Image with Fade */}
      <div className="absolute right-0 top-0 w-[70%] h-full">
         <img 
            src="https://images.unsplash.com/photo-1503951914296-3a5a5b01151e?auto=format&fit=crop&w=1500&q=80" 
            alt="Hero" 
            className="w-full h-full object-cover"
         />
         {/* Gradient Mask to fade into black on the left */}
         <div className="absolute inset-0 bg-gradient-to-r from-netkin-dark via-netkin-dark/60 to-transparent"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-netkin-dark via-transparent to-transparent"></div>
         
         {/* Play Button Overlay on Image */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <div 
                onClick={onPlayClick || onWatchClick}
                className="rounded-full border-2 border-white/30 p-1 cursor-pointer hover:scale-110 transition-transform group"
            >
                 <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                    <PlayCircle size={64} strokeWidth={1} className="text-white fill-white/20 group-hover:text-netkin-red" />
                 </div>
            </div>
         </div>
      </div>

      {/* Content Left */}
      <div className="container mx-auto px-8 relative z-10 pt-20">
        <div className="max-w-2xl">
          
          {/* Tag */}
          <div className="inline-block border border-white/30 px-4 py-2 mb-8">
            <span className="text-xs font-bold tracking-widest uppercase text-white">Cinema News</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase leading-[1.1] mb-8 tracking-tight">
            Congolese 2018:<br />
            Our Most<br />
            Anticipated Films
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-7 max-w-lg mb-12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          </p>

          {/* Button */}
          <button 
            onClick={onWatchClick}
            className="bg-netkin-red hover:bg-red-700 text-white text-xs font-bold py-4 px-10 tracking-widest uppercase transition-colors shadow-lg mb-16"
          >
            Watch More
          </button>

          {/* Thumbnails */}
          <div className="flex gap-4">
            {HERO_IMAGES.map((img, index) => (
              <div key={index} className="w-32 h-20 relative group cursor-pointer overflow-hidden">
                <img src={img} alt="thumb" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                {index === 0 && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>}
              </div>
            ))}
            <div className="flex items-end gap-1 pb-1 ml-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieHero;
