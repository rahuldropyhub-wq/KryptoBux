import React, { useState } from 'react';
import { 
  List, Search, Filter, Download, ArrowUpRight, ArrowDownLeft, 
  Coins, CheckCircle, Clock, AlertTriangle, RefreshCw, Ban,
  FileSpreadsheet
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { StatusBadge } from '@/components/common/Badge';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const initialGlobalTransactions = [
  { id: 'TX-9481', user: 'crypto_tycoon', type: 'faucet', desc: 'Faucet Roll #9892', amount: 65, currency: 'Coins', time: new Date().toISOString(), status: 'completed' },
  { id: 'TX-9480', user: 'satoshix99', type: 'ptc', desc: 'PTC Ad: Binance Trade Promo', amount: 45, currency: 'Coins', time: new Date(Date.now() - 3600000).toISOString(), status: 'completed' },
  { id: 'TX-9479', user: 'alex_crypto', type: 'shortlink', desc: 'Shortlink: ShrinkEarn', amount: 35, currency: 'Coins', time: new Date(Date.now() - 7200000).toISOString(), status: 'completed' },
  { id: 'TX-9478', user: 'elena_r', type: 'daily', desc: 'Day 5 Streak Bonus', amount: 100, currency: 'Coins', time: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
  { id: 'TX-9477', user: 'vance_crypto', type: 'withdraw', desc: 'Payout to FaucetPay (LTC)', amount: -1500, currency: 'Coins', time: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'completed' },
  { id: 'TX-9476', user: 'kmensah', type: 'referral', desc: 'Affiliate Bonus from @subuser2', amount: 120, currency: 'Coins', time: new Date(Date.now() - 86400000 * 3).toISOString(), status: 'completed' },
];

const AdminTransactionsPage = () => {
  const [transactions, setTransactions] = useState(initialGlobalTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.user.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Global Transactions Ledger</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
              Audit Trail
            </span>
          </div>
          <p className="page-subtitle">Master audit trail of all financial movements, task rewards, faucet payouts, and withdrawals</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          leftIcon={<Download size={14} />}
          onClick={() => alert('Exporting platform master transaction ledger to CSV...')}
        >
          Export Ledger (CSV)
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Transaction ID or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 text-xs"
            />
          </div>

          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input-field text-xs py-2"
            >
              <option value="all">All Transaction Types</option>
              <option value="faucet">Faucet Claims</option>
              <option value="ptc">PTC Ads</option>
              <option value="shortlink">Shortlinks</option>
              <option value="daily">Daily Bonus</option>
              <option value="referral">Referral Commissions</option>
              <option value="withdraw">Withdrawals</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field text-xs py-2"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Global Table */}
      <Card title="Master Ledger Entries" subtitle={`Showing ${filtered.length} records`}>
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>User Account</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount (Coins)</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => {
                const isPositive = tx.amount > 0;
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="font-mono text-xs font-bold text-slate-700">{tx.id}</td>
                    <td className="font-bold text-xs text-slate-900">@{tx.user}</td>
                    <td>
                      <span className="badge badge-primary uppercase text-[10px] font-bold">
                        {tx.type}
                      </span>
                    </td>
                    <td className="text-xs text-slate-600 font-medium">{tx.desc}</td>
                    <td>
                      <span className={`font-mono text-xs font-black px-2 py-0.5 rounded-md ${
                        isPositive 
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
                          : 'text-red-700 bg-red-50 border border-red-200'
                      }`}>
                        {isPositive ? `+${formatNumber(tx.amount)}` : formatNumber(tx.amount)} Coins
                      </span>
                    </td>
                    <td className="text-xs text-slate-500">{formatDateTime(tx.time)}</td>
                    <td>
                      <StatusBadge status={tx.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminTransactionsPage;
