export default class NumberUtils {
  static getAmountSymbol = (amount: number) => {
    const amountView = Math.abs(amount);
    if (amountView > 1000000000) {
      return `${(amount / 1000000000).toFixed(2)}B`;
    }
    if (amountView > 100000000) {
      return `${(amount / 1000000000).toFixed(2)}B`;
    }
    if (amountView > 1000000) {
      return `${(amount / 1000000).toFixed(2)}M`;
    }
    if (amountView > 100000) {
      return `${(amount / 1000000).toFixed(2)}M`;
    }
    if (amountView > 1000) {
      return `${(amount / 1000).toFixed(2)}K`;
    }
    return amount;
  };

  static isNumber(a: number | null | undefined) {
    if (a === undefined || a === null) {
      return false;
    }
    return !isNaN(a);
  }

  static greater(n1: number, n2: number) {
    return n1 > n2;
  }

  static less(n1: number, n2: number) {
    return n1 < n2;
  }

  static equal(n1: number | null, n2: number | null) {
    if (n1 === null) {
      if (n2 === null) {
        return true;
      }
      return false;
    }
    return n1 === n2;
  }

  static formatNumber(value: number) {
    try {
      let format = Number(value).toLocaleString();
      return format;
    } catch (e) {
      return '';
    }
  }

  static formatCurrency(value: number) {
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
  }

  static formatCurrencyWithoutCurrency(value: number) {
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
  }

  static getNumberOrNull(value: number | null) {
    if (value === null) {
      return 0;
    }
    return value;
  }
}
