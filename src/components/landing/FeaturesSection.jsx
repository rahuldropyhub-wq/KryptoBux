import { motion } from 'framer-motion';
import { Shield, Zap, LayoutGrid, Eye, Smartphone, Headphones } from 'lucide-react';
import { WHY_CHOOSE_US } from '@/utils/constants';

const iconMap = { Shield, Zap, LayoutGrid, Eye, Smartphone, HeadphonesIcon: Headphones };

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Why Krypto Bux</p>
          <h2 className="heading-lg mb-4">Built for Serious Earners</h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            We've built a platform that rewards your time fairly, processes payments securely, and keeps you earning consistently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Shield;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="card p-6 flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[var(--lavender)] rounded-xl flex items-center justify-center">
                  <Icon size={18} className="text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
