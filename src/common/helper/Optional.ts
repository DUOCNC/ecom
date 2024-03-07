import ObjectUtils from '../utils/ObjectUtils';

export default class Optional<T> {
  private o: T;

  private static readonly EMPTY = new Optional(null);

  private constructor(o: T) {
    this.o = o;
  }

  public static of<T>(o: T) {
    if (o == null) {
      throw new Error('o not null');
    }
    return new Optional(o);
  }

  public static ofNulable<T>(o: T) {
    return new Optional(o);
  }

  public isEmpty() {
    return this.o === null;
  }

  public orElse(o: T) {
    return ObjectUtils.isNull(this.o) ? o : this.o;
  }

  public get() {
    return this.o;
  }

  public ifPresent(ifPresent: (o: T) => void) {
    if (this.o !== null) {
      ifPresent(this.o);
    }
  }
}
