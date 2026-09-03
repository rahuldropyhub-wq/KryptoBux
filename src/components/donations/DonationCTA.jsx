import React from 'react';
import { HeartHandshake, Share2 } from 'lucide-react';
import Button from '@/components/common/Button';

const DonationCTA = ({ onDonate, onShare }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <Button 
        variant="primary" 
        className="flex-1 bg-[#234398] hover:bg-[#25275E] text-white py-4 text-lg font-bold shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
        onClick={onDonate}
      >
        <HeartHandshake size={24} />
        Donate Now
      </Button>
      
      <Button 
        variant="secondary" 
        className="flex-1 sm:flex-none sm:w-1/3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 py-4 text-lg font-bold shadow-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
        onClick={onShare}
      >
        <Share2 size={20} />
        Share
      </Button>
    </div>
  );
};

export default DonationCTA;
