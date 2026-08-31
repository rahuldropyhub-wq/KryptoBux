import React, { useState } from 'react';
import { 
  Droplets, Save, CheckCircle, Clock, ShieldCheck, 
  Coins, Sparkles, AlertTriangle, Dice5
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { formatNumber } from '@/utils/formatters';

const initialRollBrackets = [
  { range: '1 - 8,999', reward: 30, probability: '89.99%' },
  { range: '9,000 - 9,699', reward: 65, probability: '7.00%' },
  { range: '9,700 - 9,899', reward: 150, probability: '2.00%' },
  { range: '9,900 - 9,989', reward: 500, probability: '0.90%' },
  { range: '9,990 - 9,999', reward: 1500, probability: '0.10%' },
  { range: '10,000 (Jackpot)', reward: 10000, probability: '0.01%' },
];

const AdminFaucetPage = () => {
  const [cooldown, setCooldown] = useState('60');
  const [baseReward, setBaseReward] = useState('30');
  const [captchaProvider, setCaptchaProvider] = useState('math');
  const [dailyLimit, setDailyLimit] = useState('24');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [brackets, setBrackets] = useState(initialRollBrackets);

  const handleUpdateReward = (index, val) => {
    setBrackets(prev => prev.map((b, i) => i === index ? { ...b, reward: Number(val) } : b));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Hourly Faucet Configuration</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
              Dice Engine
            </span>
          </div>
          <p className="page-subtitle">Configure hourly dice roll payout brackets, jackpot tiers, anti-bot captchas, and timer cooldowns</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>Faucet parameters and dice roll reward tiers updated successfully!</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Core Parameters Form */}
        <div className="lg:col-span-5">
          <Card title="Core Engine Parameters" subtitle="Adjust timings and bot defense">
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="input-label">Cooldown Duration (Minutes)</label>
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
                <label className="input-label">Anti-Bot Captcha Verification</label>
                <select
                  value={captchaProvider}
                  onChange={(e) => setCaptchaProvider(e.target.value)}
                  className="input-field text-xs py-2"
                >
                  <option value="math">Interactive Math Solver (Anti-Bot)</option>
                  <option value="turnstile">Cloudflare Turnstile</option>
                  <option value="hcaptcha">hCaptcha Enterprise</option>
                </select>
              </div>

              <Button type="submit" variant="primary" className="w-full font-bold shadow-md">
                Save Faucet Parameters
              </Button>
            </form>
          </Card>
        </div>

        {/* Lucky Dice Roll Tier Payouts Table */}
        <div className="lg:col-span-7">
          <Card title="Dice Roll Payout Brackets (1 - 10,000)" subtitle="Set payout coins for each roll range">
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Roll Result</th>
                    <th>Coin Reward</th>
                    <th>Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {brackets.map((b, idx) => (
                    <tr key={b.range} className="hover:bg-slate-50/80 transition-colors">
                      <td className="font-mono text-xs font-bold text-slate-900">{b.range}</td>
                      <td>
                        <input
                          type="number"
                          value={b.reward}
                          onChange={(e) => handleUpdateReward(idx, e.target.value)}
                          className="input-field max-w-[130px] font-mono text-xs font-bold py-1 text-emerald-700 bg-emerald-50/60 border-emerald-200"
                        />
                      </td>
                      <td className="font-mono text-xs text-slate-500 font-semibold">{b.probability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminFaucetPage;
