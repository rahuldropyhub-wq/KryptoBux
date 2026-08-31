import React, { useState } from 'react';
import { 
  RefreshCw, Trophy, Sparkles, Coins, Zap, Gift, 
  CheckCircle, Flame, Clock, Award, History
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import useWalletStore from '@/store/walletStore';
import { formatNumber, formatDateTime } from '@/utils/formatters';

const wheelSegments = [
  { id: 0, label: '50 Coins', value: 50, type: 'coins', color: '#234398' },
  { id: 1, label: '100 Coins', value: 100, type: 'coins', color: '#25275E' },
  { id: 2, label: '250 Coins', value: 250, type: 'coins', color: '#f59e0b' },
  { id: 3, label: '50 Energy', value: 50, type: 'energy', color: '#06b6d4' },
  { id: 4, label: '500 Coins', value: 500, type: 'coins', color: '#16a34a' },
  { id: 5, label: '+1 Free Spin', value: 1, type: 'spin', color: '#8b5cf6' },
  { id: 6, label: '1,000 Coins', value: 1000, type: 'coins', color: '#dc2626' },
  { id: 7, label: 'Mystery Box', value: 350, type: 'mystery', color: '#ec4899' },
];

const mockSpinHistory = [
  { id: 'SP-1', prize: '100 Coins', time: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: 'SP-2', prize: '50 Energy', time: new Date(Date.now() - 86400000).toISOString() },
  { id: 'SP-3', prize: '250 Coins', time: new Date(Date.now() - 86400000 * 2).toISOString() },
];

const SpinWheelPage = () => {
  const { addTransaction } = useWalletStore();
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [history, setHistory] = useState(mockSpinHistory);
  const [winModalOpen, setWinModalOpen] = useState(false);

  const handleSpin = () => {
    if (spinsLeft <= 0 || isSpinning) return;

    setIsSpinning(true);
    setSpinsLeft(prev => prev - 1);
    setWonPrize(null);

    // Pick random winning segment
    const winningIndex = Math.floor(Math.random() * wheelSegments.length);
    const prize = wheelSegments[winningIndex];

    // Calculate rotation: 8 segments = 45 deg per segment
    // Additional full spins (5 * 360 = 1800 deg)
    const segmentAngle = 360 / wheelSegments.length;
    const targetAngle = 360 - (winningIndex * segmentAngle) - (segmentAngle / 2);
    const newTotalDegree = rotationDegree + 1800 + (targetAngle - (rotationDegree % 360));

    setRotationDegree(newTotalDegree);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prize);
      setWinModalOpen(true);

      if (prize.type === 'coins' || prize.type === 'mystery') {
        addTransaction({
          id: `TX-${Math.floor(Math.random() * 90000 + 10000)}`,
          type: 'bonus',
          desc: `Lucky Spin Wheel Prize (${prize.label})`,
          amount: prize.value,
          currency: 'Coins',
          time: new Date().toISOString(),
          status: 'completed'
        });
      } else if (prize.type === 'spin') {
        setSpinsLeft(prev => prev + 1);
      }

      setHistory(prev => [{
        id: `SP-${Date.now()}`,
        prize: prize.label,
        time: new Date().toISOString()
      }, ...prev]);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Lucky Spin Wheel</h1>
          <p className="page-subtitle">Spin the wheel daily to win mystery prizes, extra energy, and up to 1,000 Coins</p>
        </div>
      </div>

      {/* Main Wheel Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Wheel */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 lg:p-10 card bg-gradient-to-b from-white to-[var(--background)] border border-[var(--border)] relative">
          
          {/* Indicator Pointer Pin */}
          <div className="z-30 -mb-5 flex flex-col items-center">
            <div className="w-6 h-8 bg-red-600 rounded-b-full shadow-lg border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          {/* SVG Rotating Wheel */}
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-2xl rounded-full"
              style={{
                transform: `rotate(${rotationDegree}deg)`,
                transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
              }}
            >
              {wheelSegments.map((segment, index) => {
                const angle = 360 / wheelSegments.length;
                const startAngle = index * angle;
                const endAngle = startAngle + angle;
                const rad = (Math.PI / 180);
                
                // SVG sector arc math
                const x1 = 200 + 190 * Math.cos(startAngle * rad);
                const y1 = 200 + 190 * Math.sin(startAngle * rad);
                const x2 = 200 + 190 * Math.cos(endAngle * rad);
                const y2 = 200 + 190 * Math.sin(endAngle * rad);
                
                const textAngle = startAngle + angle / 2;
                const tx = 200 + 120 * Math.cos(textAngle * rad);
                const ty = 200 + 120 * Math.sin(textAngle * rad);

                return (
                  <g key={segment.id}>
                    <path
                      d={`M200,200 L${x1},${y1} A190,190 0 0,1 ${x2},${y2} Z`}
                      fill={segment.color}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                    <text
                      x={tx}
                      y={ty}
                      fill="#ffffff"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                    >
                      {segment.label}
                    </text>
                  </g>
                );
              })}
              {/* Outer Golden Ring */}
              <circle cx="200" cy="200" r="192" fill="none" stroke="#f59e0b" strokeWidth="6" />
            </svg>

            {/* Center Spin Hub */}
            <div className="absolute w-20 h-20 bg-white rounded-full shadow-2xl border-4 border-amber-400 flex items-center justify-center z-20">
              <Trophy size={28} className="text-amber-500 animate-pulse" />
            </div>
          </div>

          {/* Spin Trigger CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 w-full max-w-xs">
            <Button
              variant="primary"
              size="lg"
              className="w-full font-black tracking-wider text-base py-4 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 border-0 shadow-xl"
              disabled={spinsLeft <= 0 || isSpinning}
              loading={isSpinning}
              onClick={handleSpin}
            >
              {isSpinning ? 'SPINNING...' : `SPIN NOW (${spinsLeft} LEFT)`}
            </Button>
            
            <p className="text-xs text-[var(--text-secondary)]">
              Daily Free Spins: <strong className="text-[var(--text-primary)]">{spinsLeft} available</strong>
            </p>
          </div>
        </div>

        {/* Right: How to get more spins & History */}
        <div className="lg:col-span-5 space-y-6">
          <Card title="How to Get More Spins" subtitle="Never run out of lucky wheel chances">
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center flex-shrink-0">
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">Exchange Energy for Spins</h4>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Complete Shortlinks to earn Energy. 100 Energy = 1 Free Spin.</p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mt-2 text-xs py-1"
                    onClick={() => {
                      setSpinsLeft(prev => prev + 1);
                      alert('Exchanged 100 Energy for 1 Free Spin!');
                    }}
                  >
                    Exchange 100 Energy ⚡
                  </Button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                  <Trophy size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">Upgrade VIP Level</h4>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">VIP members get up to 15 free daily spins automatically refreshed every day at 00:00 UTC.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Wins */}
          <Card title="Your Recent Spins" subtitle="Recent prizes won on the wheel">
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--background)] text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-500" />
                    <span className="font-bold text-[var(--text-primary)]">{item.prize}</span>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)]">{formatDateTime(item.time)}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Win Modal */}
      <Modal
        isOpen={winModalOpen}
        onClose={() => setWinModalOpen(false)}
        title="🎉 Lucky Spin Winner!"
        maxWidth="max-w-sm"
      >
        <div className="text-center space-y-4 py-3">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <Sparkles size={40} />
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] uppercase font-semibold">You Won</p>
            <h3 className="text-2xl font-black text-[var(--text-primary)] mt-1">{wonPrize?.label}</h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Reward has been credited to your balance. Spin again or come back tomorrow for more free tokens!
          </p>
          <Button variant="primary" className="w-full font-bold" onClick={() => setWinModalOpen(false)}>
            Collect Prize & Continue
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SpinWheelPage;
