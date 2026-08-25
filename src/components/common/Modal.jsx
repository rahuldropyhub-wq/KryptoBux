import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showFooter = false,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  loading = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  }[size] || 'max-w-lg';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            className={`relative bg-white rounded-2xl shadow-[var(--shadow-modal)] w-full ${sizeClass} max-h-[90vh] flex flex-col`}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-[var(--border-light)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--background)] transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
            {/* Footer */}
            {showFooter && (
              <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--border-light)]">
                <Button variant="secondary" onClick={onClose}>{cancelText}</Button>
                <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>{confirmText}</Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
