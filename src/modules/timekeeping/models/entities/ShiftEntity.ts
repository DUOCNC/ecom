export default class ShiftEntity {
  id: number;
  code: string;
  name: string;

  constructor(data: {id: number; code: string; name: string}) {
    this.id = data.id;
    this.name = data.name;
    this.code = data.code;
  }

  static createEmpty(): ShiftEntity {
    return new ShiftEntity({
      id: 0,
      code: '',
      name: '',
    });
  }

  getId(): number {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getCode() {
    return this.code;
  }
  setCode(code: string) {
    this.code = code;
  }
}
