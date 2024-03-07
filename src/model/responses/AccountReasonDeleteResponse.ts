import {BaseAuditResponse} from 'common';

export interface AccountReasonDeleteResponse extends BaseAuditResponse {
  id: number;
  reason: string;
}
