import React, { useState } from 'react';
import { 
  Trophy, Medal, Award, Flame, Crown, Coins, 
  Clock, ArrowUpRight, TrendingUp, Sparkles, User
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { formatNumber } from '@/utils/formatters';

const mockDailyLeaderboard = [
  { rank: 1, name: 'crypto_tycoon', vip: 'Diamond VIP', tasks: 184, coins: 8420, prize: 5000 },
  { rank: 2, name: 'satoshix99', vip: 'Platinum VIP', tasks: 142, coins: 6950, prize: 2500 },
  { rank: 3, name: 'bit_master', vip: 'Gold VIP', tasks: 128, coins: 5800, prize: 1000 },
  { rank: 4, name: 'solana_queen', vip: 'Gold VIP', tasks: 98, coins: 4200, prize: 500 },
  { rank: 5, name: 'ether_ninja', vip: 'Silver VIP', tasks: 85, coins: 3600, prize: 250 },
  { rank: 6, name: 'doge_hustler', vip: 'Silver VIP', tasks: 72, coins: 2950, prize: 100 },
  { rank: 7, name: 'alex_crypto (You)', vip: 'Silver VIP', tasks: 64, coins: 2450, prize: 100, isYou: true },
  { rank: 8, name: 'blockchain_bro', vip: 'Bronze VIP', tasks: 58, coins: 2100, prize: 50 },
  { rank: 9, name: 'faucet_king', vip: 'Bronze VIP', tasks: 49, coins: 1850, prize: 50 },
  { rank: 10, name: 'moon_walker', vip: 'Standard', tasks: 41, coins: 1500, prize: 50 },
];

const LeaderboardPage = () => {
  const [timeframe, setTimeframe] = useState('daily');
  const [data] = useState(mockDailyLeaderboard);

  const top1 = data[0];
  const top2 = data[1];
  const top3 = data[2];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Top Earners Leaderboard</h1>
          <p className="page-subtitle">Compete against the community and win daily and weekly prize pool coin rewards</p>
        </div>
      </div>

      {/* Timeframe selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['daily', 'weekly', 'monthly', 'all-time'].map((t) => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className={`px-5 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              timeframe === t
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'bg-white text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--background)]'
            }`}
          >
            {t} Leaderboard
          </button>
        ))}
      </div>

      {/* Podium Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-4">
        {/* 2nd Place */}
        <div className="card p-6 border-t-4 border-t-slate-400 bg-gradient-to-b from-slate-50/50 to-white text-center flex flex-col items-center order-2 md:order-1">
          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-lg mb-2 shadow-inner">
            🥈 2
          </div>
          <h3 className="font-bold text-base text-[var(--text-primary)]">@{top2.name}</h3>
          <span className="badge badge-primary text-[10px] mt-1">{top2.vip}</span>
          
          <div className="w-full my-4 border-t border-[var(--border-light)]" />
          
          <p className="text-xs text-[var(--text-secondary)]">Coins Earned Today</p>
          <p className="text-xl font-black text-[var(--deep)] font-mono mt-0.5">{formatNumber(top2.coins)}</p>
          
          <div className="mt-3 py-1.5 px-3 bg-amber-50 text-amber-800 rounded-xl text-xs font-bold border border-amber-200 w-full">
            Prize: +{formatNumber(top2.prize)} Coins
          </div>
        </div>

        {/* 1st Place (Winner) */}
        <div className="card p-7 border-t-4 border-t-yellow-400 bg-gradient-to-b from-amber-50/60 to-white text-center flex flex-col items-center order-1 md:order-2 shadow-lg relative md:-translate-y-3">
          <div className="absolute -top-4 px-3 py-1 bg-yellow-400 text-[var(--deep)] rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Crown size={12} /> Rank #1 Champion
          </div>

          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-300 to-amber-500 text-white flex items-center justify-center font-black text-2xl mb-2 shadow-md">
            🥇
          </div>
          <h3 className="font-black text-lg text-[var(--text-primary)]">@{top1.name}</h3>
          <span className="badge badge-warning text-xs mt-1 font-bold">{top1.vip}</span>

          <div className="w-full my-4 border-t border-[var(--border-light)]" />

          <p className="text-xs text-[var(--text-secondary)]">Coins Earned Today</p>
          <p className="text-2xl font-black text-yellow-600 font-mono mt-0.5">{formatNumber(top1.coins)}</p>

          <div className="mt-3 py-2 px-4 bg-gradient-to-r from-amber-400 to-yellow-400 text-[var(--deep)] rounded-xl text-xs font-black shadow-md w-full">
            Grand Prize: +{formatNumber(top1.prize)} Coins
          </div>
        </div>

        {/* 3rd Place */}
        <div className="card p-6 border-t-4 border-t-amber-700 bg-gradient-to-b from-amber-50/30 to-white text-center flex flex-col items-center order-3">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg mb-2 shadow-inner">
            🥉 3
          </div>
          <h3 className="font-bold text-base text-[var(--text-primary)]">@{top3.name}</h3>
          <span className="badge badge-primary text-[10px] mt-1">{top3.vip}</span>

          <div className="w-full my-4 border-t border-[var(--border-light)]" />

          <p className="text-xs text-[var(--text-secondary)]">Coins Earned Today</p>
          <p className="text-xl font-black text-[var(--deep)] font-mono mt-0.5">{formatNumber(top3.coins)}</p>

          <div className="mt-3 py-1.5 px-3 bg-amber-50 text-amber-800 rounded-xl text-xs font-bold border border-amber-200 w-full">
            Prize: +{formatNumber(top3.prize)} Coins
          </div>
        </div>
      </div>

      {/* Your Rank Banner */}
      <div className="card p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm">
            #7
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--text-primary)]">Your Current Standing: Rank #7</h4>
            <p className="text-xs text-[var(--text-secondary)]">You have completed 64 tasks today ({formatNumber(2450)} Coins earned)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl">
            Eligible Prize: +100 Coins
          </span>
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <Card title="Top 10 Standings" subtitle="Reset every 24 hours at 00:00 UTC">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>VIP Level</th>
                <th>Tasks Completed</th>
                <th>Coins Earned</th>
                <th className="text-right">Prize Pool Share</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.rank} className={item.isYou ? 'bg-blue-50 font-bold border-l-4 border-l-[var(--primary)]' : ''}>
                  <td>
                    <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-mono font-bold text-xs ${
                      item.rank === 1 ? 'bg-yellow-400 text-white' :
                      item.rank === 2 ? 'bg-slate-400 text-white' :
                      item.rank === 3 ? 'bg-amber-700 text-white' : 'text-[var(--text-secondary)]'
                    }`}>
                      {item.rank}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[var(--background)] flex items-center justify-center font-bold text-xs text-[var(--primary)]">
                        {item.name[0].toUpperCase()}
                      </div>
                      <span className="text-sm text-[var(--text-primary)]">@{item.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral text-[11px]">{item.vip}</span>
                  </td>
                  <td className="font-mono text-xs">{item.tasks} tasks</td>
                  <td>
                    <span className="font-bold text-[var(--primary)] font-mono text-sm">
                      {formatNumber(item.coins)} Coins
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="font-bold text-emerald-600 font-mono text-xs bg-emerald-50 px-2.5 py-1 rounded-lg">
                      +{formatNumber(item.prize)} Coins
                    </span>
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

export default LeaderboardPage;
