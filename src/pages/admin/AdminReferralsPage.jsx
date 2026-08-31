import React, { useState } from 'react';
import { 
  Users, Award, ShieldAlert, Save, CheckCircle, 
  TrendingUp, Coins, AlertTriangle, Check
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { formatNumber } from '@/utils/formatters';

const suspiciousReferrals = [
  { id: 1, referrer: 'spambot_vpn', referred: 'fake_ref_11', ip: '104.28.19.4', sharedCount: 4, reason: 'Matching IP & Subnet', date: '10 min ago' },
  { id: 2, referrer: 'bot_farm8', referred: 'bot_farm8_child', ip: '185.220.101.5', sharedCount: 6, reason: 'Tor Exit Node / Multi-register', date: '2 hrs ago' },
];

const AdminReferralsPage = () => {
  const [faucetComm, setFaucetComm] = useState('15');
  const [ptcComm, setPtcComm] = useState('10');
  const [shortlinkComm, setShortlinkComm] = useState('5');
  const [contestPool, setContestPool] = useState('50000');
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
          <h1 className="page-title">Referral Program & Anti-Fraud</h1>
          <p className="page-subtitle">Configure affiliate commission rates, monthly contest prize pools, and review fraud detection logs</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-green-600" />
          <span>Commission rates and contest rules updated!</span>
        </div>
      )}

      {/* Commission Rates Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Affiliate Commission Rates (%)" subtitle="Set lifetime revenue share per earning category">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="input-label">Hourly Faucet Claims Commission (%)</label>
              <Input 
                type="number" 
                value={faucetComm} 
                onChange={(e) => setFaucetComm(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="input-label">PTC Ads Viewing Commission (%)</label>
              <Input 
                type="number" 
                value={ptcComm} 
                onChange={(e) => setPtcComm(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="input-label">Shortlinks & Offers Commission (%)</label>
              <Input 
                type="number" 
                value={shortlinkComm} 
                onChange={(e) => setShortlinkComm(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="input-label">Monthly Referral Contest Prize Pool (Coins)</label>
              <Input 
                type="number" 
                value={contestPool} 
                onChange={(e) => setContestPool(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="primary" className="w-full font-bold">
              Save Affiliate Rates
            </Button>
          </form>
        </Card>

        {/* Suspicious Referral Fraud Logs */}
        <Card title="Multi-Account Referral Fraud Guard" subtitle="Automated flags for self-referral and VPN networks">
          <div className="space-y-3">
            {suspiciousReferrals.map((item) => (
              <div key={item.id} className="p-3.5 rounded-2xl bg-red-50/50 border border-red-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-900 flex items-center gap-1.5">
                    <ShieldAlert size={15} className="text-red-600" />
                    Fraud Match: @{item.referrer} ➔ @{item.referred}
                  </span>
                  <span className="text-[10px] text-gray-500">{item.date}</span>
                </div>
                <div className="flex justify-between text-[11px] text-red-800">
                  <span>Reason: {item.reason}</span>
                  <span className="font-mono">{item.ip} ({item.sharedCount} accounts)</span>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button 
                    variant="danger" 
                    size="sm" 
                    className="py-1 text-xs"
                    onClick={() => alert(`Banned @${item.referrer} and affiliated downline accounts.`)}
                  >
                    Ban Referrer & Void Earnings
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminReferralsPage;
