import React, { useState } from 'react';
import { 
  RefreshCw, Trophy, Save, CheckCircle, Gift, Zap, Coins,
  Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';

const initialSegments = [
  { id: 0, label: '50 Coins', value: 50, type: 'coins', weight: 40 },
  { id: 1, label: '100 Coins', value: 100, type: 'coins', weight: 25 },
  { id: 2, label: '250 Coins', value: 250, type: 'coins', weight: 15 },
  { id: 3, label: '50 Energy', value: 50, type: 'energy', weight: 10 },
  { id: 4, label: '500 Coins', value: 500, type: 'coins', weight: 5 },
  { id: 5, label: '+1 Free Spin', value: 1, type: 'spin', weight: 3 },
  { id: 6, label: '1,000 Coins', value: 1000, type: 'coins', weight: 1 },
  { id: 7, label: 'Mystery Box', value: 350, type: 'mystery', weight: 1 },
];

const AdminSpinWheelPage = () => {
  const [segments, setSegments] = useState(initialSegments);
  const [energyExchangeRate, setEnergyExchangeRate] = useState('100');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdate = (id, field, value) => {
    setSegments(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
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
            <h1 className="page-title">Lucky Spin Wheel Management</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              8 Prize Slots
            </span>
          </div>
          <p className="page-subtitle">Configure 8-segment prize values, probability weights, and energy exchange rates</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>Spin wheel prize configuration saved successfully!</span>
        </div>
      )}

      {/* Segments Editor Table */}
      <Card title="Wheel Prize Segments (8 Slots)" subtitle="Weights determine probability of winning">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Slot #</th>
                  <th>Segment Label</th>
                  <th>Type</th>
                  <th>Reward Value</th>
                  <th>Probability Weight (%)</th>
                </tr>
              </thead>
              <tbody>
                {segments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="font-extrabold text-xs font-mono text-slate-900">Slot {s.id + 1}</td>
                    <td>
                      <input 
                        type="text" 
                        value={s.label}
                        onChange={(e) => handleUpdate(s.id, 'label', e.target.value)}
                        className="input-field text-xs font-bold py-1 bg-white"
                      />
                    </td>
                    <td>
                      <select
                        value={s.type}
                        onChange={(e) => handleUpdate(s.id, 'type', e.target.value)}
                        className="input-field text-xs py-1 bg-white"
                      >
                        <option value="coins">Coins</option>
                        <option value="energy">Energy</option>
                        <option value="spin">Free Spin</option>
                        <option value="mystery">Mystery Box</option>
                      </select>
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={s.value}
                        onChange={(e) => handleUpdate(s.id, 'value', Number(e.target.value))}
                        className="input-field text-xs font-mono py-1 max-w-[110px] font-bold text-emerald-700 bg-white"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={s.weight}
                        onChange={(e) => handleUpdate(s.id, 'weight', Number(e.target.value))}
                        className="input-field text-xs font-mono py-1 max-w-[90px] font-bold bg-white"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <label className="input-label mb-0">Energy per Extra Spin:</label>
              <input 
                type="number" 
                value={energyExchangeRate}
                onChange={(e) => setEnergyExchangeRate(e.target.value)}
                className="input-field max-w-[120px] text-xs font-bold font-mono"
              />
            </div>

            <Button type="submit" variant="primary" className="font-bold shadow-md">
              Save Wheel Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminSpinWheelPage;
