import React, { useState } from 'react';
import { 
  Ticket, PlusCircle, Trash2, CheckCircle, Tag, 
  Clock, Users, Power, Copy, Check
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Coupons & Promo Codes</h1>
          <p className="page-subtitle">Generate promotional coupon codes for social media drops and reward campaigns</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<PlusCircle size={15} />}
          onClick={() => setCreateModal(true)}
        >
          Create Promo Code
        </Button>
      </div>

      {/* Coupons Table */}
      <Card title="Active & Past Promo Campaigns" subtitle={`Total ${coupons.length} coupon codes`}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Coin Reward</th>
                <th>Redemptions / Capacity</th>
                <th>Expiration</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => {
                const percent = Math.min(100, (c.currentUses / c.maxUses) * 100);
                return (
                  <tr key={c.id}>
                    <td>
                      <span className="font-mono font-bold text-xs px-2.5 py-1 bg-gray-100 rounded-lg text-[var(--text-primary)]">
                        {c.code}
                      </span>
                    </td>
                    <td>
                      <span className="font-bold text-emerald-600 font-mono text-sm">+{c.reward} Coins</span>
                    </td>
                    <td>
                      <div className="space-y-1 min-w-[120px]">
                        <div className="flex justify-between text-[11px] font-semibold text-[var(--text-secondary)]">
                          <span>{c.currentUses} uses</span>
                          <span>{c.maxUses} max</span>
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[var(--primary)] h-full rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="text-xs text-[var(--text-secondary)] font-mono">{c.expiry}</td>
                    <td>
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
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
              <label className="input-label">Max Total Redemptions</label>
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

          <Button type="submit" variant="primary" className="w-full font-bold">
            Publish Coupon Code
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCouponsPage;
