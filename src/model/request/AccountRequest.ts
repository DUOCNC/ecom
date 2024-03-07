import {BaseRequest} from './BaseRequest';

export interface AccountRequest extends BaseRequest {
  search?: string;
  departmentIds?: number;
  activated?: boolean;
}
