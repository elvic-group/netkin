import React from 'react';
import { GALLERY_IMAGES } from '../constants';

const Gallery: React.FC = () => {
  return (
    <section className="bg-netkin-dark py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-white text-lg font-bold uppercase tracking-widest mb-6">
          For the Friday, the train ride and the couch.
        </h2>
        <div className="w-12 h-1 bg-netkin-red mx-auto mb-16"></div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {GALLERY_IMAGES.map((src, index) => (
            <div 
              key={index} 
              className="aspect-[2/3] overflow-hidden group relative cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Gallery ${index}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;