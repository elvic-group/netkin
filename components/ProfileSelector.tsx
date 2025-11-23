
import React from 'react';
import { PlusCircle, Edit2 } from 'lucide-react';
import { Profile } from '../types';

interface ProfileSelectorProps {
  profiles: Profile[];
  onSelectProfile: (profileId: string) => void;
  onManageProfiles: () => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ profiles, onSelectProfile, onManageProfiles }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center animate-in fade-in duration-700">
      <h1 className="text-4xl md:text-5xl font-medium text-white mb-12 tracking-wide">Who's watching?</h1>
      
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
        {profiles.map(profile => (
          <div 
            key={profile.id} 
            className="group flex flex-col items-center gap-4 cursor-pointer"
            onClick={() => onSelectProfile(profile.id)}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-300 relative">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-400 text-lg group-hover:text-white transition-colors">
              {profile.name}
            </span>
          </div>
        ))}
        
        {/* Add Profile Button */}
        <div className="group flex flex-col items-center gap-4 cursor-pointer hover:text-white text-gray-400">
             <div className="w-24 h-24 md:w-32 md:h-32 rounded flex items-center justify-center border-2 border-transparent group-hover:bg-white/10 transition-all duration-300">
                 <PlusCircle size={64} strokeWidth={1} />
             </div>
             <span className="text-lg">Add Profile</span>
        </div>
      </div>

      <button 
        onClick={onManageProfiles}
        className="px-8 py-2 border border-gray-500 text-gray-500 uppercase tracking-widest text-sm font-bold hover:text-white hover:border-white transition-colors"
      >
        Manage Profiles
      </button>
    </div>
  );
};

export default ProfileSelector;
