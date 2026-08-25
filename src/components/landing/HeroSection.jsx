import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck, Gift, Wallet, Headset, Users, Briefcase, Database, ClipboardCheck, Trophy } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-4 lg:pt-28 lg:pb-6 flex flex-col justify-center bg-[url('/hero1.png')] bg-cover bg-center bg-no-repeat">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-8 flex-1">
          {/* Left: Text Content (Span 7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
              <Gift size={12} className="text-[#A78BFA]" />
              <span className="text-[10px] font-bold text-white tracking-widest uppercase">EARN - TASK - REDEEM</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-[4rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Earn <span className="text-[#9333EA]">Crypto Rewards</span><br />
              The Smart Way
            </h1>

            {/* Subtitle */}
            <p className="text-[15px] text-slate-300 mb-10 max-w-[480px] leading-relaxed font-light">
              Complete simple tasks, watch ads, refer friends,<br className="hidden sm:block" />
              and earn exciting crypto rewards.<br className="hidden sm:block" />
              Withdraw securely to your wallet with lowest minimum.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to={ROUTES.REGISTER} className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-semibold text-[15px] transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                Start Earning Now
                <ArrowRight size={18} />
              </Link>
              <a href="#how-it-works" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-xl font-semibold text-[15px] transition-all">
                Learn More
                <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                  <Play size={10} className="fill-current ml-0.5" />
                </div>
              </a>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-4 pt-8">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 text-white font-semibold text-[13px]">
                  <ShieldCheck size={16} className="text-[#A78BFA]" />
                  100% Secure
                </div>
                <span className="text-[10px] text-slate-400 pl-6">Safe & Trusted Platform</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 text-white font-semibold text-[13px]">
                  <img src="/icons/gift-outline.svg" alt="" className="w-4 h-4 object-contain opacity-80" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                  <Gift size={16} className="text-[#A78BFA] hidden" />
                  Instant Rewards
                </div>
                <span className="text-[10px] text-slate-400 pl-6">Quick Token Credits</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 text-white font-semibold text-[13px]">
                  <Wallet size={16} className="text-[#A78BFA]" />
                  Low Minimum
                </div>
                <span className="text-[10px] text-slate-400 pl-6">Min. Withdraw 500 Coins</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 text-white font-semibold text-[13px]">
                  <Headset size={16} className="text-[#A78BFA]" />
                  24/7 Support
                </div>
                <span className="text-[10px] text-slate-400 pl-6">We're Here For You</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Empty space to let the background image shine through */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-full min-h-[400px]">
            {/* The wallet and glows are now part of the background image `home-hero.png` */}
          </div>
        </div>

        {/* Bottom Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full bg-[#080B1E] border border-white/10 rounded-2xl p-5 lg:px-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative z-30 mt-4 translate-y-1/2 lg:translate-y-[60%]"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2 divide-y md:divide-y-0 md:divide-x divide-white/10">

            <div className="flex items-center gap-3 md:px-2 lg:px-4 py-2 md:py-0">
              <Users size={28} className="text-[#8B5CF6] shrink-0" />
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white leading-tight">125K+</h3>
                <p className="text-[10px] text-slate-400">Total Users</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:px-2 lg:px-4 py-2 md:py-0">
              <Briefcase size={28} className="text-[#8B5CF6] shrink-0" />
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white leading-tight">2.45M+</h3>
                <p className="text-[10px] text-slate-400">Total Earnings</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:px-2 lg:px-4 py-2 md:py-0">
              <Database size={28} className="text-[#8B5CF6] shrink-0" />
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white leading-tight">850K+</h3>
                <p className="text-[10px] text-slate-400">Total Withdrawn</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:px-2 lg:px-4 py-2 md:py-0">
              <ClipboardCheck size={28} className="text-[#8B5CF6] shrink-0" />
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white leading-tight">12.5M+</h3>
                <p className="text-[10px] text-slate-400">Tasks Completed</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:px-2 lg:px-4 py-2 md:py-0">
              <Trophy size={28} className="text-[#FBBF24] shrink-0" />
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white leading-tight">4.8K+</h3>
                <p className="text-[10px] text-slate-400">Active Rewards</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
