import React, { useState, useEffect } from 'react';
import { Target, Zap, Clock, Trophy, ChevronRight, CheckCircle2, Hexagon, Diamond, Coins } from 'lucide-react';

// Custom CSS for the page animations
const customStyles = `
  .reward-engine-spin {
    transition: transform 4s cubic-bezier(0.1, 0.7, 0.1, 1);
  }
  .magnetic-pointer-active {
    animation: pulse-glow 1s infinite alternate;
  }
  @keyframes pulse-glow {
    0% { box-shadow: 0 0 10px rgba(110, 150, 255, 0.4); }
    100% { box-shadow: 0 0 25px rgba(110, 150, 255, 0.8); }
  }
  .particle-float {
    animation: float 10s infinite linear;
  }
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    20% { opacity: 0.5; }
    80% { opacity: 0.5; }
    100% { transform: translateY(-100px) rotate(180deg); opacity: 0; }
  }
  .edge-light {
    animation: edge-pulse 2s infinite alternate;
  }
  @keyframes edge-pulse {
    0% { box-shadow: 0 0 10px #234398, inset 0 0 10px #234398; }
    100% { box-shadow: 0 0 30px #6e96ff, inset 0 0 30px #6e96ff; }
  }
  /* Confetti animations */
  .confetti-piece {
    position: absolute;
    width: 8px;
    height: 16px;
    opacity: 0;
    animation: confetti-fall 3s ease-in-out forwards;
  }
  @keyframes confetti-fall {
    0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
`;

