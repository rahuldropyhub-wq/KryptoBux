import React from 'react';
import { Gift, MousePointer, Link as LinkIcon, ClipboardList, Flame } from 'lucide-react';

const ActionCard = ({ title, desc, btnText, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
    <div className="flex items-start mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${colorClass} bg-opacity-10`}>
        <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-').replace('-500', '-600')}`} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-vie-text">{title}</h3>
        <p className="text-xs text-vie-text-muted mt-0.5">{desc}</p>
      </div>
    </div>
    
    <div className="mt-auto pt-3 border-t border-gray-100">
      <button className="w-full text-center text-sm font-medium text-vie-primary hover:bg-blue-50 py-1.5 rounded transition-colors">
        {btnText}
      </button>
    </div>
  </div>
);

const QuickEarningActions = () => {
  return (
    <div>
      <h2 className="text-base font-semibold text-vie-text mb-4">Start Earning</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <ActionCard 
          title="Faucet" 
          desc="Claim your next reward" 
          btnText="Claim Now" 
          icon={Gift} 
          colorClass="bg-blue-500" 
        />
        <ActionCard 
          title="PTC" 
          desc="View advertisements" 
          btnText="View Ads" 
          icon={MousePointer} 
          colorClass="bg-purple-500" 
        />
        <ActionCard 
          title="Shortlinks" 
          desc="Complete shortlinks" 
          btnText="Start" 
          icon={LinkIcon} 
          colorClass="bg-green-500" 
        />
        <ActionCard 
          title="Offerwall" 
          desc="Complete high-paying offers" 
          btnText="Explore" 
          icon={ClipboardList} 
          colorClass="bg-orange-500" 
        />
        <ActionCard 
          title="Challenges" 
          desc="Complete goals" 
          btnText="View Challenges" 
          icon={Flame} 
          colorClass="bg-red-500" 
        />
      </div>
    </div>
  );
};

export default QuickEarningActions;
