import React, { useState } from 'react';
import { 
  Link2, PlusCircle, Trash2, Edit, CheckCircle, 
  Key, Power, ExternalLink, Zap, Coins, Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { StatusBadge } from '@/components/common/Badge';

const initialProviders = [
  { id: 'SL-1', name: 'Exe.io Shortener Network', reward: 60, energy: 20, maxViews: 5, cpm: '$4.50', status: 'active', apiKey: 'exe_api_99120482' },
  { id: 'SL-2', name: 'ShrinkEarn Fast Gateway', reward: 45, energy: 15, maxViews: 3, cpm: '$3.80', status: 'active', apiKey: 'shk_api_11094821' },
  { id: 'SL-3', name: 'ClicksFly Multi-Step Network', reward: 50, energy: 20, maxViews: 4, cpm: '$4.10', status: 'active', apiKey: 'cf_api_88410294' },
  { id: 'SL-4', name: 'Ouo.io Global Bridge', reward: 35, energy: 10, maxViews: 5, cpm: '$3.20', status: 'paused', apiKey: 'ouo_api_33910248' },
];

const AdminShortlinksPage = () => {
  const [providers, setProviders] = useState(initialProviders);
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [reward, setReward] = useState('50');
  const [energy, setEnergy] = useState('15');
  const [maxViews, setMaxViews] = useState('3');

  const handleToggle = (id) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'active' ? 'paused' : 'active' };
      }
      return p;
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !apiKey) return;

    const newP = {
      id: `SL-${Date.now().toString().slice(-3)}`,
      name,
      apiKey,
      reward: Number(reward),
      energy: Number(energy),
      maxViews: Number(maxViews),
      cpm: '$3.50',
      status: 'active'
    };

    setProviders(prev => [...prev, newP]);
    setModalOpen(false);
    setName('');
    setApiKey('');
    alert('Shortlink provider integrated!');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Shortlinks Provider Network</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              {providers.length} Connected APIs
            </span>
          </div>
          <p className="page-subtitle">Configure 3rd-party shortlink network API keys, payout rates, and maximum daily user limits</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<PlusCircle size={15} />}
          onClick={() => setModalOpen(true)}
          className="shadow-md"
        >
          Connect New Provider
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminStatCard
          label="Connected Providers"
          value={providers.length}
          sub="3 Active & Passing Health Check"
          icon={Link2}
          accentIndex={0}
        />
        <AdminStatCard
          label="24h Link Completions"
          value="4,820"
          trend="up"
          trendValue="+12% volume"
          icon={Zap}
          accentIndex={1}
        />
        <AdminStatCard
          label="Average Network CPM"
          value="$3.90 CPM"
          sub="Tier-1 & Tier-2 Traffic"
          icon={Sparkles}
          accentIndex={2}
        />
      </div>

      {/* Providers Table */}
      <Card title="Integrated Shortlink Networks" subtitle="Real-time provider API connections">
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="data-table">
            <thead>
              <tr>
                <th>Network Provider</th>
                <th>API Key Secret</th>
                <th>User Coin Reward</th>
                <th>Energy Reward</th>
                <th>Daily Limit / User</th>
                <th>Network CPM</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td>
                    <span className="font-extrabold text-xs text-slate-900 block">{p.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">{p.id}</span>
                  </td>
                  <td>
                    <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {p.apiKey.slice(0, 8)}••••••••
                    </span>
                  </td>
                  <td>
                    <span className="font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      +{p.reward} Coins
                    </span>
                  </td>
                  <td>
                    <span className="font-mono font-bold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      +{p.energy} ⚡
                    </span>
                  </td>
                  <td className="font-mono text-xs text-slate-700 font-semibold">{p.maxViews} Views</td>
                  <td className="font-mono text-xs font-bold text-slate-900">{p.cpm}</td>
                  <td>
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleToggle(p.id)}
                      className={`p-2 rounded-xl transition-all ${
                        p.status === 'active' 
                          ? 'bg-amber-50 hover:bg-amber-100 text-amber-700' 
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                      }`}
                      title={p.status === 'active' ? 'Pause Provider' : 'Enable Provider'}
                    >
                      <Power size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Connect Shortlink Network Provider"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="input-label">Provider Network Name</label>
            <Input 
              placeholder="e.g. ShrinkMe.io Network"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">API Secret Key</label>
            <Input 
              type="password"
              placeholder="Enter provider API token..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              icon={Key}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="input-label">Coin Reward</label>
              <Input 
                type="number"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="input-label">Energy Reward</label>
              <Input 
                type="number"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="input-label">Daily Views</label>
              <Input 
                type="number"
                value={maxViews}
                onChange={(e) => setMaxViews(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full font-bold shadow-md">
            Save & Connect Provider
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminShortlinksPage;
