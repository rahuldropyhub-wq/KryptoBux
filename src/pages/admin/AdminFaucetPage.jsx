import React, { useState } from 'react';
import { 
  Droplets, Settings, Save, CheckCircle, Dices, 
  Coins, ShieldAlert, Sparkles, Trophy, Clock
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { formatNumber } from '@/utils/formatters';

const AdminFaucetPage = () => {
  const [baseReward, setBaseReward] = useState('25');
  const [cooldown, setCooldown] = useState('60');
  const [dailyLimit, setDailyLimit] = useState('24');
  const [captchaType, setCaptchaType] = useState('math');
  const [jackpotReward, setJackpotReward] = useState('10000');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Faucet Configuration</h1>
          <p className="page-subtitle">Adjust hourly roll reward brackets, cooldown timers, anti-bot protection, and jackpot payouts</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-green-600" />
          <span>Faucet parameters updated successfully!</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 stat-card stat-card-accent-blue">
          <p className="stat-card-label">24h Faucet Rolls</p>
          <p className="stat-card-value">{formatNumber(18420)}</p>
          <p className="stat-card-sub">Active community claims</p>
        </div>
        <div className="card p-5 stat-card stat-card-accent-deep">
          <p className="stat-card-label">Coins Distributed Today</p>
          <p className="stat-card-value text-emerald-600">+{formatNumber(580200)}</p>
          <p className="stat-card-sub">Gross faucet payout</p>
        </div>
        <div className="card p-5 stat-card stat-card-accent-lavender">
          <p className="stat-card-label">Monthly Jackpot Winners</p>
          <p className="stat-card-value text-amber-600">3 Lucky Users</p>
          <p className="stat-card-sub">Rolled #10000</p>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <Card title="Core Faucet Rules" subtitle="Cooldowns & claim limits">
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="input-label">Base Payout (Coins)</label>
                <Input 
                  type="number"
                  value={baseReward}
                  onChange={(e) => setBaseReward(e.target.value)}
                  icon={Coins}
                  required
                />
              </div>

              <div>
                <label className="input-label">Cooldown Timer (Minutes)</label>
                <Input 
                  type="number"
                  value={cooldown}
                  onChange={(e) => setCooldown(e.target.value)}
                  icon={Clock}
                  required
                />
              </div>

              <div>
                <label className="input-label">Max Claims Per User / Day</label>
                <Input 
                  type="number"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="input-label">Anti-Bot Captcha Provider</label>
                <select
                  value={captchaType}
                  onChange={(e) => setCaptchaType(e.target.value)}
                  className="input-field text-xs py-2"
                >
                  <option value="math">Interactive Math Equation</option>
                  <option value="turnstile">Cloudflare Turnstile</option>
                  <option value="hcaptcha">hCaptcha Enterprise</option>
                </select>
              </div>

              <Button type="submit" variant="primary" className="w-full font-bold">
                Save Faucet Rules
              </Button>
            </form>
          </Card>
        </div>

        {/* Lucky Roll Tier Brackets */}
        <div className="lg:col-span-6">
          <Card title="Lucky Roll Payout Brackets" subtitle="Adjust rewards for higher number brackets">
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--background)] flex items-center justify-between">
                <span>Roll 00001 - 09885 (Standard)</span>
                <strong className="font-mono text-sm">{baseReward} Coins</strong>
              </div>
              <div className="p-3 rounded-xl bg-[var(--background)] flex items-center justify-between">
                <span>Roll 09886 - 09985 (Silver)</span>
                <strong className="font-mono text-sm">65 Coins</strong>
              </div>
              <div className="p-3 rounded-xl bg-[var(--background)] flex items-center justify-between">
                <span>Roll 09986 - 09993 (Gold)</span>
                <strong className="font-mono text-sm">250 Coins</strong>
              </div>
              <div className="p-3 rounded-xl bg-[var(--background)] flex items-center justify-between">
                <span>Roll 09994 - 09997 (Diamond)</span>
                <strong className="font-mono text-sm">750 Coins</strong>
              </div>
              <div className="p-3 rounded-xl bg-[var(--background)] flex items-center justify-between">
                <span>Roll 09998 - 09999 (Mythic)</span>
                <strong className="font-mono text-sm">2,500 Coins</strong>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-between font-bold">
                <span>Roll 10000 (Grand Jackpot 🏆)</span>
                <strong className="font-mono text-sm">{formatNumber(jackpotReward)} Coins</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminFaucetPage;
