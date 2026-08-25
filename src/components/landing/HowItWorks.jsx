import { motion } from 'framer-motion';
import { UserPlus, ClipboardCheck, Wallet, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Create Account',
    description: 'Sign up for free and secure your account.',
    icon: UserPlus
  },
  {
    id: 2,
    number: '02',
    title: 'Complete Tasks',
    description: 'Complete tasks, watch ads, claim bonuses and more.',
    icon: ClipboardCheck
  },
  {
    id: 3,
    number: '03',
    title: 'Earn & Withdraw',
    description: 'Earn crypto coins and withdraw to your wallet.',
    icon: Wallet
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="pt-8 pb-12 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-purple-100 rounded-full mb-4">
            <p className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider">EASY STEPS</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#030514] mb-4">How It Works</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-[15px]">
            Start earning in just 3 simple steps
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 lg:gap-10 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex-1 flex relative w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] w-full relative z-10 flex flex-col"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-4xl lg:text-5xl font-bold text-[#7C3AED]/30">{step.number}</span>
                    <div className="flex-1 pt-1">
                      <h3 className="text-[16px] lg:text-lg font-bold text-[#030514] mb-2">{step.title}</h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed mb-6">{step.description}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#F4F0FF] rounded-xl flex items-center justify-center self-end mt-auto">
                     <Icon size={18} className="text-[#4338CA]" strokeWidth={2.5} />
                  </div>
                </motion.div>
                
                {/* Connecting Arrow for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-5 lg:-right-8 z-0 top-1/2 -translate-y-1/2 items-center justify-center text-[#7C3AED]/40">
                    <ArrowRight size={20} className="lg:w-6 lg:h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
