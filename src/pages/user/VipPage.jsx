import React from 'react';
import { 
  Diamond, Crown, Zap, Gift, ShieldCheck, Check, 
  ArrowRight, Award, Flame, Sparkles, TrendingUp
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { VIP_LEVELS } from '@/utils/constants';
import { formatNumber } from '@/utils/formatters';

const currentVip = {
  level: 2,
  name: 'Silver VIP',
  currentCoins: 68500,
  nextLevelCoins: 150000,
  bonus: '+10%',
  dailySpins: 3,
  instantWithdrawals: true
};

const fullVipTiers = [
  { level: 0, name: 'Standard', min: 0, bonus: '0%', spins: 1, fee: '2.0%', instant: false, color: 'from-gray-600 to-gray-800' },
  { level: 1, name: 'Bronze VIP', min: 10000, bonus: '+5%', spins: 2, fee: '1.5%', instant: false, color: 'from-amber-700 to-amber-900' },
  { level: 2, name: 'Silver VIP', min: 50000, bonus: '+10%', spins: 3, fee: '1.0%', instant: true, color: 'from-slate-400 to-slate-600' },
  { level: 3, name: 'Gold VIP', min: 150000, bonus: '+15%', spins: 5, fee: '0.5%', instant: true, color: 'from-yellow-500 to-amber-600' },
  { level: 4, name: 'Platinum VIP', min: 500000, bonus: '+20%', spins: 8, fee: '0%', instant: true, color: 'from-cyan-400 to-blue-600' },
  { level: 5, name: 'Diamond VIP', min: 1000000, bonus: '+25%', spins: 15, fee: '0%', instant: true, color: 'from-purple-500 to-indigo-700' },
];

const VipPage = () => {
  const progressPercent = Math.min(100, ((currentVip.currentCoins - 50000) / (currentVip.nextLevelCoins - 50000)) * 100);
  const remainingCoins = currentVip.nextLevelCoins - currentVip.currentCoins;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">VIP Membership Club</h1>
          <p className="page-subtitle">Level up your VIP tier by earning coins and unlock lifetime reward multipliers, free spins, and instant payouts</p>
        </div>
      </div>

      {/* Current VIP Status Card */}
      <div className="card p-6 lg:p-8 bg-gradient-to-br from-[var(--deep)] to-slate-900 text-white rounded-3xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Badge & Tier */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-slate-300 to-slate-500 flex items-center justify-center text-white shadow-2xl mb-4 border-2 border-white/20">
              <Diamond size={44} className="text-white" />
            </div>
            <span className="badge bg-white/10 text-slate-200 uppercase font-bold text-xs">Level 2 Active</span>
            <h2 className="text-3xl font-black mt-1 text-white tracking-tight">{currentVip.name}</h2>
            <p className="text-white/70 text-xs mt-1">Tier Multiplier: <strong className="text-emerald-400">{currentVip.bonus} All Earnings</strong></p>
          </div>

          {/* Right: Progress to next rank */}
          <div className="lg:col-span-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">Next Tier: Gold VIP (Level 3)</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {formatNumber(currentVip.currentCoins)} / {formatNumber(currentVip.nextLevelCoins)} Coins
                </p>
              </div>
              <span className="text-xs font-bold text-yellow-300 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                {formatNumber(remainingCoins)} Coins to Next Tier
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-3.5 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-amber-400 to-yellow-400 h-full rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-2.5 bg-white/5 rounded-xl">
                <span className="text-white/60">Faucet Boost</span>
                <p className="font-bold text-white mt-0.5">+10%</p>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl">
                <span className="text-white/60">Daily Free Spins</span>
                <p className="font-bold text-yellow-300 mt-0.5">3 Spins</p>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl">
                <span className="text-white/60">Withdrawal Fee</span>
                <p className="font-bold text-emerald-400 mt-0.5">1.0%</p>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl">
                <span className="text-white/60">Instant Payouts</span>
                <p className="font-bold text-cyan-300 mt-0.5">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full VIP Tiers Comparison Table */}
      <Card title="VIP Club Tiers & Privilege Matrix" subtitle="Every coin you earn moves you closer to Diamond status">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>VIP Rank</th>
                <th>Requirement</th>
                <th>Earning Multiplier</th>
                <th>Daily Free Spins</th>
                <th>Withdrawal Fee</th>
                <th>Instant Payout</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fullVipTiers.map((tier) => {
                const isCurrent = tier.level === currentVip.level;
                const isUnlocked = tier.level <= currentVip.level;

                return (
                  <tr key={tier.level} className={isCurrent ? 'bg-blue-50/70 font-semibold' : ''}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${tier.color} text-white flex items-center justify-center shadow-sm font-bold text-xs`}>
                          {tier.level}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[var(--text-primary)]">{tier.name}</p>
                          <p className="text-[11px] text-[var(--text-secondary)]">Tier {tier.level}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-xs font-semibold">
                      {tier.min === 0 ? 'Free Sign-up' : `${formatNumber(tier.min)} Coins`}
                    </td>
                    <td>
                      <span className="badge badge-primary font-bold">{tier.bonus}</span>
                    </td>
                    <td className="font-mono text-xs font-semibold">{tier.spins} Spins / Day</td>
                    <td className="font-mono text-xs text-emerald-600 font-bold">{tier.fee}</td>
                    <td>
                      {tier.instant ? (
                        <span className="text-emerald-600 font-semibold text-xs flex items-center gap-1">
                          <Check size={14} /> Yes
                        </span>
                      ) : (
                        <span className="text-[var(--text-muted)] text-xs">Standard (24h)</span>
                      )}
                    </td>
                    <td>
                      {isCurrent ? (
                        <span className="badge badge-warning font-bold">Current Tier</span>
                      ) : isUnlocked ? (
                        <span className="badge badge-success">Unlocked</span>
                      ) : (
                        <span className="badge badge-neutral">Locked</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default VipPage;
