
import React, { useState } from 'react';
import { UserState, MemoryBlock } from '../types';
import { verifyOpinion } from '../services/geminiService';

interface Props {
  user: UserState;
  addBlock: (block: MemoryBlock) => void;
  showToast: (msg: string) => void;
}

const SignalActivation: React.FC<Props> = ({ user, addBlock, showToast }) => {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [lastHash, setLastHash] = useState<string | null>(null);

  const handleMint = async () => {
    if (!text && !link && !hasFile) {
      showToast("Input a signal to activate.");
      return;
    }

    setIsProcessing(true);
    setLastHash(null);

    // Call Gemini to analyze the thought
    const analysis = text ? await verifyOpinion(text) : null;

    // Simulate mining/hashing
    setTimeout(() => {
      const payload = text || link || "Data-based Signal";
      const hash = Math.random().toString(16).substring(2, 10).toUpperCase() + "CDX";
      
      const newBlock: MemoryBlock = {
        id: Date.now(),
        timestamp: Date.now(),
        data: payload,
        owner: user.wallet,
        prevHash: "PREV_HASH_CDX",
        hash: hash,
        aiVerification: analysis?.summary,
        humanityScore: analysis?.humanityScore
      };

      addBlock(newBlock);
      setLastHash(hash);
      setIsProcessing(false);
      setText('');
      setLink('');
      setHasFile(false);
      showToast("Opinion activated and verified.");
    }, 2000);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-[11px] font-black text-[#001A5E] uppercase tracking-tight">Digital Opinion (Text Signal)</label>
        <textarea 
          placeholder="Share a core belief, analysis, or thought for the permanent record..."
          className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0033FF] focus:border-[#0033FF] outline-none transition-all"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-[#001A5E] uppercase tracking-tight">Content Link</label>
          <input 
            type="text" 
            placeholder="https://..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0033FF] focus:border-[#0033FF] outline-none transition-all"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-[#001A5E] uppercase tracking-tight">Data Signal</label>
          <div 
            onClick={() => setHasFile(!hasFile)}
            className={`cursor-pointer border-2 border-dashed p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${hasFile ? 'bg-blue-50 border-[#0033FF] text-[#0033FF] font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
          >
            <span className="text-lg">{hasFile ? '📄' : '📂'}</span>
            <span className="text-[10px] uppercase font-bold">{hasFile ? 'Contract_V1.pdf Attached' : 'Attach Data File'}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleMint}
        disabled={isProcessing}
        className="w-full py-4 bg-brand-gradient text-white rounded-xl font-black uppercase text-xs tracking-widest hover:opacity-90 shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            Hashing Opinion...
          </>
        ) : 'Activate Opinion & Generate Proof'}
      </button>

      {lastHash && (
        <div className="animate-in zoom-in-95 duration-300 p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center space-y-1">
          <div className="text-[10px] font-black text-[#001A5E] uppercase tracking-tighter">Memory Proof Successfully Generated</div>
          <div className="mono text-lg font-black text-[#0033FF] tracking-tight">{lastHash}</div>
          <div className="text-[11px] font-bold text-[#0033FF]">🎁 +50 Doxa points Distributed</div>
        </div>
      )}
    </div>
  );
};

export default SignalActivation;
