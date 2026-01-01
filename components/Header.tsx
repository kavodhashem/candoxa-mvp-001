
import React from 'react';
import { UserState } from '../types';

interface Props {
  user: UserState;
  onLogoClick: () => void;
}

const Header: React.FC<Props> = ({ user, onLogoClick }) => {
  return (
    <header className="w-full bg-[#001A5E] border-b border-white/10 py-3 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section - Aligned Far Left */}
        <div 
          className="flex items-center cursor-pointer group px-5" 
          onClick={onLogoClick}
        >
          {/* 
            Integrating the horizontal logo. 
            The filter 'brightness(0) invert(1)' transforms dark text/icon on white BG into white on dark.
          */}
          <div className="flex items-center gap-3">
            <img 
              src="candoxa-logo-horizontal.png" 
              alt="Candoxa" 
              className="h-[40px] w-auto object-contain filter brightness-0 invert transition-opacity group-hover:opacity-90"
              onError={(e) => {
                // Fallback to high-fidelity SVG reconstruction if image is missing
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.logo-fallback')) {
                  const fallbackContainer = document.createElement('div');
                  fallbackContainer.className = 'logo-fallback flex items-center gap-3';
                  
                  // Reconstructing the icon and text as a single visible unit
                  fallbackContainer.innerHTML = `
                    <svg width="34" height="34" viewBox="0 0 100 100" class="shrink-0">
                      <circle cx="50" cy="50" r="48" stroke="white" stroke-width="4" fill="transparent"/>
                      <path d="M50 25C38 25 28 35 28 47H72C72 35 62 25 50 25Z" fill="white"/>
                      <path d="M50 53C32 53 18 67 18 82H82C82 67 68 53 50 53Z" fill="white"/>
                    </svg>
                    <div class="flex flex-col">
                      <span class="text-2xl font-bold text-white leading-tight tracking-tight">Candoxa</span>
                      <span class="text-[9px] font-bold text-blue-200 uppercase tracking-widest leading-none">Activate Opinion, Amplify Growth</span>
                    </div>
                  `;
                  parent.appendChild(fallbackContainer);
                }
              }}
            />
          </div>
        </div>

        {/* Navigation / User Section - Aligned Far Right */}
        <div className="flex items-center gap-6 px-4 md:px-8">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest opacity-80">Network Tier</span>
            <span className="text-xs font-bold text-white">Verified Genesis</span>
          </div>
          
          <div className="flex items-center gap-4 border-l border-white/20 pl-6">
            <div className="flex flex-col text-right">
              <span className="text-[9px] font-black text-blue-200 uppercase tracking-tighter opacity-80">Balance</span>
              <span className="text-sm font-black text-white leading-none whitespace-nowrap">{user.points} Doxa points</span>
            </div>
            
            <button className="text-white font-bold text-sm hover:text-blue-200 transition-colors underline-offset-4 hover:underline">
              Profile
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
