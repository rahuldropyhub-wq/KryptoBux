import React, { useState } from 'react';
import { 
  Ticket, PlusCircle, Trash2, CheckCircle, Tag, 
  Clock, Users, Power, Copy, Check, Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { StatusBadge } from '@/components/common/Badge';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const initialCoupons = [
  { id: 1, code: 'WELCOME100', reward: 100, maxUses: 1000, currentUses: 842, expiry: '2026-12-31', status: 'active' },
  { id: 2, code: 'TELEGRAM50', reward: 50, maxUses: 500, currentUses: 320, expiry: '2026-09-30', status: 'active' },
  { id: 3, code: 'KRYPTOVIP', reward: 250, maxUses: 200, currentUses: 115, expiry: '2026-09-15', status: 'active' },
  { id: 4, code: 'SUMMER2024', reward: 150, maxUses: 500, currentUses: 500, expiry: '2024-08-01', status: 'completed' },
];

const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [createModal, setCreateModal] = useState(false);

  const [code, setCode] = useState('');
  const [reward, setReward] = useState('100');
  const [maxUses, setMaxUses] = useState('500');
  const [expiry, setExpiry] = useState('2026-12-31');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!code) return;

    const newC = {
      id: Date.now(),
      code: code.toUpperCase(),
      reward: Number(reward),
      maxUses: Number(maxUses),
      currentUses: 0,
      expiry,
      status: 'active'
    };

    setCoupons(prev => [newC, ...prev]);
    setCreateModal(false);
    setCode('');
    alert(`Coupon code ${newC.code} activated!`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this coupon code?')) {
      setCoupons(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Coupons & Promo Codes</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-50 text-purple-700 border border-purple-200">
              {coupons.length} Active Drops
            </span>
          </div>
          <p className="page-subtitle">Generate promotional coupon codes for social media drops, telegram channels, and influencer campaigns</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<PlusCircle size={15} />}
          onClick={() => setCreateModal(true)}
          className="shadow-md"
        >
          Create Promo Code
        </Button>
      </div>

      {/* Coupons Table */}
      <Card title="Active & Past Promo Campaigns" subtitle={`Total ${coupons.length} coupon codes`}>
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="data-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Coin Reward</th>
                <th>Redemptions / Capacity</th>
                <th>Expiration Date</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => {
                const percent = Math.min(100, Math.round((c.currentUses / c.maxUses) * 100));
                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td>
                      <span className="font-mono font-black text-xs px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-slate-900 inline-block">
                        {c.code}
                      </span>
                    </td>
                    <td>
                      <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-mono text-xs">
                        +{c.reward} Coins
                      </span>
                    </td>
                    <td>
                      <div className="space-y-1 min-w-[140px]">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>{c.currentUses} claims</span>
                          <span className="text-slate-400">{c.maxUses} max</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                          <div className="bg-purple-600 h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="text-xs text-slate-600 font-mono font-semibold">{c.expiry}</td>
                    <td>
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 transition-all font-semibold"
                        title="Delete Code"
                      >
                        <Trash2 size={14} />
                      </button>
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
        title="Generate New Promo Coupon"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="input-label">Coupon Code String</label>
            <Input 
              placeholder="e.g. SPECIAL2026"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              icon={Tag}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
              <label className="input-label">Max Total Uses</label>
              <Input 
                type="number"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="input-label">Expiry Date</label>
            <Input 
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full font-bold shadow-md">
            Publish Coupon Code
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCouponsPage;
