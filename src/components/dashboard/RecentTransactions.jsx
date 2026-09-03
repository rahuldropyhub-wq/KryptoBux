import React from 'react';
import { Gift, MousePointer, UsersRound, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatTokens } from '../../utils/formatTokens';

const TransactionIcon = ({ type }) => {
  switch (type) {
    case 'Faucet': return <Gift className="w-4 h-4 text-blue-500" />;
    case 'PTC': return <MousePointer className="w-4 h-4 text-purple-500" />;
    case 'Referral': return <UsersRound className="w-4 h-4 text-pink-500" />;
    case 'Withdraw': return <Download className="w-4 h-4 text-orange-500" />;
    default: return null;
  }
};

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-base font-semibold text-vie-text">Recent Transactions</h2>
        <button className="text-sm text-vie-primary hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto flex-1">
        {transactions.length > 0 ? (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-vie-text-muted bg-gray-50/50 uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Date</th>
                <th className="px-5 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <TransactionIcon type={tx.type} />
                      </div>
                      <span className="font-medium text-vie-text">{tx.type}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 truncate max-w-[150px]">{tx.desc}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap font-medium">
                    <div className={`flex items-center ${tx.amount > 0 ? 'text-vie-success' : 'text-vie-danger'}`}>
                      {tx.amount > 0 ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
                      {tx.amount > 0 ? '+' : ''}{formatTokens(tx.amount)}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-gray-500 hidden sm:table-cell">{tx.date}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-right">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      tx.status === 'Completed' ? 'bg-green-50 text-vie-success' : 'bg-orange-50 text-vie-warning'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center h-full">
            <div className="text-gray-400 mb-2">No transactions yet</div>
            <p className="text-sm text-gray-500 mb-4">Complete your first earning activity to see your history.</p>
            <button className="px-4 py-2 bg-vie-primary text-white rounded-lg text-sm font-medium">Start Earning</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
