import {BaseAuditResponse} from 'common';

export interface DistrictResponse extends BaseAuditResponse {
  id: number;
  name: string;
  cityId: number;
  cityName: string;
}
