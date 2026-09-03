import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import Button from '@/components/common/Button';

const BlockchainTransactions = ({ transactions }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Donation Transparency</h3>
        <span className="text-xs font-semibold bg-[#EEF2FF] text-[#234398] px-3 py-1 rounded-full">
          On-chain Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold">
            <tr>
              <th className="px-6 py-4">Transaction</th>
              <th className="px-6 py-4">Donor</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Network</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((tx, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <a href="#" className="text-[#6D4AFF] hover:underline font-medium flex items-center gap-1.5">
                    {tx.hash} <ExternalLink size={14} />
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">{tx.donor}</td>
                <td className="px-6 py-4">
                  <span className="font-bold text-gray-900">{tx.amount}</span>
                  <span className="text-gray-500 ml-1">{tx.token}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{tx.network}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-md w-fit">
                    <CheckCircle2 size={14} /> Confirmed
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{tx.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
        <Button variant="secondary" size="sm" className="bg-white">
          View on Blockchain Explorer
        </Button>
      </div>
    </div>
  );
};

export default BlockchainTransactions;
