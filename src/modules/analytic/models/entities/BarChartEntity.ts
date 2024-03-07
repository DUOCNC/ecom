export default class BarChartEntity {
  private readonly label: string;
  private readonly value: number;

  constructor(label: string, value: number) {
    this.label = label;
    this.value = value;
  }

  getValue() {
    return this.value;
  }
  getLabel() {
    return this.label;
  }
}

export class BarChartItemEntity {
  private readonly label: string;
  private value: number;

  constructor(label: string, value: number) {
    this.label = label;
    this.value = value;
  }

  setValue(v: number) {
    this.value = v;
  }

  getValue() {
    return this.value;
  }
  getLabel() {
    return this.label;
  }
}
