import React, { useState } from 'react';
import { 
  Star, Flame, Save, CheckCircle, Gift, Zap, ShieldCheck,
  Calendar, Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';

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
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Daily Check-In & Streak Settings</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200">
              7-Day Calendar
            </span>
          </div>
          <p className="page-subtitle">Configure 7-day progressive rewards, streak multipliers, and protection items</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>Daily check-in schedule and streak settings saved!</span>
        </div>
      )}

      {/* 7-Day Matrix Form */}
      <Card title="7-Day Progressive Reward Scale" subtitle="Set coin and energy payout per consecutive day">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {days.map((item, idx) => (
              <div key={item.day} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-black text-slate-900">Day {item.day}</span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    {item.day === 7 ? '🎁 Jackpot' : `Step ${item.day}`}
                  </span>
                </div>
                
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Coins</label>
                  <input 
                    type="number" 
                    value={item.coins} 
                    onChange={(e) => handleUpdateCoins(idx, e.target.value)}
                    className="input-field text-xs font-mono font-bold py-1.5 text-emerald-700 bg-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Energy ⚡</label>
                  <input 
                    type="number" 
                    value={item.energy} 
                    onChange={(e) => handleUpdateEnergy(idx, e.target.value)}
                    className="input-field text-xs font-mono font-bold py-1.5 text-amber-700 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <label className="input-label mb-0">Streak Freeze Item Price (Coins):</label>
              <input 
                type="number" 
                value={freezePrice}
                onChange={(e) => setFreezePrice(e.target.value)}
                className="input-field max-w-[120px] text-xs font-bold font-mono"
              />
            </div>

            <Button type="submit" variant="primary" className="font-bold shadow-md">
              Save Daily Bonus Configuration
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminDailyBonusPage;
