import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section className="bg-netkin-dark py-24 border-b border-gray-900">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {FEATURES.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`flex flex-col items-center text-center px-6 md:px-12 py-8 md:py-0
                ${index !== FEATURES.length - 1 ? 'md:border-r border-gray-800' : ''}`}
            >
              <div className="mb-8 relative group">
                <feature.icon 
                  size={64} 
                  strokeWidth={1} 
                  className="text-white group-hover:text-netkin-red transition-colors duration-300" 
                />
                {/* Decorative rectangle simulating the icon box style in design */}
                <div className="absolute -inset-4 border border-netkin-red opacity-30 scale-75 group-hover:scale-100 transition-transform duration-500 rounded-sm"></div>
              </div>
              
              <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-4 h-8 flex items-center">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 text-xs leading-6 font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;