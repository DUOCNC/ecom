import VariantEntity from './VariantEntity';

export default class VariantColorEntity {
  private colorId: number;
  private color: string;
  private variants: Array<VariantEntity>;
  private constructor(
    colorId: number,
    color: string,
    variants: Array<VariantEntity>,
  ) {
    this.colorId = colorId;
    this.color = color;
    this.variants = variants;
  }

  static createFromVariant(variant: VariantEntity) {
    let arrVariant: Array<VariantEntity> = [];
    arrVariant.push(variant);
    return new VariantColorEntity(
      variant.getColorId(),
      variant.getColor(),
      arrVariant,
    );
  }

  addVariant(variant: VariantEntity) {
    if (this.colorId !== variant.getColorId()) {
      return;
    }
    this.variants.push(variant);
  }

  getVariants() {
    return this.variants;
  }

  getColorId() {
    return this.colorId;
  }

  getColor() {
    return this.color;
  }

  getImage() {
    let images = this.variants
      .map(variant => variant.getImage())
      .filter(item => item !== '');
    if (images.length === 0) {
      return '';
    }
    return images[0];
  }

  getKey() {
    return this.colorId.toString();
  }
}
