import React from 'react';
import { Eye, ShieldCheck, BadgeCheck, Globe, Activity } from 'lucide-react';

const cards = [
  { title: '100% Transparent', desc: 'On-chain donation tracking', icon: Eye },
  { title: 'Secure & Safe', desc: 'Smart contract verification', icon: ShieldCheck },
  { title: 'Verified Campaigns', desc: 'Strict verification process', icon: BadgeCheck },
  { title: 'Global Community', desc: 'Support from donors worldwide', icon: Globe },
  { title: 'Real Impact', desc: 'Track campaign progress', icon: Activity },
];

const TransparencySection = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Transparency</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm hover:border-[#6D4AFF]/40 transition-colors group">
            <div className="w-12 h-12 mx-auto bg-[#EEF2FF] text-[#234398] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <card.icon size={24} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">{card.title}</h4>
            <p className="text-xs text-gray-500 leading-tight">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransparencySection;
