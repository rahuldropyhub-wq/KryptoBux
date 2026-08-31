import React, { useState } from 'react';
import { 
  Flame, Award, Trophy, Check, Gift, ShieldCheck, 
  Calendar, Zap, Sparkles, CheckCircle2, Clock
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { formatNumber } from '@/utils/formatters';

const milestones = [
  { days: 3, reward: 50, energy: 15, title: 'Starter Ignition', unlocked: true, claimed: true },
  { days: 7, reward: 150, energy: 30, title: 'Weekly Champion', unlocked: false, claimed: false },
  { days: 14, reward: 400, energy: 75, title: 'Fortnight Titan', unlocked: false, claimed: false },
  { days: 30, reward: 1000, energy: 200, title: 'Monthly Legend', unlocked: false, claimed: false },
  { days: 100, reward: 5000, energy: 1000, title: 'Centurion Master', unlocked: false, claimed: false },
];

const StreaksPage = () => {
  const currentStreak = 5;
  const longestStreak = 18;
  const [streakMilestones, setStreakMilestones] = useState(milestones);

  const daysInMonth = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    active: i + 1 <= 5 || (i + 1 >= 10 && i + 1 <= 14) || i + 1 === 8,
    isToday: i + 1 === 5
  }));

  const handleClaimMilestone = (days) => {
    setStreakMilestones(prev => prev.map(m => m.days === days ? { ...m, claimed: true } : m));
    alert(`Claimed Milestone reward for ${days} days streak!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Streak Rewards & Milestones</h1>
          <p className="page-subtitle">Build daily habits to unlock major bonus chests, badges, and permanent platform multipliers</p>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-6 stat-card stat-card-accent-blue bg-gradient-to-br from-white to-orange-50/40">
          <div className="flex items-center justify-between mb-2">
            <p className="stat-card-label">Current Streak</p>
            <Flame className="text-orange-500" size={20} />
          </div>
          <p className="stat-card-value text-orange-600">{currentStreak} Days</p>
          <p className="stat-card-sub">+15% Earning Boost Active</p>
        </div>

        <div className="card p-6 stat-card stat-card-accent-deep">
          <div className="flex items-center justify-between mb-2">
            <p className="stat-card-label">All-Time Longest</p>
            <Trophy className="text-amber-500" size={20} />
          </div>
          <p className="stat-card-value">{longestStreak} Days</p>
          <p className="stat-card-sub">Personal best record</p>
        </div>

        <div className="card p-6 stat-card stat-card-accent-lavender">
          <div className="flex items-center justify-between mb-2">
            <p className="stat-card-label">Streak Coins Won</p>
            <Sparkles className="text-[var(--primary)]" size={20} />
          </div>
          <p className="stat-card-value text-emerald-600">+{formatNumber(2450)}</p>
          <p className="stat-card-sub">Total streak rewards</p>
        </div>
      </div>

      {/* Milestone Unlock Ladder */}
      <Card title="Streak Milestone Achievements" subtitle="Reach these consecutive active days to claim big rewards">
        <div className="space-y-4">
          {streakMilestones.map((m) => {
            const isReached = currentStreak >= m.days;
            const progress = Math.min(100, (currentStreak / m.days) * 100);

            return (
              <div 
                key={m.days}
                className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isReached ? 'bg-orange-50/40 border-orange-200' : 'bg-[var(--background)] border-[var(--border-light)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm ${
                    isReached ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {m.days}d
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                      {m.title}
                      {isReached && <CheckCircle2 size={16} className="text-green-600" />}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      Maintain a {m.days}-day uninterrupted streak.
                    </p>
                    {/* Progress */}
                    <div className="w-48 bg-gray-200 h-1.5 rounded-full overflow-hidden mt-2">
                      <div 
                        className="bg-orange-500 h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <p className="font-bold text-sm text-[var(--primary)]">+{formatNumber(m.reward)} Coins</p>
                    <p className="text-[11px] text-amber-600 font-semibold">+{m.energy} Energy</p>
                  </div>

                  {m.claimed ? (
                    <span className="badge badge-success font-semibold px-3 py-1.5">Claimed</span>
                  ) : isReached ? (
                    <Button variant="primary" size="sm" onClick={() => handleClaimMilestone(m.days)}>
                      Claim Reward
                    </Button>
                  ) : (
                    <span className="badge badge-neutral">Locked ({m.days - currentStreak} days left)</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Activity Heatmap Grid */}
      <Card title="30-Day Activity History" subtitle="Keep every box filled to never drop your streak">
        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2.5 pt-2">
          {daysInMonth.map((item) => (
            <div 
              key={item.day}
              className={`p-2.5 rounded-xl text-center border transition-all ${
                item.isToday ? 'border-2 border-orange-500 bg-orange-100/60 font-bold text-orange-900 shadow-sm' :
                item.active ? 'bg-emerald-500 text-white border-emerald-600 font-semibold' :
                'bg-gray-100 text-gray-400 border-gray-200'
              }`}
            >
              <span className="text-[10px] block opacity-80">Day</span>
              <span className="text-sm font-mono">{item.day}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StreaksPage;
