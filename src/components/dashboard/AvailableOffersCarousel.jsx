import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchOffers } from '../../services/mockOfferApi';
import OfferCard from './OfferCard';
import OfferModal from './OfferModal';
import { Link } from 'react-router-dom';

const AvailableOffersCarousel = () => {
  const [offers, setOffers] = useState([]);
  const [totalOffers, setTotalOffers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filters
  const [osFilter, setOsFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('reward');

  // Modal
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Scroll ref
  const scrollContainerRef = useRef(null);

  const loadOffers = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetchOffers({ os: osFilter, sort: sortFilter, limit: 10 });
      if (res.success) {
        setOffers(res.data.offers);
        setTotalOffers(res.data.total);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, [osFilter, sortFilter]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const osTabs = [
    { id: 'all', label: 'All Devices' },
    { id: 'android', label: 'Android' },
    { id: 'ios', label: 'iOS' }
  ];

  return (
    <div className="bg-gradient-to-br from-[#121626] to-[#0A0D18] rounded-2xl border border-white/10 shadow-xl p-5 sm:p-6 w-full mb-6 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-vie-primary/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 relative z-10">
        <div>
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white mr-3 tracking-tight">Top Earning Offers</h2>
            {!loading && !error && (
              <span className="bg-white/10 text-blue-300 border border-white/10 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalOffers} available
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">Play games, try apps, and earn massive token rewards instantly.</p>
        </div>
        
        <Link 
          to="/offerwall" 
          className="hidden sm:flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-xl"
        >
          Explore All Offers <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>
      </div>

      {/* FILTER SECTION */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 relative z-10">
        
        {/* Custom Segmented OS Tabs */}
        <div className="flex items-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider w-12 hidden md:block">OS</span>
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl w-full md:w-auto">
            {osTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setOsFilter(tab.id)}
                className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  osFilter === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Select */}
        <div className="flex items-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider w-20 md:w-16 hidden md:block">Sort</span>
          <div className="relative w-full md:w-48">
            <select 
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
              className="w-full text-sm py-2 pl-4 pr-8 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 rounded-xl appearance-none cursor-pointer"
            >
              <option value="reward" className="bg-gray-900">Highest Reward</option>
              <option value="lowest" className="bg-gray-900">Lowest Reward</option>
              <option value="newest" className="bg-gray-900">Newest</option>
              <option value="popular" className="bg-gray-900">Most Popular</option>
            </select>
          </div>
        </div>

      </div>

      {/* CAROUSEL SECTION */}
      <div className="relative group z-10">
        
        {/* State: Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-10 bg-red-900/20 rounded-2xl border border-red-500/20">
            <AlertCircle className="w-10 h-10 text-red-400 mb-3" />
            <p className="text-red-200 font-medium mb-3">Unable to load offers. Please try again.</p>
            <button 
              onClick={loadOffers}
              className="flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-colors text-sm font-semibold"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Retry
            </button>
          </div>
        )}

        {/* State: Empty */}
        {!loading && !error && offers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 bg-white/5 rounded-2xl border border-white/10 border-dashed">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">📭</span>
            </div>
            <h3 className="text-white font-bold mb-1">
              {osFilter !== 'all' ? `No ${osFilter === 'android' ? 'Android' : 'iOS'} offers available` : 'No offers available'}
            </h3>
            <p className="text-sm text-gray-400 mb-4 text-center max-w-sm">Check back later for new opportunities or change your filters.</p>
            <button 
              onClick={() => {setOsFilter('all'); setSortFilter('reward');}}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm font-semibold shadow-lg shadow-blue-900/50"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* State: Loading or Loaded */}
        {(!error && (loading || offers.length > 0)) && (
          <>
            {/* Desktop Navigation Arrows */}
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-[#1A1F36] border border-white/20 rounded-full shadow-xl flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-400/50 transition-all opacity-0 group-hover:opacity-100 hidden sm:flex focus:outline-none"
              aria-label="Previous offers"
            >
              <ChevronLeft className="w-6 h-6 pr-0.5" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 sm:gap-5 pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {loading ? (
                // Skeletons - Dark mode style matching poster cards
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={`skel-${i}`} className="flex-shrink-0 w-48 sm:w-52 h-64 rounded-2xl bg-white/5 border border-white/5 overflow-hidden flex flex-col justify-end snap-start animate-pulse relative">
                     <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="h-4 bg-white/10 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
                        <div className="h-10 bg-white/10 rounded-xl"></div>
                     </div>
                  </div>
                ))
              ) : (
                // Actual Offers
                offers.map((offer) => (
                  <div key={offer.id} className="snap-start py-1">
                    <OfferCard 
                      offer={offer} 
                      onClick={() => setSelectedOffer(offer)} 
                    />
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-[#1A1F36] border border-white/20 rounded-full shadow-xl flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-400/50 transition-all opacity-0 group-hover:opacity-100 hidden sm:flex focus:outline-none"
              aria-label="Next offers"
            >
              <ChevronRight className="w-6 h-6 pl-0.5" />
            </button>
          </>
        )}
      </div>

      <Link 
        to="/offerwall" 
        className="mt-4 flex sm:hidden items-center justify-center w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-blue-400 border border-white/10 transition-colors"
      >
        View All Offers
      </Link>

      {/* MODAL PORTAL */}
      {selectedOffer && (
        <OfferModal 
          offer={selectedOffer} 
          onClose={() => setSelectedOffer(null)} 
        />
      )}
      
    </div>
  );
};

export default AvailableOffersCarousel;
