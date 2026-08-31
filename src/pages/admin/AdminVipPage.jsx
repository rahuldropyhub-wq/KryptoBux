import React, { useState } from 'react';
import { 
  Diamond, Crown, Save, CheckCircle, Trophy, 
  Coins, Zap, ShieldCheck
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">VIP Levels & Privilege Rules</h1>
          <p className="page-subtitle">Configure VIP qualification thresholds, earning bonuses, daily lucky spins, and fee discounts</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-green-600" />
          <span>VIP Level criteria and privileges updated successfully!</span>
        </div>
      )}

      {/* Tiers Form */}
      <Card title="VIP Club Configuration Matrix" subtitle="Changes apply globally to user earning multipliers">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="overflow-x-auto">
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
                  <tr key={t.level}>
                    <td className="font-bold text-xs font-mono">Level {t.level}</td>
                    <td>
                      <input 
                        type="text" 
                        value={t.name}
                        onChange={(e) => handleUpdateField(idx, 'name', e.target.value)}
                        className="input-field text-xs font-bold py-1"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={t.minCoins}
                        onChange={(e) => handleUpdateField(idx, 'minCoins', Number(e.target.value))}
                        className="input-field text-xs font-mono py-1"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={t.bonus}
                        onChange={(e) => handleUpdateField(idx, 'bonus', e.target.value)}
                        className="input-field text-xs font-mono py-1 max-w-[80px]"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={t.spins}
                        onChange={(e) => handleUpdateField(idx, 'spins', Number(e.target.value))}
                        className="input-field text-xs font-mono py-1 max-w-[80px]"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        step="0.1"
                        value={t.fee}
                        onChange={(e) => handleUpdateField(idx, 'fee', e.target.value)}
                        className="input-field text-xs font-mono py-1 max-w-[80px]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" className="font-bold">
              Save VIP Parameters
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminVipPage;
