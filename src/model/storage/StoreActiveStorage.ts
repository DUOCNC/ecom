import {LocationSelectedProvider} from 'model/providers';

export interface LocationStorageDetail {
  code: string;
  location: LocationSelectedProvider;
}

export interface LocationStorage {
  locations: Array<LocationStorageDetail>;
}
