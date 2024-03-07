export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
export default class GenderEntity {
  private readonly value: Gender | string;
  private readonly name: string;

  constructor(value: Gender | string, name: string) {
    this.value = value;
    this.name = name;
  }

  static createEmpty() {
    return new GenderEntity('', '');
  }

  getObjectRequest() {
    return {
      gender: this.value,
    };
  }

  getValue() {
    return this.value;
  }

  getName() {
    return this.name;
  }
}
