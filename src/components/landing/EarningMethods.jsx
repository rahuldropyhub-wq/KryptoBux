import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MonitorPlay, Link as LinkIcon, Droplets, Gift, Users, Trophy } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

const methods = [
  {
    id: 1,
    title: 'Watch & Earn (PTC)',
    description: 'Watch ads and videos, complete tasks and earn tokens instantly.',
    icon: MonitorPlay,
    route: ROUTES.REWARDS
  },
  {
    id: 2,
    title: 'Shortlinks',
    description: 'Complete shortlinks and unlock exciting coin rewards.',
    icon: LinkIcon,
    route: ROUTES.REWARDS
  },
  {
    id: 3,
    title: 'Faucet',
    description: 'Claim free tokens every hour from our high paying faucet.',
    icon: Droplets,
    route: ROUTES.REWARDS
  },
  {
    id: 4,
    title: 'Daily Bonus',
    description: 'Login daily and claim bonus rewards absolutely free.',
    icon: Gift,
    route: ROUTES.REWARDS
  },
  {
    id: 5,
    title: 'Refer & Earn',
    description: 'Invite friends and earn lifelong referral commissions.',
    icon: Users,
    route: ROUTES.REWARDS
  },
  {
    id: 6,
    title: 'Challenges & More',
    description: 'Join challenges, spin wheel, complete streaks and win big rewards.',
    icon: Trophy,
    route: ROUTES.REWARDS
  }
];

const EarningMethods = () => {
  return (
    <section id="features" className="pt-16 pb-8 lg:pt-12 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-14 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-purple-100 rounded-full mb-4">
            <p className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider">Many Ways to Earn</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#030514] mb-4">Multiple Ways to Earn</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-[15px]">
            Choose your favorite way and start earning crypto rewards today
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-6">
          {methods.map((method, i) => {
            const Icon = method.icon;
            // Define custom icon colors based on the design
            const isTrophy = method.id === 6;
            
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="h-full"
              >
                <Link to={method.route} className="block bg-white rounded-2xl p-5 xl:p-6 text-center hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-slate-100 h-full group">
                  <div className="w-16 h-16 mx-auto bg-[#F4F0FF] rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon 
                      size={28} 
                      strokeWidth={2.5}
                      className={isTrophy ? "text-[#F59E0B]" : "text-[#4338CA]"} 
                      fill={isTrophy ? "#FCD34D" : "transparent"}
                    />
                  </div>
                  <h3 className="text-[15px] font-bold text-[#030514] mb-3 leading-tight">{method.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{method.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EarningMethods;
