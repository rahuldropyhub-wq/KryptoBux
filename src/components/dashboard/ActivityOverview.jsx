import React from 'react';
import { formatTokens } from '../../utils/formatTokens';

const StatItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs text-vie-text-muted mb-1">{label}</span>
    <span className="text-lg font-bold text-vie-text">{formatTokens(value)}</span>
  </div>
);

const ActivityOverview = ({ activity }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-base font-semibold text-vie-text mb-4">Activity Overview</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 divide-x divide-gray-100">
        <div className="px-2 first:pl-0"><StatItem label="Faucet Claims" value={activity.faucetClaims} /></div>
        <div className="px-2 pl-4"><StatItem label="PTC Views" value={activity.ptcViews} /></div>
        <div className="px-2 pl-4"><StatItem label="Shortlinks" value={activity.shortlinksCompleted} /></div>
        <div className="px-2 pl-4"><StatItem label="Offers" value={activity.offersCompleted} /></div>
        <div className="px-2 pl-4"><StatItem label="Challenges" value={activity.challengesCompleted} /></div>
      </div>
    </div>
  );
};

export default ActivityOverview;
