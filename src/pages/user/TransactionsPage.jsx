import React, { useState } from 'react';
import { 
  List, Search, Filter, Download, ArrowUpRight, ArrowDownLeft, 
  Coins, Calendar, RefreshCw, CheckCircle, Clock
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import Pagination from '@/components/common/Pagination';
import { StatusBadge } from '@/components/common/Badge';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const initialTransactions = [
  { id: 'TX-9481', type: 'faucet', desc: 'Hourly Faucet Roll #9892', amount: 65, time: new Date().toISOString(), status: 'completed' },
  { id: 'TX-9480', type: 'ptc', desc: 'PTC Ad: Binance Trade Promo', amount: 45, time: new Date(Date.now() - 3600000).toISOString(), status: 'completed' },
  { id: 'TX-9479', type: 'shortlink', desc: 'Shortlink: ShrinkEarn Network', amount: 35, time: new Date(Date.now() - 7200000).toISOString(), status: 'completed' },
  { id: 'TX-9478', type: 'daily', desc: 'Day 5 Streak Bonus Check-In', amount: 100, time: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
  { id: 'TX-9477', type: 'withdraw', desc: 'Withdrawal to FaucetPay (LTC)', amount: -1500, time: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'completed' },
  { id: 'TX-9476', type: 'referral', desc: 'Affiliate Commission: @crypto_whale', amount: 120, time: new Date(Date.now() - 86400000 * 3).toISOString(), status: 'completed' },
  { id: 'TX-9475', type: 'coupon', desc: 'Promo Coupon Redeemed (WELCOME100)', amount: 100, time: new Date(Date.now() - 86400000 * 4).toISOString(), status: 'completed' },
  { id: 'TX-9474', type: 'spin', desc: 'Spin Wheel Winner Prize', amount: 250, time: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'completed' },
  { id: 'TX-9473', type: 'ptc', desc: 'PTC Ad: Stake Casino Welcome', amount: 60, time: new Date(Date.now() - 86400000 * 6).toISOString(), status: 'completed' },
  { id: 'TX-9472', type: 'withdraw', desc: 'Withdrawal to TRON (TRX)', amount: -5000, time: new Date(Date.now() - 86400000 * 8).toISOString(), status: 'completed' },
];

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter transactions
  const filtered = transactions.filter((t) => {
    const matchesSearch = t.desc.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["TxID,Type,Description,Amount,Date,Status"].join(",") + "\n"
      + filtered.map(e => `${e.id},${e.type},"${e.desc}",${e.amount},${e.time},${e.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kryptobux_transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Transaction History</h1>
          <p className="page-subtitle">Complete ledger of all coin earnings, bonuses, referrals, and cryptocurrency cashouts</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          leftIcon={<Download size={14} />}
          onClick={handleExportCSV}
        >
          Export CSV
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by TxID or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 text-xs"
            />
          </div>

          {/* Type Filter */}
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
              <option value="spin">Spin Wheel</option>
              <option value="coupon">Coupons</option>
              <option value="withdraw">Withdrawals</option>
            </select>
          </div>

          {/* Status Filter */}
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

      {/* Transactions Table */}
      <Card title="Master Ledger" subtitle={`Showing ${displayed.length} of ${filtered.length} entries`}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount (Coins)</th>
                <th>USD Value</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((tx) => {
                const isPositive = tx.amount > 0;
                return (
                  <tr key={tx.id}>
                    <td className="font-mono text-xs font-semibold text-[var(--text-secondary)]">{tx.id}</td>
                    <td>
                      <span className="badge badge-primary uppercase text-[10px] font-bold">
                        {tx.type}
                      </span>
                    </td>
                    <td>
                      <span className="font-semibold text-sm text-[var(--text-primary)]">{tx.desc}</span>
                    </td>
                    <td>
                      <span className={`font-bold font-mono text-sm ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                        {isPositive ? `+${formatNumber(tx.amount)}` : formatNumber(tx.amount)} Coins
                      </span>
                    </td>
                    <td className="font-mono text-xs text-[var(--text-secondary)]">
                      ≈ ${(Math.abs(tx.amount) * 0.01).toFixed(2)}
                    </td>
                    <td className="text-xs text-[var(--text-secondary)]">{formatDateTime(tx.time)}</td>
                    <td>
                      <StatusBadge status={tx.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 pt-3 border-t border-[var(--border-light)] flex justify-between items-center">
          <span className="text-xs text-[var(--text-secondary)]">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransactionsPage;
