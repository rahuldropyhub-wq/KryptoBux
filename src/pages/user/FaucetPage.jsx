import React, { useState, useEffect } from 'react';
import { 
  Droplets, Clock, Dices, Trophy, Award, Sparkles, CheckCircle, 
  HelpCircle, RefreshCw, Flame, History, Zap, Coins
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import useWalletStore from '@/store/walletStore';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const payoutTiers = [
  { min: 1, max: 9885, payout: 25, label: 'Standard Roll', probability: '98.85%' },
  { min: 9886, max: 9985, payout: 65, label: 'Silver Roll', probability: '1.00%' },
  { min: 9986, max: 9993, payout: 250, label: 'Gold Roll', probability: '0.08%' },
  { min: 9994, max: 9997, payout: 750, label: 'Diamond Roll', probability: '0.04%' },
  { min: 9998, max: 9999, payout: 2500, label: 'Mythic Roll', probability: '0.02%' },
  { min: 10000, max: 10000, payout: 10000, label: 'JACKPOT 🏆', probability: '0.01%' },
];

const mockRecentClaims = [
  { user: 'cryptoking', roll: 9892, payout: 65, time: '2 mins ago' },
  { user: 'satoshix', roll: 4120, payout: 25, time: '5 mins ago' },
  { user: 'alex_m', roll: 9995, payout: 750, time: '12 mins ago' },
  { user: 'bitcoingirl', roll: 8341, payout: 25, time: '18 mins ago' },
  { user: 'doge_master', roll: 9989, payout: 250, time: '24 mins ago' },
];

const FaucetPage = () => {
  const { addTransaction } = useWalletStore();
  const [canClaim, setCanClaim] = useState(true);
  const [cooldown, setCooldown] = useState(0); // seconds
  const [rolling, setRolling] = useState(false);
  const [rolledNumber, setRolledNumber] = useState(null);
  const [winPayout, setWinPayout] = useState(0);
  const [claimsToday, setClaimsToday] = useState(14);
  const [recentClaims, setRecentClaims] = useState(mockRecentClaims);

  // Captcha state
  const [captchaQ, setCaptchaQ] = useState({ a: 6, b: 3 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);

  useEffect(() => {
    let interval;
    if (!canClaim && cooldown > 0) {
      interval = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            setCanClaim(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [canClaim, cooldown]);

  const generateNewCaptcha = () => {
    setCaptchaQ({
      a: Math.floor(Math.random() * 9) + 1,
      b: Math.floor(Math.random() * 9) + 1,
    });
    setCaptchaInput('');
  };

  const handleRoll = () => {
    if (!canClaim || rolling) return;

    if (parseInt(captchaInput) !== (captchaQ.a + captchaQ.b)) {
      alert('Please solve the anti-bot math question correctly first!');
      return;
    }

    setRolling(true);
    let counter = 0;
    const rollInterval = setInterval(() => {
      setRolledNumber(Math.floor(Math.random() * 10000) + 1);
      counter++;
      if (counter > 15) {
        clearInterval(rollInterval);
        
        // Final lucky number (weighted towards exciting result)
        const finalNum = Math.floor(Math.random() * 10000) + 1;
        setRolledNumber(finalNum);

        // Determine payout
        const tier = payoutTiers.find(t => finalNum >= t.min && finalNum <= t.max) || payoutTiers[0];
        setWinPayout(tier.payout);
        setRolling(false);
        setCanClaim(false);
        setCooldown(3600); // 1 hour cooldown
        setClaimsToday(prev => prev + 1);

        addTransaction({
          id: `TX-${Math.floor(Math.random() * 90000 + 10000)}`,
          type: 'faucet',
          desc: `Faucet Lucky Roll #${finalNum} (${tier.label})`,
          amount: tier.payout,
          currency: 'Coins',
          time: new Date().toISOString(),
          status: 'completed'
        });

        // Add to recent feed
        setRecentClaims(prev => [{ user: 'You', roll: finalNum, payout: tier.payout, time: 'Just now' }, ...prev.slice(0, 5)]);
        generateNewCaptcha();
      }
    }, 80);
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Hourly Crypto Faucet</h1>
          <p className="page-subtitle">Roll your lucky number every 60 minutes and win up to 10,000 Coins Jackpot</p>
        </div>
      </div>

      {/* Main Faucet Interactive Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Roll Box */}
        <div className="lg:col-span-7">
          <div className="card p-6 lg:p-8 bg-gradient-to-b from-white to-[var(--background)] border border-[var(--border)] text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[420px]">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-[var(--primary)] text-xs font-bold mb-6">
              <Droplets size={16} /> Free Hourly Claim • Tier 2 VIP Active (+10% Bonus)
            </div>

            {/* Lucky Roll Display */}
            <div className="relative my-4">
              <div className="w-56 h-28 bg-[var(--deep)] rounded-3xl border-4 border-[var(--primary-light)] shadow-2xl flex items-center justify-center text-5xl font-black font-mono tracking-widest text-yellow-300">
                {rolledNumber ? String(rolledNumber).padStart(5, '0') : '00000'}
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-[var(--deep)] shadow-md">
                <Dices size={18} />
              </div>
            </div>

            {/* Winning banner */}
            {winPayout > 0 && !rolling && (
              <div className="my-3 p-3 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center gap-2 font-bold text-sm animate-bounce">
                <Sparkles size={18} className="text-yellow-500" />
                <span>Congratulations! You rolled {rolledNumber} and won +{winPayout} Coins!</span>
              </div>
            )}

            {/* Anti-Bot Verification / Math Solver */}
            {canClaim ? (
              <div className="w-full max-w-sm mt-4 p-4 bg-white rounded-2xl border border-[var(--border)] shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
                  <span>Solve anti-bot math question:</span>
                  <button onClick={generateNewCaptcha} className="text-[var(--primary)] hover:underline flex items-center gap-1">
                    <RefreshCw size={12} /> Refresh
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-gray-100 rounded-xl font-bold font-mono text-base text-[var(--deep)]">
                    {captchaQ.a} + {captchaQ.b} = ?
                  </div>
                  <input
                    type="number"
                    placeholder="Answer"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="input-field font-mono font-bold text-center text-base"
                  />
                </div>

                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full font-bold shadow-lg"
                  loading={rolling}
                  onClick={handleRoll}
                >
                  <Dices size={20} className="mr-1" />
                  ROLL & CLAIM COINS
                </Button>
              </div>
            ) : (
              <div className="mt-4 p-6 bg-blue-50/70 rounded-2xl border border-blue-200 text-center space-y-2 max-w-sm w-full">
                <Clock size={28} className="text-[var(--primary)] mx-auto" />
                <p className="text-xs text-[var(--text-secondary)] font-semibold uppercase tracking-wider">Faucet Cooldown Timer</p>
                <p className="text-3xl font-black font-mono text-[var(--deep)]">{formatTimer(cooldown)}</p>
                <p className="text-xs text-[var(--text-secondary)]">Come back in {Math.ceil(cooldown / 60)} minutes for your next roll!</p>
              </div>
            )}

            {/* Bottom mini stats */}
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[var(--border-light)] w-full justify-center text-xs text-[var(--text-secondary)]">
              <span>Claims Today: <strong className="text-[var(--text-primary)]">{claimsToday} / 24</strong></span>
              <span>•</span>
              <span>Next Reset: <strong className="text-[var(--text-primary)]">00:00 UTC</strong></span>
            </div>
          </div>
        </div>

        {/* Payout Tiers Matrix */}
        <div className="lg:col-span-5 space-y-6">
          <Card title="Lucky Roll Prize Table" subtitle="Higher rolls unlock massive jackpot multipliers">
            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Lucky Number</th>
                    <th>Tier</th>
                    <th className="text-right">Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutTiers.map((tier, i) => (
                    <tr key={i} className={tier.payout === 10000 ? 'bg-amber-50/70 font-bold' : ''}>
                      <td className="font-mono text-xs font-semibold">
                        {tier.min === tier.max ? formatNumber(tier.min) : `${formatNumber(tier.min)} - ${formatNumber(tier.max)}`}
                      </td>
                      <td>
                        <span className={`badge ${
                          tier.payout >= 2500 ? 'badge-warning' : 
                          tier.payout >= 250 ? 'badge-primary' : 'badge-neutral'
                        }`}>
                          {tier.label}
                        </span>
                      </td>
                      <td className="text-right font-bold text-[var(--primary)] font-mono">
                        +{formatNumber(tier.payout)} Coins
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recent Live Claims Ticker */}
          <Card title="Recent Community Claims" subtitle="Live payout activity">
            <div className="space-y-2.5">
              {recentClaims.map((claim, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--background)] text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-[var(--primary)] flex items-center justify-center font-bold text-[10px]">
                      {claim.user[0].toUpperCase()}
                    </div>
                    <span className="font-semibold text-[var(--text-primary)]">@{claim.user}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">rolled {claim.roll}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-600 font-mono">+{claim.payout} Coins</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{claim.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FaucetPage;
