import React, { useState } from 'react';
import { 
  Wallet, RefreshCw, ArrowDownLeft, ShieldCheck, AlertCircle, 
  CheckCircle, PlusCircle, ExternalLink, QrCode, TrendingUp, DollarSign,
  Layers, Copy, Check
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { formatNumber } from '@/utils/formatters';

const initialHotWallets = [
  { currency: 'FaucetPay API', balance: '$1,450.20', raw: '1,450.20 USD', minThreshold: '$250.00', status: 'healthy', address: 'api_sec_fp99824001', network: 'FaucetPay Internal API' },
  { currency: 'Litecoin (LTC)', balance: '$3,820.50', raw: '45.28 LTC', minThreshold: '5.00 LTC', status: 'healthy', address: 'LTC_HotTreasury999120', network: 'Litecoin On-Chain' },
  { currency: 'TRON / USDT (TRC-20)', balance: '$4,200.00', raw: '4,200 USDT', minThreshold: '500 USDT', status: 'healthy', address: 'TRX_TreasuryUSDT77812', network: 'TRC-20' },
  { currency: 'Bitcoin (BTC)', balance: '$8,940.00', raw: '0.142 BTC', minThreshold: '0.02 BTC', status: 'healthy', address: 'BTC_ColdVaultMultiSig1', network: 'Bitcoin Mainnet' },
  { currency: 'Dogecoin (DOGE)', balance: '$820.00', raw: '8,200 DOGE', minThreshold: '1,000 DOGE', status: 'warning', address: 'DOGE_HotPool38192', network: 'Dogecoin' },
  { currency: 'Solana (SOL)', balance: '$1,920.00', raw: '14.22 SOL', minThreshold: '2.00 SOL', status: 'healthy', address: 'SOL_TreasuryBridge99', network: 'Solana' },
];

const AdminWalletsPage = () => {
  const [wallets, setWallets] = useState(initialHotWallets);
  const [refillModal, setRefillModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [copied, setCopied] = useState(false);

  const totalReserve = "$21,150.70";

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">Treasury & Hot Wallets</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              6 Liquidity Pools
            </span>
          </div>
          <p className="page-subtitle">Monitor platform crypto liquidity pools, FaucetPay automated balances, and reserve solvency</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          leftIcon={<RefreshCw size={14} />}
          onClick={() => alert('Synced liquidity balances across all on-chain RPC nodes.')}
        >
          Sync RPC Nodes
        </Button>
      </div>

      {/* Hero Reserve Banner */}
      <div className="p-6 lg:p-8 bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Solvency Status: 100% Fully Backed
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-white mt-1 tracking-tight">Total Reserves: {totalReserve}</h2>
          <p className="text-slate-300 text-xs mt-1.5 max-w-xl leading-relaxed">
            Automated micro-payouts active across FaucetPay merchant API and 5 on-chain crypto mainnets.
          </p>
        </div>

        <div className="flex gap-3 relative z-10">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm text-center px-5 border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">24h Payouts</span>
            <p className="text-base font-black text-emerald-400 font-mono mt-0.5">$380.20</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm text-center px-5 border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">Pending</span>
            <p className="text-base font-black text-amber-300 font-mono mt-0.5">$80.00</p>
          </div>
        </div>
      </div>

      {/* Hot Wallet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {wallets.map((w) => (
          <div key={w.currency} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-sm text-slate-900">{w.currency}</span>
                <span className={`badge ${w.status === 'healthy' ? 'badge-success' : 'badge-warning'} text-[10px] font-bold`}>
                  {w.status === 'healthy' ? 'Healthy Liquidity' : 'Refill Alert'}
                </span>
              </div>

              <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">{w.balance}</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">({w.raw})</p>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Network:</span>
                  <strong className="text-slate-800">{w.network}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Min Threshold:</span>
                  <strong className="font-mono text-slate-800">{w.minThreshold}</strong>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full text-xs font-bold"
                leftIcon={<PlusCircle size={13} />}
                onClick={() => {
                  setSelectedWallet(w);
                  setRefillModal(true);
                }}
              >
                Refill Reserve
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Refill Reserve Modal */}
      <Modal
        isOpen={refillModal}
        onClose={() => setRefillModal(false)}
        title={`Refill Treasury: ${selectedWallet?.currency || ''}`}
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-center">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
            <div className="w-36 h-36 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-center mb-3">
              <QrCode size={110} className="text-slate-900" />
            </div>
            <span className="text-xs font-bold text-slate-700">
              Send {selectedWallet?.currency} to Admin Hot Treasury
            </span>
          </div>

          <div className="text-left">
            <label className="input-label">Deposit Address</label>
            <div className="relative">
              <input 
                type="text" 
                readOnly 
                value={selectedWallet?.address || ''} 
                className="input-field font-mono text-xs pr-10"
              />
              <button
                type="button"
                onClick={() => handleCopy(selectedWallet?.address)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                title="Copy Address"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <Button variant="primary" className="w-full font-bold shadow-md" onClick={() => setRefillModal(false)}>
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminWalletsPage;
