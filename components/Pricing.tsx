import React from 'react';
import { Check, X } from 'lucide-react';
import { PRICING_PLANS } from '../constants';

const Pricing: React.FC = () => {
  return (
    <section className="bg-netkin-dark pb-24 pt-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-white text-lg font-bold uppercase tracking-widest mb-6">
            What suits you?
          </h2>
          <div className="w-12 h-1 bg-netkin-red mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {PRICING_PLANS.map((plan) => (
            <div 
              key={plan.name}
              className={`p-10 flex flex-col h-full relative transition-transform hover:-translate-y-2 duration-300
                ${plan.isPremium ? 'bg-netkin-red text-white' : 'bg-netkin-card text-gray-300'}`}
            >
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 text-center ${plan.isPremium ? 'text-white' : 'text-white'}`}>
                {plan.name}
              </h3>
              
              <div className="text-center mb-8 border-b border-white/20 pb-8">
                <span className={`text-3xl font-black ${plan.isPremium ? 'text-white' : 'text-netkin-red'}`}>
                  {plan.price}{plan.currency}
                </span>
                <span className="text-xs font-bold uppercase ml-1 opacity-70">
                  {plan.period}
                </span>
              </div>

              <div className="flex-grow space-y-6 mb-10 pl-4">
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-start gap-4">
                    <div className="mt-1">
                      {feature.included ? (
                        <Check size={16} strokeWidth={3} className={plan.isPremium ? 'text-white' : 'text-netkin-red'} />
                      ) : (
                        <X size={16} strokeWidth={3} className="text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${plan.isPremium || feature.included ? 'text-white' : 'text-gray-500'}`}>
                        {feature.name}
                      </p>
                      <p className={`text-xs ${plan.isPremium ? 'text-white/70' : 'text-gray-500'}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full py-4 text-xs font-bold uppercase tracking-widest border-2 transition-colors
                  ${plan.isPremium 
                    ? 'border-white bg-transparent text-white hover:bg-white hover:text-netkin-red' 
                    : 'border-netkin-red bg-netkin-red text-white hover:bg-red-700 hover:border-red-700'}`}
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 px-4 md:px-20">
            <p className="text-gray-500 text-xs leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;