import {PermissionResponse} from 'model/responses';
import {PermissionModuleEntity} from './PermissionModuleEntity';
import {PermissionItemEntity} from './PermissionItemEntity';

export class PermissionEntity {
  private id: number;
  private roleId: number;
  private roleName: string;
  private userId: string;
  private modules: PermissionModuleEntity[];

  constructor(permissionResponse: PermissionResponse) {
    this.id = permissionResponse.id;
    this.roleId = permissionResponse.roleId;
    this.roleName = permissionResponse.roleName;
    this.userId = permissionResponse.userId;
    this.modules = permissionResponse.modules?.map(e => {
      return new PermissionModuleEntity(
        e.checkStore,
        e.code,
        e.id,
        e.permissions.map(p => {
          return new PermissionItemEntity(p);
        }),
      );
    });
  }

  static createEmpty() {
    return new PermissionEntity({
      id: 0,
      roleId: 0,
      roleName: '',
      userId: '',
      modules: [],
    });
  }

  public getId(): number {
    return this.id;
  }

  public getRoleId(): number {
    return this.roleId;
  }

  public getRoleName(): string {
    return this.roleName;
  }

  public getUserId(): string {
    return this.userId;
  }

  getModules() {
    return this.modules;
  }
}
