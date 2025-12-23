import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  defaultTime?: number; // seconds
}

export const Timer: React.FC<TimerProps> = ({ defaultTime = 90 }) => {
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play sound
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(defaultTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex items-center gap-3 bg-slate-800 p-2 rounded-lg border border-slate-700">
      <div className={`font-mono text-xl font-bold w-16 text-center ${timeLeft === 0 ? 'text-brand-500' : 'text-slate-200'}`}>
        {formatTime(timeLeft)}
      </div>
      <button 
        onClick={toggleTimer}
        className="p-1.5 hover:bg-slate-700 rounded-md transition-colors text-brand-400"
      >
        {isActive ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button 
        onClick={resetTimer}
        className="p-1.5 hover:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-white"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
};