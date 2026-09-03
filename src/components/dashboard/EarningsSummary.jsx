import React from 'react';
import { Gift, MousePointer, Link as LinkIcon, ClipboardList, UsersRound } from 'lucide-react';
import { formatTokens } from '../../utils/formatTokens';

const EarningCard = ({ title, amount, icon: Icon, colorClass }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center shadow-sm">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${colorClass}`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-xs text-vie-text-muted font-medium uppercase tracking-wider mb-0.5">{title}</p>
      <div className="flex items-baseline">
        <p className="text-lg font-bold text-vie-text mr-1">+{formatTokens(amount)}</p>
        <span className="text-[10px] text-gray-400">Today</span>
      </div>
    </div>
  </div>
);

const EarningsSummary = ({ earnings }) => {
  return (
    <div>
      <h2 className="text-base font-semibold text-vie-text mb-4">Your Earnings</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <EarningCard title="Faucet" amount={earnings.faucet} icon={Gift} colorClass="bg-blue-500" />
        <EarningCard title="PTC" amount={earnings.ptc} icon={MousePointer} colorClass="bg-purple-500" />
        <EarningCard title="Shortlinks" amount={earnings.shortlinks} icon={LinkIcon} colorClass="bg-green-500" />
        <EarningCard title="Offerwall" amount={earnings.offerwall} icon={ClipboardList} colorClass="bg-orange-500" />
        <EarningCard title="Referrals" amount={earnings.referrals} icon={UsersRound} colorClass="bg-pink-500" />
      </div>
    </div>
  );
};

export default EarningsSummary;
