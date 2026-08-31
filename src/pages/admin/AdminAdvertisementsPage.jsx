import React, { useState } from 'react';
import { 
  Megaphone, PlusCircle, Trash2, Edit, Code, 
  Power, CheckCircle, Eye, DollarSign, Layers, Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { StatusBadge } from '@/components/common/Badge';

const initialAdUnits = [
  { id: 'AD-1', name: 'Header Leaderboard 728x90', network: 'Adsterra', placement: 'Global Topbar / Header', eCpm: '$2.80', impressions: 45200, status: 'active', code: '<script src="//pl1982.adsterra.com/banner.js"></script>' },
  { id: 'AD-2', name: 'Sidebar Rectangle 300x250', network: 'PropellerAds', placement: 'Sidebar Bottom', eCpm: '$3.40', impressions: 32400, status: 'active', code: '<script data-cfasync="false" src="//propeller.js"></script>' },
  { id: 'AD-3', name: 'Faucet Page Native Banner', network: 'CoinTraffic', placement: 'Above Dice Roll', eCpm: '$4.20', impressions: 18900, status: 'active', code: '<ins class="ct-banner" data-id="99182"></ins>' },
  { id: 'AD-4', name: 'Popunder Trigger On-Click', network: 'PopCash', placement: 'Global Background', eCpm: '$1.90', impressions: 12000, status: 'paused', code: '<script type="text/javascript" src="//popcash.net/pop.js"></script>' },
];

const AdminAdvertisementsPage = () => {
  const [adUnits, setAdUnits] = useState(initialAdUnits);
  const [codeModal, setCodeModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleToggle = (id) => {
    setAdUnits(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'paused' : 'active' };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Ad Network Placements</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-50 text-purple-700 border border-purple-200">
              {adUnits.length} Placements
            </span>
          </div>
          <p className="page-subtitle">Manage 3rd-party banner networks (Adsterra, PropellerAds, CoinTraffic, PopCash) and HTML snippet codes</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminStatCard
          label="Active Ad Units"
          value={adUnits.filter(u => u.status === 'active').length}
          sub="Displaying across 4 pages"
          icon={Layers}
          accentIndex={0}
        />
        <AdminStatCard
          label="Estimated Monthly Ad Revenue"
          value="$4,446.00"
          trend="up"
          trendValue="+18% vs last month"
          icon={DollarSign}
          accentIndex={1}
        />
        <AdminStatCard
          label="Average eCPM Rate"
          value="$3.10 eCPM"
          sub="Crypto & High Tier Traffic"
          icon={Sparkles}
          accentIndex={2}
        />
      </div>

      {/* Ad Units Table */}
      <Card title="Configured Banner Units" subtitle="Live embedded advertising widgets">
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="data-table">
            <thead>
              <tr>
                <th>Unit Identifier</th>
                <th>Ad Network</th>
                <th>Site Placement</th>
                <th>eCPM Rate</th>
                <th>Total Views</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adUnits.map((unit) => (
                <tr key={unit.id} className="hover:bg-slate-50/80 transition-colors">
                  <td>
                    <span className="font-extrabold text-xs text-slate-900 block">{unit.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">{unit.id}</span>
                  </td>
                  <td>
                    <span className="badge badge-primary text-[11px] font-bold">{unit.network}</span>
                  </td>
                  <td className="text-xs text-slate-600 font-medium">{unit.placement}</td>
                  <td className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-2 border border-emerald-200">
                    {unit.eCpm}
                  </td>
                  <td className="font-mono text-xs text-slate-700 font-semibold">{unit.impressions.toLocaleString()} views</td>
                  <td>
                    <StatusBadge status={unit.status} />
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedUnit(unit);
                          setCodeModal(true);
                        }}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all font-semibold"
                        title="Edit HTML/JS Snippet"
                      >
                        <Code size={14} />
                      </button>
                      <button
                        onClick={() => handleToggle(unit.id)}
                        className={`p-2 rounded-xl transition-all ${
                          unit.status === 'active' 
                            ? 'bg-amber-50 hover:bg-amber-100 text-amber-700' 
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                        }`}
                        title={unit.status === 'active' ? 'Pause Unit' : 'Activate Unit'}
                      >
                        <Power size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Snippet Code Modal */}
      <Modal
        isOpen={codeModal}
        onClose={() => setCodeModal(false)}
        title={`Edit Embed Snippet: ${selectedUnit?.name || ''}`}
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div>
            <label className="input-label">Ad Network HTML/JS Embed Script</label>
            <textarea
              rows={4}
              defaultValue={selectedUnit?.code || ''}
              className="input-field font-mono text-xs resize-none"
            />
          </div>

          <Button 
            variant="primary" 
            className="w-full font-bold shadow-md"
            onClick={() => {
              setCodeModal(false);
              alert('Ad code updated and deployed live!');
            }}
          >
            Save Ad Snippet Code
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminAdvertisementsPage;
