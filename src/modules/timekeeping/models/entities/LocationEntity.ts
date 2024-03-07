import {LocationResponse} from '../responses';

export default class LocationEntity {
  private createdBy: string;
  private createdAt: string;
  private updatedBy: string;
  private updatedAt: string;
  private id: number;
  private name: string;
  private longitude: number;
  private latitude: number;
  private radius: number;
  private deletedAt: null | string;
  private deletedBy: null | string;
  private version: number;

  constructor(
    createdBy: string,
    createdAt: string,
    updatedBy: string,
    updatedAt: string,
    id: number,
    name: string,
    longitude: number,
    latitude: number,
    radius: number,
    deletedAt: null | string,
    deletedBy: null | string,
    version: number,
  ) {
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.id = id;
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
    this.radius = radius;
    this.deletedAt = deletedAt;
    this.deletedBy = deletedBy;
    this.version = version;
  }

  static createEmpty() {
    return new LocationEntity('', '', '', '', 0, '', 0, 0, 0, null, null, 0);
  }

  static createLocationEntity(
    locationResponse: LocationResponse,
  ): LocationEntity {
    const {
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
      id,
      name,
      longitude,
      latitude,
      radius,
      deletedAt,
      deletedBy,
      version,
    } = locationResponse;

    return new LocationEntity(
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
      id,
      name,
      longitude,
      latitude,
      radius,
      deletedAt,
      deletedBy,
      version,
    );
  }

  getCreatedBy() {
    return this.createdBy;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getUpdatedBy() {
    return this.updatedBy;
  }
  getUpdatedAt() {
    return this.updatedAt;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getLongitude() {
    return this.longitude;
  }
  getLatitude() {
    return this.latitude;
  }
  getRadius() {
    return this.radius;
  }
  getDeletedAt() {
    return this.deletedAt;
  }
  getDeletedBy() {
    return this.deletedBy;
  }
  getVersion() {
    return this.version;
  }
}
