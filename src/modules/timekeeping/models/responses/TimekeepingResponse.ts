export interface TimekeepingResponse {
  id: number;
  locationCode: string;
  locationName: string;
  longitude: number;
  latitude: number;
  request: string;
  syncOneOffice: boolean;
  version: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface TimekeepingErrorResponse {
  data: {errors: {[key: string]: Array<string>}};
}
