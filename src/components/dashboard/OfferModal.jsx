import React, { useState } from 'react';
import { X, Clock, ShieldCheck, ExternalLink, Smartphone, MonitorSmartphone } from 'lucide-react';
import { startOffer } from '../../services/mockOfferApi';

const OfferModal = ({ offer, onClose }) => {
  const [starting, setStarting] = useState(false);
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    setStarting(true);
    try {
      // Simulate backend tracking ID generation and redirect
      const res = await startOffer(offer.id);
      if (res.success) {
        setStarted(true);
        // Normally this would be a redirect like: window.open(res.data.trackingUrl, '_blank');
        setTimeout(() => {
          window.open('https://example.com/offer-redirect', '_blank');
          onClose(); // Close modal after opening
        }, 800);
      }
    } catch (error) {
      console.error("Failed to start offer", error);
      setStarting(false);
    }
  };

  if (!offer) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto overflow-x-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Image */}
        <div className="relative h-32 w-full bg-gray-100 flex-shrink-0">
          <img 
            src={offer.image} 
            alt={offer.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">{offer.title}</h2>
              <p className="text-xs text-gray-500 mt-0.5">by {offer.provider}</p>
            </div>
            <div className="flex items-center space-x-2">
              {offer.platform === 'android' && <span className="p-1.5 bg-green-50 text-green-600 rounded"><Smartphone className="w-4 h-4"/></span>}
              {offer.platform === 'ios' && <span className="p-1.5 bg-gray-100 text-gray-600 rounded"><Smartphone className="w-4 h-4"/></span>}
              {offer.platform === 'both' && <span className="p-1.5 bg-blue-50 text-blue-600 rounded"><MonitorSmartphone className="w-4 h-4"/></span>}
            </div>
          </div>

          <div className="flex items-center bg-orange-50 border border-orange-100 rounded-xl p-2.5 my-3">
            <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
              <span className="text-xl leading-none">🪙</span>
            </div>
            <div>
              <div className="text-[10px] text-orange-600 font-semibold uppercase tracking-wider mb-0.5">Reward</div>
              <div className="text-lg font-black text-orange-600 leading-none">
                {offer.reward.toLocaleString()} <span className="text-sm font-bold">Tokens</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-3 leading-relaxed">
            {offer.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
              <div className="flex items-center text-gray-500 mb-1">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                <span className="text-[10px] font-medium uppercase">Est. Time</span>
              </div>
              <div className="text-xs font-semibold text-gray-800">{offer.estimatedTime}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
              <div className="flex items-center text-gray-500 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                <span className="text-[10px] font-medium uppercase">Requirements</span>
              </div>
              <div className="text-xs font-semibold text-gray-800">{offer.requirements.length} Steps</div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xs font-bold text-gray-900 mb-1.5">Requirements to earn:</h3>
            <ul className="space-y-1.5">
              {offer.requirements.map((req, i) => (
                <li key={i} className="flex items-start text-xs text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-vie-primary mt-1.5 mr-2 flex-shrink-0"></div>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-[10px] text-gray-400 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
            <strong className="text-gray-500">Terms:</strong> {offer.terms}
          </div>

          <button 
            onClick={handleStart}
            disabled={starting || started}
            className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center transition-all ${
              started 
                ? 'bg-green-500 text-white'
                : starting 
                  ? 'bg-vie-primary/70 text-white cursor-not-allowed'
                  : 'bg-vie-primary text-white hover:bg-vie-primary-hover shadow-md hover:shadow-vie-primary/30'
            }`}
          >
            {started ? (
              'Redirecting...'
            ) : starting ? (
              <div className="flex items-center text-sm">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Starting...
              </div>
            ) : (
              <div className="flex items-center text-sm">
                Start Offer <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
