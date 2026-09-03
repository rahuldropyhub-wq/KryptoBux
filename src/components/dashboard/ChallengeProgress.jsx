import React from 'react';
import { Flame } from 'lucide-react';

const ChallengeProgress = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full flex flex-col justify-center">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mr-2">
          <Flame className="w-4 h-4 text-vie-danger" />
        </div>
        <h2 className="text-base font-semibold text-vie-text">Active Challenge</h2>
      </div>
      
      <div className="mb-1 flex justify-between items-end">
        <h3 className="text-sm font-medium text-gray-700">Complete 25 Faucet Claims</h3>
        <span className="text-xs font-bold text-vie-primary">18 / 25</span>
      </div>
      
      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
        <div className="bg-vie-primary h-2 rounded-full" style={{ width: '72%' }}></div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-gray-500">Reward:</span>
        <span className="text-sm font-bold text-vie-success">+1,000 Tokens</span>
      </div>

      <button className="w-full py-1.5 border border-gray-200 text-vie-text font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors">
        View Challenge
      </button>
    </div>
  );
};

export default ChallengeProgress;
