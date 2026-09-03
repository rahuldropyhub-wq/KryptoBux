import React from 'react';
import { TrendingUp, Users, Clock } from 'lucide-react';

const FundraisingProgress = ({ campaign }) => {
  const progressPercent = Math.min(100, (campaign.raisedAmount / campaign.goalAmount) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
      {/* Top Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Amount Raised</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#234398]">
              {campaign.raisedDisplay}
            </h3>
            <span className="text-gray-500 font-medium text-sm">
              of {campaign.targetDisplay}
            </span>
          </div>
          <p className="text-sm text-gray-400 font-medium mt-1">≈ {campaign.usdEquivalent} USD</p>
        </div>

        <div className="text-right">
          <div className="text-3xl md:text-4xl font-extrabold text-[#6D4AFF]">
            {progressPercent.toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-[#234398] to-[#6D4AFF] rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Bottom Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="text-[#F59E0B]" size={20} />
          <span className="font-bold">{campaign.daysRemaining} Days</span>
          <span className="text-gray-500 text-sm">Remaining</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Users className="text-[#16A34A]" size={20} />
          <span className="font-bold">{campaign.donors.toLocaleString()}</span>
          <span className="text-gray-500 text-sm">Donors</span>
        </div>
      </div>
    </div>
  );
};

export default FundraisingProgress;
