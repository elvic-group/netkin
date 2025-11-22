import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LATEST_MOVIES } from '../constants';

const LatestRelease: React.FC = () => {
  return (
    <section className="bg-[#111112] py-16 border-t border-white/5">
      <div className="container mx-auto px-8">
        
        {/* Section Header */}
        <div className="mb-12">
             <div className="inline-block border border-white/20 px-6 py-3">
                <span className="text-xs font-bold tracking-widest uppercase text-white">Latest Release</span>
             </div>
        </div>

        {/* Carousel Layout */}
        <div className="relative flex items-center gap-4">
            
            {/* Left Arrow */}
            <button className="text-netkin-red hover:text-white transition-colors p-2 -ml-4 z-10">
                <ChevronLeft size={40} strokeWidth={1.5} />
            </button>

            <div className="flex-grow flex gap-0 items-center overflow-hidden">
                {/* Item 1 (Partial/Side) */}
                <div className="w-1/4 h-64 relative opacity-40 scale-90 origin-right filter grayscale brightness-50">
                     <img src={LATEST_MOVIES[0].image} className="w-full h-full object-cover" />
                </div>

                {/* Item 2 (Active/Center) */}
                <div className="w-1/2 h-[450px] relative z-10 shadow-2xl mx-4">
                    <img src={LATEST_MOVIES[1].image} className="w-full h-full object-cover" />
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                         <p className="text-netkin-red text-xs font-bold uppercase tracking-widest mb-2">
                             {LATEST_MOVIES[1].genre}
                         </p>
                         <h3 className="text-3xl font-black uppercase text-white mb-2 tracking-tight">
                             {LATEST_MOVIES[1].title}
                         </h3>
                         <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                             {LATEST_MOVIES[1].year} - {LATEST_MOVIES[1].author}
                         </p>
                    </div>
                </div>

                {/* Item 3 (Side) */}
                <div className="w-1/4 h-64 relative opacity-100 scale-95">
                     <img src={LATEST_MOVIES[2].image} className="w-full h-full object-cover" />
                     <div className="absolute bottom-0 left-0 w-full p-4 bg-black/60">
                         <p className="text-netkin-red text-[10px] font-bold uppercase tracking-widest mb-1">
                             {LATEST_MOVIES[2].genre}
                         </p>
                         <h3 className="text-sm font-bold uppercase text-white leading-tight mb-1">
                             {LATEST_MOVIES[2].title}
                         </h3>
                         <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">
                             {LATEST_MOVIES[2].year} - {LATEST_MOVIES[2].author}
                         </p>
                    </div>
                </div>
                 {/* Item 4 (Partial) */}
                 <div className="w-1/6 h-64 relative opacity-20 scale-90 origin-left filter grayscale brightness-50 ml-4">
                     <img src={LATEST_MOVIES[0].image} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Right Arrow */}
            <button className="text-white hover:text-netkin-red transition-colors p-2 -mr-4 z-10">
                <ChevronRight size={40} strokeWidth={1.5} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default LatestRelease;
