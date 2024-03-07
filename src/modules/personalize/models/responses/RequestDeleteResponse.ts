import {BaseAuditResponse} from 'common';

export interface RequestDeleteResponse extends BaseAuditResponse {
  id: number;
  actionBy: string;
  reasonId: string;
  reason: string;
}
