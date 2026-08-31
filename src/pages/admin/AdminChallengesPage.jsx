import React, { useState } from 'react';
import { 
  Trophy, PlusCircle, Trash2, CheckCircle, Clock, 
  Coins, Zap, Edit, Monitor, Droplets, Link2, Users, Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { StatusBadge } from '@/components/common/Badge';

const initialChallenges = [
  { id: 'CH-1', title: 'Watch 5 PTC Ads', type: 'Daily', taskCategory: 'PTC', target: 5, reward: 35, energy: 10, completions: 1840, status: 'active' },
  { id: 'CH-2', title: 'Claim 3 Hourly Faucets', type: 'Daily', taskCategory: 'Faucet', target: 3, reward: 50, energy: 15, completions: 2950, status: 'active' },
  { id: 'CH-3', title: 'Complete 2 Shortlinks', type: 'Daily', taskCategory: 'Shortlinks', target: 2, reward: 40, energy: 20, completions: 1120, status: 'active' },
  { id: 'CH-4', title: 'Complete 50 Total Tasks', type: 'Weekly', taskCategory: 'All', target: 50, reward: 350, energy: 100, completions: 420, status: 'active' },
  { id: 'CH-5', title: 'Refer 2 Active Friends', type: 'Weekly', taskCategory: 'Referrals', target: 2, reward: 500, energy: 150, completions: 180, status: 'active' },
];

const AdminChallengesPage = () => {
  const [challenges, setChallenges] = useState(initialChallenges);
  const [createModal, setCreateModal] = useState(false);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Daily');
  const [taskCategory, setTaskCategory] = useState('PTC');
  const [target, setTarget] = useState('5');
  const [reward, setReward] = useState('35');
  const [energy, setEnergy] = useState('10');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title) return;

    const newC = {
      id: `CH-${Date.now().toString().slice(-3)}`,
      title,
      type,
      taskCategory,
      target: Number(target),
      reward: Number(reward),
      energy: Number(energy),
      completions: 0,
      status: 'active'
    };

    setChallenges(prev => [...prev, newC]);
    setCreateModal(false);
    setTitle('');
    alert('Quest / Challenge created!');
  };

  const handleDelete = (id) => {
    if (confirm('Delete this challenge?')) {
      setChallenges(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Quests & Challenges Manager</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
              {challenges.length} Quests
            </span>
          </div>
          <p className="page-subtitle">Create and manage daily and weekly quests for community engagement and bonus payouts</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<PlusCircle size={15} />}
          onClick={() => setCreateModal(true)}
          className="shadow-md"
        >
          Create New Challenge
        </Button>
      </div>

      {/* Challenges Table */}
      <Card title="Active Quest List" subtitle={`Total ${challenges.length} challenges configured`}>
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="data-table">
            <thead>
              <tr>
                <th>Quest Title</th>
                <th>Frequency</th>
                <th>Task Category</th>
                <th>Target Count</th>
                <th>Coin Reward</th>
                <th>Energy Reward</th>
                <th>Completions</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td>
                    <span className="font-extrabold text-xs text-slate-900 block">{c.title}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">{c.id}</span>
                  </td>
                  <td>
                    <span className="badge badge-primary text-[11px] font-bold">{c.type}</span>
                  </td>
                  <td className="text-xs font-bold text-slate-600">{c.taskCategory}</td>
                  <td className="font-mono text-xs font-bold text-slate-900">{c.target} actions</td>
                  <td>
                    <span className="font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-mono">
                      +{c.reward} Coins
                    </span>
                  </td>
                  <td>
                    <span className="font-bold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-mono">
                      +{c.energy} Energy
                    </span>
                  </td>
                  <td className="font-mono text-xs font-bold text-slate-700">{c.completions.toLocaleString()} claims</td>
                  <td>
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 transition-all font-semibold"
                      title="Delete Challenge"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title="Create New Challenge"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="input-label">Quest Title</label>
            <Input 
              placeholder="e.g. Complete 10 Shortlinks"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="input-label">Frequency</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="Daily">Daily Quest</option>
                <option value="Weekly">Weekly Challenge</option>
              </select>
            </div>
            <div>
              <label className="input-label">Category</label>
              <select
                value={taskCategory}
                onChange={(e) => setTaskCategory(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="PTC">PTC Ads</option>
                <option value="Faucet">Hourly Faucet</option>
                <option value="Shortlinks">Shortlinks</option>
                <option value="Referrals">Referrals</option>
                <option value="All">All Tasks</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="input-label">Target Count</label>
              <Input 
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="input-label">Reward Coins</label>
              <Input 
                type="number"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="input-label">Energy</label>
              <Input 
                type="number"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full font-bold shadow-md">
            Publish Challenge
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminChallengesPage;
