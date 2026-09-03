import React, { useState } from 'react';
import { Ticket, Gift, AlertCircle, CheckCircle2 } from 'lucide-react';

const CouponsPage = () => {
  const [couponCode, setCouponCode] = useState('');
  const [status, setStatus] = useState(null);

  const handleRedeem = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    // Mock API call
    setStatus('loading');
    setTimeout(() => {
      if (couponCode.toLowerCase() === 'welcome') {
        setStatus({ type: 'success', message: 'Successfully redeemed 500 PEPE!' });
      } else {
        setStatus({ type: 'error', message: 'Invalid or expired coupon code.' });
      }
      setCouponCode('');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Redeem Coupon</h1>
          <p className="text-gray-600 text-sm">Enter a promo code to receive free rewards.</p>
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center">
          <Ticket className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Main Form Area */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="p-6 sm:p-10">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <Gift className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Got a Promo Code?</h2>
              <p className="text-gray-600 text-sm">
                Follow our social media channels or join our Telegram group to find special coupon codes for free PEPE and XP.
              </p>
            </div>

            <form onSubmit={handleRedeem} className="space-y-4">
              <div>
                <label htmlFor="coupon" className="block text-sm font-semibold text-gray-700 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. WELCOME2026"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase placeholder:normal-case font-mono"
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || !couponCode.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Redeem Code'
                )}
              </button>
            </form>

            {/* Status Messages */}
            {status && status.type === 'error' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start text-red-700">
                <AlertCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}
            
            {status && status.type === 'success' && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start text-emerald-700">
                <CheckCircle2 className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}

          </div>
        </div>
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500 font-medium">Coupons are case-insensitive and can only be used once per account.</p>
        </div>
      </div>

    </div>
  );
};

export default CouponsPage;
