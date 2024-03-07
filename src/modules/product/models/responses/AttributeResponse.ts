export interface AttributeResponse {
  id: number;
  productId: number;
  attributeId: number;
  attribute: string;
  description: string;
  type: string;
  tagId: null | number;
  tags: null | string[];
  deleted: boolean;
}
