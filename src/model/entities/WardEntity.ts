import {CityResponse} from '../responses';

export default class WardEntity {
  private id: number | string;
  private name: string;
  public constructor(id: number | string, name: string) {
    this.id = id;
    this.name = name;
  }

  static createFromResponse(response: CityResponse) {
    return new WardEntity(response.id, response.name);
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

  getObjectRequest() {
    return {
      ward_id: this.id,
      ward: this.name,
    };
  }

  static createEmpty() {
    return new WardEntity('', '');
  }
}
