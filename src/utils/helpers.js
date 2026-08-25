// ============================================================
// HELPERS
// ============================================================

/**
 * Delay execution for ms milliseconds
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Deep clone an object
 */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Check if an object is empty
 */
export const isEmpty = (obj) => {
  if (!obj) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

/**
 * Get stored value from localStorage
 */
export const getStored = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Set value in localStorage
 */
export const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('localStorage error:', error);
  }
};

/**
 * Remove from localStorage
 */
export const removeStored = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('localStorage error:', error);
  }
};

/**
 * Generate random string ID
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Debounce a function
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Class name merger (simple version without clsx/cn)
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Get status badge class
 */
export const getStatusClass = (status) => {
  const map = {
    active: 'badge-success',
    available: 'badge-success',
    completed: 'badge-info',
    pending: 'badge-warning',
    paused: 'badge-neutral',
    inactive: 'badge-neutral',
    rejected: 'badge-error',
    failed: 'badge-error',
  };
  return map[status?.toLowerCase()] || 'badge-neutral';
};

/**
 * Get accent color based on index (for stat cards)
 */
export const getAccentVariant = (index) => {
  const variants = ['blue', 'lavender', 'deep', 'black'];
  return variants[index % variants.length];
};

/**
 * Parse query params from URL string
 */
export const parseQueryParams = (search) => {
  const params = new URLSearchParams(search);
  const result = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Scroll to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
