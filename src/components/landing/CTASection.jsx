import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gift } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

const CTASection = () => {
  return (
    <section id="cta" className="py-12 lg:py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#080B1E] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5"
        >
          {/* Subtle glowing orb in background */}
          <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-[#7C3AED]/30 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto relative z-10">
            {/* 3D Gift Box Placeholder */}
            <div className="hidden sm:flex w-32 h-32 relative">
               <div className="absolute inset-0 bg-gradient-to-br from-[#9333EA] to-[#4F46E5] rounded-2xl shadow-xl flex items-center justify-center -rotate-6 transform">
                  <Gift size={64} className="text-white drop-shadow-md" />
                  <div className="absolute w-full h-8 bg-white/20 top-1/2 -translate-y-1/2"></div>
                  <div className="absolute h-full w-8 bg-white/20 left-1/2 -translate-x-1/2"></div>
               </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-[28px] font-bold text-white mb-3 leading-tight">
                Ready to Start Your Crypto Journey?
              </h2>
              <p className="text-slate-300 text-[14px] leading-relaxed max-w-sm">
                Join thousands of users earning real crypto rewards every day with Krypto Bux.
              </p>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-auto">
            <Link to={ROUTES.REGISTER} className="flex items-center justify-center gap-2 px-8 py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-bold text-[15px] transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] whitespace-nowrap w-full md:w-auto">
              Create Free Account
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
