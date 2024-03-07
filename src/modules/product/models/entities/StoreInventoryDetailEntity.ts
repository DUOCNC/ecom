export default class StoreInventoryDetailEntity {
  private readonly key: string;
  private readonly name: string;
  private value: string | null;
  private readonly highlight: boolean;

  constructor(
    key: string,
    name: string,
    value: string | null = null,
    highlight: boolean = false,
  ) {
    this.key = key;
    this.name = name;
    this.value = value;
    this.highlight = highlight;
  }

  getKey() {
    return this.key;
  }

  getName() {
    return this.name;
  }

  getValue() {
    return this.value;
  }

  getValueDisplay() {
    if (!this.value) {
      return '---';
    }
    return this.value;
  }

  isHighLight() {
    return this.highlight;
  }
}
