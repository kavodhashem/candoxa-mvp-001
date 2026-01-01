
import React, { useState } from 'react';
import { UserState, OnboardingStep } from '../types';

interface Props {
  onComplete: (user: UserState) => void;
  showToast: (msg: string) => void;
}

const SignupWizard: React.FC<Props> = ({ onComplete, showToast }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [points, setPoints] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [wallet, setWallet] = useState('');
  const [isVerifyingX, setIsVerifyingX] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [refCode, setRefCode] = useState('');

  const steps: OnboardingStep[] = [
    { id: 1, title: '1. Create Account', reward: 50, completed: currentStep > 1 },
    { id: 2, title: '2. Connect Wallet', reward: 100, completed: currentStep > 2 },
    { id: 3, title: '3. Verify Identity', reward: 150, completed: currentStep > 3 },
    { id: 4, title: '4. Referral Link', reward: 200, completed: currentStep > 4 },
  ];

  const handleCreateAccount = () => {
    if (!email || !pass) {
      showToast("Please fill in all fields.");
      return;
    }
    setPoints(prev => prev + 50);
    setCurrentStep(2);
    showToast("Account created successfully!");
  };

  const handleConnectWallet = () => {
    setIsConnectingWallet(true);
    setTimeout(() => {
      const mockWallet = '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
      setWallet(mockWallet);
      setPoints(prev => prev + 100);
      setIsConnectingWallet(false);
      setCurrentStep(3);
      showToast("Wallet linked to Memory Layer.");
    }, 1200);
  };

  const handleVerifyX = () => {
    setIsVerifyingX(true);
    setTimeout(() => {
      setPoints(prev => prev + 150);
      setIsVerifyingX(false);
      setCurrentStep(4);
      
      const cleanEmail = email.split('@')[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
      const code = `${cleanEmail}-${Math.floor(1000 + Math.random() * 9000)}`;
      setRefCode(code);
      showToast("Identity verified via X.");
    }, 1500);
  };

  const finish = () => {
    onComplete({
      name: email.split('@')[0] || "Doxa User",
      email,
      wallet,
      points,
      memories: 0,
      referralCode: refCode,
      isLoggedIn: true,
      links: [],
    });
  };

  return (
    <div className="w-full max-w-lg flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Centered Logo Above the Form */}
      <div className="mb-10 text-center flex flex-col items-center">
        <img 
          src="candoxa-logo-horizontal.png" 
          alt="Candoxa Logo" 
          className="h-[50px] w-auto object-contain"
          onError={(e) => {
            // Fallback SVG if image is not present
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent && !parent.querySelector('.logo-fallback')) {
              const fallback = document.createElement('div');
              fallback.className = 'logo-fallback flex items-center gap-4 mb-2';
              fallback.innerHTML = `
                <svg width="45" height="45" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="signupGrad" x1="0" y1="0" x2="100" y2="100">
                      <stop offset="0%" stopColor="#001A5E" />
                      <stop offset="100%" stopColor="#0033FF" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="48" fill="url(#signupGrad)" />
                  <path d="M50 25C38 25 28 35 28 47H72C72 35 62 25 50 25Z" fill="white"/>
                  <path d="M50 53C32 53 18 67 18 82H82C82 67 68 53 50 53Z" fill="white"/>
                </svg>
                <div class="flex flex-col text-left">
                  <span class="text-3xl font-black text-[#001A5E] leading-none tracking-tighter">Candoxa</span>
                  <span class="text-[10px] font-bold text-[#0033FF] uppercase tracking-widest mt-1">Memory Layer</span>
                </div>
              `;
              parent.appendChild(fallback);
            }
          }}
        />
      </div>

      <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#001A5E] p-8 border-b border-white/10 text-center text-white">
          <h2 className="text-2xl font-extrabold tracking-tight mb-1 uppercase tracking-widest">Create Account</h2>
          <p className="text-blue-200 text-sm">Join the Decentralized Memory Layer</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full font-bold text-sm border border-white/20 transition-transform active:scale-95">
            <span className="text-blue-300">★</span> {points} Doxa points
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* STEP 1 */}
          <div className={`p-5 border border-slate-100 rounded-xl transition-all ${currentStep < 1 ? 'opacity-40 grayscale pointer-events-none' : ''} ${currentStep > 1 ? 'bg-slate-50 opacity-80' : ''}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-[#001A5E]">{steps[0].title}</h3>
              <span className="text-[10px] font-bold text-[#0033FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">+50 Doxa points</span>
            </div>
            {currentStep === 1 ? (
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0033FF] focus:border-[#0033FF] outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0033FF] focus:border-[#0033FF] outline-none transition-all"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <button 
                  onClick={handleCreateAccount}
                  className="w-full py-3 bg-brand-gradient text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
                >
                  Create Account
                </button>
              </div>
            ) : (
              <p className="text-[#0033FF] text-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Account Verified
              </p>
            )}
          </div>

          {/* STEP 2 */}
          <div className={`p-5 border border-slate-100 rounded-xl transition-all ${currentStep < 2 ? 'opacity-40 grayscale pointer-events-none' : ''} ${currentStep > 2 ? 'bg-slate-50 opacity-80' : ''}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-[#001A5E]">{steps[1].title}</h3>
              <span className="text-[10px] font-bold text-[#0033FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">+100 Doxa points</span>
            </div>
            {currentStep === 2 ? (
              <button 
                onClick={handleConnectWallet}
                disabled={isConnectingWallet}
                className="w-full py-3 bg-brand-gradient text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isConnectingWallet ? 'Connecting...' : 'Connect Wallet (MetaMask)'}
              </button>
            ) : currentStep > 2 && (
              <p className="text-[#0033FF] text-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Wallet Connected
              </p>
            )}
          </div>

          {/* STEP 3 */}
          <div className={`p-5 border border-slate-100 rounded-xl transition-all ${currentStep < 3 ? 'opacity-40 grayscale pointer-events-none' : ''} ${currentStep > 3 ? 'bg-slate-50 opacity-80' : ''}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-[#001A5E]">{steps[2].title}</h3>
              <span className="text-[10px] font-bold text-[#0033FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">+150 Doxa points</span>
            </div>
            {currentStep === 3 ? (
              <button 
                onClick={handleVerifyX}
                disabled={isVerifyingX}
                className="w-full py-3 bg-black text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                {isVerifyingX ? 'Verifying X...' : 'Verify Identity with X'}
              </button>
            ) : currentStep > 3 && (
              <p className="text-[#0033FF] text-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Identity Humanized
              </p>
            )}
          </div>

          {/* STEP 4 */}
          <div className={`p-5 border border-blue-100 rounded-xl bg-blue-50/30 transition-all ${currentStep < 4 ? 'hidden' : 'block animate-in zoom-in-95 duration-300'}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-[#001A5E]">{steps[3].title}</h3>
              <span className="text-[10px] font-bold text-[#0033FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">+200/Ref</span>
            </div>
            <div className="flex items-center justify-between gap-3 p-3 bg-white border border-slate-200 rounded-lg mb-4">
              <code className="text-[11px] font-bold mono text-slate-600 break-all leading-tight">candoxa.io/join?ref={refCode}</code>
              <button 
                onClick={() => { navigator.clipboard.writeText(`candoxa.io/join?ref=${refCode}`); showToast("Copied referral link!"); }}
                className="px-3 py-1 bg-blue-100 text-[#0033FF] text-[10px] font-bold rounded hover:bg-blue-200 transition-colors"
              >
                COPY
              </button>
            </div>
            <button 
              onClick={finish}
              className="w-full py-3 bg-brand-gradient text-white rounded-lg font-bold text-sm hover:opacity-90 shadow-lg shadow-blue-200 transition-all"
            >
              Enter Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupWizard;
