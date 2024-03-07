export interface TimekeepingRequest {
  latitude: string;
  longitude: string;
}

export interface CheckTimeRequest {
  startDate: string;
  endDate?: string;
  sort?: string;
  page?: number;
  size?: number;
}
