export default class ObjectUtils {
  /**
   * Check Undefined
   * @param o type T(any)
   * @returns true if o undefined and false if o not undefined
   */
  static isUndefined<T>(o: T) {
    return o === undefined;
  }

  /**
   * Check Undefined
   * @param o type T(any)
   * @returns true if o not undefined and true if o undefined
   */
  static nonUndefined<T>(o: T) {
    return o !== undefined;
  }

  /**
   * check null
   * @param o
   * @returns
   */
  static isNull<T>(o: T) {
    return o === null;
  }

  /**
   * check non null
   * @param o: T
   * @returns true if o not null
   */
  static nonNull(o: any) {
    return o !== null;
  }

  /**
   *
   * @param o Giá trị ban đầu
   * @param orElse Giá trị nếu null
   * @returns giá trị o hoặc orElse;
   */
  static ofNulable<T>(o: T, orElse: T) {
    if (o == null) {
      return orElse;
    }
    return o;
  }

  /**
   *
   * @param o1 Value 1
   * @param o2 Value 2
   * @param compare How to compare
   * @returns
   */
  static compare<T>(o1: T, o2: T, compare: (o1: T, o2: T) => boolean) {
    if (this.isNull(o1) && this.isNull(o2)) {
      return true;
    }
    if (this.isNull(o1) || this.isNull(o2)) {
      return false;
    }
    return compare(o1, o2);
  }

  static hasProperty<T>(o: T, property: keyof T) {
    return this.isUndefined(o[property]);
  }
}
