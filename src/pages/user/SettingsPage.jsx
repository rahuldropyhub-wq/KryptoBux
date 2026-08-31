import React, { useState } from 'react';
import { 
  Settings, Globe, Bell, Shield, Key, Smartphone, 
  Download, Trash2, CheckCircle, Save, AlertTriangle
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';

const SettingsPage = () => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('UTC');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Email notifications
  const [emailSettings, setEmailSettings] = useState({
    news: true,
    payouts: true,
    security: true,
    marketing: false
  });

  const handleSavePreferences = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Platform Settings</h1>
          <p className="page-subtitle">Configure your language, display currencies, notification preferences, and privacy controls</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center gap-2 font-bold text-xs">
          <CheckCircle size={16} className="text-green-600" />
          <span>Preferences saved successfully!</span>
        </div>
      )}

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Localization & Preferences */}
        <Card title="General Preferences" subtitle="Display and timezone options">
          <form onSubmit={handleSavePreferences} className="space-y-4">
            <div>
              <label className="input-label">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="ru">Русский</option>
                <option value="pt">Português</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div>
              <label className="input-label">Display Fiat Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="USD">USD ($) United States Dollar</option>
                <option value="EUR">EUR (€) Euro</option>
                <option value="GBP">GBP (£) British Pound</option>
                <option value="CAD">CAD ($) Canadian Dollar</option>
              </select>
            </div>

            <div>
              <label className="input-label">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="UTC">UTC (Universal Coordinated Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
                <option value="IST">IST (India Standard Time)</option>
              </select>
            </div>

            <Button type="submit" variant="primary" size="sm" className="w-full font-bold">
              Save Preferences
            </Button>
          </form>
        </Card>

        {/* Email Notification Toggles */}
        <Card title="Email Notifications" subtitle="Select what emails you wish to receive">
          <div className="space-y-3">
            {[
              { key: 'payouts', label: 'Withdrawal Status Updates', desc: 'Emails when withdrawals are broadcasted or approved' },
              { key: 'security', label: 'Security & New Login Alerts', desc: 'Alerts when your account is accessed from a new IP' },
              { key: 'news', label: 'Weekly Platform Digest & Events', desc: 'Weekend double XP reminders and leaderboard winners' },
              { key: 'marketing', label: 'Partner Offers & Promos', desc: 'Sponsored partner bonus promotions' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)]">
                <div>
                  <h5 className="font-bold text-xs text-[var(--text-primary)]">{item.label}</h5>
                  <p className="text-[11px] text-[var(--text-secondary)]">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailSettings[item.key]}
                  onChange={() => setEmailSettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                  className="w-4 h-4 rounded text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Account Data & Danger Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Data */}
        <Card title="Export Personal Data" subtitle="Download complete copy of your earnings and transaction records">
          <div className="space-y-3">
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              You can export a complete JSON snapshot of your account profile, task history, and financial ledger for your records.
            </p>
            <Button 
              variant="secondary" 
              size="sm"
              leftIcon={<Download size={14} />}
              onClick={() => alert('Exporting account JSON package...')}
            >
              Download Account Data (.JSON)
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card title="Danger Zone" subtitle="Permanent account actions" className="border-red-200">
          <div className="space-y-3">
            <p className="text-xs text-red-600 leading-relaxed font-medium">
              Deleting your account will permanently wipe your coin balances, referral commissions, and history. This action cannot be undone.
            </p>
            <Button 
              variant="danger" 
              size="sm"
              leftIcon={<Trash2 size={14} />}
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete Krypto Bux Account
            </Button>
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="⚠️ Delete Account Confirmation"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 py-2 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle size={28} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--text-primary)]">Are you absolutely sure?</h4>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              All your pending withdrawals and unspent coin balances will be permanently forfeited.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="w-full" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" className="w-full" onClick={() => {
              setDeleteModalOpen(false);
              alert('Account deletion request submitted.');
            }}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
