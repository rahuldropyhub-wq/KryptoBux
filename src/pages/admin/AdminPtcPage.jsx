import React, { useState } from 'react';
import { 
  Monitor, PlusCircle, Trash2, Edit, CheckCircle, 
  Clock, Eye, Play, Pause, ExternalLink, Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { StatusBadge } from '@/components/common/Badge';
import { formatNumber } from '@/utils/formatters';

const initialAds = [
  { id: 'PTC-101', title: 'Bybit Crypto Derivatives $30,000 Deposit Bonus', category: 'Windows', reward: 50, duration: 30, impressions: 8450, totalTarget: 10000, status: 'active', url: 'https://bybit.com' },
  { id: 'PTC-102', title: 'FaucetPay Micro-Wallet Fast Staking', category: 'iFrame', reward: 25, duration: 15, impressions: 4200, totalTarget: 5000, status: 'active', url: 'https://faucetpay.io' },
  { id: 'PTC-103', title: 'Top Cloud Mining 100 GH/s Free Signup Hashrate', category: 'External', reward: 40, duration: 20, impressions: 5000, totalTarget: 5000, status: 'completed', url: 'https://example-mining.com' },
  { id: 'PTC-104', title: 'Binance Smart Chain Yield Farming Guide', category: 'YouTube', reward: 60, duration: 45, impressions: 1200, totalTarget: 2500, status: 'paused', url: 'https://youtube.com' },
];

const AdminPtcPage = () => {
  const [ads, setAds] = useState(initialAds);
  const [createModal, setCreateModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Windows');
  const [reward, setReward] = useState('35');
  const [duration, setDuration] = useState('15');
  const [totalTarget, setTotalTarget] = useState('1000');

  const handleToggleStatus = (id) => {
    setAds(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === 'active' ? 'paused' : 'active' };
      }
      return a;
    }));
  };

  const handleDelete = (id) => {
    if (confirm('Delete this PTC campaign permanently?')) {
      setAds(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title || !url) return;

    const newAd = {
      id: `PTC-${Date.now().toString().slice(-3)}`,
      title,
      url,
      category,
      reward: Number(reward),
      duration: Number(duration),
      impressions: 0,
      totalTarget: Number(totalTarget),
      status: 'active'
    };

    setAds(prev => [newAd, ...prev]);
    setCreateModal(false);
    setTitle('');
    setUrl('');
    alert('PTC Campaign created and published!');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">PTC Ads Management</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
              {ads.length} Campaigns
            </span>
          </div>
          <p className="page-subtitle">Create, monitor impression delivery, adjust view durations, and moderate sponsored PTC ads</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<PlusCircle size={15} />}
          onClick={() => setCreateModal(true)}
          className="shadow-md"
        >
          Create New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminStatCard
          label="Active Campaigns"
          value={ads.filter(a => a.status === 'active').length}
          sub="Live in user ad-wall"
          icon={Monitor}
          accentIndex={0}
        />
        <AdminStatCard
          label="Total Impressions Served"
          value="18,850"
          trend="up"
          trendValue="+3,200 today"
          icon={Eye}
          accentIndex={1}
        />
        <AdminStatCard
          label="Average CPC Revenue"
          value="$0.008 / View"
          sub="72% platform margin"
          icon={Sparkles}
          accentIndex={2}
        />
      </div>

      {/* Ads Table */}
      <Card title="Sponsored PTC Campaigns" subtitle={`Total ${ads.length} campaigns configured`}>
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ad Campaign</th>
                <th>Format</th>
                <th>Reward / View</th>
                <th>Duration</th>
                <th>Delivery Progress</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => {
                const percent = Math.min(100, Math.round((ad.impressions / ad.totalTarget) * 100));
                return (
                  <tr key={ad.id} className="hover:bg-slate-50/80 transition-colors">
                    <td>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block max-w-sm truncate">{ad.title}</span>
                        <a href={ad.url} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 mt-0.5">
                          {ad.url} <ExternalLink size={9} />
                        </a>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary text-[11px] font-bold">{ad.category}</span>
                    </td>
                    <td>
                      <span className="font-extrabold font-mono text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        +{ad.reward} Coins
                      </span>
                    </td>
                    <td className="font-mono text-xs text-slate-600 font-semibold">{ad.duration}s</td>
                    <td>
                      <div className="space-y-1 min-w-[130px]">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>{formatNumber(ad.impressions)}</span>
                          <span className="text-slate-400">/ {formatNumber(ad.totalTarget)}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                          <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={ad.status} />
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleStatus(ad.id)}
                          className={`p-2 rounded-xl transition-all ${
                            ad.status === 'active' 
                              ? 'bg-amber-50 hover:bg-amber-100 text-amber-700' 
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                          }`}
                          title={ad.status === 'active' ? 'Pause Campaign' : 'Activate Campaign'}
                        >
                          {ad.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button
                          onClick={() => handleDelete(ad.id)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 transition-all"
                          title="Delete Campaign"
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
        title="Create New PTC Sponsored Campaign"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="input-label">Campaign Title</label>
            <Input 
              placeholder="e.g. Stake Crypto on Kraken & Earn 12% APY"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">Destination URL</label>
            <Input 
              type="url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="input-label">Category Format</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="Windows">Windows (Focus)</option>
                <option value="iFrame">iFrame Ad</option>
                <option value="External">External Tab</option>
                <option value="YouTube">YouTube Video</option>
              </select>
            </div>

            <div>
              <label className="input-label">View Timer (Seconds)</label>
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
              <label className="input-label">User Coin Reward</label>
              <Input 
                type="number"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="input-label">Target Impressions</label>
              <Input 
                type="number"
                value={totalTarget}
                onChange={(e) => setTotalTarget(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full font-bold shadow-md">
            Launch Campaign
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPtcPage;
