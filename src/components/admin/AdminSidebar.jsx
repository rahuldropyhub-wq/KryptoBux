import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Wallet, List, Monitor, Link2,
  Megaphone, Droplets, Star, Ticket, UserPlus, Diamond,
  RefreshCw, Flame, Trophy, BarChart2, Download, HelpCircle,
  Send, Bell, FileText, Shield, Settings, LogOut, X
} from 'lucide-react';
import useAppStore from '@/store/appStore';
import useAuthStore from '@/store/authStore';
import { ROUTES } from '@/utils/constants';

const adminNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.ADMIN },
  { label: 'Users', icon: Users, href: ROUTES.ADMIN_USERS },
  { label: 'Wallets', icon: Wallet, href: ROUTES.ADMIN_WALLETS },
  { label: 'Transactions', icon: List, href: ROUTES.ADMIN_TRANSACTIONS },
  { label: 'PTC', icon: Monitor, href: ROUTES.ADMIN_PTC },
  { label: 'Shortlinks', icon: Link2, href: ROUTES.ADMIN_SHORTLINKS },
  { label: 'Advertisements', icon: Megaphone, href: ROUTES.ADMIN_ADVERTISEMENTS },
  { label: 'Faucet', icon: Droplets, href: ROUTES.ADMIN_FAUCET },
  { label: 'Daily Bonus', icon: Star, href: ROUTES.ADMIN_DAILY_BONUS },
  { label: 'Coupons', icon: Ticket, href: ROUTES.ADMIN_COUPONS },
  { label: 'Referrals', icon: UserPlus, href: ROUTES.ADMIN_REFERRALS },
  { label: 'VIP Levels', icon: Diamond, href: ROUTES.ADMIN_VIP },
  { label: 'Spin Wheel', icon: RefreshCw, href: ROUTES.ADMIN_SPIN_WHEEL },
  { label: 'Streaks', icon: Flame, href: ROUTES.ADMIN_STREAKS },
  { label: 'Challenges', icon: Trophy, href: ROUTES.ADMIN_CHALLENGES },
  { label: 'Leaderboard', icon: BarChart2, href: ROUTES.ADMIN_LEADERBOARD },
  { label: 'Withdrawals', icon: Download, href: ROUTES.ADMIN_WITHDRAWALS },
  { label: 'Tickets', icon: HelpCircle, href: ROUTES.ADMIN_TICKETS },
  { label: 'Telegram', icon: Send, href: ROUTES.ADMIN_TELEGRAM },
  { label: 'Notifications', icon: Bell, href: ROUTES.ADMIN_NOTIFICATIONS },
  { label: 'Reports', icon: FileText, href: ROUTES.ADMIN_REPORTS },
  { label: 'Security', icon: Shield, href: ROUTES.ADMIN_SECURITY },
  { label: 'Settings', icon: Settings, href: ROUTES.ADMIN_SETTINGS },
];

const AdminSidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  const Content = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <div>
          <p className="font-bold text-white text-base tracking-tight">KRYPTO BUX</p>
          <p className="text-white/30 text-xs mt-0.5 uppercase tracking-widest">Admin Console</p>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
          <X size={16} />
        </button>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto">
        {adminNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === ROUTES.ADMIN}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-nav-item sidebar-admin ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={15} className="flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-white/10">
        <button onClick={handleLogout} className="sidebar-nav-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="sidebar sidebar-admin hidden lg:flex flex-col">
        <Content />
      </aside>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[190] lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="sidebar sidebar-admin flex flex-col lg:hidden z-[200]" style={{ transform: 'none' }}>
              <Content />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
