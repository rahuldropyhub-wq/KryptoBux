import React from 'react';
import { Wallet, Search, Coins, Edit3, CheckCircle2, LineChart } from 'lucide-react';

const steps = [
  { num: '01', title: 'Connect Wallet', desc: 'Link your Web3 wallet securely.', icon: Wallet },
  { num: '02', title: 'Choose Campaign', desc: 'Select a verified medical case.', icon: Search },
  { num: '03', title: 'Select Token', desc: 'Choose your preferred crypto.', icon: Coins },
  { num: '04', title: 'Enter Amount', desc: 'Input your donation size.', icon: Edit3 },
  { num: '05', title: 'Confirm', desc: 'Sign transaction securely.', icon: CheckCircle2 },
  { num: '06', title: 'Track Impact', desc: 'See real-time progress.', icon: LineChart },
];

const HowItWorksTimeline = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-10 text-center">How It Works</h3>
      
      <div className="relative">
        {/* Horizontal Connector (Desktop) */}
        <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 bg-gray-100 -z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-row md:flex-col items-center text-left md:text-center gap-4 md:gap-3 group">
              <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-[#234398] transition-colors shadow-sm relative bg-white z-10">
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-[#EEF2FF] text-[#234398] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm text-xs">
                  {step.num}
                </span>
                <step.icon size={28} className="text-gray-400 group-hover:text-[#6D4AFF] transition-colors" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm md:text-base">{step.title}</h4>
                <p className="text-xs text-gray-500 mt-1 md:mt-2 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksTimeline;
