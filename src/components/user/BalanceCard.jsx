import { Coins, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatNumber } from '@/utils/formatters';
import { ROUTES } from '@/utils/constants';

const BalanceCard = ({ balance = 0, totalEarned = 0, todayEarnings = 0 }) => {
  return (
    <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--deep) 0%, var(--primary) 100%)' }}>
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 right-8 w-24 h-24 bg-white/5 rounded-full translate-y-8" />

      <div className="relative z-10">
        <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-1">Available Balance</p>
        <div className="flex items-end gap-2 mb-5">
          <span className="text-4xl font-bold">{formatNumber(balance)}</span>
          <span className="text-white/60 mb-1">Coins</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-white/50 mb-0.5">Total Earned</p>
            <p className="text-base font-semibold">{formatNumber(totalEarned)}</p>
          </div>
          <div>
            <p className="text-xs text-white/50 mb-0.5">Today</p>
            <p className="text-base font-semibold text-green-300">+{formatNumber(todayEarnings)}</p>
          </div>
        </div>

        <Link
          to={ROUTES.WITHDRAW}
          className="flex items-center gap-2 justify-center w-full py-2.5 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-semibold transition-all border border-white/20"
        >
          <Download size={15} />
          Withdraw Coins
        </Link>
      </div>
    </div>
  );
};

export default BalanceCard;
