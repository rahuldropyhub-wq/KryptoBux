import React, { useState } from 'react';
import { 
  Bell, Send, CheckCircle, Users, Sparkles, 
  Trash2, ShieldCheck, Clock
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const initialBroadcastHistory = [
  { id: 1, title: 'Weekend 1.5x Task Multiplier Event', target: 'All Users (28,450)', sentAt: new Date(Date.now() - 86400000).toISOString(), reads: '18,420 (64.7%)', type: 'system' },
  { id: 2, title: 'New FaucetPay Zero-Fee LTC Payouts Live', target: 'All Users (28,450)', sentAt: new Date(Date.now() - 86400000 * 3).toISOString(), reads: '21,100 (74.1%)', type: 'reward' },
  { id: 3, title: 'Exclusive VIP Gold Mystery Chest Drop', target: 'VIP Members (1,280)', sentAt: new Date(Date.now() - 86400000 * 7).toISOString(), reads: '1,190 (92.9%)', type: 'reward' },
];

const AdminNotificationsPage = () => {
  const [history, setHistory] = useState(initialBroadcastHistory);
  const [targetAudience, setTargetAudience] = useState('All Users');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('system');
  const [isSending, setIsSending] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!title || !message) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      const newBroadcast = {
        id: Date.now(),
        title,
        target: `${targetAudience} (${targetAudience === 'All Users' ? '28,450' : '1,280'})`,
        sentAt: new Date().toISOString(),
        reads: '0 (0%)',
        type
      };

      setHistory(prev => [newBroadcast, ...prev]);
      setTitle('');
      setMessage('');
      alert(`Push notification broadcast dispatched to ${targetAudience}!`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Push Notification Broadcasts</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
              In-App Dispatcher
            </span>
          </div>
          <p className="page-subtitle">Send instant notification announcements to user dashboards and mobile panels</p>
        </div>
      </div>

      {/* Composer Card */}
      <Card title="Compose Global In-App Notification" subtitle="Pushes immediately to user bell icons">
        <form onSubmit={handleSend} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Target Audience Segment</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="input-field text-xs py-2 bg-white"
              >
                <option value="All Users">All Registered Users (28,450)</option>
                <option value="Active Users">Active in Last 7 Days (8,940)</option>
                <option value="VIP Members">VIP Tier Members Only (1,280)</option>
              </select>
            </div>

            <div>
              <label className="input-label">Notification Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-field text-xs py-2 bg-white"
              >
                <option value="system">System Announcement</option>
                <option value="reward">Reward / Event Drop</option>
                <option value="security">Security Alert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="input-label">Notification Title</label>
            <Input 
              placeholder="e.g. 🚀 1.5x Task Multiplier Active This Weekend!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">Notification Body Message</label>
            <textarea
              rows={3}
              placeholder="Write the notification details..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field text-xs resize-none"
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full font-bold shadow-md"
            leftIcon={<Send size={15} />}
            loading={isSending}
          >
            Dispatch Push Notification
          </Button>
        </form>
      </Card>

      {/* Broadcast History */}
      <Card title="Broadcast History & Read Rates" subtitle="Past announcements sent to users">
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="data-table">
            <thead>
              <tr>
                <th>Notification Title</th>
                <th>Audience Segment</th>
                <th>Category</th>
                <th>Sent Date</th>
                <th>Read Rate</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td>
                    <span className="font-bold text-xs text-slate-900 block">{item.title}</span>
                  </td>
                  <td className="text-xs text-slate-600 font-medium">{item.target}</td>
                  <td>
                    <span className="badge badge-primary uppercase text-[10px] font-bold">{item.type}</span>
                  </td>
                  <td className="text-xs text-slate-500">{formatDateTime(item.sentAt)}</td>
                  <td className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-2 border border-emerald-200">
                    {item.reads}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminNotificationsPage;
