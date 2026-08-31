import React, { useState } from 'react';
import { 
  HelpCircle, PlusCircle, MessageSquare, Send, CheckCircle, 
  Clock, AlertTriangle, FileText, ChevronDown, ChevronUp, Paperclip
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { FAQ_ITEMS } from '@/utils/constants';
import { formatDateTime } from '@/utils/formatters';

const initialTickets = [
  { 
    id: 'TICK-801', 
    subject: 'FaucetPay LTC Withdrawal Pending Confirmation', 
    category: 'Withdrawals', 
    priority: 'High', 
    status: 'open', 
    lastUpdate: new Date().toISOString(),
    messages: [
      { sender: 'user', text: 'Hello, I submitted a withdrawal of 1,500 coins to FaucetPay 3 hours ago but have not received it yet.', time: '3 hours ago' },
      { sender: 'support', text: 'Hi Alex! Thank you for reaching out. We have checked the gateway batch and your payout has been approved and broadcasted.', time: '1 hour ago' }
    ]
  },
  { 
    id: 'TICK-800', 
    subject: 'Shortlink redirect captcha issue', 
    category: 'Shortlinks', 
    priority: 'Medium', 
    status: 'completed', 
    lastUpdate: new Date(Date.now() - 86400000 * 4).toISOString(),
    messages: [
      { sender: 'user', text: 'Provider Exe.io was throwing error 403.', time: '4 days ago' },
      { sender: 'support', text: 'We have updated the API gateway bridge for Exe.io. Issue resolved!', time: '4 days ago' }
    ]
  }
];

const SupportPage = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [newTicketModal, setNewTicketModal] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  // New ticket form
  const [category, setCategory] = useState('Withdrawals');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [message, setMessage] = useState('');

  // Reply state
  const [replyText, setReplyText] = useState('');

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!subject || !message) return;

    const newT = {
      id: `TICK-${Math.floor(Math.random() * 900 + 800)}`,
      subject,
      category,
      priority,
      status: 'open',
      lastUpdate: new Date().toISOString(),
      messages: [
        { sender: 'user', text: message, time: 'Just now' }
      ]
    };

    setTickets(prev => [newT, ...prev]);
    setNewTicketModal(false);
    setSubject('');
    setMessage('');
    alert('Support Ticket submitted successfully! Our agents will respond shortly.');
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;

    const updated = {
      ...activeTicket,
      messages: [
        ...activeTicket.messages,
        { sender: 'user', text: replyText, time: 'Just now' }
      ]
    };

    setActiveTicket(updated);
    setTickets(prev => prev.map(t => t.id === activeTicket.id ? updated : t));
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Support & Help Desk</h1>
          <p className="page-subtitle">Need assistance with withdrawals, task verification, or your account? Our 24/7 team is ready to help</p>
        </div>
        <Button 
          variant="primary" 
          leftIcon={<PlusCircle size={16} />}
          onClick={() => setNewTicketModal(true)}
        >
          Create Support Ticket
        </Button>
      </div>

      {/* Tickets List */}
      <Card title="Your Support Tickets" subtitle="Track discussions and resolutions">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Last Update</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td className="font-mono text-xs font-semibold">{t.id}</td>
                  <td>
                    <span className="font-bold text-sm text-[var(--text-primary)]">{t.subject}</span>
                  </td>
                  <td>
                    <span className="badge badge-neutral text-xs">{t.category}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      t.priority === 'High' ? 'badge-error' :
                      t.priority === 'Medium' ? 'badge-warning' : 'badge-neutral'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="text-xs text-[var(--text-secondary)]">{formatDateTime(t.lastUpdate)}</td>
                  <td>
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="text-right">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      leftIcon={<MessageSquare size={13} />}
                      onClick={() => setActiveTicket(t)}
                    >
                      View Chat
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* FAQ Knowledge Base */}
      <Card title="Frequently Asked Questions (FAQ)" subtitle="Quick answers to common questions">
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="border border-[var(--border)] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left font-bold text-sm text-[var(--text-primary)] flex items-center justify-between bg-white hover:bg-[var(--background)] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-[var(--background)] border-t border-[var(--border-light)] text-xs text-[var(--text-secondary)] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Create Ticket Modal */}
      <Modal
        isOpen={newTicketModal}
        onClose={() => setNewTicketModal(false)}
        title="Create New Support Ticket"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateTicket} className="space-y-4">
          <div>
            <label className="input-label">Department / Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field text-xs py-2"
            >
              <option value="Withdrawals">Withdrawals & Payouts</option>
              <option value="Tasks">PTC & Shortlink Tasks</option>
              <option value="Faucet">Hourly Faucet</option>
              <option value="Account">Account Security & KYC</option>
              <option value="Affiliates">Referral Program</option>
              <option value="Bugs">Bug Report</option>
            </select>
          </div>

          <div>
            <label className="input-label">Subject</label>
            <Input 
              placeholder="Brief summary of your inquiry..." 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="input-label">Priority Level</label>
            <div className="grid grid-cols-3 gap-2">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    priority === p 
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm' 
                      : 'bg-white text-[var(--text-secondary)] border-[var(--border)]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="input-label">Detailed Description</label>
            <textarea
              rows={4}
              placeholder="Please explain in detail what happened, including any TxIDs or error messages..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field text-xs resize-none"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full font-bold">
            Submit Ticket
          </Button>
        </form>
      </Modal>

      {/* Ticket Discussion Modal */}
      <Modal
        isOpen={!!activeTicket}
        onClose={() => setActiveTicket(null)}
        title={`Support Thread: ${activeTicket?.subject || ''}`}
        maxWidth="max-w-2xl"
      >
        {activeTicket && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[var(--background)] rounded-xl text-xs">
              <span>Category: <strong>{activeTicket.category}</strong></span>
              <span>Priority: <strong>{activeTicket.priority}</strong></span>
              <span>Status: <StatusBadge status={activeTicket.status} /></span>
            </div>

            {/* Chat message history */}
            <div className="p-4 bg-gray-50 rounded-2xl max-h-[300px] overflow-y-auto space-y-3">
              {activeTicket.messages.map((m, i) => {
                const isUser = m.sender === 'user';
                return (
                  <div key={i} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-md text-xs ${
                      isUser 
                        ? 'bg-[var(--primary)] text-white rounded-br-none shadow-sm' 
                        : 'bg-white text-[var(--text-primary)] rounded-bl-none border border-gray-200 shadow-sm'
                    }`}>
                      <p className="font-semibold text-[10px] opacity-75 mb-1">
                        {isUser ? 'You' : 'KryptoBux Support Team'}
                      </p>
                      <p className="leading-relaxed">{m.text}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">{m.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Reply Input */}
            <form onSubmit={handleSendReply} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your reply to support..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="input-field text-xs"
              />
              <Button type="submit" variant="primary" leftIcon={<Send size={14} />}>
                Send
              </Button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SupportPage;
