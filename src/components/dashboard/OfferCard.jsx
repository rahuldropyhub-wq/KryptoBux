import React from 'react';
import { Smartphone, MonitorSmartphone } from 'lucide-react';

const OfferCard = ({ offer, onClick }) => {
  return (
    <div 
      onClick={() => onClick(offer)}
      className="group relative flex-shrink-0 w-48 sm:w-52 h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Background Image */}
      <img 
        src={offer.image} 
        alt={offer.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80';
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Provider Badge - Top Right */}
      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[9px] font-bold text-white uppercase tracking-wider">
        {offer.provider}
      </div>

      {/* Content - Bottom Aligned */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col">
        <h3 className="text-white font-bold text-base truncate mb-1" title={offer.title}>
          {offer.title}
        </h3>
        
        <div className="flex items-center mb-3">
          {offer.platform === 'android' && (
            <div className="flex items-center text-green-400 text-xs font-medium">
              <Smartphone className="w-3.5 h-3.5 mr-1" /> Android
            </div>
          )}
          {offer.platform === 'ios' && (
            <div className="flex items-center text-gray-300 text-xs font-medium">
              <Smartphone className="w-3.5 h-3.5 mr-1" /> iOS
            </div>
          )}
          {offer.platform === 'both' && (
            <div className="flex items-center text-blue-400 text-xs font-medium">
              <MonitorSmartphone className="w-3.5 h-3.5 mr-1" /> All Devices
            </div>
          )}
        </div>
        
        {/* Reward Badge */}
        <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 w-full">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-1.5 shadow-sm mr-2 flex items-center justify-center">
            <span className="text-sm leading-none drop-shadow-md">🪙</span>
          </div>
          <div>
            <div className="text-white font-black text-sm leading-none">
              {offer.reward.toLocaleString()}
            </div>
            <div className="text-[9px] text-yellow-300 font-bold uppercase tracking-wider mt-0.5">
              Tokens
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
