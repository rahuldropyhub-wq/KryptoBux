import React, { useState } from 'react';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Send, RefreshCw, Copy, Check, 
  Coins, DollarSign, QrCode, ShieldCheck, ExternalLink, Filter, TrendingUp
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import useWalletStore from '@/store/walletStore';
import { copyToClipboard } from '@/utils/helpers';
import { formatNumber, formatDateTime } from '@/utils/formatters';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

const cryptoCurrencies = [
  { symbol: 'BTC', name: 'Bitcoin', rate: 0.00000015, minDeposit: '0.0001 BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', network: 'Bitcoin' },
  { symbol: 'LTC', name: 'Litecoin', rate: 0.00012, minDeposit: '0.01 LTC', address: 'LTC_L6gG7K9oQ8u3n9vE8f7a6b5c4d3e2f1', network: 'Litecoin' },
  { symbol: 'DOGE', name: 'Dogecoin', rate: 0.085, minDeposit: '10 DOGE', address: 'DOGE_D9X3K8L2M7N1P5Q4R6S8T0V', network: 'Dogecoin' },
  { symbol: 'USDT', name: 'Tether (TRC-20)', rate: 0.01, minDeposit: '5 USDT', address: 'TRX_TX99s88d77f66e55w44q33a22z11', network: 'TRON TRC-20' },
  { symbol: 'TRX', name: 'TRON', rate: 0.075, minDeposit: '15 TRX', address: 'TRX_TX99s88d77f66e55w44q33a22z11', network: 'TRON' },
  { symbol: 'SOL', name: 'Solana', rate: 0.000072, minDeposit: '0.05 SOL', address: 'SOL_9wFFBgP7tL76w5L8p4vX9L2Q5N', network: 'Solana' }
];

