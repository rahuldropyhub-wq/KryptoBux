import React, { useState } from 'react';
import { 
  Send, Save, CheckCircle, Bell, Users, 
  ExternalLink, Key, Sparkles, Check
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { formatNumber } from '@/utils/formatters';

const AdminTelegramPage = () => {
  const [botToken, setBotToken] = useState('7128919241:AAHk89_example_bot_token');
  const [channelId, setChannelId] = useState('@KryptoBuxOfficial');
  const [bonusReward, setBonusReward] = useState('100');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSending, setBroadcastSending] = useState(false);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    setBroadcastSending(true);
    setTimeout(() => {
      setBroadcastSending(false);
      alert('Broadcast message queued and dispatched to 14,250 Telegram subscribers!');
      setBroadcastTitle('');
      setBroadcastMessage('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Telegram Bot & Broadcast Center</h1>
          <p className="page-subtitle">Manage Telegram API tokens, webhook connections, and push instant global announcements</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-green-600" />
          <span>Telegram configuration saved!</span>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4 stat-card stat-card-accent-blue">
          <p className="stat-card-label">Linked Telegram Users</p>
          <p className="stat-card-value">{formatNumber(14250)}</p>
          <p className="stat-card-sub">Active bot connections</p>
        </div>
        <div className="card p-4 stat-card stat-card-accent-deep">
          <p className="stat-card-label">Channel Members</p>
          <p className="stat-card-value text-blue-600">24,500+</p>
          <p className="stat-card-sub">@KryptoBuxOfficial</p>
        </div>
        <div className="card p-4 stat-card stat-card-accent-lavender">
          <p className="stat-card-label">Webhook Status</p>
          <p className="stat-card-value text-emerald-600">Active (200 OK)</p>
          <p className="stat-card-sub">Real-time alerts syncing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Telegram Config Form */}
        <div className="lg:col-span-6">
          <Card title="Bot API Credentials" subtitle="Configure official bot webhook token">
            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <label className="input-label">Bot API Token (from @BotFather)</label>
                <Input 
                  type="password"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  icon={Key}
                  required
                />
              </div>

              <div>
                <label className="input-label">Official Channel ID / Username</label>
                <Input 
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  icon={Send}
                  required
                />
              </div>

              <div>
                <label className="input-label">Channel Join Bonus (Coins)</label>
                <Input 
                  type="number"
                  value={bonusReward}
                  onChange={(e) => setBonusReward(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full font-bold">
                Save Bot Settings
              </Button>
            </form>
          </Card>
        </div>

        {/* Global Broadcast Composer */}
        <div className="lg:col-span-6">
          <Card title="Broadcast Message to Subscribers" subtitle="Push instant notification to all 14,250 linked Telegram users">
            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="input-label">Broadcast Title</label>
                <Input 
                  placeholder="e.g. 🎁 Weekend Double XP & Secret Coupon Drop!"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="input-label">Message Content (Markdown Supported)</label>
                <textarea
                  rows={4}
                  placeholder="Type announcement message text here..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="input-field text-xs resize-none"
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full font-bold bg-sky-600 hover:bg-sky-700 border-0"
                leftIcon={<Send size={15} />}
                loading={broadcastSending}
              >
                Send Broadcast to 14,250 Users
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminTelegramPage;
