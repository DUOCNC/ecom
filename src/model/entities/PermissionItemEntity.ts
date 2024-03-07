export class PermissionItemEntity {
  private code: string;
  private id: number;
  private moduleCode: string;
  private name: string;
  private roleId: number;
  private storeId: number | null;
  private version: number | null;

  constructor(permissionResponse: {
    code: string;
    id: number;
    moduleCode: string;
    name: string;
    roleId: number;
    storeId: number | null;
    version: number | null;
  }) {
    this.code = permissionResponse.code;
    this.id = permissionResponse.id;
    this.moduleCode = permissionResponse.moduleCode;
    this.name = permissionResponse.name;
    this.roleId = permissionResponse.roleId;
    this.storeId = permissionResponse.storeId;
    this.version = permissionResponse.version;
  }

  public getCode(): string {
    return this.code;
  }

  public getId(): number {
    return this.id;
  }

  public getModuleCode(): string {
    return this.moduleCode;
  }

  public getName(): string {
    return this.name;
  }

  public getRoleId(): number {
    return this.roleId;
  }

  public getStoreId(): number | null {
    return this.storeId;
  }

  public getVersion(): number | null {
    return this.version;
  }
}
