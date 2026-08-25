import { motion } from 'framer-motion';

const cryptos = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    iconUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    min: '500 Coins'
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    min: '500 Coins'
  },
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT (TRC20)',
    iconUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
    min: '500 Coins'
  },
  {
    id: 'ltc',
    name: 'Litecoin',
    symbol: 'LTC',
    iconUrl: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg',
    min: '500 Coins'
  },
  {
    id: 'bnb',
    name: 'Binance Coin',
    symbol: 'BNB',
    iconUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
    min: '500 Coins'
  }
];

const RewardsSection = () => {
  return (
    <section id="rewards" className="relative py-12 lg:py-16 bg-[#030514] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#030514] to-[#030514]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">EXCITING REWARDS</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Redeem Your Rewards</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-[15px]">
            Convert your earnings into real cryptocurrencies
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
          {cryptos.map((crypto, i) => (
            <motion.div
              key={crypto.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#0D122C] border border-white/5 hover:border-[#7C3AED]/50 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto bg-[#080B1E] rounded-full flex items-center justify-center p-3 mb-4 border border-white/5">
                <img src={crypto.iconUrl} alt={crypto.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-white font-bold text-[15px]">{crypto.name}</h3>
              <p className="text-slate-400 text-[13px] font-medium mb-4">{crypto.symbol}</p>
              
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Min. Withdraw</p>
                <p className="text-white font-bold text-[13px]">{crypto.min}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center justify-center px-8 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-semibold text-[15px] transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            View All Coins & Withdraw
          </button>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
