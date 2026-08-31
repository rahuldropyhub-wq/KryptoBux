import React, { useState } from 'react';
import { 
  Download, ArrowUpRight, Wallet, CheckCircle, Clock, 
  Coins, ShieldCheck, AlertCircle, RefreshCw, ExternalLink, HelpCircle
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import useWalletStore from '@/store/walletStore';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const withdrawMethods = [
  { id: 'faucetpay', name: 'FaucetPay (Recommended)', fee: '0%', min: 1000, speed: 'Instant (0 - 5 min)', icon: '⚡' },
  { id: 'direct', name: 'Direct Crypto Wallet', fee: '1.0%', min: 5000, speed: 'Within 24 Hours', icon: '🔗' },
  { id: 'payeer', name: 'Payeer (USD)', fee: '1.5%', min: 2000, speed: 'Within 12 Hours', icon: '💳' },
];

const withdrawCurrencies = [
  { symbol: 'LTC', name: 'Litecoin', rate: 0.00012, addressPlaceholder: 'LTC Address or FaucetPay email' },
  { symbol: 'BTC', name: 'Bitcoin', rate: 0.00000015, addressPlaceholder: 'BTC Address or FaucetPay email' },
  { symbol: 'DOGE', name: 'Dogecoin', rate: 0.085, addressPlaceholder: 'DOGE Address or FaucetPay email' },
  { symbol: 'USDT', name: 'Tether (TRC-20)', rate: 0.01, addressPlaceholder: 'TRON / USDT Address' },
  { symbol: 'TRX', name: 'TRON', rate: 0.075, addressPlaceholder: 'TRX Address' },
  { symbol: 'SOL', name: 'Solana', rate: 0.000072, addressPlaceholder: 'Solana Address' },
];

const mockWithdrawHistory = [
  { id: 'WD-8910', method: 'FaucetPay', currency: 'LTC', coins: 1500, amount: '0.180000 LTC', time: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'completed', txHash: '0x8f2a...39e1' },
  { id: 'WD-8909', method: 'Direct Wallet', currency: 'TRX', coins: 5000, amount: '375.00 TRX', time: new Date(Date.now() - 86400000 * 8).toISOString(), status: 'completed', txHash: '0x1c94...88d2' },
];

const WithdrawPage = () => {
  const { balance = 2450, addTransaction } = useWalletStore();
  const [selectedMethod, setSelectedMethod] = useState(withdrawMethods[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(withdrawCurrencies[0]);
  const [coinsAmount, setCoinsAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('alex_faucetpay@mail.com');
  const [history, setHistory] = useState(mockWithdrawHistory);
  const [submitting, setSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const numCoins = Number(coinsAmount) || 0;
  const cryptoEstimated = (numCoins * selectedCurrency.rate).toFixed(8);
  const usdValue = (numCoins * 0.01).toFixed(2);
  const isBalanceSufficient = balance >= numCoins && numCoins >= selectedMethod.min;

  const handleSetPercent = (percent) => {
    const calculated = Math.floor(balance * (percent / 100));
    setCoinsAmount(calculated.toString());
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    if (!isBalanceSufficient || !walletAddress) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccessModal(true);

      const newWd = {
        id: `WD-${Math.floor(Math.random() * 9000 + 1000)}`,
        method: selectedMethod.name.split(' ')[0],
        currency: selectedCurrency.symbol,
        coins: numCoins,
        amount: `${cryptoEstimated} ${selectedCurrency.symbol}`,
        time: new Date().toISOString(),
        status: selectedMethod.id === 'faucetpay' ? 'completed' : 'pending',
        txHash: 'Pending Gateway Batch'
      };

      setHistory(prev => [newWd, ...prev]);

      addTransaction({
        id: `TX-${Math.floor(Math.random() * 90000 + 10000)}`,
        type: 'withdraw',
        desc: `Withdrawal to ${selectedCurrency.symbol} (${selectedMethod.name})`,
        amount: -numCoins,
        currency: 'Coins',
        time: new Date().toISOString(),
        status: selectedMethod.id === 'faucetpay' ? 'completed' : 'pending'
      });

      setCoinsAmount('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Withdraw Funds</h1>
          <p className="page-subtitle">Convert your earned coins into real cryptocurrency with fast automated payouts</p>
        </div>
        <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[var(--border)] shadow-sm">
          <Coins className="text-[var(--primary)]" size={18} />
          <span className="text-xs text-[var(--text-secondary)]">Available Balance:</span>
          <strong className="text-sm text-[var(--text-primary)]">{formatNumber(balance)} Coins</strong>
        </div>
      </div>

      {/* Main Withdrawal Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Method Selector */}
          <Card title="1. Select Payout Method" subtitle="Choose your preferred cash-out gateway">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {withdrawMethods.map((method) => {
                const isSelected = selectedMethod.id === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-2 border-[var(--primary)] bg-blue-50/50 shadow-sm ring-4 ring-blue-100'
                        : 'border-[var(--border)] bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">{method.icon}</span>
                        <span className="text-[11px] font-bold text-emerald-600 font-mono">Fee: {method.fee}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">{method.name}</h4>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-1">{method.speed}</p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-[var(--border-light)] text-[11px] font-medium text-[var(--text-muted)]">
                      Min: {formatNumber(method.min)} Coins
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Currency & Amount Form */}
          <Card title="2. Withdrawal Details" subtitle="Specify cryptocurrency and destination wallet">
            <form onSubmit={handleWithdrawSubmit} className="space-y-5">
              {/* Currency Selector Chips */}
              <div>
                <label className="input-label">Select Cryptocurrency</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {withdrawCurrencies.map((curr) => {
                    const isSelected = selectedCurrency.symbol === curr.symbol;
                    return (
                      <button
                        type="button"
                        key={curr.symbol}
                        onClick={() => setSelectedCurrency(curr)}
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                          isSelected
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                            : 'bg-white text-[var(--text-primary)] border-[var(--border)] hover:bg-[var(--background)]'
                        }`}
                      >
                        {curr.symbol}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="input-label mb-0">Withdraw Amount (Coins)</label>
                  <div className="flex items-center gap-1.5">
                    {[25, 50, 75, 100].map((pct) => (
                      <button
                        type="button"
                        key={pct}
                        onClick={() => handleSetPercent(pct)}
                        className="px-2 py-0.5 rounded-md bg-gray-100 hover:bg-gray-200 text-[10px] font-bold text-[var(--text-secondary)] transition-colors"
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
                <Input 
                  type="number"
                  placeholder={`Min. ${formatNumber(selectedMethod.min)} Coins`}
                  min={selectedMethod.min}
                  max={balance}
                  value={coinsAmount}
                  onChange={(e) => setCoinsAmount(e.target.value)}
                  icon={Coins}
                  required
                />
              </div>

              {/* Destination Address */}
              <div>
                <label className="input-label">Destination Address / Email</label>
                <Input 
                  placeholder={selectedCurrency.addressPlaceholder}
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  icon={Wallet}
                  required
                />
                <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                  Double check your address carefully. Crypto payouts cannot be reversed once broadcasted.
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                className="w-full font-bold shadow-lg"
                disabled={!isBalanceSufficient || !walletAddress}
                loading={submitting}
              >
                Submit Withdrawal Request
              </Button>
            </form>
          </Card>
        </div>

        {/* Right Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card title="Payout Calculation" subtitle="Live conversion rates">
            <div className="space-y-4">
              <div className="p-4 bg-[var(--background)] rounded-2xl space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Coins Deducted:</span>
                  <strong className="font-mono text-sm">{formatNumber(numCoins)} Coins</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">USD Valuation:</span>
                  <strong className="font-mono text-sm">${usdValue} USD</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Gateway Fee:</span>
                  <strong className="text-emerald-600 font-semibold">{selectedMethod.fee}</strong>
                </div>
                <div className="border-t border-[var(--border)] pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-[var(--text-primary)]">You Will Receive:</span>
                  <strong className="text-base font-black text-[var(--primary)] font-mono">
                    {cryptoEstimated} {selectedCurrency.symbol}
                  </strong>
                </div>
              </div>

              <div className="p-3 bg-blue-50 text-blue-900 rounded-xl text-xs space-y-1 border border-blue-100">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck size={16} className="text-[var(--primary)]" />
                  <span>Automated Gateway Security</span>
                </div>
                <p className="text-[11px] leading-relaxed text-blue-800">
                  FaucetPay payouts process within 2 minutes. Direct on-chain transfers require network gas confirmations.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Withdraw History Table */}
      <Card title="Withdrawal History" subtitle="Your recent cash-outs and payout hashes">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Gateway</th>
                <th>Currency</th>
                <th>Coins</th>
                <th>Crypto Amount</th>
                <th>Date & Time</th>
                <th>Tx Hash</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td className="font-mono text-xs font-semibold">{item.id}</td>
                  <td>{item.method}</td>
                  <td>
                    <span className="badge badge-primary font-bold text-xs">{item.currency}</span>
                  </td>
                  <td className="font-mono text-xs">{formatNumber(item.coins)}</td>
                  <td className="font-bold font-mono text-sm text-[var(--text-primary)]">{item.amount}</td>
                  <td className="text-xs text-[var(--text-secondary)]">{formatDateTime(item.time)}</td>
                  <td className="font-mono text-xs text-blue-600 hover:underline cursor-pointer">{item.txHash}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Success Modal */}
      <Modal
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        title="Withdrawal Submitted Successfully!"
        maxWidth="max-w-sm"
      >
        <div className="text-center space-y-4 py-3">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
            <CheckCircle size={36} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Payout Request Queued</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Your withdrawal has been logged with the automated payout processor. You will receive an email once confirmed.
            </p>
          </div>
          <Button variant="primary" className="w-full font-bold" onClick={() => setSuccessModal(false)}>
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default WithdrawPage;
