import React, { useState } from 'react';
import { 
  Send, ShieldCheck, Bell, CheckCircle, ExternalLink, 
  Coins, Sparkles, Copy, Check, Terminal, Zap
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { copyToClipboard } from '@/utils/helpers';

const botCommands = [
  { cmd: '/balance', desc: 'Check your live coin balance and USD value' },
  { cmd: '/faucet', desc: 'Roll the hourly faucet directly within Telegram' },
  { cmd: '/daily', desc: 'Claim your daily check-in streak bonus' },
  { cmd: '/withdraw', desc: 'Check pending cashouts or trigger instant FaucetPay' },
  { cmd: '/referrals', desc: 'Get your personal affiliate link & commission stats' },
  { cmd: '/help', desc: 'Contact 24/7 support bot directly' },
];

const TelegramPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState('@alex_crypto');
  const [claimedChannelBonus, setClaimedChannelBonus] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const verificationCode = 'KB-SYNC-98124';

  const [alerts, setAlerts] = useState({
    faucet: true,
    withdrawals: true,
    referrals: true,
    promoDrops: true,
  });

  const handleCopy = () => {
    copyToClipboard(verificationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleClaimBonus = () => {
    setClaimedChannelBonus(true);
    alert('Claimed +100 Coins for joining the Telegram Community!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Telegram Integration</h1>
          <p className="page-subtitle">Connect your Telegram account for instant push alerts, automated bot commands, and free bonus coins</p>
        </div>
      </div>

      {/* Hero Connect Banner */}
      <div className="card p-6 lg:p-8 bg-gradient-to-br from-sky-600 to-blue-800 text-white rounded-3xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xl flex-shrink-0">
              <Send size={32} />
            </div>
            <div>
              <span className="badge bg-white/20 text-white font-bold text-xs mb-2">
                {isConnected ? 'Status: Connected' : 'Status: Ready to Sync'}
              </span>
              <h2 className="text-2xl font-black">Official @KryptoBuxBot</h2>
              <p className="text-white/80 text-xs mt-1">
                Receive instant notifications directly on Telegram when your faucet is ready or payouts are confirmed.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {isConnected ? (
              <div className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-2">
                <CheckCircle size={16} /> Linked to {telegramUsername}
              </div>
            ) : (
              <Button 
                variant="secondary"
                className="bg-white text-blue-800 hover:bg-white/90 font-bold border-0"
                onClick={() => {
                  setIsConnected(true);
                  alert('Telegram Bot linked successfully!');
                }}
              >
                Connect Telegram Bot
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 100 Coins Channel Bonus & Sync Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Join Channel Reward */}
        <Card title="Join Community Channel & Earn +100 Coins" subtitle="Official announcements and weekly promo drops">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Send size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">@KryptoBuxOfficial</h4>
                  <p className="text-xs text-[var(--text-secondary)]">24,500+ subscribers</p>
                </div>
              </div>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Join Channel <ExternalLink size={12} />
              </a>
            </div>

            <div className="pt-2">
              {claimedChannelBonus ? (
                <div className="p-3 bg-green-50 text-green-700 text-xs font-bold rounded-xl border border-green-200 flex items-center gap-2">
                  <CheckCircle size={16} /> +100 Coins Claimed!
                </div>
              ) : (
                <Button 
                  variant="primary" 
                  className="w-full font-bold"
                  onClick={handleClaimBonus}
                  leftIcon={<Sparkles size={16} />}
                >
                  Verify & Claim +100 Coins
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Telegram Push Notification Settings */}
        <Card title="Telegram Alert Preferences" subtitle="Customize which alerts you receive from the bot">
          <div className="space-y-3">
            {[
              { key: 'faucet', label: 'Hourly Faucet Ready Alerts', desc: 'Get pinged when your cooldown timer reaches 0' },
              { key: 'withdrawals', label: 'Withdrawal Payout Confirmations', desc: 'Receive instant TxID hashes upon broadcast' },
              { key: 'referrals', label: 'New Referral Sign-up & Earnings', desc: 'Alerts when your friends register or complete tasks' },
              { key: 'promoDrops', label: 'Weekly Secret Coupon Drops', desc: 'Instant drops of limited-time coupon codes' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)]">
                <div>
                  <h5 className="font-bold text-xs text-[var(--text-primary)]">{item.label}</h5>
                  <p className="text-[11px] text-[var(--text-secondary)]">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={alerts[item.key]}
                  onChange={() => setAlerts(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                  className="w-4 h-4 rounded text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bot Commands Cheatsheet */}
      <Card title="Telegram Bot Commands" subtitle="Control your Krypto Bux account directly inside Telegram">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {botCommands.map((cmd) => (
            <div key={cmd.cmd} className="p-3.5 rounded-xl border border-[var(--border)] bg-white space-y-1">
              <div className="flex items-center gap-1.5 text-blue-600 font-mono font-bold text-sm">
                <Terminal size={14} />
                <span>{cmd.cmd}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{cmd.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TelegramPage;
