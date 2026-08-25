import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: "Is Krypto Bux free to join?",
    answer: "Yes, joining and using our platform is completely free. We will never ask you for money to create an account or start earning."
  },
  {
    question: "What is the minimum withdrawal?",
    answer: "The minimum withdrawal is just 500 Coins, making it easy to cash out your earnings quickly."
  },
  {
    question: "How long does withdrawal take?",
    answer: "Withdrawals are typically processed instantly for supported cryptocurrencies, but can take up to 24 hours during high volume periods."
  },
  {
    question: "Which cryptocurrencies are supported?",
    answer: "We support Bitcoin (BTC), Ethereum (ETH), Tether (USDT), Litecoin (LTC), Binance Coin (BNB) and more."
  },
  {
    question: "Is my account secure?",
    answer: "We use industry-standard security measures and encryption to ensure your data and earnings are safe."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 lg:py-16 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-purple-100 rounded-full mb-4">
            <p className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider">FREQUENTLY ASKED QUESTIONS</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#030514]">Have Questions? We've Got Answers!</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: 3D Graphic (Placeholder with Lucide Icon) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
               <div className="absolute inset-0 bg-[#7C3AED]/10 rounded-[3rem] rotate-6 transform transition-transform"></div>
               <div className="absolute inset-0 bg-white rounded-[3rem] shadow-xl flex items-center justify-center flex-col gap-4 -rotate-3 border border-slate-100">
                  <HelpCircle size={100} className="text-[#7C3AED]" />
                  <div className="flex gap-2">
                     <div className="w-12 h-3 bg-slate-200 rounded-full"></div>
                     <div className="w-6 h-3 bg-purple-200 rounded-full"></div>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="flex flex-col gap-3">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-xl border ${isOpen ? 'border-[#7C3AED] shadow-sm' : 'border-slate-200'} overflow-hidden transition-all duration-300`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    >
                      <span className={`font-semibold text-[14px] ${isOpen ? 'text-[#7C3AED]' : 'text-[#030514]'}`}>
                        {faq.question}
                      </span>
                      <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        {isOpen ? (
                          <Minus size={18} className="text-[#7C3AED]" />
                        ) : (
                          <Plus size={18} className="text-[#7C3AED]" />
                        )}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-5 text-[14px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
