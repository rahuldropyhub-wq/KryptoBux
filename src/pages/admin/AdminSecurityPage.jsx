import React, { useState } from 'react';
import { 
  Shield, ShieldAlert, ShieldCheck, Ban, PlusCircle, 
  Trash2, Search, CheckCircle, AlertTriangle, Key, Power,
  Lock, Sparkles
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { formatDateTime } from '@/utils/formatters';

const initialBannedIps = [
  { ip: '104.28.19.4', reason: 'Bot Farm / Multi-Account Registration', added: new Date(Date.now() - 86400000 * 2).toISOString(), hits: 142 },
  { ip: '185.220.101.5', reason: 'Tor Exit Node Automated Scraper', added: new Date(Date.now() - 86400000 * 5).toISOString(), hits: 89 },
  { ip: '45.140.18.99', reason: 'PTC Auto-Clicker Script Ingestion', added: new Date(Date.now() - 86400000 * 12).toISOString(), hits: 310 },
];

const AdminSecurityPage = () => {
  const [bannedIps, setBannedIps] = useState(initialBannedIps);
  const [addModal, setAddModal] = useState(false);
  const [newIp, setNewIp] = useState('');
  const [newReason, setNewReason] = useState('');

  const [securityRules, setSecurityRules] = useState({
    vpnBlocker: true,
    multiIpBlocker: true,
    fingerprintCheck: true,
    rateLimiting: true,
    withdrawalHold: true
  });

  const handleToggleRule = (key) => {
    setSecurityRules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddIp = (e) => {
    e.preventDefault();
    if (!newIp) return;

    setBannedIps(prev => [{
      ip: newIp,
      reason: newReason || 'Manual Admin Blacklist',
      added: new Date().toISOString(),
      hits: 0
    }, ...prev]);

    setAddModal(false);
    setNewIp('');
    setNewReason('');
    alert(`IP ${newIp} added to global blacklist.`);
  };

  const handleRemoveIp = (ip) => {
    if (confirm(`Remove IP ${ip} from blacklist?`)) {
      setBannedIps(prev => prev.filter(item => item.ip !== ip));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Security & Anti-Fraud Center</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              Firewall Active
            </span>
          </div>
          <p className="page-subtitle">Configure automated multi-account shields, VPN/Proxy firewalls, and manage IP blacklists</p>
        </div>
        <Button 
          variant="danger" 
          size="sm" 
          leftIcon={<PlusCircle size={15} />}
          onClick={() => setAddModal(true)}
          className="shadow-md"
        >
          Blacklist IP Address
        </Button>
      </div>

      {/* Security Rule Toggles */}
      <Card title="Automated Defense Shields" subtitle="Real-time firewall filters running on all API endpoints">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'vpnBlocker', label: 'VPN & Datacenter Proxy Blocker', desc: 'Block users attempting to register or claim rewards via known VPNs or Tor exit nodes.' },
            { key: 'multiIpBlocker', label: 'Multi-Account Registration Shield', desc: 'Prevent multiple accounts from sharing the exact same IP address and subnet.' },
            { key: 'fingerprintCheck', label: 'Canvas & Device Fingerprint Matching', desc: 'Detect duplicate browser hardware profiles trying to bypass IP restrictions.' },
            { key: 'rateLimiting', label: 'API Rate Limiting & Anti-Spam', desc: 'Throttle requests exceeding 60 calls/minute per client token.' },
            { key: 'withdrawalHold', label: 'New Account 24-Hour Cashout Hold', desc: 'Require new accounts to be at least 24 hours old before first crypto withdrawal.' },
          ].map((rule) => (
            <div key={rule.key} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all flex items-start justify-between gap-4 shadow-2xs">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={17} className={securityRules[rule.key] ? 'text-emerald-600' : 'text-slate-400'} />
                  <h4 className="font-extrabold text-xs text-slate-900">{rule.label}</h4>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">{rule.desc}</p>
              </div>

              <button
                onClick={() => handleToggleRule(rule.key)}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex-shrink-0 ${
                  securityRules[rule.key] ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {securityRules[rule.key] ? 'Active' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Blacklisted IPs */}
      <Card title="Global IP Blacklist" subtitle="Blocked IP addresses and automated attack attempts">
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="data-table">
            <thead>
              <tr>
                <th>IP Address</th>
                <th>Reason for Blacklisting</th>
                <th>Date Blocked</th>
                <th>Blocked Attempts</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {bannedIps.map((item) => (
                <tr key={item.ip} className="hover:bg-slate-50/80 transition-colors">
                  <td>
                    <span className="font-mono font-bold text-xs text-red-700 px-2.5 py-0.5 bg-red-50 rounded-md border border-red-200">
                      {item.ip}
                    </span>
                  </td>
                  <td className="text-xs text-slate-900 font-semibold">{item.reason}</td>
                  <td className="text-xs text-slate-500">{formatDateTime(item.added)}</td>
                  <td className="font-mono text-xs font-bold text-slate-700">{item.hits} blocked</td>
                  <td className="text-right">
                    <button
                      onClick={() => handleRemoveIp(item.ip)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                      title="Unban IP"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add IP Modal */}
      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title="Blacklist IP Address"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddIp} className="space-y-4">
          <div>
            <label className="input-label">IP Address (IPv4 or IPv6)</label>
            <Input 
              placeholder="e.g. 192.168.1.1"
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">Reason</label>
            <Input 
              placeholder="e.g. Malicious script scraping, VPN abuse"
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="danger" className="w-full font-bold shadow-md">
            Blacklist IP Now
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminSecurityPage;
