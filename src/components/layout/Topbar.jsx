import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, Menu, User as UserIcon } from 'lucide-react';

const Topbar = ({ toggleSidebar }) => {
  const [currency, setCurrency] = useState('BTC');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [liveRates, setLiveRates] = useState(null);

  // Fetch live market data from CoinGecko
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin,tron,solana,dogecoin,tether,shiba-inu,pepe,floki,bonk,the-open-network,binancecoin&vs_currencies=usd');
        if (!response.ok) throw new Error('API Rate Limit or Network Error');
        const data = await response.json();
        
        setLiveRates({
          'BTC': data['bitcoin']?.usd,
          'LTC': data['litecoin']?.usd,
          'TRX': data['tron']?.usd,
          'SOL': data['solana']?.usd,
          'DOGE': data['dogecoin']?.usd,
          'USDT': data['tether']?.usd,
          'SHIB': data['shiba-inu']?.usd,
          'PEPE': data['pepe']?.usd,
          'Floki': data['floki']?.usd,
          'Bonk': data['bonk']?.usd,
          'TON': data['the-open-network']?.usd,
          'BNB': data['binancecoin']?.usd
        });
      } catch (error) {
        console.error("Failed to fetch live crypto rates, using fallback.", error);
      }
    };
    
    fetchRates();
    // Update live rates every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getConvertedValue = (coin) => {
    const userCoins = 672;
    // Faucet standard: 100,000 coins = $1.00 USD
    const usdValue = userCoins / 100000; 

    // If live rates are available, calculate exact value
    if (liveRates && liveRates[coin]) {
      const cryptoAmount = usdValue / liveRates[coin];
      // Format based on the amount size (e.g. BTC needs 8 decimals, DOGE needs fewer)
      if (cryptoAmount < 0.0001) return cryptoAmount.toFixed(8);
      if (cryptoAmount < 1) return cryptoAmount.toFixed(6);
      return cryptoAmount.toFixed(2);
    }

    // Fallback static rates if API is still loading or failed
    const fallbackRates = {
      'BTC': '0.00000011',
      'LTC': '0.00010500',
      'TRX': '0.04500000',
      'SOL': '0.00004800',
      'DOGE': '0.06500000',
      'USDT': '0.00672000',
      'SHIB': '480.00000000',
      'PEPE': '1000.00000000',
      'Floki': '50.00000000',
      'Bonk': '340.00000000',
      'TON': '0.00120000',
      'BNB': '0.00001100'
    };
    return fallbackRates[coin] || '0.00000000';
  };

  const cryptoIcons = {
    'BTC': 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025',
    'LTC': 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=025',
    'TRX': 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=025',
    'SOL': 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=025',
    'DOGE': 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=025',
    'USDT': 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=025',
    'SHIB': 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=025',
    'PEPE': 'https://cryptologos.cc/logos/pepe-pepe-logo.png?v=032',
    'Floki': 'https://cryptologos.cc/logos/floki-inu-floki-logo.svg?v=025',
    'Bonk': 'https://cryptologos.cc/logos/bonk-bonk-logo.png?v=032',
    'TON': 'https://cryptologos.cc/logos/toncoin-ton-logo.svg?v=025',
    'BNB': 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025'
  };

  return (
    <header className="relative z-50 h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8">
      
      {/* Left Section - Title */}
      <div className="flex items-center flex-1">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-1 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div>
          <h2 className="text-lg font-semibold text-vie-text leading-tight">Dashboard</h2>
          <p className="text-xs text-vie-text-muted hidden sm:block">Welcome back, User</p>
        </div>
      </div>

      {/* Middle Section - Crypto Balance */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <div className="flex items-center bg-white border border-gray-300 rounded-full h-10 shadow-sm">
          <div className="flex items-center px-4 py-2 border-r border-gray-200">
            <span className="text-[#F59E0B] font-bold text-sm mr-1.5">672</span>
            <span className="text-xl leading-none mr-1.5">🪙</span>
            <span className="text-[#F59E0B] font-bold text-sm">= {getConvertedValue(currency)}</span>
          </div>
          <div className="relative">
            <button 
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center px-3 py-2 h-10 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-r-full focus:outline-none transition-colors"
            >
              <img src={cryptoIcons[currency]} alt={currency} className="w-4 h-4 mr-1.5 object-contain rounded-full" onError={(e) => e.target.style.display='none'} />
              {currency} <ChevronDown className="w-4 h-4 ml-1.5 text-gray-500" />
            </button>
            {currencyOpen && (
              <div className="absolute right-0 top-[110%] w-32 bg-white border border-gray-200 shadow-xl rounded-md z-[100] max-h-60 overflow-y-auto">
                {['BTC', 'LTC', 'TRX', 'SOL', 'DOGE', 'USDT', 'SHIB', 'PEPE', 'Floki', 'Bonk', 'TON', 'BNB'].map(coin => (
                  <button 
                    key={coin}
                    className={`w-full flex items-center text-left px-4 py-2.5 text-sm ${currency === coin ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
                    onClick={() => {setCurrency(coin); setCurrencyOpen(false);}}
                  >
                    <img src={cryptoIcons[coin]} alt={coin} className="w-4 h-4 mr-2 object-contain rounded-full" onError={(e) => {e.target.onerror = null; e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCI+PC9jaXJjbGU+PHBhdGggZD0iTTE2IDhoLTRhMyAzIDAgMCAwIDAgNmg0YTMgMyAwIDAgMSAwIDZoLTQiPjwvcGF0aD48cGF0aCBkPSJNMTIgMnYyIj48L3BhdGg+PHBhdGggZD0iTTEyIDIwdjIiPjwvcGF0aD48L3N2Zz4='}} />
                    {coin}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Section - Notifications, User, Theme */}
      <div className="flex items-center justify-end flex-1 space-x-3 sm:space-x-5">
        
        {/* Theme Toggle */}
        <button className="text-yellow-400 hover:text-yellow-500 focus:outline-none transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>

        {/* Notifications */}
        <button className="relative p-1.5 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-vie-danger rounded-full border-2 border-white"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-vie-primary">
              <UserIcon className="w-5 h-5" />
            </div>
            <ChevronDown className="w-4 h-4 ml-1.5 text-gray-500 hidden sm:block" />
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 top-[110%] w-48 bg-white border border-gray-200 rounded-md shadow-xl py-1 z-[100]">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">CryptoUser</p>
                <p className="text-xs text-gray-500 mt-0.5">Level 12</p>
              </div>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700 transition-colors">Profile</button>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700 transition-colors">Settings</button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 text-red-600 transition-colors">Sign Out</button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;
