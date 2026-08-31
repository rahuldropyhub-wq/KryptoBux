import React from 'react';
import { Menu, Bell, Shield, Search, Sparkles, ExternalLink } from 'lucide-react';
import useAppStore from '@/store/appStore';
import useAuthStore from '@/store/authStore';
import { getInitials } from '@/utils/formatters';
import { Link } from 'react-router-dom';

const AdminTopbar = ({ title = '', subtitle = '' }) => {
  const { toggleSidebar } = useAppStore();
  const { user } = useAuthStore();

  return (
    <header
      className="fixed top-0 right-0 left-0 lg:left-[250px] bg-white/95 backdrop-blur-md z-[90] flex items-center justify-between px-4 sm:px-8 border-b border-slate-200/80 shadow-xs transition-all duration-200"
      style={{ height: '68px' }}
    >
      {/* Left side */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all focus:outline-hidden"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        {title ? (
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight tracking-tight">{title}</h1>
            {subtitle && <p className="text-[11px] text-slate-500 font-medium">{subtitle}</p>}
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-700">Cluster Status:</span>
            <span className="text-emerald-700 font-bold">100% Operational</span>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Link to User Panel / Site view */}
        <Link
          to="/dashboard"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
          title="Open User Portal in new tab"
        >
          <span>User Portal</span>
          <ExternalLink size={13} />
        </Link>

        {/* Notifications */}
        <Link
          to="/admin/tickets"
          className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
          title="Pending Tickets"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </Link>

        {/* Admin Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
            {getInitials(user?.name || 'Admin')}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-black text-slate-900 leading-none">Super Admin</p>
            <p className="text-[10px] text-blue-600 font-bold mt-0.5 uppercase tracking-wider">Root Access</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
