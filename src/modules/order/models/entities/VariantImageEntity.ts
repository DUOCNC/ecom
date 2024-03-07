import {getMediaUrl} from 'utils/MediaUtils';
import {VariantImageResponse} from '../responses';

export default class VariantImageEntity {
  private id: number;
  private imageId: number;
  private position: number | null;
  private productAvatar: boolean;
  private url: string | null;
  private variantAvatar: boolean;
  private variantId: number;
  constructor(
    id: number,
    imageId: number,
    position: number | null,
    productAvatar: boolean,
    url: string | null,
    variantAvatar: boolean,
    variantId: number,
  ) {
    this.id = id;
    this.imageId = imageId;
    this.position = position;
    this.productAvatar = productAvatar;
    this.url = url;
    this.variantAvatar = variantAvatar;
    this.variantId = variantId;
  }

  static create(variantImage: VariantImageResponse) {
    return new VariantImageEntity(
      variantImage.id,
      variantImage.imageId,
      variantImage.position,
      variantImage.productAvatar,
      variantImage.url,
      variantImage.variantAvatar,
      variantImage.variantId,
    );
  }

  getId() {
    return this.id;
  }

  getImageId() {
    return this.imageId;
  }

  getPosition() {
    return this.position;
  }

  isProductAvatar() {
    return this.productAvatar;
  }

  isVariantAvatar() {
    return this.variantAvatar;
  }

  getUrl() {
    if (this.url == null) {
      return '';
    }
    return getMediaUrl(this.url);
  }

  getVariantId() {
    return this.variantId;
  }
}
