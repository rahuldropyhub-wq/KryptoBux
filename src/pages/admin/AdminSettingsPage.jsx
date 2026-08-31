import React, { useState } from 'react';
import { 
  Settings, Save, CheckCircle, Globe, Mail, 
  Key, Shield, AlertTriangle, Power, Coins
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Platform System Settings</h1>
          <p className="page-subtitle">Configure global exchange rates, payment gateways, SMTP mail servers, and platform maintenance status</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-green-600" />
          <span>System settings updated and synchronized across all servers!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Platform Identity */}
        <Card title="General Identity & Exchange Rates" subtitle="Core branding and coin valuations">
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

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--background)] border border-[var(--border-light)]">
              <div>
                <span className="font-bold text-xs text-[var(--text-primary)] block">Maintenance Mode</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Temporarily pause public earning</span>
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
