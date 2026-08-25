import { StatusBadge } from '@/components/common/Badge';
import { formatDateTime, formatNumber } from '@/utils/formatters';
import EmptyState from '@/components/common/EmptyState';
import { List } from 'lucide-react';

const dummyTx = [
  { id: 1, type: 'PTC Completed', source: 'Adsterra Ads', amount: 20, status: 'completed', date: new Date(Date.now() - 1000 * 60 * 10) },
  { id: 2, type: 'Faucet Claim', source: 'Hourly Faucet', amount: 25, status: 'completed', date: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 3, type: 'Withdrawal', source: 'BTC Wallet', amount: -5000, status: 'pending', date: new Date(Date.now() - 1000 * 3600) },
  { id: 4, type: 'Daily Bonus', source: 'Day 7 Streak', amount: 100, status: 'completed', date: new Date(Date.now() - 1000 * 3600 * 2) },
  { id: 5, type: 'Referral Bonus', source: 'alex@example.com', amount: 100, status: 'completed', date: new Date(Date.now() - 1000 * 3600 * 5) },
];

const TransactionTable = ({ transactions = dummyTx }) => {
  if (!transactions.length) {
    return <EmptyState icon={List} title="No transactions yet" description="Your transaction history will appear here." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Source</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td className="font-medium text-[var(--text-primary)]">{tx.type}</td>
              <td className="text-[var(--text-secondary)]">{tx.source}</td>
              <td>
                <span className={tx.amount >= 0 ? 'coin-amount-positive' : 'coin-amount-negative'}>
                  {tx.amount >= 0 ? '+' : ''}{formatNumber(tx.amount)} Coins
                </span>
              </td>
              <td><StatusBadge status={tx.status} /></td>
              <td className="text-xs text-[var(--text-muted)]">{formatDateTime(tx.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
