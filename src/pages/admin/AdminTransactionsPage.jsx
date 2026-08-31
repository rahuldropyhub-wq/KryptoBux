import React, { useState } from 'react';
import { 
  List, Search, Filter, Download, ArrowUpRight, ArrowDownLeft, 
  Coins, CheckCircle, Clock, AlertTriangle, RefreshCw, Ban
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Global Platform Ledger</h1>
          <p className="page-subtitle">Master audit trail of all financial movements, task earnings, deposits, and cashout events</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          leftIcon={<Download size={14} />}
          onClick={() => alert('Exporting platform master transaction ledger...')}
        >
          Export Master CSV
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by TxID or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 text-xs"
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
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => {
                const isPositive = tx.amount > 0;
                return (
                  <tr key={tx.id}>
                    <td className="font-mono text-xs font-semibold">{tx.id}</td>
                    <td className="font-bold text-sm text-[var(--text-primary)]">@{tx.user}</td>
                    <td>
                      <span className="badge badge-primary uppercase text-[10px] font-bold">
                        {tx.type}
                      </span>
                    </td>
                    <td className="text-xs text-[var(--text-secondary)]">{tx.desc}</td>
                    <td>
                      <span className={`font-bold font-mono text-sm ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                        {isPositive ? `+${formatNumber(tx.amount)}` : formatNumber(tx.amount)} Coins
                      </span>
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
      </Card>
    </div>
  );
};

export default AdminTransactionsPage;
