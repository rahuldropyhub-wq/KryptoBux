import React from 'react';
import { Check } from 'lucide-react';

const ActivityTimeline = ({ timeline }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full flex flex-col">
      <h2 className="text-base font-semibold text-vie-text mb-4">Recent Activity</h2>
      
      <div className="flex-1 relative">
        <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gray-100"></div>
        <div className="space-y-4">
          {timeline.map((item) => (
            <div key={item.id} className="relative flex items-start">
              <div className="absolute left-0 mt-0.5 w-6 h-6 rounded-full bg-green-50 border border-green-200 flex items-center justify-center z-10">
                <Check className="w-3 h-3 text-vie-success" />
              </div>
              <div className="ml-10">
                <p className="text-sm font-medium text-vie-text">{item.action}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
