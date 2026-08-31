import React, { useState } from 'react';
import { 
  Settings, Save, CheckCircle, Globe, Mail, 
  Key, Shield, AlertTriangle, Power, Coins, Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';

const AdminSettingsPage = () => {
  const [siteName, setSiteName] = useState('Krypto Bux');
  const [siteTagline, setSiteTagline] = useState('Leading Multi-Cryptocurrency Rewards Platform');
  const [coinRate, setCoinRate] = useState('100'); // 100 coins = $1.00
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [registrationsOpen, setRegistrationsOpen] = useState(true);

  // FaucetPay API
  const [fpApiKey, setFpApiKey] = useState('sec_api_fp_98129031823');
  const [fpMerchantId, setFpMerchantId] = useState('FP_MERCHANT_KB_01');

  // SMTP Settings
  const [smtpHost, setSmtpHost] = useState('smtp.mailgun.org');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('postmaster@kryptobux.com');
  const [smtpFrom, setSmtpFrom] = useState('no-reply@kryptobux.com');

  const [savedSuccess, setSavedSuccess] = useState(false);

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
            <h1 className="page-title">Platform System Settings</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
              Global Sync
            </span>
          </div>
          <p className="page-subtitle">Configure global exchange rates, payment gateways, SMTP mail servers, and platform maintenance status</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>System settings updated and synchronized across all servers!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Platform Identity */}
        <Card title="General Identity & Coin Valuations" subtitle="Core branding and coin valuations">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Platform Name</label>
              <Input 
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="input-label">Tagline</label>
              <Input 
                value={siteTagline}
                onChange={(e) => setSiteTagline(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="input-label">Coin Valuation (Coins per $1.00 USD)</label>
              <Input 
                type="number"
                value={coinRate}
                onChange={(e) => setCoinRate(e.target.value)}
                icon={Coins}
                required
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
              <div>
                <span className="font-extrabold text-xs text-slate-900 block">Maintenance Mode</span>
                <span className="text-[11px] text-slate-500 font-medium">Temporarily pause public earning</span>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-600 cursor-pointer"
              />
            </div>
          </div>
        </Card>

        {/* FaucetPay API Gateway */}
        <Card title="FaucetPay API Gateway" subtitle="Credentials for automated instant micro-payouts">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">FaucetPay Merchant API Key</label>
              <Input 
                type="password"
                value={fpApiKey}
                onChange={(e) => setFpApiKey(e.target.value)}
                icon={Key}
                required
              />
            </div>

            <div>
              <label className="input-label">Merchant Identifier</label>
              <Input 
                value={fpMerchantId}
                onChange={(e) => setFpMerchantId(e.target.value)}
                required
              />
            </div>
          </div>
        </Card>

        {/* SMTP Mail Server */}
        <Card title="SMTP Email Server Configuration" subtitle="Used for verification emails and payout receipts">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="input-label">SMTP Host</label>
              <Input 
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="input-label">SMTP Port</label>
              <Input 
                value={smtpPort}
                onChange={(e) => setSmtpPort(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="input-label">SMTP Username</label>
              <Input 
                value={smtpUser}
                onChange={(e) => setSmtpUser(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="input-label">From Email Address</label>
              <Input 
                value={smtpFrom}
                onChange={(e) => setSmtpFrom(e.target.value)}
                icon={Mail}
                required
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" className="font-bold shadow-lg">
            Save System Configurations
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
