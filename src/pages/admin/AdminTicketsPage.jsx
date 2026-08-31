import React, { useState } from 'react';
import { 
  HelpCircle, MessageSquare, Send, CheckCircle, 
  Clock, AlertTriangle, User, Search, Filter, Check
} from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { formatDateTime } from '@/utils/formatters';

const initialTickets = [
  { 
    id: 'TICK-801', 
    user: 'alex_crypto', 
    subject: 'FaucetPay LTC Withdrawal Pending Confirmation', 
    category: 'Withdrawals', 
    priority: 'High', 
    status: 'open', 
    created: new Date().toISOString(),
    messages: [
      { sender: 'user', text: 'Hello, I submitted a withdrawal of 1,500 coins to FaucetPay 3 hours ago but have not received it yet.', time: '3 hours ago' }
    ]
  },
  { 
    id: 'TICK-800', 
    user: 'satoshix99', 
    subject: 'Shortlink redirect captcha issue on Exe.io', 
    category: 'Shortlinks', 
    priority: 'Medium', 
    status: 'completed', 
    created: new Date(Date.now() - 86400000 * 3).toISOString(),
    messages: [
      { sender: 'user', text: 'Provider Exe.io was throwing error 403.', time: '3 days ago' },
      { sender: 'support', text: 'We have updated the API gateway bridge for Exe.io. Issue resolved!', time: '3 days ago' }
    ]
  },
];

const AdminTicketsPage = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTicket, setActiveTicket] = useState(null);
  const [replyText, setReplyText] = useState('');

  const filtered = tickets.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;

    const updated = {
      ...activeTicket,
      messages: [
        ...activeTicket.messages,
        { sender: 'support', text: replyText, time: 'Just now' }
      ]
    };

    setActiveTicket(updated);
    setTickets(prev => prev.map(t => t.id === activeTicket.id ? updated : t));
    setReplyText('');
  };

  const handleToggleResolve = (ticketId) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: t.status === 'completed' ? 'open' : 'completed' };
      }
      return t;
    }));
    if (activeTicket && activeTicket.id === ticketId) {
      setActiveTicket(prev => ({ ...prev, status: prev.status === 'completed' ? 'open' : 'completed' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Support Ticket Helpdesk</h1>
          <p className="page-subtitle">Manage, answer, escalate, and resolve user inquiries and support requests</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by ticket ID, username, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 text-xs"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field text-xs py-2"
            >
              <option value="all">All Ticket Statuses</option>
              <option value="open">Open / Awaiting Admin Reply</option>
              <option value="completed">Resolved / Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <Card title="Helpdesk Inbox" subtitle={`Showing ${filtered.length} tickets`}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>User</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Created Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td className="font-mono text-xs font-semibold">{t.id}</td>
                  <td className="font-bold text-sm text-[var(--text-primary)]">@{t.user}</td>
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
                  <td className="text-xs text-[var(--text-secondary)]">{formatDateTime(t.created)}</td>
                  <td>
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        leftIcon={<MessageSquare size={13} />}
                        onClick={() => setActiveTicket(t)}
                      >
                        Reply
                      </Button>
                      <button
                        onClick={() => handleToggleResolve(t.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          t.status === 'completed' 
                            ? 'bg-amber-50 hover:bg-amber-100 text-amber-700' 
                            : 'bg-green-50 hover:bg-green-100 text-green-700'
                        }`}
                        title={t.status === 'completed' ? 'Re-Open Ticket' : 'Mark Resolved'}
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Ticket Response Modal */}
      <Modal
        isOpen={!!activeTicket}
        onClose={() => setActiveTicket(null)}
        title={`Respond to Ticket: ${activeTicket?.id || ''}`}
        maxWidth="max-w-2xl"
      >
        {activeTicket && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[var(--background)] rounded-xl text-xs">
              <span>User: <strong>@{activeTicket.user}</strong></span>
              <span>Category: <strong>{activeTicket.category}</strong></span>
              <span>Priority: <strong>{activeTicket.priority}</strong></span>
              <span>Status: <StatusBadge status={activeTicket.status} /></span>
            </div>

            {/* Conversation Stream */}
            <div className="p-4 bg-gray-50 rounded-2xl max-h-[300px] overflow-y-auto space-y-3">
              {activeTicket.messages.map((m, idx) => {
                const isSupport = m.sender === 'support';
                return (
                  <div key={idx} className={`flex flex-col ${isSupport ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-md text-xs ${
                      isSupport 
                        ? 'bg-[var(--primary)] text-white rounded-br-none shadow-sm' 
                        : 'bg-white text-[var(--text-primary)] rounded-bl-none border border-gray-200 shadow-sm'
                    }`}>
                      <p className="font-semibold text-[10px] opacity-75 mb-1">
                        {isSupport ? 'Admin Staff' : `@${activeTicket.user}`}
                      </p>
                      <p className="leading-relaxed">{m.text}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">{m.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Reply input */}
            <form onSubmit={handleSendReply} className="flex gap-2">
              <input
                type="text"
                placeholder="Type official admin reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="input-field text-xs"
              />
              <Button type="submit" variant="primary" leftIcon={<Send size={14} />}>
                Reply
              </Button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminTicketsPage;
