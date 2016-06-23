export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'EURO':
      return '€';
    default:
      return '';
  }
};
