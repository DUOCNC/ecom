import {CountryResponse} from '../responses';

export default class CountryEntity {
  private id: number;
  private name: string;
  private constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static createFromResponse(response: CountryResponse) {
    return new CountryEntity(response.id, response.name);
  }

  getId() {
    return this.id;
  }

  getKey(): string {
    return this.id.toString();
  }

  getName(): string {
    return this.name;
  }
}
