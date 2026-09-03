import React from 'react';
import { BadgeCheck, ShieldCheck, HeartPulse, UserCircle2, CalendarDays, Receipt } from 'lucide-react';

const CampaignHero = ({ campaign }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
      {/* Campaign Image */}
      <div className="w-full lg:w-5/12 h-[300px] lg:h-auto relative bg-gray-100">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-[#234398] px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 border border-white">
            <BadgeCheck size={14} className="text-[#16A34A]" />
            Verified Campaign
          </span>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="w-full lg:w-7/12 p-6 md:p-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-[#EEF2FF] text-[#234398] px-3 py-1 rounded-full text-xs font-bold border border-[#234398]/10">
            {campaign.category}
          </span>
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 flex items-center gap-1">
            <ShieldCheck size={14} />
            Verified Orphan Case
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
          {campaign.title}
        </h2>

        <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
          {campaign.description}
        </p>

        {/* Patient Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <UserCircle2 size={14} /> Patient
            </span>
            <span className="text-gray-900 font-bold text-sm">{campaign.patientName}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <CalendarDays size={14} /> Age
            </span>
            <span className="text-gray-900 font-bold text-sm">{campaign.age}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <HeartPulse size={14} /> Condition
            </span>
            <span className="text-gray-900 font-bold text-sm">{campaign.condition}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <Receipt size={14} /> Target
            </span>
            <span className="text-[#6D4AFF] font-bold text-sm">{campaign.targetDisplay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignHero;
