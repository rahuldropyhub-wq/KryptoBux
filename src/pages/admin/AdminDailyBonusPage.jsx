import React, { useState } from 'react';
import { 
  Star, Flame, Save, CheckCircle, Gift, Zap, ShieldCheck
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const AdminDailyBonusPage = () => {
  const [days, setDays] = useState([
    { day: 1, coins: 20, energy: 5 },
    { day: 2, coins: 35, energy: 10 },
    { day: 3, coins: 50, energy: 15 },
    { day: 4, coins: 75, energy: 20 },
    { day: 5, coins: 100, energy: 25 },
    { day: 6, coins: 150, energy: 30 },
    { day: 7, coins: 300, energy: 50 },
  ]);

  const [freezePrice, setFreezePrice] = useState('100');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdateCoins = (index, value) => {
    setDays(prev => prev.map((d, i) => i === index ? { ...d, coins: Number(value) } : d));
  };

  const handleUpdateEnergy = (index, value) => {
    setDays(prev => prev.map((d, i) => i === index ? { ...d, energy: Number(value) } : d));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Daily Check-In & Streak Settings</h1>
          <p className="page-subtitle">Configure 7-day progressive rewards, streak multipliers, and protection items</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-green-600" />
          <span>Daily check-in schedule saved!</span>
        </div>
      )}

      {/* 7-Day Matrix Form */}
      <Card title="7-Day Reward Scale" subtitle="Set coin and energy payout per consecutive day">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {days.map((item, idx) => (
              <div key={item.day} className="p-4 rounded-2xl border bg-[var(--background)] space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)] block">Day {item.day}</span>
                
                <div>
                  <label className="text-[10px] text-[var(--text-secondary)] font-semibold block">Coins</label>
                  <input 
                    type="number" 
                    value={item.coins} 
                    onChange={(e) => handleUpdateCoins(idx, e.target.value)}
                    className="input-field text-xs font-mono font-bold py-1.5"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[var(--text-secondary)] font-semibold block">Energy ⚡</label>
                  <input 
                    type="number" 
                    value={item.energy} 
                    onChange={(e) => handleUpdateEnergy(idx, e.target.value)}
                    className="input-field text-xs font-mono font-bold py-1.5"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-light)]">
            <div className="flex items-center gap-3">
              <label className="input-label mb-0">Streak Freeze Item Price (Coins):</label>
              <input 
                type="number" 
                value={freezePrice}
                onChange={(e) => setFreezePrice(e.target.value)}
                className="input-field max-w-[120px] text-xs font-bold"
              />
            </div>

            <Button type="submit" variant="primary" className="font-bold">
              Save All Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminDailyBonusPage;
