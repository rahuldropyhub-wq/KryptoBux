import React from 'react';
import { formatTokens } from '../../utils/formatTokens';
import { formatCurrency } from '../../utils/formatCurrency';

const BalanceCard = ({ balance, usdBalance }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-center h-full">
      <h3 className="text-sm font-medium text-vie-text-muted mb-2">Balance</h3>
      <div className="flex items-baseline">
        <span className="text-3xl lg:text-4xl font-bold text-vie-text mr-2">
          {formatTokens(balance)}
        </span>
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tokens</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          ≈ {formatCurrency(usdBalance)} USD
        </span>
        <span className="text-xs font-medium text-vie-success bg-green-50 px-2 py-1 rounded-full">
          +12.4% today
        </span>
      </div>
    </div>
  );
};

export default BalanceCard;
