
import React from 'react';

interface Props {
  message: string;
}

const Toast: React.FC<Props> = ({ message }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-10 duration-300">
      <div className="bg-white border-l-4 border-[#0033FF] shadow-2xl rounded-lg py-3 px-6 text-slate-800 font-bold text-sm flex items-center gap-3">
        <span className="w-5 h-5 bg-[#0033FF] rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
        {message}
      </div>
    </div>
  );
};

export default Toast;
