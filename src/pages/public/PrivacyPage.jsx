const sections = ['Information We Collect', 'How We Use Your Data', 'Data Security', 'Cookies Policy', 'Your Rights', 'Contact Us'];

const PrivacyPage = () => (
  <div className="pt-24 pb-16 max-w-4xl mx-auto px-6">
    <h1 className="heading-lg mb-8">Privacy Policy</h1>
    <div className="card p-8 space-y-6">
      {sections.map((section) => (
        <div key={section}>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{section}</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
      ))}
    </div>
  </div>
);
export default PrivacyPage;
