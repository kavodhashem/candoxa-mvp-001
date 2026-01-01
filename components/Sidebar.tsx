
import React, { useState } from 'react';
import { UserState, ProfileLink } from '../types';

interface Props {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  showToast: (msg: string) => void;
}

const Sidebar: React.FC<Props> = ({ user, setUser, showToast }) => {
  const [newLinkLabel, setNewLinkLabel] = useState('Personal');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const updateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUser(prev => ({ ...prev, avatar: ev.target?.result as string }));
        showToast("Avatar successfully hashed.");
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addLink = () => {
    if (!newLinkUrl) return;
    let url = newLinkUrl;
    if (!url.startsWith('http')) url = 'https://' + url;
    
    const newLink: ProfileLink = { label: newLinkLabel, url };
    setUser(prev => ({
      ...prev,
      links: [...prev.links, newLink]
    }));
    setNewLinkUrl('');
    showToast("Profile link added.");
  };

  const removeLink = (index: number) => {
    setUser(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Grouping logic for Profile Links
  const groupedLinks = user.links.reduce((acc, link, originalIndex) => {
    const category = link.label;
    if (!acc[category]) acc[category] = [];
    acc[category].push({ ...link, originalIndex });
    return acc;
  }, {} as Record<string, (ProfileLink & { originalIndex: number })[]>);

  const sortedCategories = Object.keys(groupedLinks).sort();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden self-start sticky top-6">
      <div className="p-8 text-center">
        <h3 className="text-left font-extrabold text-[#001A5E] mb-6 text-sm uppercase tracking-widest">Profile</h3>
        
        <div className="relative group mx-auto w-24 h-24 mb-6">
          <div className="w-full h-full rounded-full border-[3px] border-[#0033FF] p-1 bg-slate-50 flex items-center justify-center overflow-hidden shadow-inner">
            {user.avatar ? (
              <img src={user.avatar} className="w-full h-full object-cover rounded-full" alt="avatar" />
            ) : (
              <svg className="w-12 h-12 text-blue-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            )}
          </div>
          <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-[#0033FF]/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xl">
            📷
            <input type="file" className="hidden" accept="image/*" onChange={updateAvatar} />
          </label>
        </div>

        <input 
          type="text" 
          value={user.name} 
          onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
          className="text-lg font-bold text-slate-800 text-center w-full bg-transparent border-b-2 border-transparent hover:border-slate-100 focus:border-[#0033FF] outline-none transition-all pb-1 mb-1"
        />
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Joined: May 2025</div>

        <div className="grid grid-cols-[1fr_1px_1fr] items-center bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-inner">
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase mb-1">Doxa points</span>
            <span className="text-2xl font-black text-[#0033FF] tracking-tighter transition-all duration-300" key={user.points}>{user.points}</span>
          </div>
          <div className="h-8 w-px bg-slate-200 mx-auto"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase mb-1">Memories</span>
            <span className="text-2xl font-black text-[#0033FF] tracking-tighter" key={user.memories}>{user.memories}</span>
          </div>
        </div>

        {/* Updated Profile Links Section with Accordion Logic */}
        <div className="mt-8 text-left">
          <h4 className="text-[10px] font-extrabold text-[#001A5E] uppercase tracking-widest mb-4">Profile Links</h4>
          
          <div className="space-y-3 mb-4">
            {sortedCategories.length > 0 ? (
              sortedCategories.map(category => {
                const isExpanded = !!expandedCategories[category];
                return (
                  <div key={category} className="space-y-2 border-b border-slate-50 pb-2 last:border-0">
                    <button 
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center gap-2 group outline-none"
                    >
                      <span className="text-[9px] font-black bg-[#001A5E] text-white px-2 py-1 rounded uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all hover:bg-[#0033FF]">
                        {category}
                        <svg 
                          className={`w-2.5 h-2.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <div className="h-px flex-1 bg-slate-100 group-hover:bg-slate-200 transition-colors"></div>
                    </button>
                    
                    {isExpanded && (
                      <div className="space-y-1.5 pl-1 animate-in slide-in-from-top-1 duration-200 overflow-hidden">
                        {groupedLinks[category].map((link) => (
                          <div key={link.originalIndex} className="group flex items-center justify-between p-2 bg-blue-50/50 border border-blue-100/50 rounded-lg transition-all hover:border-[#0033FF] hover:bg-white shadow-sm hover:shadow-md">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex-1 truncate">
                              <span className="text-[10px] font-bold text-[#0033FF] truncate hover:underline block">
                                {link.url.replace(/^https?:\/\//, '')}
                              </span>
                            </a>
                            <button 
                              onClick={() => removeLink(link.originalIndex)} 
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all ml-2"
                              title="Remove link"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 border border-dashed border-slate-200 rounded-xl">
                 <span className="text-[10px] font-bold text-slate-400 italic">No profile links added yet</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <select 
              value={newLinkLabel} 
              onChange={(e) => setNewLinkLabel(e.target.value)}
              className="w-full text-[10px] font-bold bg-white border border-slate-200 rounded px-2 py-1 outline-none focus:border-[#0033FF] transition-all"
            >
              <option>Personal</option>
              <option>My Work</option>
              <option>Saved</option>
              <option>Recommended</option>
              <option>Learning</option>
            </select>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Link URL" 
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                className="flex-1 text-[10px] font-bold bg-white border border-slate-200 rounded px-2 py-1 outline-none focus:border-[#0033FF] transition-all"
                onKeyDown={(e) => e.key === 'Enter' && addLink()}
              />
              <button 
                onClick={addLink}
                className="bg-brand-gradient text-white px-3 rounded font-black text-[10px] hover:opacity-90 shadow-sm"
              >
                ADD
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-left space-y-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Linked Wallet</div>
            <div className="mono text-[10px] font-bold text-slate-600 truncate">{user.wallet || 'Not connected'}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Identity Provenance</div>
            <div className="text-[10px] font-bold text-[#0033FF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0033FF]"></span> Verified Human
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
