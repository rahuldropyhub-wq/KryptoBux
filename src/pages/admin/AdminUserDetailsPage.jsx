import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, ArrowLeft, Shield, Ban, Coins, Wallet, Clock, 
  Globe, Smartphone, CheckCircle, AlertTriangle, Send, Mail, Edit,
  ShieldCheck, Sparkles, Check
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
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
          <button className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs">
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 className="page-title">User Audit: @{user.username}</h1>
          <p className="page-subtitle">Detailed account audit, balance ledger, security telemetry, and moderation tools</p>
        </div>
      </div>

      {/* Hero User Header */}
      <div className="p-6 lg:p-8 bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-2xl text-white shadow-md flex-shrink-0">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">@{user.username}</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/20">
                {user.vip}
              </span>
              <StatusBadge status={user.status} />
            </div>
            <p className="text-slate-300 text-xs mt-1 font-mono">{user.email} • ID: {user.id}</p>
            <p className="text-slate-400 text-[11px] mt-0.5">Joined: {formatDateTime(user.joined)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 w-full md:w-auto justify-end">
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white/10 text-white hover:bg-white/20 border-white/20 font-bold"
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
            className="font-bold shadow-md"
          >
            {user.status === 'active' ? 'Ban Account' : 'Unban Account'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Balance</p>
          <p className="text-lg font-black text-blue-600 font-mono mt-1">{formatNumber(user.balance)}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Coins</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Earned</p>
          <p className="text-lg font-black text-emerald-600 font-mono mt-1">{formatNumber(user.totalEarned)}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Coins</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Withdrawn</p>
          <p className="text-lg font-black text-slate-800 font-mono mt-1">{formatNumber(user.totalWithdrawn)}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Coins</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tasks Done</p>
          <p className="text-lg font-black text-slate-900 font-mono mt-1">{user.tasksCount}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Actions</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Referrals</p>
          <p className="text-lg font-black text-purple-600 font-mono mt-1">{user.referralsCount}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Active</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Trust Score</p>
          <p className="text-sm font-black text-emerald-600 mt-1">{user.trustScore}</p>
          <span className="text-[10px] text-slate-400 font-semibold">Clean Anti-Cheat</span>
        </div>
      </div>

      {/* Security Logs & Linked Wallets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security & IP audit */}
        <Card title="Security & IP Log Audit" subtitle="Multi-account and proxy check details">
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-semibold">Registration IP:</span>
              <strong className="font-mono text-slate-900">{user.registeredIp}</strong>
            </div>
            <div className="flex justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-semibold">Last Login IP:</span>
              <strong className="font-mono text-slate-900">{user.lastLoginIp}</strong>
            </div>
            <div className="flex justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-semibold">VPN / Proxy Detection:</span>
              <strong className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Residential / Clean</strong>
            </div>
            <div className="flex justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-semibold">Canvas Fingerprint Match:</span>
              <strong className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">0 (Unique Device)</strong>
            </div>
          </div>
        </Card>

        {/* Linked Wallets */}
        <Card title="Configured Withdrawal Wallets" subtitle="Destination crypto addresses">
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">FaucetPay Account</span>
              <p className="font-mono font-bold text-slate-900">{user.wallets.faucetPay}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Bitcoin (BTC) Address</span>
              <p className="font-mono font-bold text-slate-900 truncate">{user.wallets.btc}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Litecoin (LTC) Address</span>
              <p className="font-mono font-bold text-slate-900 truncate">{user.wallets.ltc}</p>
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
          <Button type="submit" variant="primary" className="w-full font-bold shadow-md">
            Send Notification
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUserDetailsPage;
