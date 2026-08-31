import React, { useState } from 'react';
import { 
  Link2, PlusCircle, Power, Edit, Trash2, CheckCircle, 
  ExternalLink, Key, Zap, Coins, TrendingUp
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import { StatusBadge } from '@/components/common/Badge';
import { formatNumber } from '@/utils/formatters';

const initialProviders = [
  { id: 'slp-1', name: 'ShrinkEarn Network', domain: 'shrinkearn.com', reward: 35, energy: 10, cpm: '$4.50 / 1K', dailyLimit: 3, completionsToday: 1840, status: 'active' },
  { id: 'slp-2', name: 'Exe.io Fast Portal', domain: 'exe.io', reward: 40, energy: 15, cpm: '$5.20 / 1K', dailyLimit: 3, completionsToday: 1420, status: 'active' },
  { id: 'slp-3', name: 'Ouo.io Crypto Pass', domain: 'ouo.io', reward: 30, energy: 10, cpm: '$3.80 / 1K', dailyLimit: 3, completionsToday: 2100, status: 'active' },
  { id: 'slp-4', name: 'Shortfly Web Gateway', domain: 'shortfly.com', reward: 45, energy: 20, cpm: '$6.00 / 1K', dailyLimit: 2, completionsToday: 890, status: 'active' },
];

const AdminShortlinksPage = () => {
  const [providers, setProviders] = useState(initialProviders);
  const [addModal, setAddModal] = useState(false);

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [reward, setReward] = useState('35');
  const [energy, setEnergy] = useState('10');
  const [dailyLimit, setDailyLimit] = useState('3');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !domain) return;

    const newP = {
      id: `slp-${Date.now()}`,
      name,
      domain,
      reward: Number(reward),
      energy: Number(energy),
      cpm: '$4.00 / 1K',
      dailyLimit: Number(dailyLimit),
      completionsToday: 0,
      status: 'active'
    };

    setProviders(prev => [...prev, newP]);
    setAddModal(false);
    setName('');
    setDomain('');
    alert('Shortlink provider integrated successfully!');
  };

  const handleToggleStatus = (id) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Shortlink Provider Management</h1>
          <p className="page-subtitle">Configure 3rd-party shortlink API integrations, reward rates, and daily user limits</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<PlusCircle size={15} />}
          onClick={() => setAddModal(true)}
        >
          Add Provider API
        </Button>
      </div>

      {/* Providers Table */}
      <Card title="Integrated Shortlink Networks" subtitle={`Active providers: ${providers.filter(p => p.status === 'active').length}`}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Network</th>
                <th>Domain</th>
                <th>Coin Reward</th>
                <th>Energy Reward</th>
                <th>Daily Limit</th>
                <th>Completions Today</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[var(--primary)] flex items-center justify-center font-bold text-xs">
                        <Link2 size={16} />
                      </div>
                      <span className="font-bold text-sm text-[var(--text-primary)]">{p.name}</span>
                    </div>
                  </td>
                  <td className="font-mono text-xs text-blue-600">{p.domain}</td>
                  <td>
                    <span className="font-bold text-xs text-[var(--primary)] font-mono">+{p.reward} Coins</span>
                  </td>
                  <td>
                    <span className="font-bold text-xs text-amber-600 font-mono">+{p.energy} Energy</span>
                  </td>
                  <td className="font-mono text-xs">{p.dailyLimit} views/user</td>
                  <td className="font-mono text-xs font-semibold">{formatNumber(p.completionsToday)}</td>
                  <td>
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleToggleStatus(p.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        p.status === 'active' 
                          ? 'bg-red-50 hover:bg-red-100 text-red-700' 
                          : 'bg-green-50 hover:bg-green-100 text-green-700'
                      }`}
                      title={p.status === 'active' ? 'Disable Provider' : 'Enable Provider'}
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

      {/* Add Modal */}
      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title="Add Shortlink Provider API"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="input-label">Provider Name</label>
            <Input 
              placeholder="e.g. ClicksFly"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">Domain / URL</label>
            <Input 
              placeholder="clicksfly.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">Provider API Secret Key</label>
            <Input 
              type="password"
              placeholder="sec_api_xxxxxxxxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              icon={Key}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="input-label">Coins Reward</label>
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
              <label className="input-label">Daily Limit</label>
              <Input 
                type="number"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full font-bold">
            Connect Provider
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminShortlinksPage;
