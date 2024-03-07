export default class ReportEmulationItemEntity {
  private readonly name: string;
  private readonly value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }

  getValue() {
    return this.value;
  }
  getName() {
    return this.name;
  }
}
