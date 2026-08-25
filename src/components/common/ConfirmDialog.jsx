import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${variant === 'danger' ? 'bg-red-50' : 'bg-yellow-50'}`}>
          <AlertTriangle size={24} className={variant === 'danger' ? 'text-red-500' : 'text-yellow-500'} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">{title}</h3>
          <p className="text-sm text-[var(--text-secondary)]">{message}</p>
        </div>
        <div className="flex items-center gap-3 w-full pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-[var(--radius-sm)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 px-4 rounded-[var(--radius-sm)] text-sm font-medium text-white transition-all ${variant === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-[var(--primary)] hover:bg-[var(--primary-dark)]'} disabled:opacity-60`}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
