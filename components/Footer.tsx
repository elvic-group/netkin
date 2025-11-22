import React from 'react';
import { Facebook, Twitter, Chrome, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-netkin-footer pt-16 pb-8 text-gray-500 text-[10px] uppercase tracking-wider font-medium">
      <div className="container mx-auto px-12">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          
          {/* Column 1: Contact/Copyright */}
          <div className="md:w-1/3 space-y-20">
            <div>
              <p className="text-gray-300 font-bold">Questions? Call 556304-7041</p>
            </div>
            <div>
              <p>&copy; 2018 Netkin (org.no: 556304-7041). All rights reserved.</p>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="md:w-1/3 flex flex-col gap-3">
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
            <a href="#" className="hover:text-white transition-colors">Investor Relations</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>

          {/* Column 3: Newsletter & Social */}
          <div className="md:w-1/3">
            <p className="mb-4 text-gray-300">Join Newsletter</p>
            <div className="flex border border-gray-800 mb-8">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent w-full px-4 py-3 text-gray-400 focus:outline-none text-[10px]"
              />
              <button className="px-6 py-2 text-netkin-red border-l border-gray-800 hover:bg-gray-900 transition-colors">
                Send
              </button>
            </div>

            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-sm hover:bg-netkin-red hover:text-white transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-sm hover:bg-netkin-red hover:text-white transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-sm hover:bg-netkin-red hover:text-white transition-colors">
                <Chrome size={14} /> 
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-sm hover:bg-netkin-red hover:text-white transition-colors">
                <Instagram size={14} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;