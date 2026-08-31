import React, { useState } from 'react';
import { 
  Users, Search, Filter, Ban, CheckCircle, ShieldAlert, 
  Coins, Edit, Eye, MoreVertical, Plus, Minus, ArrowUpRight, 
  DollarSign, Download, Sparkles, UserCheck, Shield
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
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
  const [vipFilter, setVipFilter] = useState('all');
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
    const matchesVip = vipFilter === 'all' || u.vip.toLowerCase().includes(vipFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesVip;
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

  const handleExportCSV = () => {
    alert('Exporting full users dataset to CSV...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">User Directory</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
              {users.length} Listed
            </span>
          </div>
          <p className="page-subtitle">Search, inspect, moderate, ban, and adjust coin balances across all registered accounts</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          leftIcon={<Download size={14} />}
          onClick={handleExportCSV}
        >
          Export Users (CSV)
        </Button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Registered"
          value="28,450"
          trend="up"
          trendValue="+14% this month"
          icon={Users}
          accentIndex={0}
        />
        <AdminStatCard
          label="Active Today"
          value="4,120"
          trend="up"
          trendValue="Online Now"
          icon={UserCheck}
          accentIndex={1}
        />
        <AdminStatCard
          label="VIP Club Members"
          value="1,280"
          sub="Tier 1 - 5 Active"
          icon={Sparkles}
          accentIndex={2}
        />
        <AdminStatCard
          label="Flagged / Suspended"
          value="142"
          sub="Multi-IP & VPN violations"
          icon={ShieldAlert}
          accentIndex={3}
        />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by username, email, or IP..."
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
              <option value="all">All User Statuses</option>
              <option value="active">Active Members</option>
              <option value="rejected">Banned / Suspended</option>
            </select>
          </div>

          <div>
            <select
              value={vipFilter}
              onChange={(e) => setVipFilter(e.target.value)}
              className="input-field text-xs py-2"
            >
              <option value="all">All VIP Tiers</option>
              <option value="Standard">Standard Tier</option>
              <option value="Bronze">Bronze VIP</option>
              <option value="Silver">Silver VIP</option>
              <option value="Gold">Gold VIP</option>
              <option value="Platinum">Platinum VIP</option>
              <option value="Diamond">Diamond VIP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <Card title="Registered Accounts Master Table" subtitle={`Displaying ${filteredUsers.length} accounts`}>
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="data-table">
            <thead>
              <tr>
                <th>User Account</th>
                <th>Email Address</th>
                <th>VIP Rank</th>
                <th>Coin Balance</th>
                <th>IP & Country</th>
                <th>Joined</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xs shadow-xs flex-shrink-0">
                        {u.username[0].toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block leading-tight">@{u.username}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">{u.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-xs text-slate-600 font-medium">{u.email}</td>
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {u.vip}
                    </span>
                  </td>
                  <td>
                    <span className="font-extrabold font-mono text-xs text-slate-900 bg-slate-100 px-2 py-1 rounded-lg">
                      {formatNumber(u.balance)} Coins
                    </span>
                  </td>
                  <td className="text-xs">
                    <span className="font-mono block text-[11px] text-slate-700 font-semibold">{u.ip}</span>
                    <span className="text-slate-400 text-[10px]">{u.country}</span>
                  </td>
                  <td className="text-xs text-slate-500">{formatDateTime(u.joined)}</td>
                  <td>
                    <StatusBadge status={u.status === 'rejected' ? 'rejected' : 'active'} />
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link to={`/admin/users/${u.id}`}>
                        <button 
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
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
                        className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all font-semibold"
                        title="Adjust Coins"
                      >
                        <Coins size={14} />
                      </button>
                      <button 
                        onClick={() => handleToggleBan(u.id)}
                        className={`p-2 rounded-xl transition-all ${
                          u.status === 'rejected' 
                            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' 
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
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold">Current Balance:</span>
            <strong className="font-mono text-sm font-black text-slate-900">{formatNumber(selectedUser?.balance || 0)} Coins</strong>
          </div>

          <div>
            <label className="input-label">Adjustment Operation</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAdjustType('credit')}
                className={`p-2.5 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 transition-all ${
                  adjustType === 'credit' 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Plus size={14} /> Credit (Add Coins)
              </button>
              <button
                type="button"
                onClick={() => setAdjustType('debit')}
                className={`p-2.5 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 transition-all ${
                  adjustType === 'debit' 
                    ? 'bg-red-600 text-white border-red-600 shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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

          <Button type="submit" variant="primary" className="w-full font-bold shadow-md">
            Confirm Adjustment
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUsersPage;
