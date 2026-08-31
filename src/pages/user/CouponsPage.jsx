import React, { useState } from 'react';
import { 
  Ticket, Gift, Sparkles, Copy, Check, CheckCircle, 
  Send, ExternalLink, Tag, AlertCircle, Clock, CheckCheck
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { StatusBadge } from '@/components/common/Badge';
import useWalletStore from '@/store/walletStore';
import { copyToClipboard } from '@/utils/helpers';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const availablePromoCodes = [
  { code: 'WELCOME100', reward: 100, desc: 'New user onboarding gift bonus', validUntil: 'Dec 31, 2026', usesLeft: '842/1,000' },
  { code: 'TELEGRAM50', reward: 50, desc: 'Official Telegram channel community drop', validUntil: 'Limited Time', usesLeft: '320/500' },
  { code: 'KRYPTOVIP', reward: 250, desc: 'Weekend VIP member loyalty reward', validUntil: 'Sunday Midnight', usesLeft: '115/200' },
];

const mockCouponHistory = [
  { id: 'CP-101', code: 'CRYPTO2024', reward: 150, time: new Date(Date.now() - 86400000 * 4).toISOString(), status: 'completed' },
  { id: 'CP-100', code: 'BONUSSTART', reward: 75, time: new Date(Date.now() - 86400000 * 12).toISOString(), status: 'completed' },
];

const CouponsPage = () => {
  const { addTransaction } = useWalletStore();
  const [couponCode, setCouponCode] = useState('');
  const [history, setHistory] = useState(mockCouponHistory);
  const [redeeming, setRedeeming] = useState(false);
  const [message, setMessage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    copyToClipboard(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRedeem = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (!cleanCode) return;

    setRedeeming(true);
    setMessage(null);

    setTimeout(() => {
      setRedeeming(false);
      const match = availablePromoCodes.find(p => p.code === cleanCode);
      const isAlreadyRedeemed = history.some(h => h.code === cleanCode);

      if (isAlreadyRedeemed) {
        setMessage({ type: 'error', text: `Coupon code "${cleanCode}" has already been redeemed on your account!` });
        return;
      }

      if (match || cleanCode === 'FREECOINS') {
        const rewardAmount = match ? match.reward : 100;
        
        addTransaction({
          id: `TX-${Math.floor(Math.random() * 90000 + 10000)}`,
          type: 'bonus',
          desc: `Promo Coupon Redemption (${cleanCode})`,
          amount: rewardAmount,
          currency: 'Coins',
          time: new Date().toISOString(),
          status: 'completed'
        });

        setHistory(prev => [{
          id: `CP-${Math.floor(Math.random() * 900 + 100)}`,
          code: cleanCode,
          reward: rewardAmount,
          time: new Date().toISOString(),
          status: 'completed'
        }, ...prev]);

        setMessage({ type: 'success', text: `Success! Code "${cleanCode}" applied. +${rewardAmount} Coins added to your balance!` });
        setCouponCode('');
      } else {
        setMessage({ type: 'error', text: `Invalid or expired promo coupon code. Please verify and try again.` });
      }
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Redeem Coupons</h1>
          <p className="page-subtitle">Enter special promotional codes from our official social channels to claim instant free coins</p>
        </div>
      </div>

      {/* Redemption Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <Card title="Enter Promo Code" subtitle="Coupon codes are case-insensitive">
            <form onSubmit={handleRedeem} className="space-y-4">
              {message && (
                <div className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${
                  message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
                }`}>
                  {message.type === 'success' ? <CheckCircle size={18} className="text-green-600 flex-shrink-0" /> : <AlertCircle size={18} className="text-red-600 flex-shrink-0" />}
                  <span className="font-medium mt-0.5">{message.text}</span>
                </div>
              )}

              <div>
                <label className="input-label">Coupon Code</label>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="e.g. WELCOME100" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="font-mono font-bold tracking-wider uppercase text-base"
                    icon={Tag}
                  />
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="font-bold whitespace-nowrap min-w-[120px]"
                    loading={redeeming}
                  >
                    Redeem Code
                  </Button>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)]">
                Codes can be used once per user. Limited redemptions apply per code campaign.
              </p>
            </form>
          </Card>
        </div>

        {/* Telegram & Community Finder */}
        <div className="lg:col-span-6">
          <div className="card p-6 bg-gradient-to-br from-blue-900 to-[var(--deep)] text-white flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 rounded-xl bg-white/10 text-white"><Send size={18} /></span>
                <h3 className="font-bold text-base">Never Miss a Free Coin Drop!</h3>
              </div>
              <p className="text-xs text-white/80 leading-relaxed mt-2">
                We drop exclusive coupon codes worth up to <strong>1,000 Coins</strong> every week on our official Telegram channel and Discord community.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap gap-3">
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noreferrer" 
                className="btn bg-white text-[var(--deep)] hover:bg-white/90 font-bold text-xs rounded-xl inline-flex items-center gap-1.5"
              >
                Join Official Telegram Channel <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Active Promotion Codes List */}
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-3">Live Platform Coupons</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availablePromoCodes.map((promo) => (
            <div key={promo.code} className="card p-5 border border-dashed border-blue-200 bg-blue-50/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="badge badge-primary font-bold text-xs">{promo.code}</span>
                  <span className="text-xs font-bold text-emerald-600">+{promo.reward} Coins</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{promo.desc}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span>Expires: {promo.validUntil}</span>
                  <span>Slots: {promo.usesLeft}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full text-xs font-semibold"
                  leftIcon={copiedCode === promo.code ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                  onClick={() => {
                    handleCopy(promo.code);
                    setCouponCode(promo.code);
                  }}
                >
                  {copiedCode === promo.code ? 'Copied to Input' : 'Copy Code'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Redemption History */}
      <Card title="Redeemed Coupons History" subtitle="Your claimed promotional codes">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Reward</th>
                <th>Redemption Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="font-mono font-bold text-xs text-[var(--text-primary)] px-2.5 py-1 bg-gray-100 rounded-lg">
                      {item.code}
                    </span>
                  </td>
                  <td>
                    <span className="font-bold text-emerald-600 font-mono text-sm">
                      +{item.reward} Coins
                    </span>
                  </td>
                  <td className="text-xs text-[var(--text-secondary)]">{formatDateTime(item.time)}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CouponsPage;
