import {MaterialResponse} from '../responses';

export class MaterialEntity {
  constructor(
    private id: number,
    private code: string,
    private name: string,
    private component: string,
    private description: string,
    private advantages: string,
    private defect: string,
    private useTo: string,
    private careLabels: string,
  ) {}

  static create(data: MaterialResponse) {
    return new MaterialEntity(
      data.id,
      data.code,
      data.name,
      data.component,
      data.description,
      data.advantages,
      data.defect,
      data.useTo,
      data.careLabels,
    );
  }

  static createEmpty(): MaterialEntity {
    return new MaterialEntity(0, '', '', '', '', '', '', '', '');
  }

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getCode(): string {
    return this.code;
  }

  setCode(value: string) {
    this.code = value;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getComponent(): string {
    return this.component;
  }

  setComponent(value: string) {
    this.component = value;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(value: string) {
    this.description = value;
  }

  getAdvantages(): string {
    return this.advantages;
  }

  setAdvantages(value: string) {
    this.advantages = value;
  }

  getDefect(): string {
    return this.defect;
  }

  setDefect(value: string) {
    this.defect = value;
  }

  getCareLabels(): string {
    return this.careLabels;
  }

  setCareLabels(value: string) {
    this.careLabels = value;
  }

  getUseTo() {
    return this.useTo;
  }

  isEmptyUseTo() {
    return this.useTo === null;
  }
}
