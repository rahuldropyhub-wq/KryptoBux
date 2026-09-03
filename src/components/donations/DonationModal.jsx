import React, { useState } from 'react';
import { X, Wallet, ChevronRight, CheckCircle2, ArrowRight, Loader2, Coins } from 'lucide-react';
import Button from '@/components/common/Button';

const tokens = [
  { id: 'kbux', name: 'KryptoBux', symbol: 'KBUX', balance: '25,000' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: '0.045' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: '1.2' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', balance: '1,500' },
];

const DonationModal = ({ isOpen, onClose, campaign }) => {
  const [step, setStep] = useState(1);
  const [selectedToken, setSelectedToken] = useState(null);
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setSelectedToken(null);
    setAmount('');
    onClose();
  };

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            {step === 5 ? 'Transaction Status' : 'Make a Donation'}
          </h3>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[350px] flex flex-col">
          {/* Step 1: Connect Wallet */}
          {step === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-[#EEF2FF] text-[#234398] rounded-full flex items-center justify-center mb-6">
                <Wallet size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Connect Your Wallet</h4>
              <p className="text-gray-500 text-sm mb-8">
                Connect your Web3 wallet to securely donate to this campaign.
              </p>
              <Button 
                variant="primary" 
                className="w-full bg-[#234398] hover:bg-[#25275E] py-4 text-white text-lg"
                onClick={nextStep}
              >
                Connect Wallet
              </Button>
            </div>
          )}

          {/* Step 2: Select Token */}
          {step === 2 && (
            <div className="flex-1 flex flex-col">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Select Crypto</h4>
              <div className="space-y-3 flex-1">
                {tokens.map(token => (
                  <button
                    key={token.id}
                    onClick={() => setSelectedToken(token)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      selectedToken?.id === token.id 
                        ? 'border-[#234398] bg-[#EEF2FF]' 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-[#234398]">
                        <Coins size={20} />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-gray-900">{token.name}</p>
                        <p className="text-xs text-gray-500">{token.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{token.balance}</p>
                      <p className="text-xs text-gray-500">Available</p>
                    </div>
                  </button>
                ))}
              </div>
              <Button 
                variant="primary" 
                className="w-full bg-[#234398] hover:bg-[#25275E] py-4 mt-6 text-white text-lg disabled:opacity-50"
                disabled={!selectedToken}
                onClick={nextStep}
              >
                Continue <ArrowRight size={18} />
              </Button>
            </div>
          )}

          {/* Step 3: Enter Amount */}
          {step === 3 && (
            <div className="flex-1 flex flex-col">
              <h4 className="text-lg font-bold text-gray-900 mb-1">Donation Amount</h4>
              <p className="text-sm text-gray-500 mb-6">
                Available Balance: <span className="font-bold text-gray-900">{selectedToken.balance} {selectedToken.symbol}</span>
              </p>
              
              <div className="relative mb-6">
                <input 
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-4xl font-extrabold text-gray-900 text-center border-none focus:ring-0 py-6 bg-gray-50 rounded-2xl"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                  {selectedToken.symbol}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-8">
                {['25', '50', '100', 'Max'].map(preset => (
                  <button 
                    key={preset}
                    onClick={() => setAmount(preset === 'Max' ? selectedToken.balance : preset)}
                    className="py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-colors"
                  >
                    {preset === 'Max' ? preset : `$${preset}`}
                  </button>
                ))}
              </div>

              <Button 
                variant="primary" 
                className="w-full bg-[#234398] hover:bg-[#25275E] py-4 mt-auto text-white text-lg disabled:opacity-50"
                disabled={!amount || amount <= 0}
                onClick={nextStep}
              >
                Review Donation
              </Button>
            </div>
          )}

          {/* Step 4: Summary */}
          {step === 4 && (
            <div className="flex-1 flex flex-col">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h4 className="text-sm font-semibold text-gray-500 mb-4">Donation Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Campaign</span>
                    <span className="font-bold text-gray-900 text-right max-w-[200px] truncate">{campaign.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-bold text-gray-900">{amount} {selectedToken.symbol}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Network Fee</span>
                    <span className="font-bold text-gray-900">0.001 {selectedToken.symbol}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-extrabold text-[#6D4AFF] text-lg">{(parseFloat(amount) + 0.001).toFixed(3)} {selectedToken.symbol}</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full bg-[#16A34A] hover:bg-emerald-700 py-4 mt-auto text-white text-lg"
                onClick={() => {
                  nextStep();
                  setTimeout(() => setStep(6), 3000);
                }}
              >
                Confirm Donation
              </Button>
            </div>
          )}

          {/* Step 5: Processing */}
          {step === 5 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-16 h-16 text-[#6D4AFF] animate-spin mb-6" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Processing Transaction</h4>
              <p className="text-gray-500 text-sm">
                Please wait while we confirm your donation on the blockchain. Do not close this window.
              </p>
            </div>
          )}

          {/* Step 6: Success */}
          {step === 6 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-emerald-50 text-[#16A34A] rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Donation Successful!</h4>
              <p className="text-gray-500 text-sm mb-6">
                Thank you for your generous donation of <strong>{amount} {selectedToken?.symbol}</strong>. Your support makes a real difference.
              </p>
              
              <div className="bg-gray-50 w-full p-4 rounded-xl mb-8 flex items-center justify-between">
                <span className="text-xs text-gray-500">Transaction Hash</span>
                <span className="text-sm font-mono text-[#234398] truncate max-w-[150px]">0x7F2a...98Bc</span>
              </div>

              <Button 
                variant="primary" 
                className="w-full bg-[#234398] hover:bg-[#25275E] py-4 text-white text-lg"
                onClick={handleClose}
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
