import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Wallet, List, Monitor, Link2,
  Megaphone, Droplets, Star, Ticket, UserPlus, Diamond,
  RefreshCw, Flame, Trophy, BarChart2, Download, HelpCircle,
  Send, Bell, FileText, Shield, Settings, LogOut, X, ChevronRight,
  ShieldCheck, Sparkles
} from 'lucide-react';
import useAppStore from '@/store/appStore';
import useAuthStore from '@/store/authStore';
import { ROUTES } from '@/utils/constants';

const navSections = [
  {
    title: 'CORE & ANALYTICS',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.ADMIN },
      { label: 'Reports & Analytics', icon: FileText, href: ROUTES.ADMIN_REPORTS },
    ]
  },
  {
    title: 'USERS & FINANCE',
    items: [
      { label: 'Users Directory', icon: Users, href: ROUTES.ADMIN_USERS },
      { label: 'Treasury & Wallets', icon: Wallet, href: ROUTES.ADMIN_WALLETS },
      { label: 'Master Transactions', icon: List, href: ROUTES.ADMIN_TRANSACTIONS },
      { label: 'Withdrawals Queue', icon: Download, href: ROUTES.ADMIN_WITHDRAWALS, badge: '3' },
    ]
  },
  {
    title: 'EARNING ENGINES',
    items: [
      { label: 'PTC Advertisements', icon: Monitor, href: ROUTES.ADMIN_PTC },
      { label: 'Shortlink Providers', icon: Link2, href: ROUTES.ADMIN_SHORTLINKS },
      { label: 'Ad Placements & Banners', icon: Megaphone, href: ROUTES.ADMIN_ADVERTISEMENTS },
      { label: 'Hourly Faucet', icon: Droplets, href: ROUTES.ADMIN_FAUCET },
      { label: 'Daily Bonus & Streak', icon: Star, href: ROUTES.ADMIN_DAILY_BONUS },
      { label: 'Coupons & Promo Codes', icon: Ticket, href: ROUTES.ADMIN_COUPONS },
      { label: 'Referral & Anti-Fraud', icon: UserPlus, href: ROUTES.ADMIN_REFERRALS },
    ]
  },
  {
    title: 'REWARDS & GAMIFICATION',
    items: [
      { label: 'VIP Club Levels', icon: Diamond, href: ROUTES.ADMIN_VIP },
      { label: 'Lucky Spin Wheel', icon: RefreshCw, href: ROUTES.ADMIN_SPIN_WHEEL },
      { label: 'Streak Milestones', icon: Flame, href: ROUTES.ADMIN_STREAKS },
      { label: 'Quests & Challenges', icon: Trophy, href: ROUTES.ADMIN_CHALLENGES },
      { label: 'Leaderboard Pools', icon: BarChart2, href: ROUTES.ADMIN_LEADERBOARD },
    ]
  },
  {
    title: 'SUPPORT & SECURITY',
    items: [
      { label: 'Support Tickets', icon: HelpCircle, href: ROUTES.ADMIN_TICKETS, badge: '1' },
      { label: 'Telegram Broadcast', icon: Send, href: ROUTES.ADMIN_TELEGRAM },
      { label: 'Push Notifications', icon: Bell, href: ROUTES.ADMIN_NOTIFICATIONS },
      { label: 'Security & IP Firewall', icon: Shield, href: ROUTES.ADMIN_SECURITY },
      { label: 'System Settings', icon: Settings, href: ROUTES.ADMIN_SETTINGS },
    ]
  }
];

const AdminSidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const Content = () => (
    <div className="flex flex-col h-full bg-[#0B0F19] text-slate-300 border-r border-slate-800/60 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800/80 bg-gradient-to-r from-[#0B0F19] to-[#111827]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black text-sm">
            KB
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-sm tracking-tight">KRYPTO BUX</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">PRO</span>
            </div>
            <p className="text-slate-400 text-[10px] uppercase font-semibold tracking-wider">Admin Console</p>
          </div>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)} 
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav List with Sections */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold tracking-wider text-slate-300/90 uppercase mb-2">
              {section.title}
            </h4>
            {section.items.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === ROUTES.ADMIN}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md shadow-blue-600/25 ring-1 ring-white/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <item.icon 
                        size={16} 
                        className={`transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} 
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white text-blue-600' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Admin Profile & Logout Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#0E1424]">
        <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">Super Admin</p>
              <p className="text-[10px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Master
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Log Out"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className="sidebar sidebar-admin hidden lg:flex flex-col"
        style={{ width: '250px' }}
      >
        <Content />
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[190] lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="sidebar sidebar-admin flex flex-col lg:hidden z-[200]"
              style={{ width: '250px', transform: 'none' }}
            >
              <Content />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
