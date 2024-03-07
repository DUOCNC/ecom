import {AttributeResponse} from '../responses';

export default class AttributeEntity {
  constructor(
    private id: number,
    private productId: number,
    private attributeId: number,
    private attribute: string,
    private description: string,
    private type: string,
    private tagId: null | number,
    private tags: null | string[],
    private deleted: boolean,
  ) {}

  static create(data: AttributeResponse) {
    return new AttributeEntity(
      data.id,
      data.productId,
      data.attributeId,
      data.attribute,
      data.description,
      data.type,
      data.tagId,
      data.tags,
      data.deleted,
    );
  }

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getProductId(): number {
    return this.productId;
  }

  setProductId(value: number) {
    this.productId = value;
  }

  getAttributeId(): number {
    return this.attributeId;
  }

  setAttributeId(value: number) {
    this.attributeId = value;
  }

  getAttribute(): string {
    return this.attribute;
  }

  setAttribute(value: string) {
    this.attribute = value;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(value: string) {
    this.description = value;
  }

  getType(): string {
    return this.type;
  }

  setType(value: string) {
    this.type = value;
  }

  getTagId(): null | number {
    return this.tagId;
  }

  setTagId(value: null | number) {
    this.tagId = value;
  }

  getTags(): null | string[] {
    return this.tags;
  }

  setTags(value: null | string[]) {
    this.tags = value;
  }

  isDeleted(): boolean {
    return this.deleted;
  }

  setDeleted(value: boolean) {
    this.deleted = value;
  }
}
