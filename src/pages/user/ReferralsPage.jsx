import React, { useState } from 'react';
import { Copy, Users, Coins, Gift, Share2, CheckCircle2, Link as LinkIcon, TrendingUp } from 'lucide-react';

const ReferralsPage = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://kryptobux.com/ref/user123";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Referral Program</h1>
        <p className="text-gray-600 text-sm">Invite your friends and earn a lifetime commission from their earnings.</p>
      </div>

      {/* Hero Banner - Clean solid colors */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-10 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="w-full md:w-3/5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4 border border-blue-100">
            <Gift className="w-4 h-4" /> Earn 20% Commission
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
            Build your passive crypto income.
          </h2>
          <p className="text-gray-600 text-base mb-8 max-w-lg">
            Share your link everywhere. When your friends complete tasks, surveys, or claim from the faucet, you instantly get a 20% bonus.
          </p>
          
          {/* Link Box */}
          <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 flex items-center justify-between max-w-md">
            <div className="flex items-center px-4 overflow-hidden">
              <LinkIcon className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
              <span className="text-gray-700 font-mono text-sm truncate font-medium">{referralLink}</span>
            </div>
            <button 
              onClick={handleCopy}
              className={`flex items-center justify-center px-5 py-2.5 rounded-md font-bold transition-colors ${
                copied 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <><CheckCircle2 className="w-4 h-4 mr-2" /> Copied</>
              ) : (
                <><Copy className="w-4 h-4 mr-2" /> Copy</>
              )}
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-2/5 flex justify-center">
          {/* Simple, clean graphic */}
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 text-center w-full max-w-sm">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wide">Total Invited</div>
            <div className="text-gray-900 text-4xl font-black mb-4">2,841</div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md border border-emerald-100">
              <TrendingUp className="w-4 h-4" />
              <span className="font-bold text-sm">+45,000 PEPE</span>
            </div>
          </div>
        </div>

      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4 border border-blue-100">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Active Referrals</div>
            <div className="text-xl font-bold text-gray-900">142</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center mr-4 border border-emerald-100">
            <Coins className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Total Earned</div>
            <div className="text-xl font-bold text-gray-900">84,500 PEPE</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mr-4 border border-purple-100">
            <Share2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Link Clicks</div>
            <div className="text-xl font-bold text-gray-900">1,204</div>
          </div>
        </div>
      </div>

      {/* How it Works & Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: How it works */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
              How it works
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gray-100">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                  1
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">Share Link</h4>
                  <p className="text-sm text-gray-600">Send your link to friends or post it online.</p>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                  2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">They Earn</h4>
                  <p className="text-sm text-gray-600">Your friends join and start completing tasks.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                  3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                  <h4 className="font-bold text-emerald-900 mb-1">You Earn</h4>
                  <p className="text-sm text-emerald-700">You instantly get 20% of their earnings.</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Right Column: Recent Referrals Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-bold text-gray-900">Recent Referrals</h3>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Commission Generated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { id: 1, user: 'CryptoKing99', date: 'Today, 10:42 AM', amount: '+450 PEPE' },
                    { id: 2, user: 'SarahJ', date: 'Yesterday', amount: '+1,200 PEPE' },
                    { id: 3, user: 'MikeTrader', date: 'Sep 01, 2026', amount: '+340 PEPE' },
                    { id: 4, user: 'AlexB', date: 'Aug 29, 2026', amount: '+8,450 PEPE' },
                    { id: 5, user: 'Elena88', date: 'Aug 28, 2026', amount: '+120 PEPE' },
                  ].map((ref) => (
                    <tr key={ref.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs mr-3">
                            {ref.user.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-900">{ref.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ref.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-emerald-600">
                        {ref.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
              <p className="text-sm text-gray-600">
                You have <span className="font-bold text-gray-900">142</span> total active referrals.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ReferralsPage;
