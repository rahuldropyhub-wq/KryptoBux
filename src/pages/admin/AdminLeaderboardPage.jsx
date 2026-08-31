import React, { useState } from 'react';
import { 
  Trophy, Award, Save, CheckCircle, Flame, 
  Coins, Sparkles, AlertTriangle, RefreshCw
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { formatNumber } from '@/utils/formatters';

const initialPrizes = {
  daily: [
    { rank: 1, prize: 5000 },
    { rank: 2, prize: 2500 },
    { rank: 3, prize: 1000 },
    { rank: 4, prize: 500 },
    { rank: 5, prize: 250 },
    { rank: '6 - 10', prize: 100 },
  ],
  weekly: [
    { rank: 1, prize: 25000 },
    { rank: 2, prize: 12500 },
    { rank: 3, prize: 5000 },
    { rank: 4, prize: 2500 },
    { rank: 5, prize: 1000 },
    { rank: '6 - 10', prize: 500 },
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Leaderboard & Prize Pools</h1>
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
        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-green-600" />
          <span>Leaderboard prize scale updated!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'daily'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-white text-[var(--text-secondary)] border border-[var(--border)]'
          }`}
        >
          Daily Prize Pool
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'weekly'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-white text-[var(--text-secondary)] border border-[var(--border)]'
          }`}
        >
          Weekly Prize Pool
        </button>
      </div>

      {/* Prize Pool Table Form */}
      <Card title={`${activeTab === 'daily' ? 'Daily' : 'Weekly'} Rank Distribution Table`} subtitle="Rewards credited automatically upon timer reset">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="overflow-x-auto">
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
                  <tr key={idx}>
                    <td className="font-bold text-xs">
                      Rank {p.rank}
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={p.prize}
                        onChange={(e) => handleUpdatePrize(activeTab, idx, e.target.value)}
                        className="input-field text-xs font-mono font-bold py-1.5 max-w-[160px]"
                      />
                    </td>
                    <td className="font-mono text-xs text-[var(--text-secondary)]">
                      ≈ ${(p.prize * 0.01).toFixed(2)} USD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" className="font-bold">
              Save Prize Scale
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminLeaderboardPage;
