import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { formatTokens } from '../../utils/formatTokens';

const LeaderboardPreview = ({ leaderboard }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full flex flex-col">
      <div className="flex items-center mb-4">
        <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
        <h2 className="text-base font-semibold text-vie-text">Leaderboard</h2>
      </div>
      
      <div className="flex-1">
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <span className={`w-6 text-center font-bold text-sm mr-2 ${
                  index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-600'
                }`}>
                  #{index + 1}
                </span>
                <span className="text-sm font-medium text-vie-text">{user.username}</span>
              </div>
              <span className="text-sm font-bold text-gray-700">{formatTokens(user.score)}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-500">You are </span>
            <span className="font-bold text-vie-primary">#87</span>
          </div>
          <button className="text-xs font-medium text-vie-primary hover:underline">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPreview;
