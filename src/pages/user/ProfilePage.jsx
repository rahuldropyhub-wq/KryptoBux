import React, { useState } from 'react';
import { 
  User, Mail, Shield, Key, Wallet, Smartphone, History, CheckCircle, 
  AlertTriangle, Copy, Check, Lock, Edit2, Save, Globe, Activity
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { StatusBadge } from '@/components/common/Badge';
import useAuthStore from '@/store/authStore';
import useWalletStore from '@/store/walletStore';
import { copyToClipboard } from '@/utils/helpers';
import { formatDateTime } from '@/utils/formatters';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { balance } = useWalletStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Alex Morgan');
  const [email] = useState(user?.email || 'alex.crypto@example.com');
  const [country, setCountry] = useState('United States');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Wallets state
  const [wallets, setWallets] = useState({
    faucetPay: 'alex_faucetpay@mail.com',
    btc: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    ltc: 'LTC_L6gG7K9oQ8u3n9vE8f7a6b5c4d3e2f1',
    trx: 'TRX_TX99s88d77f66e55w44q33a22z11'
  });

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passSaved, setPassSaved] = useState(false);

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Login History
  const loginHistory = [
    { id: 1, ip: '192.168.1.104', location: 'New York, US', device: 'Chrome / Windows 11', time: new Date().toISOString(), status: 'active' },
    { id: 2, ip: '192.168.1.104', location: 'New York, US', device: 'Chrome / Windows 11', time: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
    { id: 3, ip: '102.34.12.98', location: 'New York, US', device: 'Mobile Safari / iOS 17', time: new Date(Date.now() - 86400000 * 3).toISOString(), status: 'completed' },
  ];

  const handleCopy = (text) => {
    copyToClipboard(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) return;
    setPassSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPassSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="section-header">
        <h1 className="page-title">Profile & Account</h1>
        <p className="page-subtitle">Manage your personal information, security preferences, and withdrawal addresses</p>
      </div>

      {/* Main Profile Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="card p-6 flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--deep)] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
              <Check size={12} className="text-white" />
            </span>
          </div>

          <h2 className="text-lg font-bold text-[var(--text-primary)] mt-4">{name}</h2>
          <p className="text-sm text-[var(--text-secondary)]">{email}</p>
          
          <div className="flex items-center gap-2 mt-3">
            <span className="badge badge-primary">VIP Level 2 • Silver</span>
            <span className="badge badge-success">KYC Verified</span>
          </div>

          <div className="w-full border-t border-[var(--border-light)] my-5" />

          <div className="w-full grid grid-cols-2 gap-3 text-left">
            <div className="p-3 bg-[var(--background)] rounded-xl">
              <p className="text-xs text-[var(--text-secondary)]">Member Since</p>
              <p className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">Aug 2024</p>
            </div>
            <div className="p-3 bg-[var(--background)] rounded-xl">
              <p className="text-xs text-[var(--text-secondary)]">Account ID</p>
              <p className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">#KB-89241</p>
            </div>
            <div className="p-3 bg-[var(--background)] rounded-xl">
              <p className="text-xs text-[var(--text-secondary)]">Current Balance</p>
              <p className="text-sm font-semibold text-[var(--primary)] mt-0.5">{balance || 2450} Coins</p>
            </div>
            <div className="p-3 bg-[var(--background)] rounded-xl">
              <p className="text-xs text-[var(--text-secondary)]">Trust Score</p>
              <p className="text-sm font-semibold text-emerald-600 mt-0.5">100%</p>
            </div>
          </div>
        </div>

        {/* Personal Details Form */}
        <div className="lg:col-span-2">
          <Card 
            title="Personal Information" 
            subtitle="Update your basic account profile"
            action={
              <Button 
                variant={isEditing ? 'primary' : 'secondary'} 
                size="sm"
                leftIcon={isEditing ? <Save size={14} /> : <Edit2 size={14} />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Full Name</label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  disabled={!isEditing} 
                  icon={User}
                />
              </div>

              <div>
                <label className="input-label">Email Address (Read-only)</label>
                <Input 
                  value={email} 
                  disabled 
                  icon={Mail}
                />
              </div>

              <div>
                <label className="input-label">Country / Region</label>
                <Input 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)} 
                  disabled={!isEditing} 
                  icon={Globe}
                />
              </div>

              <div>
                <label className="input-label">Phone Number (Optional)</label>
                <Input 
                  placeholder="+1 (555) 000-0000" 
                  disabled={!isEditing} 
                  icon={Smartphone}
                />
              </div>
            </div>

            <div className="mt-5 p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-3">
              <Shield className="text-[var(--primary)] flex-shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-[var(--text-secondary)]">
                <p className="font-semibold text-[var(--text-primary)]">KYC Tier 2 Status: Active</p>
                <p className="mt-0.5">Your identity documents are verified. You have unlimited withdrawal limits and priority payout processing.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Linked Withdrawal Wallets & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Linked Wallets */}
        <Card title="Linked Crypto Wallets" subtitle="Default addresses for 1-click withdrawals">
          <div className="space-y-4">
            <div>
              <label className="input-label flex items-center justify-between">
                <span>FaucetPay Linked Email</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Instant Zero Fee</span>
              </label>
              <Input 
                value={wallets.faucetPay} 
                onChange={(e) => setWallets({...wallets, faucetPay: e.target.value})}
                icon={Mail}
              />
            </div>

            <div>
              <label className="input-label">Bitcoin (BTC) Direct Address</label>
              <Input 
                value={wallets.btc} 
                onChange={(e) => setWallets({...wallets, btc: e.target.value})}
                icon={Wallet}
              />
            </div>

            <div>
              <label className="input-label">Litecoin (LTC) Address</label>
              <Input 
                value={wallets.ltc} 
                onChange={(e) => setWallets({...wallets, ltc: e.target.value})}
                icon={Wallet}
              />
            </div>

            <div>
              <label className="input-label">TRON (TRX / USDT-TRC20) Address</label>
              <Input 
                value={wallets.trx} 
                onChange={(e) => setWallets({...wallets, trx: e.target.value})}
                icon={Wallet}
              />
            </div>

            <Button variant="primary" size="sm" className="w-full mt-2">
              Save Default Wallet Addresses
            </Button>
          </div>
        </Card>

        {/* Security & Password */}
        <div className="space-y-6">
          <Card title="Security & Authentication" subtitle="Protect your account with extra security layers">
            {/* 2FA Toggle */}
            <div className="p-4 rounded-xl border border-[var(--border-light)] bg-[var(--background)] flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Two-Factor Authentication (2FA)</h4>
                  <p className="text-xs text-[var(--text-secondary)]">Google Authenticator or Authy</p>
                </div>
              </div>
              <Button 
                variant={twoFactorEnabled ? 'secondary' : 'primary'} 
                size="sm"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              >
                {twoFactorEnabled ? 'Enabled (Turn Off)' : 'Enable 2FA'}
              </Button>
            </div>

            {/* Change Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Change Password</h4>
              
              {passSaved && (
                <div className="p-2.5 bg-green-50 text-green-700 text-xs rounded-lg flex items-center gap-2 border border-green-200">
                  <CheckCircle size={14} /> Password updated successfully!
                </div>
              )}

              <Input 
                type="password"
                placeholder="Current Password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)}
                icon={Lock}
              />
              <Input 
                type="password"
                placeholder="New Password (min. 8 characters)" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                icon={Key}
              />
              <Input 
                type="password"
                placeholder="Confirm New Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={Key}
              />
              
              <Button type="submit" variant="secondary" size="sm" className="w-full">
                Update Password
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Login History */}
      <Card title="Active Sessions & Login History" subtitle="Recent IP accesses and connected devices">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Device & Browser</th>
                <th>IP Address</th>
                <th>Location</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((item) => (
                <tr key={item.id}>
                  <td className="font-medium">{item.device}</td>
                  <td className="font-mono text-xs">{item.ip}</td>
                  <td>{item.location}</td>
                  <td className="text-xs text-[var(--text-secondary)]">{formatDateTime(item.time)}</td>
                  <td>
                    <StatusBadge status={item.status} />
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

export default ProfilePage;
