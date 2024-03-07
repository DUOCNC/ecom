import Location from './Location';

export default class LocationProvider {
  isLoadStore: boolean;
  locations: Array<Location>;

  constructor(isLoadStore: boolean, locations: Array<Location>) {
    this.isLoadStore = isLoadStore;
    this.locations = locations;
  }

  static unauthorized() {
    return new LocationProvider(false, []);
  }

  static createWithLocation(locations: Location[]) {
    return new LocationProvider(true, locations);
  }
}
