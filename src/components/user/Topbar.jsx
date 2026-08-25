import { Link } from 'react-router-dom';
import { Menu, Bell, Coins, ChevronDown } from 'lucide-react';
import useAppStore from '@/store/appStore';
import useAuthStore from '@/store/authStore';
import useWalletStore from '@/store/walletStore';
import { getInitials, formatNumber } from '@/utils/formatters';
import { ROUTES } from '@/utils/constants';

const Topbar = ({ title = '', subtitle = '' }) => {
  const { toggleSidebar } = useAppStore();
  const { user } = useAuthStore();
  const { balance } = useWalletStore();

  return (
    <header
      className="fixed top-0 right-0 bg-white z-[90] flex items-center justify-between px-6 border-b border-[var(--border-light)]"
      style={{
        left: 'var(--sidebar-width)',
        height: 'var(--topbar-height)',
        boxShadow: 'var(--shadow-topbar)',
      }}
    >
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all"
        >
          <Menu size={20} />
        </button>
        <div>
          {title && <h1 className="text-lg font-bold text-[var(--text-primary)] leading-none">{title}</h1>}
          {subtitle && <p className="text-xs text-[var(--text-secondary)] mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {/* Right: Balance + Notifications + Avatar */}
      <div className="flex items-center gap-3">
        {/* Coin Balance */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] rounded-lg border border-[var(--border-light)]">
          <Coins size={15} className="text-[var(--primary)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {formatNumber(balance)} Coins
          </span>
        </div>

        {/* Notifications */}
        <Link to={ROUTES.NOTIFICATIONS} className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </Link>

        {/* Avatar */}
        <Link to={ROUTES.PROFILE} className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[var(--deep)] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {getInitials(user?.name || 'KB')}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
