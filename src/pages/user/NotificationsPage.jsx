import React, { useState } from 'react';
import { 
  Bell, CheckCheck, Trash2, Coins, ShieldCheck, 
  Sparkles, Award, Clock, ArrowRight, Check
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { formatRelativeTime } from '@/utils/formatters';

const initialNotifications = [
  { id: 1, type: 'reward', title: 'PTC Reward Credited', message: 'You earned 45 Coins for viewing "Binance - Trade Crypto With Zero Fees".', time: new Date(Date.now() - 120000).toISOString(), read: false },
  { id: 2, type: 'payout', title: 'Withdrawal Completed', message: 'Your cashout of 0.180000 LTC to FaucetPay was successfully processed (TxID: 0x8f2a...39e1).', time: new Date(Date.now() - 3600000 * 3).toISOString(), read: false },
  { id: 3, type: 'streak', title: 'Day 5 Streak Achieved! 🔥', message: 'Congratulations! Your consecutive check-in streak is now 5 days. +15% earning boost activated.', time: new Date(Date.now() - 86400000).toISOString(), read: true },
  { id: 4, type: 'system', title: 'Weekend Double XP Event', message: 'All Faucet and PTC tasks are paying 1.5x bonus rewards this Saturday and Sunday!', time: new Date(Date.now() - 86400000 * 2).toISOString(), read: true },
  { id: 5, type: 'security', title: 'New Login From New Device', message: 'Your account was accessed from New York, US via Chrome / Windows 11.', time: new Date(Date.now() - 86400000 * 3).toISOString(), read: true },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const filtered = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'reward': return <Coins size={18} className="text-yellow-500" />;
      case 'payout': return <ShieldCheck size={18} className="text-emerald-500" />;
      case 'streak': return <Sparkles size={18} className="text-orange-500" />;
      case 'security': return <ShieldCheck size={18} className="text-purple-500" />;
      default: return <Bell size={18} className="text-[var(--primary)]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Notifications Center</h1>
          <p className="page-subtitle">Stay updated on your payouts, reward earnings, streak bonuses, and security alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" leftIcon={<CheckCheck size={14} />} onClick={markAllRead}>
            Mark All as Read
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<Trash2 size={14} />} onClick={clearAll}>
            Clear All
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'unread', 'reward', 'payout', 'system', 'security'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              filter === f
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'bg-white text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--background)]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <Card title="Activity Stream" subtitle={`Showing ${filtered.length} notifications`}>
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[var(--text-secondary)]">
              <Bell size={32} className="mx-auto text-gray-300 mb-2" />
              No notifications found in this category.
            </div>
          ) : (
            filtered.map((item) => (
              <div 
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  item.read ? 'bg-white border-[var(--border-light)]' : 'bg-blue-50/40 border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[var(--border)] shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">{item.title}</h4>
                      {!item.read && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">{item.message}</p>
                    <span className="text-[11px] text-[var(--text-muted)] mt-2 block font-medium">
                      {formatRelativeTime(item.time)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!item.read && (
                    <button 
                      onClick={() => setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n))}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[var(--primary)] hover:bg-white"
                      title="Mark as read"
                    >
                      <Check size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default NotificationsPage;
