import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, ArrowLeft, Shield, Ban, Coins, Wallet, Clock, 
  Globe, Smartphone, CheckCircle, AlertTriangle, Send, Mail, Edit
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import { StatusBadge } from '@/components/common/Badge';
import { ROUTES } from '@/utils/constants';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const AdminUserDetailsPage = () => {
  const { id } = useParams();
  
  const [user, setUser] = useState({
    id: id || 'usr-103',
    name: 'Alex Morgan',
    username: 'alex_crypto',
    email: 'alex.crypto@example.com',
    vip: 'Silver VIP',
    balance: 2450,
    totalEarned: 12750,
    totalWithdrawn: 10300,
    tasksCount: 184,
    referralsCount: 12,
    trustScore: '98% (High Trust)',
    registeredIp: '192.168.1.104 (United States)',
    lastLoginIp: '192.168.1.104 (New York, US)',
    status: 'active',
    joined: '2024-08-15T10:30:00Z',
    wallets: {
      faucetPay: 'alex_faucetpay@mail.com',
      btc: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      ltc: 'LTC_L6gG7K9oQ8u3n9vE8f7a6b5c4d3e2f1',
      trx: 'TRX_TX99s88d77f66e55w44q33a22z11'
    }
  });

  const [messageModal, setMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  const handleToggleStatus = () => {
    setUser(prev => ({
      ...prev,
      status: prev.status === 'active' ? 'rejected' : 'active'
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert(`Direct notification sent to @${user.username}: "${messageText}"`);
    setMessageModal(false);
    setMessageText('');
  };

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-3">
        <Link to={ROUTES.ADMIN_USERS}>
          <button className="p-2 rounded-xl bg-white border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 className="page-title">User Inspection: @{user.username}</h1>
          <p className="page-subtitle">Detailed account audit, balances, security logs, and moderation tools</p>
        </div>
      </div>

      {/* Hero User Header */}
      <div className="card p-6 lg:p-8 bg-gradient-to-r from-[var(--deep)] to-slate-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[var(--primary)] to-blue-400 flex items-center justify-center font-bold text-2xl text-white shadow-xl flex-shrink-0">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">@{user.username}</h2>
              <span className="badge bg-white/15 text-slate-200 text-xs font-bold">{user.vip}</span>
              <StatusBadge status={user.status} />
            </div>
            <p className="text-white/70 text-xs mt-1 font-mono">{user.email} • ID: {user.id}</p>
            <p className="text-white/50 text-[11px] mt-0.5">Joined: {formatDateTime(user.joined)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white/10 text-white hover:bg-white/20 border-white/20"
            leftIcon={<Send size={14} />}
            onClick={() => setMessageModal(true)}
          >
            Direct Message
          </Button>
          <Button 
            variant={user.status === 'active' ? 'danger' : 'secondary'} 
            size="sm"
            leftIcon={<Ban size={14} />}
            onClick={handleToggleStatus}
          >
            {user.status === 'active' ? 'Ban Account' : 'Unban Account'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="card p-4 text-center">
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase">Balance</p>
          <p className="text-lg font-black text-[var(--primary)] font-mono mt-1">{formatNumber(user.balance)}</p>
          <span className="text-[10px] text-[var(--text-muted)]">Coins</span>
        </div>
        <div className="card p-4 text-center">
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase">Total Earned</p>
          <p className="text-lg font-black text-emerald-600 font-mono mt-1">{formatNumber(user.totalEarned)}</p>
          <span className="text-[10px] text-[var(--text-muted)]">Coins</span>
        </div>
        <div className="card p-4 text-center">
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase">Withdrawn</p>
          <p className="text-lg font-black text-slate-700 font-mono mt-1">{formatNumber(user.totalWithdrawn)}</p>
          <span className="text-[10px] text-[var(--text-muted)]">Coins</span>
        </div>
        <div className="card p-4 text-center">
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase">Tasks Completed</p>
          <p className="text-lg font-black text-[var(--text-primary)] font-mono mt-1">{user.tasksCount}</p>
          <span className="text-[10px] text-[var(--text-muted)]">Actions</span>
        </div>
        <div className="card p-4 text-center">
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase">Referrals</p>
          <p className="text-lg font-black text-purple-600 font-mono mt-1">{user.referralsCount}</p>
          <span className="text-[10px] text-[var(--text-muted)]">Active</span>
        </div>
        <div className="card p-4 text-center">
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase">Trust Score</p>
          <p className="text-sm font-black text-emerald-600 mt-1">{user.trustScore}</p>
          <span className="text-[10px] text-[var(--text-muted)]">Clean Anti-Cheat</span>
        </div>
      </div>

      {/* Security Logs & Linked Wallets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security & IP audit */}
        <Card title="Security & IP Log Audit" subtitle="Multi-account and proxy check details">
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-[var(--background)]">
              <span className="text-[var(--text-secondary)]">Registration IP:</span>
              <strong className="font-mono text-[var(--text-primary)]">{user.registeredIp}</strong>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-[var(--background)]">
              <span className="text-[var(--text-secondary)]">Last Login IP:</span>
              <strong className="font-mono text-[var(--text-primary)]">{user.lastLoginIp}</strong>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-[var(--background)]">
              <span className="text-[var(--text-secondary)]">VPN / Proxy Detection:</span>
              <strong className="text-emerald-600 font-semibold">Residential / No Proxy</strong>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-[var(--background)]">
              <span className="text-[var(--text-secondary)]">Duplicate Canvas Fingerprints:</span>
              <strong className="text-emerald-600 font-semibold">0 (Unique User)</strong>
            </div>
          </div>
        </Card>

        {/* Linked Wallets */}
        <Card title="Configured Withdrawal Wallets" subtitle="Destination crypto addresses">
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[var(--background)] space-y-1">
              <span className="text-[var(--text-secondary)] font-semibold">FaucetPay Account:</span>
              <p className="font-mono font-bold text-[var(--text-primary)]">{user.wallets.faucetPay}</p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--background)] space-y-1">
              <span className="text-[var(--text-secondary)] font-semibold">Bitcoin (BTC) Address:</span>
              <p className="font-mono font-bold text-[var(--text-primary)]">{user.wallets.btc}</p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--background)] space-y-1">
              <span className="text-[var(--text-secondary)] font-semibold">Litecoin (LTC) Address:</span>
              <p className="font-mono font-bold text-[var(--text-primary)]">{user.wallets.ltc}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Direct Message Modal */}
      <Modal
        isOpen={messageModal}
        onClose={() => setMessageModal(false)}
        title={`Send Push Notification to @${user.username}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <label className="input-label">Notification Message</label>
            <textarea
              rows={4}
              placeholder="Write a message directly to this user's notification box..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="input-field text-xs resize-none"
              required
            />
          </div>
          <Button type="submit" variant="primary" className="w-full font-bold">
            Send Notification
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUserDetailsPage;
