import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const ContactPage = () => (
  <div className="pt-24 pb-16 max-w-2xl mx-auto px-6">
    <h1 className="heading-lg mb-4">Contact Us</h1>
    <p className="text-[var(--text-secondary)] mb-8">Have a question? We would love to hear from you.</p>
    <div className="card p-8 space-y-4">
      <Input label="Full Name" placeholder="Your name" />
      <Input label="Email Address" type="email" placeholder="your@email.com" />
      <div className="form-group">
        <label className="input-label">Message</label>
        <textarea className="input-field min-h-[120px] resize-y" placeholder="How can we help?" />
      </div>
      <Button fullWidth>Send Message</Button>
    </div>
  </div>
);
export default ContactPage;
