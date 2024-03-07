import {PermissionModuleResponse} from './PermissionModuleResponse';

export interface PermissionResponse {
  id: number;
  roleId: number;
  roleName: string;
  userId: string;
  modules: PermissionModuleResponse[];
}
