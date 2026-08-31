import React, { useState } from 'react';
import { 
  Monitor, PlusCircle, Play, Pause, Trash2, Edit, 
  Eye, CheckCircle, Clock, Coins, ExternalLink
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import { StatusBadge } from '@/components/common/Badge';
import { formatNumber } from '@/utils/formatters';

const initialPtcCampaigns = [
  { id: 'PTC-101', title: 'Binance Trade Promo', url: 'https://binance.com', advertiser: 'binance_affiliate', reward: 45, duration: 15, viewsDelivered: 1420, totalViews: 2000, type: 'windows', status: 'active' },
  { id: 'PTC-102', title: 'Stake VIP Casino', url: 'https://stake.com', advertiser: 'stake_team', reward: 60, duration: 30, viewsDelivered: 890, totalViews: 1500, type: 'iframe', status: 'active' },
  { id: 'PTC-103', title: 'Coinbase Learn Bonus', url: 'https://coinbase.com', advertiser: 'coinbase_growth', reward: 35, duration: 10, viewsDelivered: 2100, totalViews: 3000, type: 'external', status: 'active' },
  { id: 'PTC-104', title: 'Trust Wallet Web3', url: 'https://trustwallet.com', advertiser: 'tw_media', reward: 25, duration: 5, viewsDelivered: 5000, totalViews: 5000, type: 'windows', status: 'completed' },
];

const AdminPtcPage = () => {
  const [campaigns, setCampaigns] = useState(initialPtcCampaigns);
  const [createModal, setCreateModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [reward, setReward] = useState('40');
  const [duration, setDuration] = useState('15');
  const [totalViews, setTotalViews] = useState('1000');
  const [type, setType] = useState('windows');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title || !url) return;

    const newAd = {
      id: `PTC-${Math.floor(Math.random() * 900 + 100)}`,
      title,
      url,
      advertiser: 'Admin Sponsor',
      reward: Number(reward),
      duration: Number(duration),
      viewsDelivered: 0,
      totalViews: Number(totalViews),
      type,
      status: 'active'
    };

    setCampaigns(prev => [newAd, ...prev]);
    setCreateModal(false);
    setTitle('');
    setUrl('');
    alert('New PTC Advertisement Campaign published!');
  };

  const handleTogglePause = (id) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'active' ? 'paused' : 'active' };
      }
      return c;
    }));
  };

  const handleDelete = (id) => {
    if (confirm('Delete this PTC campaign?')) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">PTC Campaign Management</h1>
          <p className="page-subtitle">Create, monitor, moderate, and pause paid-to-click advertiser campaigns</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<PlusCircle size={15} />}
          onClick={() => setCreateModal(true)}
        >
          Create New Campaign
        </Button>
      </div>

      {/* Campaigns Table */}
      <Card title="All PTC Campaigns" subtitle={`Total ${campaigns.length} campaigns`}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Advertiser</th>
                <th>Type</th>
                <th>Reward / Duration</th>
                <th>Impressions Delivered</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((ad) => {
                const percent = Math.min(100, (ad.viewsDelivered / ad.totalViews) * 100);
                return (
                  <tr key={ad.id}>
                    <td>
                      <div>
                        <span className="font-bold text-sm text-[var(--text-primary)] block">{ad.title}</span>
                        <a href={ad.url} target="_blank" rel="noreferrer" className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-1 font-mono">
                          {ad.url} <ExternalLink size={10} />
                        </a>
                      </div>
                    </td>
                    <td className="text-xs text-[var(--text-secondary)]">@{ad.advertiser}</td>
                    <td>
                      <span className="badge badge-primary uppercase text-[10px] font-bold">{ad.type}</span>
                    </td>
                    <td>
                      <span className="font-bold text-xs text-[var(--primary)] font-mono">{ad.reward} Coins</span>
                      <span className="text-[11px] text-[var(--text-secondary)] block">({ad.duration}s timer)</span>
                    </td>
                    <td>
                      <div className="space-y-1 min-w-[120px]">
                        <div className="flex justify-between text-[11px] font-semibold text-[var(--text-secondary)]">
                          <span>{formatNumber(ad.viewsDelivered)}</span>
                          <span>{formatNumber(ad.totalViews)}</span>
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[var(--primary)] h-full rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={ad.status} />
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleTogglePause(ad.id)}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                          title={ad.status === 'active' ? 'Pause Campaign' : 'Activate Campaign'}
                        >
                          {ad.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button
                          onClick={() => handleDelete(ad.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title="Launch Sponsored PTC Campaign"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="input-label">Campaign Title</label>
            <Input 
              placeholder="e.g. Bybit - Get $50 Welcome Bonus"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">Destination URL</label>
            <Input 
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="input-label">Reward (Coins per view)</label>
              <Input 
                type="number"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="input-label">Duration (Seconds)</label>
              <Input 
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="input-label">Total Impressions</label>
              <Input 
                type="number"
                value={totalViews}
                onChange={(e) => setTotalViews(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="input-label">Ad Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="windows">Windows Ads</option>
                <option value="iframe">iFrame Ads</option>
                <option value="external">External Ads</option>
                <option value="youtube">YouTube Ads</option>
              </select>
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full font-bold">
            Publish Campaign
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPtcPage;
