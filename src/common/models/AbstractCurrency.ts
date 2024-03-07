export default abstract class AbstractCurrency {
  private readonly currency: string;
  constructor() {
    this.currency = 'VND';
  }

  protected getCurrency() {
    return this.currency;
  }
}
