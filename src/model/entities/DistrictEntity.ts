import {DistrictResponse} from '../responses';

export default class DistrictEntity {
  private id: number | string;
  private name: string;
  private cityId: number | string;
  private cityName: string;

  public constructor(
    id: number | string,
    name: string,
    cityId: number | string,
    cityName: string,
  ) {
    this.id = id;
    this.name = name;
    this.cityId = cityId;
    this.cityName = cityName;
  }

  static createFromResponse(response: DistrictResponse) {
    return new DistrictEntity(
      response.id,
      response.name,
      response.cityId,
      response.cityName,
    );
  }

  static createEmpty() {
    return new DistrictEntity('', '', '', '');
  }

  getNameCityAndDistrict() {
    return `${this.cityName} - ${this.name}`;
  }

  getId() {
    return this.id.toString();
  }

  getDistrictId() {
    return this.id;
  }
  getCityDistrictName() {
    if (this.name && this.cityName) {
      return `${this.cityName} - ${this.name}`;
    }
    return '';
  }

  getDistrictName() {
    return this.name;
  }

  getObjectRequest() {
    return {
      districtId: this.id,
      district: this.name,
      cityId: this.cityId,
      cityName: this.cityName,
    };
  }
}
