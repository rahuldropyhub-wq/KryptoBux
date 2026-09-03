import React from 'react';
import { Target, TrendingUp, Users, Calendar, Heart } from 'lucide-react';

const CampaignOverview = ({ campaign }) => {
  const metrics = [
    { label: 'Total Goal', value: campaign.goalDisplay, icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Raised', value: campaign.raisedDisplay, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Donors', value: campaign.donors.toLocaleString(), icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Days Remaining', value: campaign.daysRemaining, icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Your Contribution', value: '12,500 KBUX', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 ${metric.bg} ${metric.color} rounded-xl flex items-center justify-center`}>
              <metric.icon size={20} />
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{metric.label}</p>
            <p className="text-gray-900 font-extrabold text-lg truncate">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignOverview;
