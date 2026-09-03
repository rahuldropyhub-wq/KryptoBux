import React, { useState } from 'react';
import { Copy, Users, Check } from 'lucide-react';
import { formatTokens } from '../../utils/formatTokens';

const ReferralSummary = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const refLink = "https://viefaucet.com/?r=CryptoUser";

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h2 className="text-base font-semibold text-vie-text mb-4">Referral Program</h2>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <div>
            <div className="text-xs text-vie-text-muted mb-1">Total Referrals</div>
            <div className="text-lg font-bold text-vie-text">{data.referralCount}</div>
          </div>
          <div>
            <div className="text-xs text-vie-text-muted mb-1">Active Referrals</div>
            <div className="text-lg font-bold text-vie-text">{data.activeReferrals}</div>
          </div>
          <div>
            <div className="text-xs text-vie-text-muted mb-1">Earnings</div>
            <div className="text-lg font-bold text-vie-text text-vie-success">+{formatTokens(data.referralEarnings)}</div>
          </div>
        </div>
        
        <div className="bg-blue-50 px-3 py-2 rounded-lg flex items-center border border-blue-100">
          <span className="text-sm text-vie-primary font-medium mr-2">Commission:</span>
          <span className="text-sm font-bold text-vie-primary">10%</span>
        </div>
      </div>

      <div className="flex mt-2">
        <div className="flex-1 bg-gray-50 border border-gray-200 border-r-0 rounded-l-lg px-3 py-2 flex items-center overflow-hidden">
          <span className="text-sm text-gray-600 truncate">{refLink}</span>
        </div>
        <button 
          onClick={handleCopy}
          className={`px-4 py-2 rounded-r-lg font-medium text-sm flex items-center transition-colors ${
            copied ? 'bg-vie-success text-white' : 'bg-vie-sidebar hover:bg-gray-800 text-white'
          }`}
        >
          {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
};

export default ReferralSummary;
