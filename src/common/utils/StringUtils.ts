import ObjectUtils from './ObjectUtils';

export default class StringUtils {
  /**
   *
   * @param s
   * @returns true if s empty and false if s empty
   */
  static isBlank(s: null | string): boolean {
    if (ObjectUtils.isNull(s)) {
      return true;
    }
    return s === '';
  }

  /**
   * format string
   * @param s
   * @param args
   * @returns
   */
  static format(s: string, ...args: any[]) {
    return s.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== undefined ? args[number] : match;
    });
  }

  /**
   * replace text whitespace with position
   * @param s
   * @param num
   * @returns
   */
  static breakWithPositionWhiteSpace(s: string, num: number) {
    let count = 0;
    return s.replace(/\s/g, e => {
      count += 1;
      if (count === num) {
        return '\n';
      }
      return e;
    });
  }

  static strForSearch(str: String) {
    return str
      ? str
          .normalize('NFD')
          .toLowerCase()
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
      : str;
  }

  static search(textSearch: string, value: string) {
    if (typeof textSearch === 'string' && typeof value === 'string') {
      const text = this.strForSearch(textSearch.trim());
      const valueStr = this.strForSearch(value);
      return text.split(/\s+/).every(word => valueStr.indexOf(word) > -1);
    }
    return false;
  }
}
