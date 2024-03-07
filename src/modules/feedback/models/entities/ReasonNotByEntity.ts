export class ReasonNotByEntity {
  constructor(private value: string) {}
  fromResponse(value: string) {
    this.value = value;
  }
  getValue() {
    return this.value;
  }
}
