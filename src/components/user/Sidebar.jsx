import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, Wallet, Monitor, Link2, Droplets,
  Star, Ticket, Users, Diamond, RefreshCw, Flame, Trophy,
  BarChart2, Download, List, Bell, HelpCircle, Send, Settings, LogOut, X
} from 'lucide-react';
import useAppStore from '@/store/appStore';
import useAuthStore from '@/store/authStore';
import { ROUTES } from '@/utils/constants';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.DASHBOARD },
  { label: 'Profile', icon: User, href: ROUTES.PROFILE },
  { label: 'Wallet', icon: Wallet, href: ROUTES.WALLET },
  { label: 'PTC', icon: Monitor, href: ROUTES.PTC },
  { label: 'Shortlinks', icon: Link2, href: ROUTES.SHORTLINKS },
  { label: 'Faucet', icon: Droplets, href: ROUTES.FAUCET },
  { label: 'Daily Bonus', icon: Star, href: ROUTES.DAILY_BONUS },
  { label: 'Coupons', icon: Ticket, href: ROUTES.COUPONS },
  { label: 'Referral', icon: Users, href: ROUTES.REFERRALS },
  { label: 'VIP Level', icon: Diamond, href: ROUTES.VIP },
  { label: 'Spin Wheel', icon: RefreshCw, href: ROUTES.SPIN_WHEEL },
  { label: 'Streak Rewards', icon: Flame, href: ROUTES.STREAKS },
  { label: 'Challenges', icon: Trophy, href: ROUTES.CHALLENGES },
  { label: 'Leaderboard', icon: BarChart2, href: ROUTES.LEADERBOARD },
  { label: 'Withdraw', icon: Download, href: ROUTES.WITHDRAW },
  { label: 'Transactions', icon: List, href: ROUTES.TRANSACTIONS },
  { label: 'Notifications', icon: Bell, href: ROUTES.NOTIFICATIONS },
  { label: 'Support', icon: HelpCircle, href: ROUTES.SUPPORT },
  { label: 'Telegram', icon: Send, href: ROUTES.TELEGRAM },
  { label: 'Settings', icon: Settings, href: ROUTES.SETTINGS },
];

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <div>
          <p className="font-bold text-white text-base tracking-tight">KRYPTO BUX</p>
          <p className="text-white/40 text-xs mt-0.5">Rewards Platform</p>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
          <X size={16} />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={16} className="flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="sidebar-nav-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={16} className="flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar hidden lg:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-[190] lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="sidebar flex flex-col lg:hidden z-[200]"
              style={{ transform: 'none' }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
