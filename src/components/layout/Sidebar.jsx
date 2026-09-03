import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, UsersRound, BarChart3, Download, Ticket, Star, Calendar, 
  Flame, Gift, ClipboardList, Link as LinkIcon, MousePointer, Sparkles, 
  Megaphone, Mail, Newspaper, MessageCircle, User, LogOut, ChevronDown, Target, Heart
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [offerwallOpen, setOfferwallOpen] = useState(false);
  const [advertiserOpen, setAdvertiserOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Referrals', icon: UsersRound, path: '/referrals' },
    { name: 'Leaderboard', icon: BarChart3, path: '/leaderboard' },
    { name: 'Withdraw', icon: Download, path: '/withdraw' },
    { name: 'Coupon', icon: Ticket, path: '/coupons', badge: { text: 'HOT', color: 'bg-vie-danger' } },
    { name: 'Lottery', icon: Star, path: '/lottery' },
    { name: 'Spin Wheel', icon: Target, path: '/spin-wheel' },
    { name: 'Daily Bonus', icon: Calendar, path: '/daily-bonus' },
    { name: 'Challenges', icon: Flame, path: '/challenges' },
    { name: 'Donation', icon: Heart, path: '/campaign/123', badge: { text: 'NEW', color: 'bg-emerald-500' } },
  ];

  const earningItems = [
    { name: 'Faucet', icon: Gift, path: '/faucet' },
    { name: 'Offerwall', icon: ClipboardList, expandable: true, open: offerwallOpen, setOpen: setOfferwallOpen },
    { name: 'Shortlinks', icon: LinkIcon, path: '/shortlinks', badge: { text: '276', color: 'bg-vie-success' } },
    { name: 'PTC', icon: MousePointer, path: '/ptc', badge: { text: '191', color: 'bg-vie-success' } },
    { name: 'Advertiser', icon: Megaphone, expandable: true, open: advertiserOpen, setOpen: setAdvertiserOpen },
  ];

  const bottomItems = [
    { name: 'Tickets', icon: Mail, path: '/support' },
    { name: 'Fanpage', icon: Newspaper, path: '/fanpage' },
    { name: 'Telegram Group', icon: MessageCircle, path: '/telegram' },
    { name: 'Account', icon: User, path: '/profile' },
    { name: 'Logout', icon: LogOut, path: '/logout' },
  ];

  const renderNavItem = (item, index) => {
    if (item.expandable) {
      return (
        <div key={`exp-${index}`} className="mb-1">
          <button 
            onClick={() => item.setOpen(!item.open)}
            className="group w-full flex items-center justify-between px-4 py-3 mx-2 mb-1 rounded-xl text-white/80 hover:bg-white/15 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out"
          >
            <div className="flex items-center">
              <item.icon className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
              <span className="text-[15px] font-medium">{item.name}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${item.open ? 'rotate-180' : ''}`} />
          </button>
          {item.open && (
            <div className="pl-12 py-1 space-y-1 mx-2 transition-all duration-300">
              <div className="text-white/70 text-sm hover:text-white hover:translate-x-1 transition-transform cursor-pointer py-1.5">Sub-item 1</div>
              <div className="text-white/70 text-sm hover:text-white hover:translate-x-1 transition-transform cursor-pointer py-1.5">Sub-item 2</div>
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.name}
        to={item.path}
        className={({ isActive }) => 
          `group flex items-center justify-between px-4 py-3 mx-2 mb-1 rounded-xl transition-all duration-300 ease-out ${
            isActive || (item.name === 'Dashboard' && item.path === '/') 
              ? 'bg-white/20 text-white font-bold shadow-lg translate-x-1 ring-1 ring-white/10' 
              : 'text-white/80 hover:bg-white/15 hover:text-white hover:translate-x-1'
          }`
        }
      >
        <div className="flex items-center">
          <item.icon className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
          <span className="text-[15px] font-medium tracking-wide">{item.name}</span>
        </div>
        {item.badge && (
          <span className={`${item.badge.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
            {item.badge.text}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <aside 
      className={`fixed lg:static top-0 left-0 z-30 h-full w-[260px] bg-gradient-to-b from-red-600 to-rose-400 flex flex-col transition-transform duration-300 ease-in-out transform shadow-xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <h1 className="text-white text-xl font-black tracking-wide">Vie Faucet</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <nav>
          {navItems.map(renderNavItem)}
        </nav>

        <nav className="mt-4">
          {earningItems.map(renderNavItem)}
        </nav>

        <div className="my-4 border-t border-white/10 mx-4"></div>

        <nav>
          {bottomItems.map(renderNavItem)}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
