import {PermissionItemEntity} from './PermissionItemEntity';

export class PermissionModuleEntity {
  private checkStore: boolean;
  private code: string;
  private id: number;
  private permissions: PermissionItemEntity[];

  constructor(
    checkStore: boolean,
    code: string,
    id: number,
    permissions: PermissionItemEntity[],
  ) {
    this.checkStore = checkStore;
    this.code = code;
    this.id = id;
    this.permissions = permissions;
  }

  public getCheckStore(): boolean {
    return this.checkStore;
  }

  public getCode(): string {
    return this.code;
  }

  public getId(): number {
    return this.id;
  }

  public getPermissions(): PermissionItemEntity[] {
    return this.permissions;
  }
}