const SpinWheelPage = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [wonReward, setWonReward] = useState(null);
  const [spinsLeft, setSpinsLeft] = useState(1);
  
  const segments = [
    { label: '+0.0001 BTC', color: 'bg-[#1e224f]', text: 'text-white' },
    { label: '+5 USDT', color: 'bg-[#151736]', text: 'text-gray-300' },
    { label: '+1 Free Spin', color: 'bg-[#234398]', text: 'text-white' },
    { label: '+100 Points', color: 'bg-[#151736]', text: 'text-gray-300' },
    { label: '+0.001 ETH', color: 'bg-[#1e224f]', text: 'text-white' },
    { label: 'Try Again', color: 'bg-[#0f1123]', text: 'text-gray-500' },
    { label: '+25 USDT', color: 'bg-[#1e224f]', text: 'text-white' },
    { label: '+500 Points', color: 'bg-[#234398]', text: 'text-white' },
    { label: '+10 USDT', color: 'bg-[#151736]', text: 'text-gray-300' },
    { label: 'Try Again', color: 'bg-[#0f1123]', text: 'text-gray-500' },
  ];

  const handleSpin = () => {
    if (spinsLeft <= 0 || isSpinning) return;
    
    setIsSpinning(true);
    setSpinsLeft(prev => prev - 1);
    
    // Calculate random rotation
    const extraSpins = 5; // spins 5 times before landing
    const randomSegment = Math.floor(Math.random() * segments.length);
    // Determine angle to land exactly in the middle of a segment
    const segmentAngle = 360 / segments.length;
    // We subtract the random segment angle to point to it, pointer is at top (0 deg)
    const targetAngle = (360 - (randomSegment * segmentAngle)) - (segmentAngle / 2);
    const newRotation = rotation + (extraSpins * 360) + targetAngle;
    
    setRotation(newRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(segments[randomSegment].label);
      if (segments[randomSegment].label !== 'Try Again') {
        setShowModal(true);
        triggerConfetti();
      }
    }, 4000);
  };

  const [confetti, setConfetti] = useState([]);
  
  const triggerConfetti = () => {
    const pieces = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      delay: Math.random() * 0.5 + 's',
      color: ['#234398', '#6e96ff', '#e2dced', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
    }));
    setConfetti(pieces);
  };

  return (
    <div className="min-h-screen bg-[#25275E] text-white p-4 sm:p-8 rounded-xl font-sans relative overflow-hidden">
      <style>{customStyles}</style>
      
      {/* Background Ambient Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#234398] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 2. HERO HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#151736]/80 border border-[#234398]/50 px-4 py-1.5 rounded-full text-sm font-medium text-[#E2DCED] mb-6 shadow-[0_0_15px_rgba(35,67,152,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Spin available
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-lg">
            SPIN & EARN
          </h1>
          <p className="text-lg md:text-xl text-[#E2DCED]/70 font-light max-w-2xl mx-auto">
            Take your chance and unlock today’s crypto reward.
          </p>
        </div>

        {spinsLeft > 0 || isSpinning ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            
            {/* Left: Reward Previews */}
            <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-4">
              <div className="text-xs font-bold tracking-widest text-[#E2DCED]/50 uppercase mb-2">Today's Possible Rewards</div>
              
              {[
                { label: 'BTC', amount: '0.0001 BTC', chance: '2%' },
                { label: 'ETH', amount: '0.001 ETH', chance: '5%' },
                { label: 'USDT', amount: '50 USDT', chance: '10%' },
                { label: 'POINTS', amount: '500 Points', chance: '20%' },
              ].map((reward, i) => (
                <div key={i} className="bg-gradient-to-r from-[#151736] to-[#1e224f] border border-[#234398]/30 p-4 rounded-xl flex items-center justify-between group hover:border-[#234398] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#25275E] border border-white/5 flex items-center justify-center">
                      <Hexagon className="w-5 h-5 text-[#E2DCED]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#E2DCED]/60 font-semibold">{reward.label}</div>
                      <div className="text-sm font-bold">{reward.amount}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-[#234398] bg-[#234398]/10 px-2 py-1 rounded">
                    {reward.chance}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. MAIN SPIN AREA */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
              <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] flex items-center justify-center">
                
                {/* Side Lighting Animation Ring */}
                <div className="absolute inset-0 rounded-full edge-light opacity-60"></div>
                
                {/* Outer Glass Ring */}
                <div className="absolute inset-2 sm:inset-4 rounded-full border border-white/20 shadow-[0_0_50px_rgba(35,67,152,0.3)] bg-[#151736]/40 backdrop-blur-md p-3 sm:p-4 z-10">
                  
                  {/* The Wheel */}
                  <div 
                    className="w-full h-full rounded-full border border-white/5 relative overflow-hidden reward-engine-spin shadow-inner bg-[#0f1123]"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* Render Segments using SVG for precise borders */}
                    <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 -rotate-90">
                      {segments.map((seg, i) => {
                        const deg = 360 / segments.length;
                        const strokeDasharray = `${(deg / 360) * 314.159} 314.159`;
                        const strokeDashoffset = `-${(i * deg / 360) * 314.159}`;
                        const isPrimary = seg.color.includes('234398');
                        
                        return (
                          <circle
                            key={i}
                            cx="50" cy="50" r="50"
                            fill="transparent"
                            stroke={isPrimary ? '#234398' : (i % 2 === 0 ? '#1e224f' : '#151736')}
                            strokeWidth="100"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-300"
                          />
                        );
                      })}
                    </svg>

                    {/* Segment Labels */}
                    {segments.map((seg, i) => {
                      const deg = (360 / segments.length);
                      const angle = (i * deg) + (deg / 2);
                      return (
                        <div 
                          key={i}
                          className="absolute top-1/2 left-1/2 w-1/2 h-8 -mt-4 origin-left flex items-center justify-end pr-6 sm:pr-10 pointer-events-none"
                          style={{ transform: `rotate(${angle}deg)` }}
                        >
                          <span className={`text-[10px] sm:text-xs font-bold tracking-wider ${seg.text} whitespace-nowrap`}>
                            {seg.label}
                          </span>
                        </div>
                      );
                    })}
                    
                    {/* Inner Glass Overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/5 to-white/0"></div>
                  </div>
                </div>

                {/* 4. UNIQUE POINTER */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className={`w-6 h-6 rotate-45 border border-blue-400 bg-[#25275E] shadow-[0_0_15px_rgba(110,150,255,0.6)] flex items-center justify-center ${isSpinning ? 'magnetic-pointer-active' : ''}`}>
                    <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                  </div>
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 to-transparent"></div>
                </div>

                {/* Center Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-[#0a0c1a] rounded-full border-4 border-[#25275E] flex flex-col items-center justify-center shadow-2xl relative">
                    <div className="absolute inset-0 rounded-full bg-[#234398] opacity-20 blur-md"></div>
                    <button
                      onClick={handleSpin}
                      disabled={isSpinning || spinsLeft <= 0}
                      className="relative z-10 flex flex-col items-center transition-transform hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:opacity-80 group cursor-pointer"
                    >
                      <span className="text-2xl font-black text-white tracking-widest group-hover:text-blue-300 transition-colors drop-shadow-md">
                        SPIN
                      </span>
                      <span className="text-[10px] font-medium text-[#E2DCED]/60 mt-1 tracking-wide uppercase text-center leading-tight">
                        {spinsLeft} Free Spin<br/>Available
                      </span>
                    </button>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Right: Empty space for balance/alignment or extra stats */}
            <div className="lg:col-span-3 order-3 hidden lg:flex flex-col gap-4">
               <div className="bg-[#151736]/80 border border-white/5 rounded-xl p-6 text-center">
                 <Diamond className="w-8 h-8 text-[#E2DCED]/40 mx-auto mb-3" />
                 <h4 className="font-semibold text-white mb-1">Premium Engine</h4>
                 <p className="text-xs text-[#E2DCED]/60">Provably fair Web3 algorithms ensure complete transparency.</p>
               </div>
            </div>

          </div>
        ) : (
          /* 9. EMPTY / LIMIT STATE */
          <div className="max-w-2xl mx-auto bg-[#151736]/50 border border-white/10 rounded-2xl p-12 text-center backdrop-blur-sm mb-20 shadow-2xl">
            <div className="w-20 h-20 bg-[#25275E] rounded-full flex items-center justify-center border border-white/10 mx-auto mb-6">
              <Clock className="w-10 h-10 text-[#E2DCED]/60" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Daily Spins Completed</h3>
            <p className="text-[#E2DCED]/70 mb-8 max-w-md mx-auto">
              You’ve used all your spins for today. Return tomorrow for another chance to unlock premium crypto rewards.
            </p>
            <div className="inline-flex items-center bg-[#0a0c1a] border border-white/5 px-6 py-3 rounded-lg mb-8">
              <span className="text-sm font-medium text-[#E2DCED]/60 mr-3">Next spin available in</span>
              <span className="font-mono text-xl font-bold text-[#234398]">04:32:18</span>
            </div>
            <div>
              <button className="bg-[#234398] hover:bg-[#1a3174] text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg">
                View Rewards
              </button>
            </div>
          </div>
        )}

        {/* 6. SPIN INFORMATION PANEL */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#151736]/40 border border-white/5 p-5 rounded-xl text-center backdrop-blur-sm">
            <div className="text-[11px] font-bold tracking-widest uppercase text-[#E2DCED]/50 mb-1">Daily Spins</div>
            <div className="text-2xl font-light font-mono text-white">01 / 03</div>
          </div>
          <div className="bg-[#151736]/40 border border-white/5 p-5 rounded-xl text-center backdrop-blur-sm">
            <div className="text-[11px] font-bold tracking-widest uppercase text-[#E2DCED]/50 mb-1">Next Spin</div>
            <div className="text-2xl font-light font-mono text-white">04:32:18</div>
          </div>
          <div className="bg-[#151736]/40 border border-white/5 p-5 rounded-xl text-center backdrop-blur-sm">
            <div className="text-[11px] font-bold tracking-widest uppercase text-[#E2DCED]/50 mb-1">Today's Earnings</div>
            <div className="text-2xl font-light font-mono text-[#234398]">$12.50</div>
          </div>
          <div className="bg-[#151736]/40 border border-white/5 p-5 rounded-xl text-center backdrop-blur-sm">
            <div className="text-[11px] font-bold tracking-widest uppercase text-[#E2DCED]/50 mb-1">Total Spins</div>
            <div className="text-2xl font-light font-mono text-white">128</div>
          </div>
        </div>

        {/* 7. RECENT WINNERS & 10. HOW IT WORKS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="lg:col-span-1 bg-[#151736]/40 border border-white/5 rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#E2DCED]/70 mb-5">Recent Rewards</h3>
            <div className="space-y-4">
              {[
                { user: '0x7F...92A1', reward: '+25 USDT', time: 'Just now' },
                { user: '0xA2...71BC', reward: '+500 Points', time: '2 min ago' },
                { user: '0x93...11FD', reward: '+0.001 ETH', time: '5 min ago' },
                { user: '0x4B...33E9', reward: '+10 USDT', time: '12 min ago' },
              ].map((w, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div>
                    <div className="font-mono text-sm text-white/90">{w.user}</div>
                    <div className="text-[10px] text-[#E2DCED]/50">{w.time}</div>
                  </div>
                  <div className="font-semibold text-[#234398] text-sm bg-[#234398]/10 px-2 py-1 rounded">
                    {w.reward}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-[#151736]/40 border border-white/5 rounded-xl p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#E2DCED]/70 mb-8 text-center md:text-left">
              How Spin & Earn Works
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Desktop Connecting Line */}
              <div className="hidden md:block absolute top-6 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#234398] to-transparent opacity-50"></div>
              
              {[
                { step: '01', title: 'Get a Spin', icon: Target },
                { step: '02', title: 'Spin Engine', icon: Zap },
                { step: '03', title: 'Win Crypto', icon: Trophy },
                { step: '04', title: 'Wallet Auto-Fill', icon: CheckCircle2 },
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center md:items-start text-center md:text-left z-10">
                  <div className="w-12 h-12 rounded-full bg-[#1e224f] border border-[#234398]/50 flex items-center justify-center mb-4 shadow-lg mx-auto md:mx-0">
                    <item.icon className="w-5 h-5 text-blue-300" />
                  </div>
                  <div className="text-[10px] font-bold text-[#234398] mb-1 font-mono">{item.step}</div>
                  <div className="text-sm font-semibold text-white/90">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 8. SPIN RESULT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-[#000000]/60 animate-in fade-in duration-300 overflow-hidden">
          
          {/* Confetti */}
          {confetti.map(c => (
            <div 
              key={c.id} 
              className="confetti-piece z-50"
              style={{
                left: c.left,
                backgroundColor: c.color,
                animationDelay: c.delay,
              }}
            ></div>
          ))}

          <div className="bg-[#151736] border border-[#234398]/50 rounded-2xl p-8 sm:p-12 text-center max-w-sm w-full relative overflow-hidden shadow-[0_0_100px_rgba(35,67,152,0.4)] animate-in zoom-in-95 duration-300 z-10">
            
            {/* Modal Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#234398] rounded-full blur-[80px] opacity-30"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#25275E] rounded-full border border-blue-400/30 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="w-8 h-8 text-blue-400" />
              </div>
              
              <h3 className="text-sm font-bold tracking-widest text-[#E2DCED]/60 uppercase mb-2">Congratulations</h3>
              <div className="text-4xl font-black text-white mb-3 drop-shadow-md">{wonReward}</div>
              <p className="text-sm text-[#E2DCED]/70 mb-8 font-light">
                Your reward has been added to your wallet securely.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full bg-[#234398] hover:bg-[#1a3174] text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-lg"
                >
                  Claim Reward
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full bg-transparent border border-white/10 hover:bg-white/5 text-white/80 font-medium py-3 px-6 rounded-xl transition-colors"
                >
                  View Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SpinWheelPage;
