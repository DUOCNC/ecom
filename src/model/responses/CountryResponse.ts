import {BaseAuditResponse} from 'common';

export interface CountryResponse extends BaseAuditResponse {
  id: number;
  name: string;
}
