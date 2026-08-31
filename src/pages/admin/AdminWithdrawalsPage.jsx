import React, { useState } from 'react';
import { 
  Download, Check, X, Search, Filter, ShieldCheck, 
  Clock, CheckCircle, AlertTriangle, ExternalLink, RefreshCw
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import { StatusBadge } from '@/components/common/Badge';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const initialWithdrawals = [
  { id: 'WD-8914', user: 'crypto_tycoon', method: 'Direct Wallet', currency: 'LTC', coins: 4500, amount: '0.540000 LTC', address: 'LTC_L6gG7K9oQ8u3n9vE8f7a6b5c4d3e2f1', time: new Date(Date.now() - 600000).toISOString(), status: 'pending' },
  { id: 'WD-8913', user: 'satoshix99', method: 'FaucetPay', currency: 'USDT', coins: 2000, amount: '20.00 USDT', address: 'satoshi_fp@gmail.com', time: new Date(Date.now() - 1500000).toISOString(), status: 'pending' },
  { id: 'WD-8912', user: 'moon_walker', method: 'Direct Wallet', currency: 'TRX', coins: 1500, amount: '112.50 TRX', address: 'TRX_TX99s88d77f66e55w44q33a22z11', time: new Date(Date.now() - 3600000).toISOString(), status: 'pending' },
  { id: 'WD-8911', user: 'alex_crypto', method: 'FaucetPay', currency: 'LTC', coins: 1500, amount: '0.180000 LTC', address: 'alex_faucetpay@mail.com', time: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
  { id: 'WD-8910', user: 'elena_r', method: 'Direct Wallet', currency: 'BTC', coins: 10000, amount: '0.001500 BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', time: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'completed' },
];

const AdminWithdrawalsPage = () => {
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Reject modal
  const [rejectModal, setRejectModal] = useState(false);
  const [selectedWd, setSelectedWd] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const filtered = withdrawals.filter((w) => {
    const matchesSearch = w.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      w.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: 'completed' } : w));
    alert(`Withdrawal ${id} approved & broadcasted via crypto gateway!`);
  };

  const handleBatchApprove = () => {
    if (confirm('Approve all pending withdrawal requests now?')) {
      setWithdrawals(prev => prev.map(w => w.status === 'pending' ? { ...w, status: 'completed' } : w));
      alert('All pending withdrawals approved and sent!');
    }
  };

  const handleRejectSubmit = (e) => {
    e.preventDefault();
    if (!selectedWd) return;

    setWithdrawals(prev => prev.map(w => w.id === selectedWd.id ? { ...w, status: 'rejected' } : w));
    setRejectModal(false);
    alert(`Withdrawal ${selectedWd.id} rejected. Reason: "${rejectReason}". Coins refunded to user.`);
    setRejectReason('');
  };

  const pendingCount = withdrawals.filter(w => w.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Withdrawal Approval Queue</h1>
          <p className="page-subtitle">Review, approve, broadcast, or reject cryptocurrency cashout requests</p>
        </div>
        {pendingCount > 0 && (
          <Button 
            variant="primary" 
            size="sm" 
            leftIcon={<Check size={14} />}
            onClick={handleBatchApprove}
          >
            Batch Approve All Pending ({pendingCount})
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4 stat-card stat-card-accent-blue">
          <p className="stat-card-label">Pending Approval</p>
          <p className="stat-card-value text-yellow-600">{pendingCount} Requests</p>
          <p className="stat-card-sub">≈ $80.00 USD value</p>
        </div>
        <div className="card p-4 stat-card stat-card-accent-deep">
          <p className="stat-card-label">Processed Today</p>
          <p className="stat-card-value text-emerald-600">$380.20</p>
          <p className="stat-card-sub">24 Completed payouts</p>
        </div>
        <div className="card p-4 stat-card stat-card-accent-lavender">
          <p className="stat-card-label">Gateway Status</p>
          <p className="stat-card-value text-[var(--primary)]">100% Online</p>
          <p className="stat-card-sub">FaucetPay & RPC Nodes</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by Request ID, user, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 text-xs"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field text-xs py-2"
            >
              <option value="all">All Request Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="completed">Completed & Broadcasted</option>
              <option value="rejected">Rejected / Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <Card title="Withdrawal Records" subtitle={`Showing ${filtered.length} requests`}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>User</th>
                <th>Gateway & Currency</th>
                <th>Coins</th>
                <th>Crypto Amount</th>
                <th>Destination Address</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr key={w.id}>
                  <td className="font-mono text-xs font-semibold">{w.id}</td>
                  <td className="font-bold text-sm text-[var(--text-primary)]">@{w.user}</td>
                  <td>
                    <div>
                      <span className="badge badge-primary font-bold text-xs">{w.currency}</span>
                      <span className="text-[10px] text-[var(--text-secondary)] block mt-0.5">{w.method}</span>
                    </div>
                  </td>
                  <td className="font-mono text-xs font-semibold">{formatNumber(w.coins)}</td>
                  <td className="font-bold font-mono text-sm text-[var(--text-primary)]">{w.amount}</td>
                  <td className="font-mono text-xs max-w-[140px] truncate text-[var(--text-secondary)]" title={w.address}>
                    {w.address}
                  </td>
                  <td className="text-xs text-[var(--text-secondary)]">{formatDateTime(w.time)}</td>
                  <td>
                    <StatusBadge status={w.status} />
                  </td>
                  <td className="text-right">
                    {w.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleApprove(w.id)}
                          className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                          title="Approve & Send"
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedWd(w);
                            setRejectModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                          title="Reject"
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-[var(--text-muted)] font-medium">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Reject Modal */}
      <Modal
        isOpen={rejectModal}
        onClose={() => setRejectModal(false)}
        title={`Reject Withdrawal: ${selectedWd?.id || ''}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleRejectSubmit} className="space-y-4">
          <p className="text-xs text-[var(--text-secondary)]">
            Rejecting this request will refund {selectedWd?.coins} Coins back to @{selectedWd?.user}'s account balance.
          </p>

          <div>
            <label className="input-label">Reason for Rejection</label>
            <textarea
              rows={3}
              placeholder="e.g. Invalid wallet address, duplicate account flagged, unverified email..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="input-field text-xs resize-none"
              required
            />
          </div>

          <Button type="submit" variant="danger" className="w-full font-bold">
            Confirm Rejection & Refund Coins
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminWithdrawalsPage;
