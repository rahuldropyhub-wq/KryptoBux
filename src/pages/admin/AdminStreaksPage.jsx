import React, { useState } from 'react';
import { 
  Flame, Award, Save, CheckCircle, Gift, Zap
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Streak Milestones & Boosts</h1>
          <p className="page-subtitle">Configure loyalty streak milestone rewards and consecutive activity boosts</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-green-600" />
          <span>Streak milestone rules saved!</span>
        </div>
      )}

      {/* Milestones Editor */}
      <Card title="Milestone Unlock Requirements" subtitle="Reward prizes when users hit consecutive day targets">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="overflow-x-auto">
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
                  <tr key={m.days}>
                    <td className="font-bold text-xs font-mono">{m.days} Days Streak</td>
                    <td>
                      <input 
                        type="text" 
                        value={m.title}
                        onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                        className="input-field text-xs font-bold py-1"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={m.reward}
                        onChange={(e) => handleUpdate(idx, 'reward', Number(e.target.value))}
                        className="input-field text-xs font-mono py-1 max-w-[120px]"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={m.energy}
                        onChange={(e) => handleUpdate(idx, 'energy', Number(e.target.value))}
                        className="input-field text-xs font-mono py-1 max-w-[100px]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" className="font-bold">
              Save Streak Milestones
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminStreaksPage;