const mockTransactions = [
  { id: 'TX-9021', type: 'faucet', desc: 'Hourly Faucet Claim', amount: 35, currency: 'Coins', time: new Date().toISOString(), status: 'completed' },
  { id: 'TX-9020', type: 'ptc', desc: 'PTC Ad: Crypto Exchange Promo', amount: 40, currency: 'Coins', time: new Date(Date.now() - 3600000).toISOString(), status: 'completed' },
  { id: 'TX-9019', type: 'withdraw', desc: 'Withdrawal to FaucetPay (LTC)', amount: -1500, currency: 'Coins', time: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
  { id: 'TX-9018', type: 'referral', desc: 'Referral Bonus: @crypto_whale', amount: 120, currency: 'Coins', time: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'completed' },
  { id: 'TX-9017', type: 'daily', desc: 'Day 5 Streak Bonus', amount: 80, currency: 'Coins', time: new Date(Date.now() - 86400000 * 3).toISOString(), status: 'completed' },
];

const WalletPage = () => {
  const { balance = 2450 } = useWalletStore();
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoCurrencies[0]);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Transfer state
  const [recipient, setRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);

  const usdValue = (balance * 0.01).toFixed(2);

  const handleCopy = (text) => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!recipient || !transferAmount || Number(transferAmount) <= 0) return;
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setTransferModalOpen(false);
      setRecipient('');
      setTransferAmount('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Wallet & Balances</h1>
          <p className="page-subtitle">Track your multi-currency balances, deposits, transfers, and crypto equivalent valuations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            leftIcon={<ArrowDownLeft size={16} />}
            onClick={() => setDepositModalOpen(true)}
          >
            Deposit Crypto
          </Button>
          <Button 
            variant="secondary" 
            leftIcon={<Send size={16} />}
            onClick={() => setTransferModalOpen(true)}
          >
            Transfer Coins
          </Button>
          <Link to={ROUTES.WITHDRAW}>
            <Button variant="primary" leftIcon={<ArrowUpRight size={16} />}>
              Withdraw
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Balance Banner */}
      <div className="card p-6 lg:p-8 bg-gradient-to-br from-[var(--deep)] to-[var(--primary)] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-md mb-3">
              <Coins size={14} className="text-yellow-300" /> Primary Earning Balance
            </span>
            <div className="flex items-baseline gap-3">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight">{formatNumber(balance)}</h2>
              <span className="text-xl font-medium text-white/70">Coins</span>
            </div>
            <p className="text-white/70 text-sm mt-2 flex items-center gap-2">
              <span>≈ ${usdValue} USD Value</span>
              <span>•</span>
              <span className="text-emerald-300 font-medium flex items-center gap-1">
                <TrendingUp size={14} /> +12.4% this week
              </span>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">Quick Wallet Actions</p>
              <p className="text-xs text-white/90 mt-1">Instant payouts available via FaucetPay with 0% fee.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Link to={ROUTES.WITHDRAW} className="w-full">
                <button className="w-full py-2 px-3 bg-white text-[var(--deep)] font-bold text-xs rounded-xl hover:bg-white/90 transition-all shadow-sm text-center">
                  Cash Out
                </button>
              </Link>
              <button 
                onClick={() => setTransferModalOpen(true)}
                className="w-full py-2 px-3 bg-white/20 text-white font-bold text-xs rounded-xl hover:bg-white/30 transition-all text-center"
              >
                Send to Friend
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Crypto Equivalent Valuation Cards */}
      <div>
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-3">Crypto Equivalencies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {cryptoCurrencies.map((crypto) => {
            const cryptoAmount = (balance * crypto.rate).toFixed(6);
            return (
              <div key={crypto.symbol} className="card p-4 hover:border-[var(--primary)] transition-all cursor-pointer group"
                onClick={() => {
                  setSelectedCrypto(crypto);
                  setDepositModalOpen(true);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[var(--background)] group-hover:bg-blue-50 transition-colors flex items-center justify-center font-bold text-xs text-[var(--primary)]">
                    {crypto.symbol}
                  </div>
                  <span className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase">{crypto.network}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">{crypto.name}</p>
                <p className="text-sm font-bold text-[var(--text-primary)] mt-1 font-mono">{cryptoAmount}</p>
                <p className="text-[11px] text-[var(--primary)] mt-2 font-medium flex items-center gap-1 group-hover:underline">
                  Deposit / QR <ExternalLink size={10} />
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transactions & Ledger */}
      <Card 
        title="Wallet Ledger" 
        subtitle="Complete record of coin receipts, rewards, and payouts"
        action={
          <Link to={ROUTES.TRANSACTIONS}>
            <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight size={14} />}>
              View All
            </Button>
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx) => {
                const isPositive = tx.amount > 0;
                return (
                  <tr key={tx.id}>
                    <td className="font-mono text-xs text-[var(--text-secondary)] font-medium">{tx.id}</td>
                    <td>
                      <span className="font-semibold text-[var(--text-primary)]">{tx.desc}</span>
                    </td>
                    <td>
                      <span className={`font-bold font-mono ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                        {isPositive ? `+${formatNumber(tx.amount)}` : formatNumber(tx.amount)} {tx.currency}
                      </span>
                    </td>
                    <td className="text-xs text-[var(--text-secondary)]">{formatDateTime(tx.time)}</td>
                    <td>
                      <StatusBadge status={tx.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Deposit Crypto Modal */}
      <Modal
        isOpen={depositModalOpen}
        onClose={() => setDepositModalOpen(false)}
        title={`Deposit ${selectedCrypto.name} (${selectedCrypto.symbol})`}
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-center">
          <div className="p-4 bg-[var(--background)] rounded-2xl flex flex-col items-center justify-center">
            {/* QR Mock */}
            <div className="w-44 h-44 bg-white p-3 rounded-xl border border-[var(--border)] shadow-sm flex items-center justify-center mb-3">
              <QrCode size={130} className="text-[var(--deep)]" />
            </div>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Network: {selectedCrypto.network}</span>
          </div>

          <div className="text-left">
            <label className="input-label">Deposit Address</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly 
                value={selectedCrypto.address} 
                className="input-field font-mono text-xs"
              />
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => handleCopy(selectedCrypto.address)}
                leftIcon={copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          <div className="p-3 bg-amber-50 text-amber-800 rounded-xl text-xs text-left border border-amber-200 flex items-start gap-2">
            <ShieldCheck size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Important Deposit Note</p>
              <p className="mt-0.5">Send only {selectedCrypto.symbol} ({selectedCrypto.network}) to this address. Minimum deposit: {selectedCrypto.minDeposit}. Deposits credit after 3 network confirmations.</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Transfer Coins Modal */}
      <Modal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        title="Transfer Coins to User"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleTransfer} className="space-y-4">
          {transferSuccess && (
            <div className="p-3 bg-green-50 text-green-700 text-xs rounded-xl border border-green-200 flex items-center gap-2">
              <Check size={16} /> Transfer of {transferAmount} Coins successful!
            </div>
          )}

          <div>
            <label className="input-label">Recipient Username or ID</label>
            <Input 
              placeholder="e.g. @cryptoking or #KB-12345" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label flex items-center justify-between">
              <span>Amount (Coins)</span>
              <span className="text-[11px] text-[var(--text-secondary)]">Available: {formatNumber(balance)} Coins</span>
            </label>
            <Input 
              type="number"
              placeholder="Min. 50 Coins" 
              min="50"
              max={balance}
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              required
            />
          </div>

          <div className="p-3 bg-[var(--background)] rounded-xl text-xs text-[var(--text-secondary)] space-y-1">
            <div className="flex justify-between">
              <span>Transfer Fee:</span>
              <span className="font-semibold text-emerald-600">0% (Free)</span>
            </div>
            <div className="flex justify-between">
              <span>Execution:</span>
              <span className="font-semibold text-[var(--text-primary)]">Instant</span>
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Confirm & Send Coins
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default WalletPage;
