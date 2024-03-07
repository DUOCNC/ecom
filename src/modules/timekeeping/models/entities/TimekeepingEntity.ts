import {TimekeepingResponse} from '../responses';

export default class TimekeepingEntity {
  id: number;
  locationCode: string;
  locationName: string;
  longitude: number;
  latitude: number;
  syncOneOffice: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;

  constructor(
    id: number,
    locationCode: string,
    locationName: string,
    longitude: number,
    latitude: number,
    syncOneOffice: boolean,
    createdBy: string,
    createdAt: string,
    updatedBy: string,
    updatedAt: string,
  ) {
    this.id = id;
    this.locationCode = locationCode;
    this.locationName = locationName;
    this.longitude = longitude;
    this.latitude = latitude;
    this.syncOneOffice = syncOneOffice;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
  }

  static createTimekeepingEntity(
    response: TimekeepingResponse,
  ): TimekeepingEntity {
    const {
      id,
      locationCode,
      locationName,
      longitude,
      latitude,
      syncOneOffice,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = response;
    return new TimekeepingEntity(
      id,
      locationCode,
      locationName,
      longitude,
      latitude,
      syncOneOffice,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    );
  }

  getId(): number {
    return this.id;
  }
  setId(value: number) {
    this.id = value;
  }

  getLocationCode(): string {
    return this.locationCode;
  }
  setLocationCode(value: string) {
    this.locationCode = value;
  }

  getLocationName(): string {
    return this.locationName;
  }
  setLocationName(value: string) {
    this.locationName = value;
  }

  getLongitude(): number {
    return this.longitude;
  }
  setLongitude(value: number) {
    this.longitude = value;
  }

  getLatitude(): number {
    return this.latitude;
  }
  setLatitude(value: number) {
    this.latitude = value;
  }

  getSyncOneOffice(): boolean {
    return this.syncOneOffice;
  }
  setSyncOneOffice(value: boolean) {
    this.syncOneOffice = value;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }
  setCreatedBy(value: string) {
    this.createdBy = value;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }
  setCreatedAt(value: string) {
    this.createdAt = value;
  }

  getUpdatedBy(): string {
    return this.updatedBy;
  }
  setUpdatedBy(value: string) {
    this.updatedBy = value;
  }

  getUpdatedAt(): string {
    return this.updatedAt;
  }
  setUpdatedAt(value: string) {
    this.updatedAt = value;
  }
}
