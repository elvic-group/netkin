import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="bg-black py-16 border-t border-gray-900">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="flex w-full max-w-2xl border border-gray-700">
          <input 
            type="email" 
            placeholder="Enter your email to subscribe to our newsletter" 
            className="flex-grow bg-transparent text-gray-300 px-6 py-4 text-xs focus:outline-none placeholder-gray-500"
          />
          <button className="px-8 py-4 text-xs font-bold text-netkin-red uppercase tracking-widest hover:bg-gray-900 transition-colors border-l border-gray-700">
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;