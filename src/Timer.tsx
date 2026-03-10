import { useState, useEffect } from "react";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'short' | 'long'>('focus');

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleModeChange = (newMode: 'focus' | 'short' | 'long') => {
    setMode(newMode);
    setIsActive(false);
    switch (newMode) {
      case 'focus':
        setTimeLeft(25 * 60);
        break;
      case 'short':
        setTimeLeft(5 * 60);
        break;
      case 'long':
        setTimeLeft(15 * 60);
        break;
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => handleModeChange(mode);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeColor = () => {
    switch (mode) {
      case 'focus': return 'text-slate-100';
      case 'short': return 'text-emerald-400';
      case 'long': return 'text-blue-400';
    }
  };

  return (
    <div className="flex flex-col items-center mb-10 w-full max-w-[480px]">
      <div className="flex gap-2 mb-8 bg-[#1e293b] p-1.5 rounded-full border border-slate-700/50">
        <button
          onClick={() => handleModeChange('focus')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'focus' ? 'bg-pink-600 text-white shadow-lg shadow-pink-900/20' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Focus
        </button>
        <button
          onClick={() => handleModeChange('short')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'short' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Short Break
        </button>
        <button
          onClick={() => handleModeChange('long')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'long' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Long Break
        </button>
      </div>

      <div className={`text-[6rem] leading-none font-bold mb-8 transition-colors duration-500 drop-shadow-2xl tabular-nums tracking-tighter ${getModeColor()}`}>
        {formatTime(timeLeft)}
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleTimer}
          className={`h-14 px-8 rounded-2xl font-bold text-xl transition-all active:scale-95 shadow-lg ${
            isActive 
              ? 'bg-slate-800 text-slate-200 border-2 border-slate-700 hover:bg-slate-700'
              : 'bg-slate-200 text-slate-900 hover:bg-white'
          }`}
        >
          {isActive ? 'PAUSE' : 'START'}
        </button>
        <button
          onClick={resetTimer}
          className="h-14 w-14 flex items-center justify-center rounded-2xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700 active:scale-95"
          aria-label="Reset Timer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>
    </div>
  );
}
