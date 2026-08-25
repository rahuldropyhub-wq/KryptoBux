// ============================================================
// FORMATTERS
// ============================================================

/**
 * Format a number with commas
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return Number(num).toLocaleString();
};

/**
 * Format coins with symbol
 */
export const formatCoins = (amount, showSymbol = true) => {
  const formatted = formatNumber(amount);
  return showSymbol ? `${formatted} Coins` : formatted;
};

/**
 * Format large numbers (K, M, B)
 */
export const formatCompact = (num) => {
  if (!num) return '0';
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
};

/**
 * Format date to readable string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '-';
  const d = new Date(date);
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };
  return d.toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format relative time (e.g. "2 min ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';
  const now = new Date();
  const d = new Date(date);
  const diff = now - d;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return formatDate(date);
};

/**
 * Format timer duration (seconds to MM:SS)
 */
export const formatTimer = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/**
 * Format percentage
 */
export const formatPercent = (value, decimals = 1) => {
  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Truncate text
 */
export const truncate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Format status to display label
 */
export const formatStatus = (status) => {
  if (!status) return '';
  return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return 'KB';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
