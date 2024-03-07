import {PermissionItemResponse} from './PermissionItemResponse';

export interface PermissionModuleResponse {
  checkStore: boolean;
  code: string;
  id: number;
  permissions: Array<PermissionItemResponse>;
}
