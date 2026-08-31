import React, { useState } from 'react';
import { 
  Flame, Award, Save, CheckCircle, Gift, Zap, Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const initialMilestones = [
  { days: 3, reward: 50, energy: 15, title: 'Starter Ignition' },
  { days: 7, reward: 150, energy: 30, title: 'Weekly Champion' },
  { days: 14, reward: 400, energy: 75, title: 'Fortnight Titan' },
  { days: 30, reward: 1000, energy: 200, title: 'Monthly Legend' },
  { days: 100, reward: 5000, energy: 1000, title: 'Centurion Master' },
];

const AdminStreaksPage = () => {
  const [milestones, setMilestones] = useState(initialMilestones);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdate = (index, field, value) => {
    setMilestones(prev => prev.map((m, i) => i === index ? { ...m, [field]: value } : m));
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
            <h1 className="page-title">Streak Milestones & Boosts</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200">
              5 Milestone Tiers
            </span>
          </div>
          <p className="page-subtitle">Configure loyalty streak milestone rewards and consecutive activity boosts</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>Streak milestone rules saved successfully!</span>
        </div>
      )}

      {/* Milestones Editor */}
      <Card title="Milestone Unlock Requirements" subtitle="Reward prizes when users hit consecutive day targets">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Milestone Days</th>
                  <th>Achievement Title</th>
                  <th>Coin Reward</th>
                  <th>Energy Reward</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m, idx) => (
                  <tr key={m.days} className="hover:bg-slate-50/80 transition-colors">
                    <td className="font-mono text-xs font-extrabold text-slate-900">{m.days} Days Streak</td>
                    <td>
                      <input 
                        type="text" 
                        value={m.title}
                        onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                        className="input-field text-xs font-bold py-1 bg-white"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={m.reward}
                        onChange={(e) => handleUpdate(idx, 'reward', Number(e.target.value))}
                        className="input-field text-xs font-mono py-1 max-w-[130px] font-bold text-emerald-700 bg-white"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={m.energy}
                        onChange={(e) => handleUpdate(idx, 'energy', Number(e.target.value))}
                        className="input-field text-xs font-mono py-1 max-w-[110px] font-bold text-amber-700 bg-white"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" className="font-bold shadow-md">
              Save Streak Milestones
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminStreaksPage;
