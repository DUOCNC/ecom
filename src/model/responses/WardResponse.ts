import {BaseAuditResponse} from 'common';

export interface WardResponse extends BaseAuditResponse {
  id: number;
  name: string;
}
