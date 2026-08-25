import FAQSection from '@/components/landing/FAQSection';

const FAQPage = () => (
  <div className="pt-16">
    <div className="bg-[var(--background)] py-16 text-center">
      <h1 className="heading-lg">Frequently Asked Questions</h1>
      <p className="text-[var(--text-secondary)] mt-4">Everything you need to know about Krypto Bux.</p>
    </div>
    <FAQSection />
  </div>
);
export default FAQPage;
