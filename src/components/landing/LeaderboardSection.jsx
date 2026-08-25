import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

const topThree = [
  { rank: 2, name: 'Sarah Smith', coins: '18,420 Coins', avatar: 'https://i.pravatar.cc/150?u=sarah', crown: '#94A3B8' }, // Silver
  { rank: 1, name: 'John Doe', coins: '24,560 Coins', avatar: 'https://i.pravatar.cc/150?u=john', crown: '#FBBF24', isFirst: true }, // Gold
  { rank: 3, name: 'David Brown', coins: '15,200 Coins', avatar: 'https://i.pravatar.cc/150?u=david', crown: '#B45309' } // Bronze
];

const runnersUp = [
  { rank: 4, name: 'Michael Johnson', earnings: '12,450 Coins' },
  { rank: 5, name: 'Emily Davis', earnings: '10,230 Coins' },
  { rank: 6, name: 'James Wilson', earnings: '8,760 Coins' },
  { rank: 7, name: 'Olivia Martinez', earnings: '7,540 Coins' },
  { rank: 8, name: 'William Taylor', earnings: '6,340 Coins' }
];

const LeaderboardSection = () => {
  return (
    <section id="leaderboard" className="py-12 lg:py-16 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Laurels in Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-5 pointer-events-none">
        <svg width="200" height="400" viewBox="0 0 100 200"><path d="M10,100 C10,50 50,10 90,10 C50,50 10,100 10,100 Z" fill="currentColor"/></svg>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-5 pointer-events-none transform scale-x-[-1]">
        <svg width="200" height="400" viewBox="0 0 100 200"><path d="M10,100 C10,50 50,10 90,10 C50,50 10,100 10,100 Z" fill="currentColor"/></svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-purple-100 rounded-full mb-4">
            <p className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider">TOP EARNERS</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#030514] mb-4">Leaderboard</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-[15px]">
            Top users based on earnings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center mb-12">
          
          {/* Left: Podium */}
          <div className="flex items-end justify-center gap-4 lg:gap-6 flex-1 max-w-[600px] w-full">
            {topThree.map((user) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: user.isFirst ? 0 : 0.2 }}
                className={`bg-white rounded-3xl p-4 md:p-6 text-center shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col items-center relative ${user.isFirst ? 'w-[38%] pb-8 lg:pb-10 z-10 -translate-y-4' : 'w-[31%] z-0'}`}
              >
                <div className="absolute -top-6">
                  <Crown size={user.isFirst ? 40 : 32} color={user.crown} fill={user.crown} className="drop-shadow-md" />
                </div>
                <div className={`rounded-full overflow-hidden mb-4 border-4 bg-slate-100 ${user.isFirst ? 'w-20 h-20 md:w-24 md:h-24 mt-4 border-[#FBBF24]' : 'w-16 h-16 md:w-20 md:h-20 mt-2 border-[#94A3B8]'}`}>
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[#030514] font-bold text-[13px] md:text-[15px] leading-tight mb-1">{user.name}</h3>
                <p className="text-[#7C3AED] font-bold text-[12px] md:text-[14px]">{user.coins}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: Table */}
          <div className="flex-1 w-full max-w-[500px]">
            <div className="bg-transparent">
              <div className="flex px-4 py-3 border-b-2 border-slate-200">
                <span className="w-16 font-bold text-xs text-slate-400 uppercase tracking-wider">Rank</span>
                <span className="flex-1 font-bold text-xs text-slate-400 uppercase tracking-wider">User</span>
                <span className="text-right font-bold text-xs text-slate-400 uppercase tracking-wider">Earnings</span>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                {runnersUp.map((user, i) => (
                  <motion.div 
                    key={user.rank}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-center px-4 py-4 rounded-xl hover:bg-white hover:shadow-sm transition-all"
                  >
                    <span className="w-16 font-bold text-slate-500">{user.rank}</span>
                    <span className="flex-1 font-semibold text-[#030514]">{user.name}</span>
                    <span className="text-right text-[13px] text-slate-500 font-medium">{user.earnings}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="inline-flex items-center justify-center px-8 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-semibold text-[15px] transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            View Full Leaderboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
