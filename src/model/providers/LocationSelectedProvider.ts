import Location from './Location';

class LocationSelectedProvider {
  selected: boolean;
  locationId: number;
  locationName: string;
  supported: boolean;
  departmentId: number | null;

  constructor(
    selected: boolean,
    locationId: number,
    locationName: string,
    supported: boolean,
    departmentId: number | null,
  ) {
    this.selected = selected;
    this.locationId = locationId;
    this.locationName = locationName;
    this.supported = supported;
    this.departmentId = departmentId;
  }

  static createdUnSelect() {
    return new LocationSelectedProvider(
      false,
      -1,
      'Tất cả cửa hàng',
      false,
      null,
    );
  }

  static create(locationSelect: Location): LocationSelectedProvider {
    return new LocationSelectedProvider(
      true,
      locationSelect.id,
      locationSelect.name,
      false,
      locationSelect.departmentId,
    );
  }

  static createSupport(locationSelect: Location): LocationSelectedProvider {
    return new LocationSelectedProvider(
      true,
      locationSelect.id,
      locationSelect.name,
      true,
      locationSelect.departmentId,
    );
  }

  static createSelectedAll() {
    return new LocationSelectedProvider(
      true,
      -1,
      'Tất cả cửa hàng',
      false,
      null,
    );
  }
}

export default LocationSelectedProvider;
