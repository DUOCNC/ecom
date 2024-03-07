import {BaseAuditResponse} from 'common';

/**
 * Response Get Mapping Category
 */
export interface CategoryResponse extends BaseAuditResponse {
  /**
   * ID mapping bên mobile
   */
  id: number;
  /**
   * Id Category bên unicorn
   */
  categoryId: number;
  /**
   * Tên Category bên unicorn
   */
  category: string;
  /**
   * url icon
   */
  url: string;
  /**
   * vị trí hiển thị
   */
  position: number;
}
