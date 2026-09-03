import React, { useState } from 'react';
import { 
  Trophy, CheckCircle, Clock, Gift, Zap, Sparkles, 
  Flame, Monitor, Droplets, Link2, Users, RefreshCw, Check
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import useWalletStore from '@/store/walletStore';
import { formatNumber } from '@/utils/formatters';

const initialDailyQuests = [
  { id: 'dq-1', title: 'Watch 5 PTC Ads', desc: 'Browse sponsored advertiser ads', progress: 4, target: 5, reward: 35, energy: 10, icon: Monitor, claimed: false },
  { id: 'dq-2', title: 'Claim 3 Hourly Faucets', desc: 'Roll the faucet 3 times today', progress: 3, target: 3, reward: 50, energy: 15, icon: Droplets, claimed: false },
  { id: 'dq-3', title: 'Complete 2 Shortlinks', desc: 'Visit and pass 2 sponsor shortlinks', progress: 1, target: 2, reward: 40, energy: 20, icon: Link2, claimed: false },
  { id: 'dq-4', title: 'Spin the Lucky Wheel', desc: 'Take at least 1 spin on the wheel', progress: 1, target: 1, reward: 25, energy: 5, icon: RefreshCw, claimed: true },
  { id: 'dq-5', title: 'Earn 300 Total Coins', desc: 'Accumulate earnings across all methods', progress: 300, target: 300, reward: 100, energy: 30, icon: Sparkles, claimed: false },
];

const initialWeeklyQuests = [
  { id: 'wq-1', title: 'Complete 50 Total Tasks', desc: 'Any combination of PTC, faucet, and shortlinks', progress: 34, target: 50, reward: 350, energy: 100, icon: Trophy, claimed: false },
  { id: 'wq-2', title: 'Claim 20 Faucet Rolls', desc: 'Keep your hourly faucet streak going', progress: 18, target: 20, reward: 250, energy: 60, icon: Droplets, claimed: false },
  { id: 'wq-3', title: 'Refer 2 Active Friends', desc: 'Invite friends who complete at least 5 tasks', progress: 2, target: 2, reward: 500, energy: 150, icon: Users, claimed: false },
  { id: 'wq-4', title: 'Earn 2,500 Coins in a Week', desc: 'Total gross weekly revenue', progress: 1820, target: 2500, reward: 750, energy: 250, icon: Sparkles, claimed: false },
];

const ChallengesPage = () => {
  const { addTransaction } = useWalletStore();
  const [activeTab, setActiveTab] = useState('daily');
  const [dailyQuests, setDailyQuests] = useState(initialDailyQuests);
  const [weeklyQuests, setWeeklyQuests] = useState(initialWeeklyQuests);

  const activeList = activeTab === 'daily' ? dailyQuests : weeklyQuests;

  const handleClaim = (quest) => {
    if (quest.claimed || quest.progress < quest.target) return;

    if (activeTab === 'daily') {
      setDailyQuests(prev => prev.map(q => q.id === quest.id ? { ...q, claimed: true } : q));
    } else {
      setWeeklyQuests(prev => prev.map(q => q.id === quest.id ? { ...q, claimed: true } : q));
    }

    addTransaction({
      id: `TX-${Math.floor(Math.random() * 90000 + 10000)}`,
      type: 'bonus',
      desc: `Challenge Reward: ${quest.title}`,
      amount: quest.reward,
      currency: 'Coins',
      time: new Date().toISOString(),
      status: 'completed'
    });

    alert(`Claimed +${quest.reward} Coins and +${quest.energy} Energy!`);
  };

  const completedCount = activeList.filter(q => q.claimed || q.progress >= q.target).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Quests & Challenges</h1>
          <p className="page-subtitle">Complete daily and weekly activity goals to earn massive bonus payouts and energy packs</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'daily'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-white text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--background)]'
          }`}
        >
          <Clock size={15} />
          <span>Daily Quests (Resets in 7h 12m)</span>
        </button>

        <button
          onClick={() => setActiveTab('weekly')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'weekly'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-white text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--background)]'
          }`}
        >
          <Trophy size={15} />
          <span>Weekly Challenges (Resets in 3d 14h)</span>
        </button>
      </div>

      {/* Overall Progress Banner */}
      <div className="p-6 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
            {activeTab === 'daily' ? 'Daily Master Quest' : 'Weekly Season Challenge'}
          </span>
          <h2 className="text-xl lg:text-2xl font-black">
            Completed {completedCount} of {activeList.length} Tasks
          </h2>
          <p className="text-xs text-white/70 mt-1">
            Finish all tasks before the timer expires to unlock an extra Mystery Chest!
          </p>
        </div>

        <div className="w-full md:w-64 bg-white/10 h-3.5 rounded-full overflow-hidden p-0.5">
          <div 
            className="bg-yellow-400 h-full rounded-full transition-all duration-700"
            style={{ width: `${(completedCount / activeList.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Quests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeList.map((quest) => {
          const isReadyToClaim = quest.progress >= quest.target && !quest.claimed;
          const percent = Math.min(100, (quest.progress / quest.target) * 100);

          return (
            <div 
              key={quest.id} 
              className={`card p-5 flex flex-col justify-between transition-all border ${
                quest.claimed 
                  ? 'opacity-65 bg-gray-50/70' 
                  : isReadyToClaim 
                  ? 'border-2 border-emerald-500 bg-emerald-50/30 shadow-md ring-4 ring-emerald-100/50' 
                  : 'hover:border-[var(--primary)]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      isReadyToClaim ? 'bg-emerald-500 text-white' : 'bg-blue-50 text-[var(--primary)]'
                    }`}>
                      <quest.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">{quest.title}</h4>
                      <p className="text-xs text-[var(--text-secondary)]">{quest.desc}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-xs text-[var(--primary)] block">+{quest.reward} Coins</span>
                    <span className="text-[10px] text-amber-600 font-semibold">+{quest.energy} ⚡</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-[var(--text-secondary)]">
                    <span>Progress</span>
                    <span>{quest.progress} / {quest.target}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        isReadyToClaim ? 'bg-emerald-500' : 'bg-[var(--primary)]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-[var(--border-light)] flex justify-end">
                {quest.claimed ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                    <Check size={14} /> Completed & Claimed
                  </span>
                ) : isReadyToClaim ? (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="bg-emerald-600 hover:bg-emerald-700 font-bold shadow-md"
                    onClick={() => handleClaim(quest)}
                  >
                    Claim Reward (+{quest.reward} Coins)
                  </Button>
                ) : (
                  <span className="text-xs text-[var(--text-muted)] font-medium">In Progress ({percent.toFixed(0)}%)</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengesPage;
