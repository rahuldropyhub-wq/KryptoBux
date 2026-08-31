import React, { useState } from 'react';
import { 
  Megaphone, PlusCircle, Code, Eye, DollarSign, 
  CheckCircle, Power, Edit, Trash2, Globe
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import { StatusBadge } from '@/components/common/Badge';
import { formatNumber } from '@/utils/formatters';

const initialAdSlots = [
  { id: 'AD-1', name: 'Header Top Leaderboard (728x90)', placement: 'Header Banner', network: 'Adsterra', eCpm: '$2.80', impressions: 42500, revenue: '$119.00', status: 'active' },
  { id: 'AD-2', name: 'Dashboard Sidebar Box (300x250)', placement: 'Sidebar Bottom', network: 'PropellerAds', eCpm: '$3.40', impressions: 28400, revenue: '$96.56', status: 'active' },
  { id: 'AD-3', name: 'PTC Ad Wall Native In-Feed', placement: 'Between Ad Cards', network: 'CoinTraffic', eCpm: '$4.10', impressions: 18200, revenue: '$74.62', status: 'active' },
  { id: 'AD-4', name: 'Hourly Faucet Popunder Unit', placement: 'On Faucet Roll Click', network: 'PopCash', eCpm: '$5.50', impressions: 8400, revenue: '$46.20', status: 'active' },
];

const AdminAdvertisementsPage = () => {
  const [adSlots, setAdSlots] = useState(initialAdSlots);
  const [createModal, setCreateModal] = useState(false);

  const [name, setName] = useState('');
  const [placement, setPlacement] = useState('Header Banner');
  const [network, setNetwork] = useState('Adsterra');
  const [code, setCode] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !code) return;

    const newSlot = {
      id: `AD-${Date.now()}`,
      name,
      placement,
      network,
      eCpm: '$3.00',
      impressions: 0,
      revenue: '$0.00',
      status: 'active'
    };

    setAdSlots(prev => [...prev, newSlot]);
    setCreateModal(false);
    setName('');
    setCode('');
    alert('New ad slot configured and live across the platform!');
  };

  const handleToggle = (id) => {
    setAdSlots(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Advertisement & Monetization</h1>
          <p className="page-subtitle">Manage banner placements, native ad networks, CPM tracking, and third-party script tags</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<PlusCircle size={15} />}
          onClick={() => setCreateModal(true)}
        >
          Add Ad Placement
        </Button>
      </div>

      {/* Ad Slots Table */}
      <Card title="Active Ad Network Placements" subtitle="Live banner widgets embedded in user panel">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ad Slot Name</th>
                <th>Placement Location</th>
                <th>Ad Network</th>
                <th>eCPM Rate</th>
                <th>24h Impressions</th>
                <th>Estimated Revenue</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {adSlots.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className="font-bold text-sm text-[var(--text-primary)] block">{s.name}</span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">{s.id}</span>
                  </td>
                  <td className="text-xs text-[var(--text-secondary)]">{s.placement}</td>
                  <td>
                    <span className="badge badge-primary text-xs font-semibold">{s.network}</span>
                  </td>
                  <td className="font-mono text-xs font-bold text-emerald-600">{s.eCpm}</td>
                  <td className="font-mono text-xs">{formatNumber(s.impressions)}</td>
                  <td className="font-mono text-sm font-bold text-[var(--text-primary)]">{s.revenue}</td>
                  <td>
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleToggle(s.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        s.status === 'active' 
                          ? 'bg-red-50 hover:bg-red-100 text-red-700' 
                          : 'bg-green-50 hover:bg-green-100 text-green-700'
                      }`}
                      title={s.status === 'active' ? 'Disable Ad Slot' : 'Enable Ad Slot'}
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
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title="Configure New Ad Slot"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="input-label">Ad Slot Title</label>
            <Input 
              placeholder="e.g. Footer 728x90 Banner"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="input-label">Placement</label>
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="Header Banner">Header Banner</option>
                <option value="Sidebar Bottom">Sidebar Bottom</option>
                <option value="In-Content">In-Content</option>
                <option value="Popunder">Popunder</option>
              </select>
            </div>
            <div>
              <label className="input-label">Ad Network</label>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="Adsterra">Adsterra</option>
                <option value="PropellerAds">PropellerAds</option>
                <option value="CoinTraffic">CoinTraffic</option>
                <option value="PopCash">PopCash</option>
                <option value="Google AdSense">Google AdSense</option>
              </select>
            </div>
          </div>

          <div>
            <label className="input-label">HTML / Javascript Code Snippet</label>
            <textarea
              rows={4}
              placeholder="<script async src='https://...'></script>"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-field font-mono text-xs resize-none"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full font-bold">
            Embed Ad Slot
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAdvertisementsPage;
