import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight } from 'lucide-react';

const FaucetStatusCard = () => {
  const [timeLeft, setTimeLeft] = useState(222); // 3:42 in seconds
  
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const intervalId = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isReady = timeLeft <= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-vie-text">Faucet Status</h2>
        <span className="bg-blue-50 text-vie-primary text-xs font-medium px-2.5 py-1 rounded-full">Level 12 Multiplier</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <div className="text-sm text-vie-text-muted mb-2">Next Claim</div>
        
        {isReady ? (
          <div className="text-3xl font-bold text-vie-success mb-2">Ready!</div>
        ) : (
          <div className="flex items-center text-3xl font-bold text-vie-text mb-2 tracking-tight">
            <Timer className="w-6 h-6 mr-2 text-vie-primary" />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5 text-center divide-x divide-gray-100 border-y border-gray-100 py-3">
        <div>
          <div className="text-xs text-gray-500 mb-1">Last Reward</div>
          <div className="text-sm font-semibold text-vie-text">65 Tokens</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Daily Claims</div>
          <div className="text-sm font-semibold text-vie-text">18 / 1000</div>
        </div>
      </div>
      
      <button 
        className={`w-full flex items-center justify-center py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors ${
          isReady 
            ? 'bg-vie-success hover:bg-green-600 text-white' 
            : 'bg-vie-primary hover:bg-blue-800 text-white'
        }`}
      >
        {isReady ? 'Claim Now' : 'Go to Faucet'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

export default FaucetStatusCard;
