import {Gender} from '../../enums';

export default class GenderEntity {
  id: Gender;
  name: string;

  constructor(id: Gender, name: string) {
    this.id = id;
    this.name = name;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}
