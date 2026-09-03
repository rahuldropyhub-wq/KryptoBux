import React, { useState } from 'react';
import { Gift } from 'lucide-react';

const DailyBonusCard = ({ day, reward }) => {
  const [claimed, setClaimed] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-center h-full relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4 text-orange-100 opacity-50">
        <Gift className="w-24 h-24" />
      </div>

      <div className="relative z-10">
        <h3 className="text-sm font-medium text-vie-text-muted mb-2">Daily Bonus</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xl font-bold text-vie-text">Day {day}</div>
            <div className="text-sm text-gray-500">Reward: <span className="font-semibold text-vie-success">+{reward} Tokens</span></div>
          </div>
          <div className="bg-orange-50 text-vie-warning text-xs font-bold px-2 py-1 rounded">
            +2% Bonus
          </div>
        </div>

        {claimed ? (
          <div className="w-full py-2 bg-gray-100 text-gray-500 rounded-lg text-center text-sm font-medium border border-gray-200">
            Claimed Today
            <div className="text-[10px] mt-0.5">Next bonus available in 14:22:10</div>
          </div>
        ) : (
          <button 
            onClick={() => setClaimed(true)}
            className="w-full py-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-lg text-sm font-bold shadow-sm transition-all"
          >
            Claim Bonus
          </button>
        )}
      </div>
    </div>
  );
};

export default DailyBonusCard;
