import React, { useState } from 'react';
import { History, Filter } from 'lucide-react';

const RecentDonations = ({ donations }) => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'BTC', 'ETH', 'USDT', 'Other'];

  const filteredDonations = filter === 'All'
    ? donations
    : donations.filter(d => {
      if (filter === 'Other') return !['BTC', 'ETH', 'USDT'].includes(d.token);
      return d.token === filter;
    });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <History className="text-[#234398]" size={20} />
          Recent Donations
        </h3>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${filter === f
                  ? 'bg-[#234398] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filteredDonations.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No donations found for this filter.
          </div>
        ) : (
          <ul className="space-y-1">
            {filteredDonations.map((donation) => (
              <li key={donation.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EEF2FF] to-blue-100 flex items-center justify-center text-[#234398] font-bold text-sm border border-blue-200 shadow-sm">
                    {donation.donor.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{donation.donor}</p>
                    <p className="text-xs text-gray-500">{donation.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-[#16A34A] text-sm">
                    {donation.amount} {donation.token}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    ≈ {donation.usdValue} USD
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Donation Totals */}
      <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-gray-600 font-medium">Today's Total</span>
          <span className="font-bold text-gray-900">1,82,500 KBUX</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">This Month</span>
          <span className="font-bold text-[#6D4AFF]">12,45,800 KBUX</span>
        </div>
      </div>
    </div>
  );
};

export default RecentDonations;
