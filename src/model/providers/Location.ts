import {StoreResponse} from 'model/responses';

export default class Location {
  id: number;
  code: string;
  name: string;
  type: string;
  hotline: string;
  cityId: number | null;
  address: string | null;
  longitude: number | null;
  latitude: number | null;
  departmentH3Id: number | null;
  departmentId: number | null;

  constructor(
    id: number,
    code: string,
    name: string,
    type: string,
    hotline: string,
    cityId: number | null,
    address: string | null,
    longitude: number | null,
    latitude: number | null,
    departmentH3Id: number | null,
    departmentId: number | null,
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.type = type;
    this.hotline = hotline;
    this.cityId = cityId;
    this.address = address;
    this.longitude = longitude;
    this.latitude = latitude;
    this.departmentH3Id = departmentH3Id;
    this.departmentId = departmentId;
  }

  static createV1(store: StoreResponse): any {
    return new Location(
      store.id,
      store.code,
      store.name,
      store.type,
      store.hotline,
      store.cityId,
      store.address,
      store.longitude,
      store.latitude,
      store.departmentH3Id,
      store.departmentId,
    );
  }

  static createAllStore(): Location {
    return new Location(
      -1,
      'all',
      'Tất cả cửa hàng',
      '',
      '',
      null,
      null,
      null,
      null,
      null,
      null,
    );
  }
}
