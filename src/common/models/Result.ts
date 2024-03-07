/**
 * T is Object
 */
export interface Result<T extends any> {
  /**
   * Mã thông báo
   */
  readonly code: number;

  /**
   * Thông báo
   */
  readonly message: string;

  /**
   * Result
   */
  readonly data: T;

  /**
   * Thời gian trả response
   */
  readonly responseTime: string;

  /**
   * Danh sách lỗi
   */
  readonly errors: string[] | null;

  /**
   * Id request
   */
  readonly requestId: string | null;
}
