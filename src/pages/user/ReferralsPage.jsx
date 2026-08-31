import React, { useState } from 'react';
import { 
  Users, Copy, Check, Share2, Award, Coins, TrendingUp, 
  QrCode, ExternalLink, Download, Gift, ArrowUpRight
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { copyToClipboard } from '@/utils/helpers';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const mockReferredUsers = [
  { id: 1, username: 'crypto_whale99', joined: new Date(Date.now() - 86400000 * 3).toISOString(), tasks: 142, earned: 1250, status: 'active' },
  { id: 2, username: 'satoshi_fan', joined: new Date(Date.now() - 86400000 * 5).toISOString(), tasks: 89, earned: 840, status: 'active' },
  { id: 3, username: 'blockchain_dev', joined: new Date(Date.now() - 86400000 * 12).toISOString(), tasks: 310, earned: 3400, status: 'active' },
  { id: 4, username: 'luna_trader', joined: new Date(Date.now() - 86400000 * 18).toISOString(), tasks: 45, earned: 380, status: 'inactive' },
  { id: 5, username: 'solana_guru', joined: new Date(Date.now() - 86400000 * 25).toISOString(), tasks: 520, earned: 4950, status: 'active' },
];

const ReferralsPage = () => {
  const referralCode = 'KB-89241';
  const referralLink = `https://kryptobux.com/register?ref=${referralCode}`;
  
  const [copied, setCopied] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [users] = useState(mockReferredUsers);

  const handleCopy = () => {
    copyToClipboard(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalEarnings = users.reduce((acc, u) => acc + u.earned, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Referral Program</h1>
          <p className="page-subtitle">Invite your friends to Krypto Bux and earn lifetime commissions on all their task earnings</p>
        </div>
      </div>

      {/* Referral Link Main Card */}
      <div className="card p-6 lg:p-8 bg-gradient-to-br from-[var(--deep)] to-[var(--primary)] text-white relative overflow-hidden rounded-3xl">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-bold mb-2">
                <Gift size={14} className="text-yellow-400" /> Tier 2 Affiliate Commission: Up to 25%
              </span>
              <h2 className="text-2xl lg:text-3xl font-black">Your Unique Referral Link</h2>
            </div>
            <Button 
              variant="secondary" 
              className="bg-white/15 border-white/20 text-white hover:bg-white/25"
              leftIcon={<QrCode size={16} />}
              onClick={() => setQrModalOpen(true)}
            >
              Show Referral QR
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input 
                type="text" 
                readOnly 
                value={referralLink} 
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl font-mono text-xs sm:text-sm text-white outline-none"
              />
            </div>
            <button 
              onClick={handleCopy}
              className="w-full sm:w-auto px-6 py-3 bg-white text-[var(--deep)] hover:bg-white/90 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg flex-shrink-0"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              <span>{copied ? 'Link Copied!' : 'Copy Referral Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 stat-card stat-card-accent-blue">
          <p className="stat-card-label">Total Referrals</p>
          <p className="stat-card-value">{users.length + 120}</p>
          <p className="stat-card-sub">Registered with your link</p>
        </div>
        <div className="card p-5 stat-card stat-card-accent-deep">
          <p className="stat-card-label">Commission Earned</p>
          <p className="stat-card-value text-emerald-600">+{formatNumber(totalEarnings + 10820)}</p>
          <p className="stat-card-sub">Lifetime referral coins</p>
        </div>
        <div className="card p-5 stat-card stat-card-accent-lavender">
          <p className="stat-card-label">Active This Week</p>
          <p className="stat-card-value">38 Users</p>
          <p className="stat-card-sub">Generating daily passive yield</p>
        </div>
      </div>

      {/* Commission Rates Breakdown */}
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-3">Lifetime Commission Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card p-5 border-l-4 border-l-blue-600 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Faucet Claims</span>
              <span className="text-xl font-black text-blue-600 font-mono">15%</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Earn 15% instant commission on every hourly faucet roll completed by your invitees.
            </p>
          </div>

          <div className="card p-5 border-l-4 border-l-purple-600 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">PTC & Ads</span>
              <span className="text-xl font-black text-purple-600 font-mono">10%</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Earn 10% commission on every sponsored PTC advertisement your referrals watch.
            </p>
          </div>

          <div className="card p-5 border-l-4 border-l-emerald-600 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Shortlinks & Offers</span>
              <span className="text-xl font-black text-emerald-600 font-mono">5%</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Earn 5% on all shortlinks, offerwalls, and partner challenge completions.
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Referral Contest Banner */}
      <div className="card p-6 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0">
            <Award size={26} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--text-primary)]">Monthly 50,000 Coins Referral Contest</h4>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Top 10 referrers this month will share a 50,000 Coin prize pool! You currently rank #7.</p>
          </div>
        </div>
        <Button variant="secondary" size="sm" rightIcon={<ArrowUpRight size={14} />}>
          View Contest Standings
        </Button>
      </div>

      {/* Referred Users Table */}
      <Card title="Your Referred Users" subtitle="Real-time activity and commission earnings">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Registration Date</th>
                <th>Tasks Completed</th>
                <th>Commission Earned</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-[var(--primary)] flex items-center justify-center font-bold text-xs">
                        {u.username[0].toUpperCase()}
                      </div>
                      <span className="font-semibold text-sm text-[var(--text-primary)]">@{u.username}</span>
                    </div>
                  </td>
                  <td className="text-xs text-[var(--text-secondary)]">{formatDateTime(u.joined)}</td>
                  <td className="font-mono text-xs font-semibold">{u.tasks} tasks</td>
                  <td>
                    <span className="font-bold text-emerald-600 font-mono text-sm">
                      +{formatNumber(u.earned)} Coins
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={u.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* QR Code Modal */}
      <Modal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        title="Your Referral QR Code"
        maxWidth="max-w-xs"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 bg-white rounded-2xl border border-[var(--border)] shadow-md">
            <QrCode size={160} className="text-[var(--deep)]" />
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Scan with smartphone camera to open registration link directly.
          </p>
          <Button variant="secondary" size="sm" className="w-full" onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy Referral URL'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ReferralsPage;
