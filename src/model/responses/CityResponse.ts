import {BaseAuditResponse} from 'common';

export interface CityResponse extends BaseAuditResponse {
  id: number;
  name: string;
}
