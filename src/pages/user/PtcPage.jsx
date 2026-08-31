import React, { useState, useEffect } from 'react';
import { 
  Monitor, Play, Eye, Clock, Coins, CheckCircle, Sparkles, 
  ExternalLink, Filter, ShieldAlert, Award, PlusCircle, ArrowRight
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { PTC_TABS } from '@/utils/constants';
import useWalletStore from '@/store/walletStore';
import { formatNumber } from '@/utils/formatters';

const mockPtcAds = [
  { id: 1, title: 'Binance - Trade Crypto With Zero Fees', description: 'Join world leading crypto exchange. Sign up and get $100 trading voucher.', reward: 45, duration: 15, type: 'windows', views: '1,420/2,000', url: 'https://binance.com' },
  { id: 2, title: 'Stake Casino - $1,000 Welcome Bonus', description: 'Experience VIP crypto casino with instant withdrawals and high RTP slots.', reward: 60, duration: 30, type: 'iframe', views: '890/1,500', url: 'https://stake.com' },
  { id: 3, title: 'Coinbase Earn - Learn & Earn $50 Crypto', description: 'Watch short crypto tutorials and earn free tokens straight to your wallet.', reward: 35, duration: 10, type: 'external', views: '2,100/3,000', url: 'https://coinbase.com' },
  { id: 4, title: 'Trust Wallet - Best Decentralized Web3 App', description: 'Store, swap and stake 100+ cryptocurrencies safely on iOS & Android.', reward: 25, duration: 5, type: 'windows', views: '3,450/5,000', url: 'https://trustwallet.com' },
  { id: 5, title: 'Crypto.com Visa Card - 8% Cashback', description: 'Spend crypto everywhere with Metal Visa card and earn generous cashback.', reward: 50, duration: 20, type: 'youtube', views: '980/1,000', url: 'https://crypto.com' },
  { id: 6, title: 'Ledger Nano X - Hardware Cold Storage', description: 'Keep your crypto 100% secure from hackers with world top hardware wallet.', reward: 40, duration: 15, type: 'iframe', views: '650/1,000', url: 'https://ledger.com' },
  { id: 7, title: 'Bybit Derivatives & Copy Trading', description: 'Copy top-performing crypto traders automatically. Start with $10 bonus.', reward: 55, duration: 25, type: 'windows', views: '1,120/1,500', url: 'https://bybit.com' },
  { id: 8, title: 'Kraken Pro - Institutional Trading Platform', description: 'Ultra low latency execution with professional charting & order book depth.', reward: 30, duration: 10, type: 'external', views: '1,890/2,500', url: 'https://kraken.com' },
];

const PtcPage = () => {
  const { balance, addTransaction } = useWalletStore();
  const [activeTab, setActiveTab] = useState('all');
  const [adsList, setAdsList] = useState(mockPtcAds);
  const [completedAds, setCompletedAds] = useState([]);
  
  // Viewing ad modal
  const [activeAd, setActiveAd] = useState(null);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [captchaNumbers, setCaptchaNumbers] = useState({ a: 4, b: 7 });
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Filter ads
  const filteredAds = adsList.filter(ad => activeTab === 'all' || ad.type === activeTab);
  const totalEarnable = filteredAds.filter(a => !completedAds.includes(a.id)).reduce((acc, a) => acc + a.reward, 0);

  const startAdView = (ad) => {
    setActiveAd(ad);
    setTimerRemaining(ad.duration);
    setTimerActive(true);
    setCaptchaSolved(false);
    setCaptchaAnswer('');
    setClaimSuccess(false);
    setCaptchaNumbers({
      a: Math.floor(Math.random() * 8) + 2,
      b: Math.floor(Math.random() * 8) + 1
    });
  };

  useEffect(() => {
    let interval;
    if (timerActive && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining(prev => prev - 1);
      }, 1000);
    } else if (timerRemaining === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerRemaining]);

  const handleVerifyCaptcha = (e) => {
    e.preventDefault();
    if (parseInt(captchaAnswer) === (captchaNumbers.a + captchaNumbers.b)) {
      setCaptchaSolved(true);
      setClaimSuccess(true);
      setCompletedAds(prev => [...prev, activeAd.id]);
      addTransaction({
        id: `TX-${Math.floor(Math.random() * 90000 + 10000)}`,
        type: 'ptc',
        desc: `PTC Ad: ${activeAd.title}`,
        amount: activeAd.reward,
        currency: 'Coins',
        time: new Date().toISOString(),
        status: 'completed'
      });
      setTimeout(() => {
        setActiveAd(null);
      }, 2000);
    } else {
      alert('Incorrect captcha! Please calculate the sum again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">PTC Ads (Paid to Click)</h1>
          <p className="page-subtitle">View sponsored websites and advertisements for a few seconds to earn instant coins</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            size="sm"
            leftIcon={<PlusCircle size={15} />}
            onClick={() => alert('Redirecting to Advertiser Campaign Creator...')}
          >
            Create PTC Campaign
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 stat-card stat-card-accent-blue">
          <p className="stat-card-label">Available Ads</p>
          <p className="stat-card-value">{filteredAds.length - completedAds.length} / {filteredAds.length}</p>
          <p className="stat-card-sub">Active campaigns today</p>
        </div>
        <div className="card p-5 stat-card stat-card-accent-deep">
          <p className="stat-card-label">Coins Earnable</p>
          <p className="stat-card-value">+{formatNumber(totalEarnable)}</p>
          <p className="stat-card-sub">Coins remaining to earn</p>
        </div>
        <div className="card p-5 stat-card stat-card-accent-lavender">
          <p className="stat-card-label">Completed Today</p>
          <p className="stat-card-value">{completedAds.length}</p>
          <p className="stat-card-sub">Tasks finished</p>
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[var(--border)]">
        {PTC_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs whitespace-nowrap transition-all ${
              activeTab === tab.value
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:bg-[var(--background)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {filteredAds.map((ad) => {
          const isCompleted = completedAds.includes(ad.id);
          return (
            <div 
              key={ad.id} 
              className={`card p-5 flex flex-col justify-between transition-all border ${
                isCompleted 
                  ? 'opacity-60 bg-gray-50/70 border-gray-200' 
                  : 'hover:shadow-md hover:border-[var(--primary)]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="badge badge-primary uppercase font-bold tracking-wider text-[10px]">
                    {ad.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                    <Clock size={13} />
                    <span>{ad.duration}s</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-[var(--text-primary)] line-clamp-2 leading-tight mb-2">
                  {ad.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {ad.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[var(--primary)] font-bold text-sm">
                  <Coins size={16} />
                  <span>+{ad.reward} Coins</span>
                </div>

                {isCompleted ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                    <CheckCircle size={14} /> Done
                  </span>
                ) : (
                  <Button 
                    variant="primary" 
                    size="sm"
                    leftIcon={<Eye size={13} />}
                    onClick={() => startAdView(ad)}
                  >
                    View Ad
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Advertiser CTA Banner */}
      <div className="card p-6 bg-gradient-to-r from-blue-900 to-[var(--deep)] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-white/10 text-white"><Sparkles size={16} /></span>
            <h3 className="font-bold text-base">Want Thousands of Real Crypto Visitors?</h3>
          </div>
          <p className="text-xs text-white/70 max-w-xl">
            Promote your website, Telegram channel, affiliate link, or YouTube video to over 25,000+ active crypto enthusiasts with high CTR.
          </p>
        </div>
        <Button 
          variant="secondary" 
          className="bg-white text-[var(--deep)] hover:bg-white/90 border-0 font-bold flex-shrink-0"
          rightIcon={<ArrowRight size={15} />}
          onClick={() => alert('Opening Advertiser Campaign Creator...')}
        >
          Advertise Now
        </Button>
      </div>

      {/* Live Ad Viewing Modal */}
      <Modal
        isOpen={!!activeAd}
        onClose={() => {
          if (timerRemaining > 0 && !confirm('Leaving now will forfeit your reward coins. Exit anyway?')) return;
          setActiveAd(null);
        }}
        title={`Viewing Advertisement: ${activeAd?.title || ''}`}
        maxWidth="max-w-2xl"
      >
        {activeAd && (
          <div className="space-y-5">
            {/* Countdown Banner */}
            <div className="p-4 bg-[var(--deep)] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-mono font-bold text-xl text-yellow-300">
                  {timerRemaining}s
                </div>
                <div>
                  <p className="text-xs text-white/70">Reward for viewing:</p>
                  <p className="text-base font-bold text-white flex items-center gap-1.5">
                    <Coins size={16} className="text-yellow-400" /> +{activeAd.reward} Coins
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full sm:w-48 bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-yellow-400 h-full transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${((activeAd.duration - timerRemaining) / activeAd.duration) * 100}%` }}
                />
              </div>
            </div>

            {/* Ad Content Mock Preview */}
            <div className="border border-[var(--border)] rounded-2xl p-6 bg-[var(--background)] text-center space-y-3 min-h-[180px] flex flex-col items-center justify-center">
              <span className="badge badge-primary uppercase text-xs">Live Sponsored Frame</span>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{activeAd.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-md">{activeAd.description}</p>
              <a 
                href={activeAd.url} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs text-[var(--primary)] font-semibold hover:underline"
              >
                Visit advertiser landing page <ExternalLink size={12} />
              </a>
            </div>

            {/* Anti-Bot Verification / Math Captcha when timer finishes */}
            {timerRemaining === 0 && !claimSuccess && (
              <form onSubmit={handleVerifyCaptcha} className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-[var(--primary)]" />
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Anti-Bot Verification</h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">Solve the simple math equation below to claim your coins:</p>
                
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2.5 bg-white border border-[var(--border)] rounded-xl font-bold font-mono text-base text-[var(--deep)]">
                    {captchaNumbers.a} + {captchaNumbers.b} = ?
                  </div>
                  <input
                    type="number"
                    required
                    placeholder="Enter answer"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="input-field max-w-[140px] font-mono text-base font-bold text-center"
                    autoFocus
                  />
                  <Button type="submit" variant="primary">
                    Verify & Claim
                  </Button>
                </div>
              </form>
            )}

            {/* Claim Success State */}
            {claimSuccess && (
              <div className="p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 flex items-center justify-center gap-3 font-bold text-sm animate-bounce">
                <CheckCircle size={20} className="text-green-600" />
                <span>Success! +{activeAd.reward} Coins credited to your wallet balance.</span>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PtcPage;
