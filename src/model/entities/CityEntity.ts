import {CityResponse} from '../responses';

export default class CityEntity {
  private id: number;
  private name: string;
  private constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static createFromResponse(response: CityResponse) {
    return new CityEntity(response.id, response.name);
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
