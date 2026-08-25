const sections = ['Acceptance of Terms', 'User Accounts', 'Earning Rules', 'Withdrawal Policy', 'Prohibited Activities', 'Limitation of Liability'];

const TermsPage = () => (
  <div className="pt-24 pb-16 max-w-4xl mx-auto px-6">
    <h1 className="heading-lg mb-8">Terms of Service</h1>
    <div className="card p-8 space-y-6">
      {sections.map((section) => (
        <div key={section}>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{section}</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>
      ))}
    </div>
  </div>
);
export default TermsPage;
