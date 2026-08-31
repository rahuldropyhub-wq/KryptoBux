import React, { useState } from 'react';
import { 
  Star, Flame, Gift, Check, ShieldCheck, Sparkles, Trophy, 
  Calendar, CheckCircle, Clock, Zap, RefreshCw, AlertCircle
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import useWalletStore from '@/store/walletStore';
import { formatNumber } from '@/utils/formatters';

const bonusDays = [
  { day: 1, reward: 20, energy: 5, label: 'Day 1' },
  { day: 2, reward: 35, energy: 10, label: 'Day 2' },
  { day: 3, reward: 50, energy: 15, label: 'Day 3' },
  { day: 4, reward: 75, energy: 20, label: 'Day 4' },
  { day: 5, reward: 100, energy: 25, label: 'Day 5' },
  { day: 6, reward: 150, energy: 30, label: 'Day 6' },
  { day: 7, reward: 300, energy: 50, label: 'Day 7 (Mystery)', hasMystery: true },
];

const DailyBonusPage = () => {
  const { addTransaction } = useWalletStore();
  const [currentStreak, setCurrentStreak] = useState(5);
  const [claimedToday, setClaimedToday] = useState(false);
  const [streakFreezeCount, setStreakFreezeCount] = useState(1);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const activeDay = bonusDays.find(d => d.day === currentStreak) || bonusDays[0];

  const handleClaim = () => {
    if (claimedToday) return;
    setClaimedToday(true);
    setClaimSuccess(true);

    addTransaction({
      id: `TX-${Math.floor(Math.random() * 90000 + 10000)}`,
      type: 'daily',
      desc: `Daily Check-In Bonus (Day ${activeDay.day})`,
      amount: activeDay.reward,
      currency: 'Coins',
      time: new Date().toISOString(),
      status: 'completed'
    });

    setTimeout(() => {
      setClaimSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Daily Check-In Bonus</h1>
          <p className="page-subtitle">Log in consecutive days to unlock higher tier bonuses, free spins, and earning multipliers</p>
        </div>
      </div>

      {/* Streak Master Banner */}
      <div className="card p-6 lg:p-8 bg-gradient-to-r from-[var(--deep)] to-indigo-950 text-white rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xl flex-shrink-0 animate-pulse">
              <Flame size={44} />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-bold backdrop-blur-md mb-2">
                <Flame size={14} /> {currentStreak} Days Consecutive Streak
              </span>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight">Active Streak Multiplier: +15%</h2>
              <p className="text-white/70 text-xs mt-1">
                Your faucet, PTC, and shortlink payouts receive a +15% boost today.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {claimedToday ? (
              <div className="px-6 py-3.5 bg-white/10 text-emerald-300 border border-emerald-400/30 rounded-2xl flex items-center gap-2 font-bold text-sm">
                <CheckCircle size={18} /> Checked-In Today
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 font-bold shadow-xl"
                onClick={handleClaim}
                leftIcon={<Gift size={18} />}
              >
                Claim Day {activeDay.day} Bonus (+{activeDay.reward} Coins)
              </Button>
            )}
          </div>
        </div>
      </div>

      {claimSuccess && (
        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center justify-center gap-3 font-bold text-sm animate-bounce shadow-md">
          <Sparkles size={20} className="text-amber-500" />
          <span>Success! +{activeDay.reward} Coins & +{activeDay.energy} Energy credited to your account!</span>
        </div>
      )}

      {/* 7-Day Visual Progress Track */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-[var(--text-primary)]">7-Day Streak Rewards Calendar</h3>
          <span className="text-xs text-[var(--text-secondary)]">Reset timer: <strong>00:00 UTC</strong></span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {bonusDays.map((item) => {
            const isCompleted = item.day < currentStreak;
            const isCurrent = item.day === currentStreak;
            const isLocked = item.day > currentStreak;

            return (
              <div 
                key={item.day}
                className={`card p-4 flex flex-col items-center justify-between text-center transition-all min-h-[160px] relative ${
                  isCurrent 
                    ? 'border-2 border-orange-400 bg-orange-50/50 shadow-md ring-4 ring-orange-100' 
                    : isCompleted 
                    ? 'bg-emerald-50/30 border-emerald-200' 
                    : 'opacity-60 bg-gray-50 border-gray-200'
                }`}
              >
                {/* Day Header */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-secondary)]">{item.label}</span>
                  {isCompleted && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                      <Check size={12} />
                    </span>
                  )}
                  {isCurrent && (
                    <span className="px-1.5 py-0.5 rounded bg-orange-500 text-white text-[10px] font-bold uppercase">
                      Today
                    </span>
                  )}
                </div>

                {/* Center Icon */}
                <div className="my-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    item.hasMystery ? 'bg-purple-100 text-purple-700' :
                    isCurrent ? 'bg-orange-100 text-orange-600' :
                    isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {item.hasMystery ? <Trophy size={24} /> : <Gift size={24} />}
                  </div>
                </div>

                {/* Bottom Reward */}
                <div>
                  <p className="font-bold text-xs text-[var(--text-primary)]">+{item.reward} Coins</p>
                  <p className="text-[10px] text-amber-600 font-semibold">+{item.energy} Energy</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Protection & Multipliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Streak Freeze Shield */}
        <Card title="Streak Freeze Protection" subtitle="Prevent your streak from resetting if you miss a day">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 flex-shrink-0">
              <ShieldCheck size={28} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm text-[var(--text-primary)]">Active Streak Freezes: {streakFreezeCount}</p>
                <span className="badge badge-success">Equipped</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                If you miss a 24-hour check-in window, 1 Streak Freeze will be consumed automatically to protect your active multiplier and 7-day progress.
              </p>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => {
                  setStreakFreezeCount(prev => prev + 1);
                  alert('Purchased 1 Streak Freeze for 100 Coins!');
                }}
              >
                Buy Streak Freeze (100 Coins)
              </Button>
            </div>
          </div>
        </Card>

        {/* Consecutive Streak Rules */}
        <Card title="Streak Milestone Rules" subtitle="Bonus rewards for loyal earners">
          <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
            <li className="flex items-center justify-between p-2 rounded-lg bg-[var(--background)]">
              <span>Day 1 - 3 Streak</span>
              <strong className="text-[var(--text-primary)]">+5% Earning Boost</strong>
            </li>
            <li className="flex items-center justify-between p-2 rounded-lg bg-[var(--background)]">
              <span>Day 4 - 6 Streak</span>
              <strong className="text-[var(--text-primary)]">+10% Earning Boost</strong>
            </li>
            <li className="flex items-center justify-between p-2 rounded-lg bg-orange-50 text-orange-900 font-semibold border border-orange-200">
              <span>Day 7+ Max Streak</span>
              <span>+15% Boost + Mystery Grand Prize</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DailyBonusPage;
