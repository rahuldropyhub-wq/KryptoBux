import React, { useState } from 'react';
import { 
  Wallet, RefreshCw, ArrowDownLeft, ShieldCheck, AlertCircle, 
  CheckCircle, PlusCircle, ExternalLink, QrCode, TrendingUp, DollarSign
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
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

  const totalReserve = "$21,150.70";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Treasury & Hot Wallets</h1>
          <p className="page-subtitle">Monitor platform crypto liquidity pools, FaucetPay automated balances, and payout reserves</p>
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
      <div className="card p-6 lg:p-8 bg-gradient-to-r from-slate-900 to-[var(--deep)] text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="badge bg-white/15 text-white font-bold text-xs mb-2">Platform Solvency Status: 100% Fully Backed</span>
          <h2 className="text-3xl font-black text-white mt-1">Total Treasury Reserve: {totalReserve}</h2>
          <p className="text-white/70 text-xs mt-1">
            Automated payouts active across FaucetPay and 5 crypto mainnet gateways.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="p-3 rounded-2xl bg-white/10 text-center px-5">
            <span className="text-[10px] text-white/60 uppercase font-bold">24h Payouts</span>
            <p className="text-base font-black text-emerald-400 font-mono mt-0.5">$380.20</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 text-center px-5">
            <span className="text-[10px] text-white/60 uppercase font-bold">Pending</span>
            <p className="text-base font-black text-yellow-400 font-mono mt-0.5">$80.00</p>
          </div>
        </div>
      </div>

      {/* Hot Wallet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {wallets.map((w) => (
          <div key={w.currency} className="card p-5 flex flex-col justify-between border hover:border-[var(--primary)] transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-[var(--text-primary)]">{w.currency}</span>
                <span className={`badge ${w.status === 'healthy' ? 'badge-success' : 'badge-warning'} text-[10px]`}>
                  {w.status === 'healthy' ? 'Healthy Liquidity' : 'Refill Alert'}
                </span>
              </div>

              <p className="text-2xl font-black text-[var(--deep)] font-mono">{w.balance}</p>
              <p className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">({w.raw})</p>

              <div className="mt-4 p-3 bg-[var(--background)] rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Network:</span>
                  <strong className="text-[var(--text-primary)]">{w.network}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Min Reserve Limit:</span>
                  <strong className="font-mono text-gray-700">{w.minThreshold}</strong>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[var(--border-light)] flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full text-xs"
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
          <div className="p-4 bg-[var(--background)] rounded-2xl flex flex-col items-center justify-center">
            <div className="w-36 h-36 bg-white p-2 rounded-xl border flex items-center justify-center mb-2">
              <QrCode size={110} className="text-[var(--deep)]" />
            </div>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              Send {selectedWallet?.currency} to Admin Hot Treasury
            </span>
          </div>

          <div className="text-left">
            <label className="input-label">Deposit Address</label>
            <input 
              type="text" 
              readOnly 
              value={selectedWallet?.address || ''} 
              className="input-field font-mono text-xs"
            />
          </div>

          <Button variant="primary" className="w-full" onClick={() => setRefillModal(false)}>
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminWalletsPage;
