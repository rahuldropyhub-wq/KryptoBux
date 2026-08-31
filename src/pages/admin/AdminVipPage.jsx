import React, { useState } from 'react';
import { 
  Diamond, Crown, Save, CheckCircle, Trophy, 
  Coins, Zap, ShieldCheck, Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { formatNumber } from '@/utils/formatters';

const initialTiers = [
  { level: 0, name: 'Standard', minCoins: 0, bonus: '0', spins: 1, fee: '2.0' },
  { level: 1, name: 'Bronze VIP', minCoins: 10000, bonus: '5', spins: 2, fee: '1.5' },
  { level: 2, name: 'Silver VIP', minCoins: 50000, bonus: '10', spins: 3, fee: '1.0' },
  { level: 3, name: 'Gold VIP', minCoins: 150000, bonus: '15', spins: 5, fee: '0.5' },
  { level: 4, name: 'Platinum VIP', minCoins: 500000, bonus: '20', spins: 8, fee: '0.0' },
  { level: 5, name: 'Diamond VIP', minCoins: 1000000, bonus: '25', spins: 15, fee: '0.0' },
];

const AdminVipPage = () => {
  const [tiers, setTiers] = useState(initialTiers);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdateField = (index, field, value) => {
    setTiers(prev => prev.map((t, i) => i === index ? { ...t, [field]: value } : t));
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
            <h1 className="page-title">VIP Levels & Privilege Rules</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-50 text-purple-700 border border-purple-200">
              6 VIP Tiers
            </span>
          </div>
          <p className="page-subtitle">Configure VIP qualification thresholds, earning bonuses, daily lucky spins, and fee discounts</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>VIP Level criteria and privileges updated successfully!</span>
        </div>
      )}

      {/* Tiers Form */}
      <Card title="VIP Club Configuration Matrix" subtitle="Changes apply globally to user earning multipliers">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tier Level</th>
                  <th>Tier Name</th>
                  <th>Min Coins Earned</th>
                  <th>Bonus Boost (%)</th>
                  <th>Daily Free Spins</th>
                  <th>Withdrawal Fee (%)</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t, idx) => (
                  <tr key={t.level} className="hover:bg-slate-50/80 transition-colors">
                    <td className="font-extrabold text-xs font-mono text-slate-900">Level {t.level}</td>
                    <td>
                      <input 
                        type="text" 
                        value={t.name}
                        onChange={(e) => handleUpdateField(idx, 'name', e.target.value)}
                        className="input-field text-xs font-bold py-1 bg-white"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={t.minCoins}
                        onChange={(e) => handleUpdateField(idx, 'minCoins', Number(e.target.value))}
                        className="input-field text-xs font-mono py-1 bg-white font-semibold"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={t.bonus}
                        onChange={(e) => handleUpdateField(idx, 'bonus', e.target.value)}
                        className="input-field text-xs font-mono py-1 max-w-[90px] text-emerald-700 font-bold bg-white"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={t.spins}
                        onChange={(e) => handleUpdateField(idx, 'spins', Number(e.target.value))}
                        className="input-field text-xs font-mono py-1 max-w-[90px] text-purple-700 font-bold bg-white"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        step="0.1"
                        value={t.fee}
                        onChange={(e) => handleUpdateField(idx, 'fee', e.target.value)}
                        className="input-field text-xs font-mono py-1 max-w-[90px] font-bold bg-white"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" className="font-bold shadow-md">
              Save VIP Parameters
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminVipPage;
