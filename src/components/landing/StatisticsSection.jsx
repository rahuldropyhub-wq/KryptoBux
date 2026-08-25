import { motion } from 'framer-motion';
import { PLATFORM_STATS } from '@/utils/constants';

const StatisticsSection = () => {
  return (
    <section className="bg-[var(--deep)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {PLATFORM_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-white/60 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
