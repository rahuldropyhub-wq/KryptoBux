import React from 'react';

const LevelCard = ({ level, xp, nextLevelXp }) => {
  const progress = Math.min(100, Math.max(0, (xp / nextLevelXp) * 100));
  const remaining = nextLevelXp - xp;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-center h-full">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-sm font-medium text-vie-text-muted">Level</h3>
        <span className="text-2xl font-bold text-vie-primary">Level {level}</span>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
        <span>{xp.toLocaleString()} XP</span>
        <span>{nextLevelXp.toLocaleString()} XP</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div 
          className="bg-vie-primary h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500">{remaining.toLocaleString()} XP to Level {level + 1}</span>
        <span className="font-medium text-vie-text">{progress.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default LevelCard;
