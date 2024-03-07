/**
 * Base Audit Response
 * v1.0
 */
export interface BaseAuditResponse {
  /**
   * Mã người tạo
   */
  readonly createdBy: string;

  /**
   * Tên người tạo
   */
  readonly createdName: string;

  /**
   * Mã người cập nhật
   */
  readonly updatedBy: string;

  /**
   * Tên người cập nhật
   */
  readonly updatedName: string;

  /**
   * Thời gian tạo
   */
  readonly createdDate: string;

  /**
   * Tên người tạo
   */
  readonly updatedDate: string;
}
