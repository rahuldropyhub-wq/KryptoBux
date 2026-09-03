import React from 'react';
import { NavLink } from 'react-router-dom';
import { Wallet, Heart, Info, FileText, Activity } from 'lucide-react';
import Button from '@/components/common/Button';

const navItems = [
  { name: 'Campaigns', path: '/campaigns', icon: Heart },
  { name: 'How It Works', path: '#how-it-works', icon: Info },
  { name: 'Transparency', path: '#transparency', icon: FileText },
  { name: 'Transactions', path: '#transactions', icon: Activity },
];

const DonationHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#234398] rounded-xl flex items-center justify-center shadow-sm">
            <Heart className="w-6 h-6 text-white fill-white/20" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Orphan Donation</h1>
            <p className="text-xs text-[#6D4AFF] font-semibold">Verified Charity Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.path}
              className="flex items-center gap-2 text-gray-600 hover:text-[#234398] transition-colors font-medium text-sm"
            >
              <item.icon size={16} />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-4">
          <Button 
            variant="primary" 
            className="bg-[#234398] hover:bg-[#25275E] text-white shadow-md flex items-center gap-2"
          >
            <Wallet size={18} />
            <span className="hidden sm:inline">Connect Wallet</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DonationHeader;
