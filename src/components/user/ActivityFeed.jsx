import { CheckCircle } from 'lucide-react';
import { formatRelativeTime, formatNumber } from '@/utils/formatters';

const dummyActivities = [
  { id: 1, type: 'Faucet Claim', time: new Date(Date.now() - 2 * 60000), amount: 25 },
  { id: 2, type: 'PTC Completed', time: new Date(Date.now() - 15 * 60000), amount: 40 },
  { id: 3, type: 'Daily Bonus', time: new Date(Date.now() - 60 * 60000), amount: 15 },
  { id: 4, type: 'Coupon Redeemed', time: new Date(Date.now() - 2 * 3600000), amount: 50 },
  { id: 5, type: 'Referral Bonus', time: new Date(Date.now() - 3 * 3600000), amount: 100 },
];

const ActivityFeed = ({ activities = dummyActivities }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-light)]">
        <h3 className="text-base font-semibold text-[var(--text-primary)]">Recent Activity</h3>
      </div>
      <div className="divide-y divide-[var(--border-light)]">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-[var(--background)] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--deep)] rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{activity.type}</p>
                <p className="text-xs text-[var(--text-muted)]">{formatRelativeTime(activity.time)}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-[var(--success)]">+{formatNumber(activity.amount)} Coins</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
