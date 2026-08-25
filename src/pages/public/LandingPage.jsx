import HeroSection from '@/components/landing/HeroSection';
import EarningMethods from '@/components/landing/EarningMethods';
import HowItWorks from '@/components/landing/HowItWorks';
import RewardsSection from '@/components/landing/RewardsSection';
import LeaderboardSection from '@/components/landing/LeaderboardSection';
import Testimonials from '@/components/landing/Testimonials';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <EarningMethods />
      <HowItWorks />
      <RewardsSection />
      <LeaderboardSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
