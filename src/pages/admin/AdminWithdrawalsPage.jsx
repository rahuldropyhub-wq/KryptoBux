import React, { useState } from 'react';
import { 
  Download, Check, X, Search, Filter, ShieldCheck, 
  Clock, CheckCircle, AlertTriangle, ExternalLink, RefreshCw,
  Wallet, DollarSign, CheckCircle2, ArrowRight
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
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
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Withdrawal Approval Queue</h1>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200">
                {pendingCount} Pending Action
              </span>
            )}
          </div>
          <p className="page-subtitle">Review, broadcast on-chain or FaucetPay micro-payouts, or reject and refund coins</p>
        </div>
        {pendingCount > 0 && (
          <Button 
            variant="primary" 
            size="sm" 
            leftIcon={<Check size={14} />}
            onClick={handleBatchApprove}
            className="shadow-md"
          >
            Batch Approve All Pending ({pendingCount})
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminStatCard
          label="Pending Queue"
          value={`${pendingCount} Requests`}
          sub="≈ $80.00 USD value"
          icon={Clock}
          accentIndex={3}
        />
        <AdminStatCard
          label="Paid Today"
          value="$380.20"
          trend="up"
          trendValue="24 Completed Payouts"
          icon={DollarSign}
          accentIndex={1}
        />
        <AdminStatCard
          label="Gateway Node Status"
          value="100% Online"
          sub="FaucetPay & RPC Nodes active"
          icon={ShieldCheck}
          accentIndex={0}
        />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Request ID, username, or destination address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 text-xs"
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
      <Card title="Withdrawal Master Queue" subtitle={`Displaying ${filtered.length} requests`}>
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>User Account</th>
                <th>Method & Asset</th>
                <th>Coins Debited</th>
                <th>Crypto Amount</th>
                <th>Destination Address</th>
                <th>Submitted</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="font-mono text-xs font-bold text-slate-700">{w.id}</td>
                  <td>
                    <span className="font-bold text-xs text-slate-900 block">@{w.user}</span>
                  </td>
                  <td>
                    <div>
                      <span className="badge badge-primary font-extrabold text-[11px]">{w.currency}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">{w.method}</span>
                    </div>
                  </td>
                  <td className="font-mono text-xs font-bold text-slate-700">{formatNumber(w.coins)}</td>
                  <td className="font-extrabold font-mono text-xs text-slate-900">{w.amount}</td>
                  <td className="font-mono text-xs max-w-[150px] truncate text-slate-600 font-medium" title={w.address}>
                    {w.address}
                  </td>
                  <td className="text-xs text-slate-500">{formatDateTime(w.time)}</td>
                  <td>
                    <StatusBadge status={w.status} />
                  </td>
                  <td className="text-right">
                    {w.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleApprove(w.id)}
                          className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1 transition-all border border-emerald-200"
                          title="Approve & Send"
                        >
                          <Check size={13} strokeWidth={2.5} /> Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedWd(w);
                            setRejectModal(true);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center gap-1 transition-all border border-red-200"
                          title="Reject"
                        >
                          <X size={13} strokeWidth={2.5} /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-semibold">Processed</span>
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
          <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-900 leading-relaxed font-medium">
            Rejecting this request will immediately cancel the transaction and refund <strong>{selectedWd?.coins} Coins</strong> back to @{selectedWd?.user}'s account balance.
          </div>

          <div>
            <label className="input-label">Reason for Rejection</label>
            <textarea
              rows={3}
              placeholder="e.g. Invalid wallet address, multi-account abuse detected, unverified email..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="input-field text-xs resize-none"
              required
            />
          </div>

          <Button type="submit" variant="danger" className="w-full font-bold shadow-md">
            Confirm Rejection & Refund Coins
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminWithdrawalsPage;
