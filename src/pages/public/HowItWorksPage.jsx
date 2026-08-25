import HowItWorks from '@/components/landing/HowItWorks';
import EarningMethods from '@/components/landing/EarningMethods';

const HowItWorksPage = () => (
  <div className="pt-16">
    <div className="bg-[var(--background)] py-16 text-center">
      <h1 className="heading-lg">How Krypto Bux Works</h1>
      <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">Your complete guide to earning crypto rewards on Krypto Bux.</p>
    </div>
    <HowItWorks />
    <EarningMethods />
  </div>
);
export default HowItWorksPage;
