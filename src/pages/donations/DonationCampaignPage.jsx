import React, { useState } from 'react';
import CampaignHero from '@/components/donations/CampaignHero';
import FundraisingProgress from '@/components/donations/FundraisingProgress';
import CampaignOverview from '@/components/donations/CampaignOverview';
import VerifiedDocuments from '@/components/donations/VerifiedDocuments';
import DonationCTA from '@/components/donations/DonationCTA';
import DonationModal from '@/components/donations/DonationModal';
import RecentDonations from '@/components/donations/RecentDonations';
import HowItWorksTimeline from '@/components/donations/HowItWorksTimeline';
import TransparencySection from '@/components/donations/TransparencySection';
import BlockchainTransactions from '@/components/donations/BlockchainTransactions';

// Mock Data
const mockCampaign = {
  id: 'c-1',
  title: 'Help Baby Anaya — Type 1 SMA Warrior',
  description: 'Baby Anaya is suffering from Spinal Muscular Atrophy (SMA) Type 1 and requires urgent medical treatment. Your contribution will directly fund the life-saving Zolgensma therapy.',
  category: 'Medical Treatment',
  image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2000&auto=format&fit=crop',
  patientName: 'Baby Anaya',
  age: '1 Year',
  condition: 'SMA Type 1',
  goalAmount: 160000000,
  raisedAmount: 62548320,
  goalDisplay: '16,00,00,000 KBUX',
  raisedDisplay: '6,25,48,320 KBUX',
  usdEquivalent: '418,560',
  donors: 1248,
  daysRemaining: 45,
  status: 'ACTIVE',
  verified: true
};

const mockDocuments = [
  { id: 1, name: 'Patient Report', date: 'Oct 12, 2025', verifier: 'MedVerify Inc' },
  { id: 2, name: 'Medical Certificate', date: 'Oct 15, 2025', verifier: 'City Hospital' },
  { id: 3, name: 'Doctor Letter', date: 'Oct 18, 2025', verifier: 'Dr. S. Mehta' },
  { id: 4, name: 'Hospital Certificate', date: 'Nov 01, 2025', verifier: 'State Health Dept' },
];

const mockRecentDonations = [
  { id: 1, donor: 'Rahul Sharma', token: 'KBUX', amount: '25,000', usdValue: '12.50', time: '2 min ago' },
  { id: 2, donor: 'Priya Verma', token: 'KBUX', amount: '15,500', usdValue: '7.75', time: '5 min ago' },
  { id: 3, donor: 'Amit Patel', token: 'USDT', amount: '100', usdValue: '100.00', time: '8 min ago' },
  { id: 4, donor: 'Sneha Iyer', token: 'BTC', amount: '0.005', usdValue: '320.00', time: '12 min ago' },
  { id: 5, donor: 'Anonymous', token: 'KBUX', amount: '5,000', usdValue: '2.50', time: '15 min ago' },
  { id: 6, donor: 'John Doe', token: 'ETH', amount: '0.1', usdValue: '250.00', time: '22 min ago' },
];

const mockTransactions = [
  { hash: '0x82...91A', donor: 'Rahul S...', amount: '25,000', token: 'KBUX', network: 'KryptoNetwork', time: '2 min ago' },
  { hash: '0x7F...8Bc', donor: 'Priya V...', amount: '15,500', token: 'KBUX', network: 'KryptoNetwork', time: '5 min ago' },
  { hash: '0x9A...3F1', donor: 'Amit P...', amount: '100', token: 'USDT', network: 'Tron (TRC20)', time: '8 min ago' },
  { hash: '0xB4...E29', donor: 'Sneha I...', amount: '0.005', token: 'BTC', network: 'Bitcoin', time: '12 min ago' },
];

const DonationCampaignPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDonate = () => {
    setIsModalOpen(true);
  };

  const handleShare = () => {
    alert("Share options would open here.");
  };

  return (
    <div className="font-sans">
      <main className="max-w-[1440px] mx-auto py-8">
        <div className="flex flex-col xl:flex-row items-start gap-8">

          {/* Left / Center Column: Campaign Info */}
          <div className="w-full xl:w-8/12 flex flex-col gap-8">
            <CampaignHero campaign={mockCampaign} />
            <CampaignOverview campaign={mockCampaign} />

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Campaign Story</h3>
              <div className="prose prose-blue max-w-none text-gray-600">
                <p className="mb-4">
                  Baby Anaya was diagnosed with Spinal Muscular Atrophy (SMA) Type 1, a rare genetic disease that affects the central nervous system and voluntary muscle movement. Without the life-saving Zolgensma therapy, children with this condition face severe complications.
                </p>
                <p className="mb-4">
                  The therapy costs $2.1 million (approximately 16,00,00,000 KBUX), making it impossible for a middle-class family to afford. We are reaching out to the global crypto community for support.
                </p>
                <p>
                  Every single transaction is tracked on-chain, ensuring 100% transparency. Medical documents have been verified by our dedicated trust and safety team. Please donate today and give Anaya a chance at a normal, healthy life.
                </p>
              </div>
            </div>

            <VerifiedDocuments documents={mockDocuments} />
            <HowItWorksTimeline />
            <TransparencySection />
            <BlockchainTransactions transactions={mockTransactions} />
          </div>

          {/* Right Column: Donation Area & Activity */}
          <div className="w-full xl:w-4/12 flex flex-col gap-8">
            <div className="sticky top-28">
              <FundraisingProgress campaign={mockCampaign} />
              <DonationCTA onDonate={handleDonate} onShare={handleShare} />

              <div className="mt-8 h-[500px]">
                <RecentDonations donations={mockRecentDonations} />
              </div>

              {/* Trust Box */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-8 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  Trust & Security
                </h4>
                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#6D4AFF] rounded-full"></div> Verified campaign</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#6D4AFF] rounded-full"></div> Blockchain tracked donations</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#6D4AFF] rounded-full"></div> Secure wallet transactions</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#6D4AFF] rounded-full"></div> Transparent donation history</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#6D4AFF] rounded-full"></div> Verified medical documents</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>

      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaign={mockCampaign}
      />
    </div>
  );
};

export default DonationCampaignPage;
