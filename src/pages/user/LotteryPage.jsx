import React, { useState } from 'react';
import { Star, Ticket, Clock, Trophy, History } from 'lucide-react';

const LotteryPage = () => {
  const [ticketCount, setTicketCount] = useState(1);
  const ticketPrice = 100; // 100 PEPE per ticket
  const userBalance = 25400; // Mock balance

  const handleBuyTickets = (e) => {
    e.preventDefault();
    alert(`Bought ${ticketCount} tickets for ${ticketCount * ticketPrice} PEPE!`);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Weekly Lottery</h1>
          <p className="text-gray-600 text-sm">Buy tickets for a chance to win the massive jackpot.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 flex items-center">
            <span className="text-sm font-semibold text-gray-600 mr-2">Your Balance:</span>
            <span className="text-sm font-bold text-gray-900">{userBalance.toLocaleString()} PEPE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Buy Tickets & Current Stats */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Main Prize Pool Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-center">
            <div className="bg-blue-600 p-6 text-white">
              <Star className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
              <div className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-1">Current Jackpot</div>
              <div className="text-4xl font-black mb-2">1,500,000</div>
              <div className="text-blue-200 font-bold">PEPE</div>
            </div>
            <div className="p-4 bg-gray-50 flex justify-between items-center border-t border-gray-100">
              <div className="flex items-center text-gray-600 font-medium">
                <Clock className="w-4 h-4 mr-2" />
                Draws in:
              </div>
              <div className="text-gray-900 font-bold font-mono">03:14:42:10</div>
            </div>
          </div>

          {/* Buy Tickets Form */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Ticket className="w-5 h-5 mr-2 text-blue-600" /> Buy Tickets
            </h3>
            
            <div className="flex justify-between items-center mb-6 text-sm">
              <span className="text-gray-600">Price per ticket:</span>
              <span className="font-bold text-gray-900">{ticketPrice} PEPE</span>
            </div>

            <form onSubmit={handleBuyTickets}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Tickets</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    type="button"
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold border-r border-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={ticketCount}
                    onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
                    className="w-full text-center py-2 focus:outline-none font-bold text-gray-900"
                  />
                  <button 
                    type="button"
                    onClick={() => setTicketCount(ticketCount + 1)}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold border-l border-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Total Cost:</span>
                <span className="font-bold text-gray-900">{(ticketCount * ticketPrice).toLocaleString()} PEPE</span>
              </div>

              <button 
                type="submit"
                disabled={ticketCount * ticketPrice > userBalance}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Buy Tickets
              </button>
            </form>
          </div>

          {/* User's Current Tickets */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex justify-between items-center">
            <div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Your Tickets</div>
              <div className="text-2xl font-black text-gray-900">14</div>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center justify-center">
              <Ticket className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Right Col: Past Winners */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <History className="w-5 h-5 mr-2 text-gray-500" /> Previous Winners
              </h3>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Round</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Winner</th>
                    <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Prize Won</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { round: 42, user: 'CryptoKing99', prize: '1,420,000 PEPE' },
                    { round: 41, user: 'SarahJ', prize: '1,100,500 PEPE' },
                    { round: 40, user: 'MikeTrader', prize: '950,000 PEPE' },
                    { round: 39, user: 'AlexB', prize: '1,250,000 PEPE' },
                    { round: 38, user: 'Elena88', prize: '890,000 PEPE' },
                    { round: 37, user: 'WhaleHunter', prize: '1,750,000 PEPE' },
                    { round: 36, user: 'PepeFan', prize: '1,000,000 PEPE' },
                  ].map((winner) => (
                    <tr key={winner.round} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">
                        #{winner.round}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {winner.round === 42 && <Trophy className="w-4 h-4 text-yellow-500 mr-2 shrink-0" />}
                          <span className="font-semibold text-gray-900">{winner.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-emerald-600">
                        {winner.prize}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
              <p className="text-sm text-gray-600">
                Lottery draws happen every Sunday at 00:00 UTC.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LotteryPage;
