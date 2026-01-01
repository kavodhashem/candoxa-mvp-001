
import React, { useState } from 'react';
import { UserState, MemoryBlock } from '../types';
import Sidebar from './Sidebar';
import SignalActivation from './SignalActivation';
import SocialGrid from './SocialGrid';

interface Props {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  showToast: (msg: string) => void;
}

const Dashboard: React.FC<Props> = ({ user, setUser, showToast }) => {
  const [blocks, setBlocks] = useState<MemoryBlock[]>([]);

  const addBlock = (newBlock: MemoryBlock) => {
    setBlocks(prev => [newBlock, ...prev]);
    setUser(prev => ({
      ...prev,
      points: prev.points + 50,
      memories: prev.memories + 1
    }));
  };

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 animate-in fade-in duration-500">
      {/* Sidebar Profile Card */}
      <Sidebar user={user} setUser={setUser} showToast={showToast} />

      {/* Main Content Area */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Dashboard Title & Stats Bar */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-black text-[#001A5E] uppercase tracking-tighter">Memory Layer</h1>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active Session • ID: {user.wallet?.slice(-6) || 'XXXXXX'}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Network Status</span>
              <div className="flex items-center gap-1.5 text-xs text-[#0033FF] font-black">
                <span className="w-2 h-2 rounded-full bg-[#0033FF] animate-pulse"></span> Synchronized
              </div>
            </div>
          </div>

          {/* Social Integration Section */}
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-[10px] font-extrabold text-[#001A5E] uppercase tracking-widest mb-4">Social Integration</h2>
            <SocialGrid showToast={showToast} />
          </div>

          {/* Activation Section */}
          <div className="p-6">
            <h2 className="text-[10px] font-extrabold text-[#001A5E] uppercase tracking-widest mb-4">Direct Signal Activation</h2>
            <SignalActivation user={user} addBlock={addBlock} showToast={showToast} />
          </div>
        </div>

        {/* History / Chain Section */}
        {blocks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2">Memory Chain Log</h2>
            {blocks.map(block => (
              <div key={block.hash} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm animate-in slide-in-from-left-4 duration-500">
                <div className="flex justify-between items-start mb-2">
                  <div className="mono text-[10px] font-bold text-slate-400">HASH: {block.hash}</div>
                  <div className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-100 uppercase">
                    {new Date(block.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <p className="text-slate-700 text-sm mb-3 font-medium">"{block.data}"</p>
                {block.aiVerification && (
                  <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0033FF] flex items-center justify-center text-white shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#001A5E] uppercase tracking-tighter">Gemini Layer Analysis</span>
                        <span className="text-[10px] font-bold bg-blue-100 text-[#001A5E] px-1.5 py-0.5 rounded">Score: {block.humanityScore}</span>
                      </div>
                      <p className="text-[12px] text-[#001A5E] font-medium italic mt-0.5 leading-relaxed">{block.aiVerification}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
