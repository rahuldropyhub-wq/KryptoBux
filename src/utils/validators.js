// ============================================================
// VALIDATORS
// ============================================================

export const validators = {
  email: (email) => {
    if (!email) return 'Email is required';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return 'Please enter a valid email address';
    return null;
  },

  password: (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return null;
  },

  confirmPassword: (password, confirm) => {
    if (!confirm) return 'Please confirm your password';
    if (password !== confirm) return 'Passwords do not match';
    return null;
  },

  name: (name) => {
    if (!name) return 'Full name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return null;
  },

  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },

  url: (url) => {
    if (!url) return 'URL is required';
    try {
      new URL(url);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  minLength: (value, min) => {
    if (!value || value.length < min) return `Must be at least ${min} characters`;
    return null;
  },

  maxLength: (value, max) => {
    if (value && value.length > max) return `Must be no more than ${max} characters`;
    return null;
  },

  number: (value) => {
    if (!value && value !== 0) return 'This field is required';
    if (isNaN(Number(value))) return 'Must be a valid number';
    return null;
  },

  positiveNumber: (value) => {
    if (!value && value !== 0) return 'This field is required';
    if (isNaN(Number(value)) || Number(value) <= 0) return 'Must be a positive number';
    return null;
  },
};

export default validators;
