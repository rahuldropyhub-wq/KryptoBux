import React, { useState } from 'react';
import { 
  Link2, ExternalLink, Zap, Coins, CheckCircle, ArrowRight, 
  HelpCircle, ShieldCheck, RefreshCw, Flame, Check
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import useWalletStore from '@/store/walletStore';
import { formatNumber } from '@/utils/formatters';

const mockShortlinks = [
  { id: 'sl-1', name: 'ShrinkEarn Network', viewsLeft: 3, totalViews: 3, reward: 35, energy: 10, difficulty: 'Easy', time: '15s' },
  { id: 'sl-2', name: 'Exe.io Fast Portal', viewsLeft: 2, totalViews: 3, reward: 40, energy: 15, difficulty: 'Medium', time: '20s' },
  { id: 'sl-3', name: 'Ouo.io Crypto Pass', viewsLeft: 3, totalViews: 3, reward: 30, energy: 10, difficulty: 'Easy', time: '10s' },
  { id: 'sl-4', name: 'Shortfly Web Gateway', viewsLeft: 1, totalViews: 2, reward: 45, energy: 20, difficulty: 'Hard', time: '30s' },
  { id: 'sl-5', name: 'Clk.sh Secure Links', viewsLeft: 3, totalViews: 3, reward: 35, energy: 12, difficulty: 'Easy', time: '15s' },
  { id: 'sl-6', name: 'Clicksfly Rewards', viewsLeft: 2, totalViews: 2, reward: 50, energy: 25, difficulty: 'Hard', time: '35s' },
  { id: 'sl-7', name: 'Adfoc.us Direct Bridge', viewsLeft: 2, totalViews: 3, reward: 25, energy: 8, difficulty: 'Easy', time: '10s' },
  { id: 'sl-8', name: 'Gplinks Fast Track', viewsLeft: 3, totalViews: 3, reward: 40, energy: 15, difficulty: 'Medium', time: '25s' },
];

const ShortlinksPage = () => {
  const { addTransaction } = useWalletStore();
  const [links, setLinks] = useState(mockShortlinks);
  const [activeLink, setActiveLink] = useState(null);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedSuccess, setCompletedSuccess] = useState(false);

  const totalCoins = links.reduce((acc, l) => acc + (l.reward * l.viewsLeft), 0);
  const totalEnergy = links.reduce((acc, l) => acc + (l.energy * l.viewsLeft), 0);

  const handleStartLink = (link) => {
    setActiveLink(link);
    setStep(1);
    setCompletedSuccess(false);
    setIsProcessing(false);
  };

  const handleNextStep = () => {
    if (step < 3) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(prev => prev + 1);
      }, 1200);
    } else {
      // Completed step 3
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCompletedSuccess(true);
        
        // Update views
        setLinks(prev => prev.map(l => {
          if (l.id === activeLink.id) {
            return { ...l, viewsLeft: Math.max(0, l.viewsLeft - 1) };
          }
          return l;
        }));

        addTransaction({
          id: `TX-${Math.floor(Math.random() * 90000 + 10000)}`,
          type: 'shortlink',
          desc: `Shortlink: ${activeLink.name}`,
          amount: activeLink.reward,
          currency: 'Coins',
          time: new Date().toISOString(),
          status: 'completed'
        });

        setTimeout(() => {
          setActiveLink(null);
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Shortlinks Wall</h1>
          <p className="page-subtitle">Visit sponsor shortlinks to earn high-yield coins and energy for the Lucky Spin Wheel</p>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 stat-card stat-card-accent-blue">
          <p className="stat-card-label">Available Shortlinks</p>
          <p className="stat-card-value">{links.filter(l => l.viewsLeft > 0).length} Providers</p>
          <p className="stat-card-sub">Daily reset in 7h 42m</p>
        </div>
        <div className="card p-5 stat-card stat-card-accent-deep">
          <p className="stat-card-label">Total Coins Earnable</p>
          <p className="stat-card-value">+{formatNumber(totalCoins)}</p>
          <p className="stat-card-sub">Combined rewards</p>
        </div>
        <div className="card p-5 stat-card stat-card-accent-lavender">
          <p className="stat-card-label">Energy Points</p>
          <p className="stat-card-value text-amber-600">+{totalEnergy} ⚡</p>
          <p className="stat-card-sub">Use for Spin Wheel & Bonuses</p>
        </div>
      </div>

      {/* How it works info */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center flex-shrink-0">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">How to complete Shortlinks</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              1. Click "Claim Link" • 2. Pass the sponsor security check on next page • 3. Click "Get Link" to receive your Coins & Energy instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Shortlinks Table / Grid */}
      <Card title="Available Shortlink Providers" subtitle="Reset every 24 hours at 00:00 UTC">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Remaining Today</th>
                <th>Rewards</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => {
                const isExhausted = link.viewsLeft === 0;
                return (
                  <tr key={link.id} className={isExhausted ? 'opacity-50 bg-gray-50/60' : ''}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[var(--primary)] flex items-center justify-center font-bold text-xs">
                          <Link2 size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[var(--text-primary)]">{link.name}</p>
                          <p className="text-[11px] text-[var(--text-secondary)]">Verified fast gateway</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        link.difficulty === 'Easy' ? 'badge-success' : 
                        link.difficulty === 'Medium' ? 'badge-warning' : 'badge-error'
                      }`}>
                        {link.difficulty}
                      </span>
                    </td>
                    <td className="text-xs text-[var(--text-secondary)] font-mono">{link.time}</td>
                    <td>
                      <span className="font-semibold text-xs text-[var(--text-primary)]">
                        {link.viewsLeft} / {link.totalViews} views
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="badge badge-primary font-bold">
                          +{link.reward} Coins
                        </span>
                        <span className="badge badge-warning font-bold">
                          +{link.energy} Energy
                        </span>
                      </div>
                    </td>
                    <td className="text-right">
                      {isExhausted ? (
                        <span className="text-xs text-[var(--text-muted)] font-medium">Completed</span>
                      ) : (
                        <Button 
                          variant="primary" 
                          size="sm"
                          rightIcon={<ArrowRight size={13} />}
                          onClick={() => handleStartLink(link)}
                        >
                          Claim Link
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Shortlink Verification Simulation Modal */}
      <Modal
        isOpen={!!activeLink}
        onClose={() => {
          if (!completedSuccess && !confirm('Cancel shortlink claim?')) return;
          setActiveLink(null);
        }}
        title={`Visiting ${activeLink?.name || ''}`}
        maxWidth="max-w-md"
      >
        {activeLink && (
          <div className="space-y-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step === s ? 'bg-[var(--primary)] text-white shadow-sm ring-4 ring-blue-100' :
                    step > s ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s ? <Check size={14} /> : s}
                </div>
              ))}
            </div>

            <div className="p-5 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
              {step === 1 && (
                <div className="space-y-2">
                  <p className="text-sm font-bold text-[var(--text-primary)]">Step 1: Connecting to Gateway</p>
                  <p className="text-xs text-[var(--text-secondary)]">Click button below to pass initial security verification.</p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-2">
                  <p className="text-sm font-bold text-[var(--text-primary)]">Step 2: Human Verification</p>
                  <p className="text-xs text-[var(--text-secondary)]">Security check passed! Ready to generate destination coin token.</p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-2">
                  <p className="text-sm font-bold text-[var(--text-primary)]">Step 3: Final Coin Destination</p>
                  <p className="text-xs text-[var(--text-secondary)]">Click to claim your +{activeLink.reward} Coins and +{activeLink.energy} Energy.</p>
                </div>
              )}
            </div>

            {completedSuccess ? (
              <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center justify-center gap-2 font-bold text-sm animate-bounce">
                <CheckCircle size={18} className="text-green-600" />
                <span>Rewarded +{activeLink.reward} Coins & +{activeLink.energy} Energy!</span>
              </div>
            ) : (
              <Button 
                variant="primary" 
                className="w-full"
                loading={isProcessing}
                onClick={handleNextStep}
              >
                {step === 3 ? 'Get Final Link & Reward' : `Proceed to Step ${step + 1}`}
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ShortlinksPage;
