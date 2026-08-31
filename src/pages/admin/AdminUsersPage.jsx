import React, { useState } from 'react';
import { 
  Users, Search, Filter, Ban, CheckCircle, ShieldAlert, 
  Coins, Edit, Eye, MoreVertical, Plus, Minus, ArrowUpRight, DollarSign
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import { StatusBadge } from '@/components/common/Badge';
import { Link } from 'react-router-dom';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const initialUsersList = [
  { id: 'usr-101', username: 'crypto_tycoon', email: 'tycoon@crypto.org', role: 'User', vip: 'Diamond VIP', balance: 145200, ip: '194.26.11.4', country: 'Germany', status: 'active', joined: new Date(Date.now() - 86400000 * 45).toISOString() },
  { id: 'usr-102', username: 'satoshix99', email: 'satoshi99@mail.com', role: 'User', vip: 'Platinum VIP', balance: 68500, ip: '82.102.33.19', country: 'United Kingdom', status: 'active', joined: new Date(Date.now() - 86400000 * 30).toISOString() },
  { id: 'usr-103', username: 'alex_crypto', email: 'alex.crypto@example.com', role: 'User', vip: 'Silver VIP', balance: 2450, ip: '192.168.1.104', country: 'United States', status: 'active', joined: new Date(Date.now() - 86400000 * 15).toISOString() },
  { id: 'usr-104', username: 'spambot_vpn', email: 'fake12@tempmail.com', role: 'User', vip: 'Standard', balance: 0, ip: '104.28.19.4', country: 'Netherlands', status: 'rejected', joined: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'usr-105', username: 'elena_rostova', email: 'elena.r@mail.ru', role: 'User', vip: 'Gold VIP', balance: 34200, ip: '91.22.14.88', country: 'Russia', status: 'active', joined: new Date(Date.now() - 86400000 * 60).toISOString() },
  { id: 'usr-106', username: 'kmensah', email: 'kmensah@gmail.com', role: 'User', vip: 'Bronze VIP', balance: 12400, ip: '102.14.88.2', country: 'Ghana', status: 'active', joined: new Date(Date.now() - 86400000 * 10).toISOString() },
];

const AdminUsersPage = () => {
  const [users, setUsers] = useState(initialUsersList);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustType, setAdjustType] = useState('credit');
  const [adjustReason, setAdjustReason] = useState('');

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.ip.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleBan = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'rejected' ? 'active' : 'rejected';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleAdjustBalance = (e) => {
    e.preventDefault();
    if (!selectedUser || !adjustAmount) return;

    const delta = adjustType === 'credit' ? Number(adjustAmount) : -Number(adjustAmount);
    setUsers(prev => prev.map(u => {
      if (u.id === selectedUser.id) {
        return { ...u, balance: Math.max(0, u.balance + delta) };
      }
      return u;
    }));

    setAdjustModalOpen(false);
    setAdjustAmount('');
    setAdjustReason('');
    alert(`Adjusted balance for @${selectedUser.username}: ${delta > 0 ? `+${delta}` : delta} Coins.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Search, inspect, moderate, ban, and adjust coin balances across all registered accounts</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card p-4 stat-card stat-card-accent-blue">
          <p className="stat-card-label">Total Users</p>
          <p className="stat-card-value">28,450</p>
        </div>
        <div className="card p-4 stat-card stat-card-accent-deep">
          <p className="stat-card-label">Active Today</p>
          <p className="stat-card-value text-emerald-600">4,120</p>
        </div>
        <div className="card p-4 stat-card stat-card-accent-lavender">
          <p className="stat-card-label">VIP Tier Members</p>
          <p className="stat-card-value text-[var(--primary)]">1,280</p>
        </div>
        <div className="card p-4 stat-card stat-card-accent-black">
          <p className="stat-card-label">Banned / Flagged</p>
          <p className="stat-card-value text-red-600">142</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by username, email, or IP..."
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
              <option value="all">All User Statuses</option>
              <option value="active">Active Members</option>
              <option value="rejected">Banned / Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <Card title="Registered Accounts" subtitle={`Showing ${filteredUsers.length} users`}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>VIP Rank</th>
                <th>Balance (Coins)</th>
                <th>IP & Country</th>
                <th>Registered</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--deep)] text-white flex items-center justify-center font-bold text-xs">
                        {u.username[0].toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-[var(--text-primary)] block">@{u.username}</span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">{u.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-xs text-[var(--text-secondary)]">{u.email}</td>
                  <td>
                    <span className="badge badge-primary text-xs font-semibold">{u.vip}</span>
                  </td>
                  <td>
                    <span className="font-bold font-mono text-sm text-[var(--text-primary)]">
                      {formatNumber(u.balance)}
                    </span>
                  </td>
                  <td className="text-xs">
                    <span className="font-mono block text-[11px]">{u.ip}</span>
                    <span className="text-[var(--text-muted)] text-[10px]">{u.country}</span>
                  </td>
                  <td className="text-xs text-[var(--text-secondary)]">{formatDateTime(u.joined)}</td>
                  <td>
                    <StatusBadge status={u.status === 'rejected' ? 'rejected' : 'active'} />
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link to={`/admin/users/${u.id}`}>
                        <button 
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                          title="View In-Depth Profile"
                        >
                          <Eye size={14} />
                        </button>
                      </Link>
                      <button 
                        onClick={() => {
                          setSelectedUser(u);
                          setAdjustModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                        title="Adjust Coins"
                      >
                        <Coins size={14} />
                      </button>
                      <button 
                        onClick={() => handleToggleBan(u.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          u.status === 'rejected' 
                            ? 'bg-green-50 hover:bg-green-100 text-green-700' 
                            : 'bg-red-50 hover:bg-red-100 text-red-700'
                        }`}
                        title={u.status === 'rejected' ? 'Unban Account' : 'Ban Account'}
                      >
                        <Ban size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Adjust Balance Modal */}
      <Modal
        isOpen={adjustModalOpen}
        onClose={() => setAdjustModalOpen(false)}
        title={`Adjust Coin Balance: @${selectedUser?.username || ''}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAdjustBalance} className="space-y-4">
          <div className="p-3 bg-[var(--background)] rounded-xl flex justify-between text-xs">
            <span>Current Balance:</span>
            <strong className="font-mono text-sm">{formatNumber(selectedUser?.balance || 0)} Coins</strong>
          </div>

          <div>
            <label className="input-label">Adjustment Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAdjustType('credit')}
                className={`p-2.5 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 ${
                  adjustType === 'credit' 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                <Plus size={14} /> Credit (Add Coins)
              </button>
              <button
                type="button"
                onClick={() => setAdjustType('debit')}
                className={`p-2.5 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 ${
                  adjustType === 'debit' 
                    ? 'bg-red-600 text-white border-red-600' 
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                <Minus size={14} /> Debit (Deduct Coins)
              </button>
            </div>
          </div>

          <div>
            <label className="input-label">Amount (Coins)</label>
            <Input 
              type="number"
              min="1"
              placeholder="e.g. 500"
              value={adjustAmount}
              onChange={(e) => setAdjustAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">Administrative Reason</label>
            <Input 
              placeholder="e.g. Support compensation, contest correction, bug payout"
              value={adjustReason}
              onChange={(e) => setAdjustReason(e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full font-bold">
            Confirm Adjustment
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUsersPage;
