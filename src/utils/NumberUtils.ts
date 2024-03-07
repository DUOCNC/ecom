const NumberUtils = {
  isNumber: (a: number | null | undefined) => {
    if (a === undefined || a === null) {
      return false;
    }
    return !isNaN(a);
  },
  greater: (n1: number, n2: number) => n1 > n2,
  less: (n1: number, n2: number) => n1 > n2,
  equal: (n1: number | null, n2: number | null) => {
    if (n1 === null) {
      if (n2 === null) {
        return true;
      }
      return false;
    }
    return n1 === n2;
  },
  formatNumber: (value: number): string => {
    try {
      let format = Number(value).toLocaleString();
      return format;
    } catch (e) {
      return '';
    }
  },
  formatCurrency: (value: number): string => {
    try {
      let format = Number(value)
        .toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
          currencyDisplay: 'code',
        })
        .replace('VND', '')
        .trim();
      return `${format}đ`;
    } catch (e) {
      return '';
    }
  },
  formatCurrencyWithoutCurrency: (value: number): string => {
    try {
      let format = Number(value)
        .toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
          currencyDisplay: 'code',
        })
        .replace('VND', '')
        .trim();
      return `${format}`;
    } catch (e) {
      return '';
    }
  },
  getNumberOrNull: (value: number | null) => {
    if (value === null) {
      return 0;
    }
    return value;
  },
};

export default NumberUtils;
