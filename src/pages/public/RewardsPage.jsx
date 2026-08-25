import RewardsSection from '@/components/landing/RewardsSection';

const RewardsPage = () => (
  <div className="pt-16">
    <div className="bg-[var(--background)] py-16 text-center">
      <h1 className="heading-lg">Crypto Rewards</h1>
      <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">Withdraw your earned coins as real cryptocurrency.</p>
    </div>
    <RewardsSection />
  </div>
);
export default RewardsPage;
