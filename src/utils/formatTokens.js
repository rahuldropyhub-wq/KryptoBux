export const formatTokens = (amount) => {
  if (amount === undefined || amount === null) return '0';
  return new Intl.NumberFormat('en-US').format(amount);
};
