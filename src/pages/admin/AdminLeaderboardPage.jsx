import React, { useState } from 'react';
import { 
  Trophy, Award, Save, CheckCircle, Flame, 
  Coins, Sparkles, AlertTriangle, RefreshCw
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { formatNumber } from '@/utils/formatters';

const initialPrizes = {
  daily: [
    { rank: '1st Place 🥇', prize: 5000 },
    { rank: '2nd Place 🥈', prize: 2500 },
    { rank: '3rd Place 🥉', prize: 1000 },
    { rank: 'Rank 4', prize: 500 },
    { rank: 'Rank 5', prize: 250 },
    { rank: 'Rank 6 - 10', prize: 100 },
  ],
  weekly: [
    { rank: '1st Place 🥇', prize: 25000 },
    { rank: '2nd Place 🥈', prize: 12500 },
    { rank: '3rd Place 🥉', prize: 5000 },
    { rank: 'Rank 4', prize: 2500 },
    { rank: 'Rank 5', prize: 1000 },
    { rank: 'Rank 6 - 10', prize: 500 },
  ]
};

const AdminLeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [prizes, setPrizes] = useState(initialPrizes);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdatePrize = (type, index, value) => {
    setPrizes(prev => ({
      ...prev,
      [type]: prev[type].map((p, i) => i === index ? { ...p, prize: Number(value) } : p)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleManualPayout = () => {
    if (confirm('Trigger manual leaderboard prize payout to top 10 users right now?')) {
      alert('Leaderboard prizes distributed to winners wallets!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Leaderboard & Prize Pools</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200">
              Community Podiums
            </span>
          </div>
          <p className="page-subtitle">Configure daily and weekly leaderboard prize pools, rank payout scales, and manual distribution triggers</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          leftIcon={<RefreshCw size={14} />}
          onClick={handleManualPayout}
        >
          Trigger Manual Winner Payout
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>Leaderboard prize scale updated successfully!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeTab === 'daily'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Daily Prize Pool (Top 10)
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeTab === 'weekly'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Weekly Championship Pool
        </button>
      </div>

      {/* Prize Pool Table Form */}
      <Card title={`${activeTab === 'daily' ? 'Daily' : 'Weekly'} Rank Distribution Scale`} subtitle="Rewards credited automatically upon timer reset">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Podium / Standing</th>
                  <th>Coin Prize Reward</th>
                  <th>USD Equivalent Valuation</th>
                </tr>
              </thead>
              <tbody>
                {prizes[activeTab].map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="font-extrabold text-xs text-slate-900">
                      {p.rank}
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={p.prize}
                        onChange={(e) => handleUpdatePrize(activeTab, idx, e.target.value)}
                        className="input-field text-xs font-mono font-bold py-1.5 max-w-[170px] text-emerald-700 bg-white"
                      />
                    </td>
                    <td className="font-mono text-xs text-slate-500 font-semibold">
                      ≈ ${(p.prize * 0.01).toFixed(2)} USD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" className="font-bold shadow-md">
              Save Prize Scale
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminLeaderboardPage;
