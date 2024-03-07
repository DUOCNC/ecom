const StringUtils = {
  isEmpty: (s: string | null | undefined) => {
    if (s === undefined || s === null) {
      return true;
    }
    return s === '';
  },
  equal: (s1: string | null | undefined, s2: string | null | undefined) => {
    if (StringUtils.isEmpty(s1)) {
      if (StringUtils.isEmpty(s2)) {
        return true;
      }
      return false;
    }
    return true;
  },
  concat: (s: string | null | undefined, k: string | null | undefined) => {
    if (StringUtils.isEmpty(s)) {
      if (StringUtils.isEmpty(k)) {
        return '';
      }
      return k;
    }
    return s?.concat(k ? k : '');
  },
  getTowChar: (s: string) => {
    let arrS = s.split(' ');
    let char = '';
    if (arrS.length === 1) {
      char = s.substring(0, 2);
    } else {
      for (let i = 0; i < 2; i++) {
        char = char + arrS[i].substring(0, 1);
      }
    }
    return char;
  },
  strForSearch: (str: String) => {
    return str
      ? str
          .normalize('NFD')
          .toLowerCase()
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
      : str;
  },
  fullTextSearch: (textSearch: string, value: string) => {
    if (typeof textSearch === 'string' && typeof value === 'string') {
      const text = StringUtils.strForSearch(textSearch.trim());
      const valueStr = StringUtils.strForSearch(value);
      return text.split(/\s+/).every(word => valueStr.indexOf(word) > -1);
    }
    return false;
  },
  breaKWithPositionWhiteSpace: (str: string, num: number) => {
    let count = 0;
    return str.replace(/\s/g, e => {
      count += 1;
      if (count === num) {
        return '\n';
      }
      return e;
    });
  },
};

export default StringUtils;
