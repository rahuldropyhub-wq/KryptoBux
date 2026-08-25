import { Menu, Bell, Shield } from 'lucide-react';
import useAppStore from '@/store/appStore';
import useAuthStore from '@/store/authStore';
import { getInitials } from '@/utils/formatters';

const AdminTopbar = ({ title = 'Admin Dashboard', subtitle = '' }) => {
  const { toggleSidebar } = useAppStore();
  const { user } = useAuthStore();

  return (
    <header
      className="fixed top-0 right-0 bg-white z-[90] flex items-center justify-between px-6 border-b border-[var(--border-light)]"
      style={{ left: 'var(--sidebar-width)', height: 'var(--topbar-height)', boxShadow: 'var(--shadow-topbar)' }}
    >
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all">
          <Menu size={20} />
        </button>
        <div>
          {title && <h1 className="text-lg font-bold text-[var(--text-primary)] leading-none">{title}</h1>}
          {subtitle && <p className="text-xs text-[var(--text-secondary)] mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[var(--lavender)] rounded-lg">
          <Shield size={13} className="text-[var(--primary)]" />
          <span className="text-xs font-semibold text-[var(--primary)]">Admin</span>
        </div>
        <button className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-9 h-9 bg-[var(--primary)] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">{getInitials(user?.name || 'AD')}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
