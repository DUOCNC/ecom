import {VariantImage} from 'model/dto/ProductService/VariantImage';
import {ProductDto} from 'model/dto/ProductService/ProductDto';
import {VariantDto} from 'model/dto/ProductService/VariantDto';
import {
  PromotionDto,
  SuggestedDiscountSubDto,
} from 'model/dto/PromotionService/PromotionDto';
import NumberUtils from 'utils/NumberUtils';

export const ConstantValuePricePromotion = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED_PRICE: 'FIXED_PRICE',
  FIXED_AMOUNT: 'FIXED_AMOUNT',
};
export interface ColorVariant {
  color_id: number;
  color: string;
  variants: Array<VariantDto>;
}

const ProductUtils = {
  getAvatar: (productDto: ProductDto) => {
    let url = '';
    let variantImages: Array<VariantImage> = [];
    productDto.variants.forEach(value => {
      variantImages = [...variantImages, ...value.variant_images];
    });
    const index = variantImages.findIndex(value => value.product_avatar);
    if (index !== -1) {
      url = variantImages[index].url;
    }
    return url;
  },
  getVariantAvatar1: (variantDto: VariantDto) => {
    let url = '';
    variantDto.variant_images.forEach(value => {
      if (value.variant_avatar) {
        url = value.url;
      }
    });
    return url;
  },
  getImages: (productDto: ProductDto) => {
    let imgs: Array<VariantImage> = [];
    productDto.variants.forEach(variantDto => {
      variantDto.variant_images.forEach(item => {
        item.variant_id = variantDto.id;
      });
      imgs = [...imgs, ...variantDto.variant_images];
    });
    return imgs;
  },
  getColorVariant: (variants: Array<VariantDto>) => {
    const colorVariants: Array<ColorVariant> = [];
    variants.forEach(item => {
      const colorId = item.color_id === null ? -1 : item.color_id;
      const index = colorVariants.findIndex(
        item1 => item1.color_id === colorId,
      );
      if (index === -1) {
        let newVariants: Array<VariantDto> = [item];
        colorVariants.push({
          color_id: colorId,
          color:
            colorId !== -1 ? (item.color ? item.color : '') : 'Không có màu',
          variants: newVariants,
        });
      } else {
        colorVariants[index].variants.push(item);
      }
    });
    return colorVariants;
  },
  getVariantIds: (productDto: ProductDto) => {
    const variantIds: Array<number> = productDto.variants.map(item => item.id);
    return variantIds;
  },
  getVariantAvatar: (variants: Array<VariantDto>) => {
    let avatar = '';
    variants.forEach(variantDto => {
      variantDto.variant_images.forEach(item => {
        if (item.variant_avatar) {
          avatar = item.url;
        }
      });
    });
    return avatar;
  },
  findPriceRetailVariant: (variant: VariantDto, currency: string) => {
    let price = 0;
    let index = variant.variant_prices.findIndex(
      variantPrice => variantPrice.currency_code === currency,
    );
    if (index !== -1) {
      price = variant.variant_prices[index].retail_price;
    }
    return price;
  },
  findPriceImportVariant: (variant: VariantDto, currency: string) => {
    let price = 0;
    let index = variant.variant_prices.findIndex(
      variantPrice => variantPrice.currency_code === currency,
    );
    if (index !== -1) {
      price = variant.variant_prices[index].import_price;
    }
    return price;
  },
  getPromotion: (promotion: SuggestedDiscountSubDto | null) => {
    if (promotion === null) {
      return 'Chiết khấu';
    }
    if (promotion.value_type === ConstantValuePricePromotion.PERCENTAGE) {
      return `Chiết khấu ${promotion.value}%`;
    }
    if (promotion.value_type === ConstantValuePricePromotion.FIXED_PRICE) {
      return `Đồng giá ${NumberUtils.formatCurrency(promotion.value)}`;
    }
    return `Giảm giá ${NumberUtils.formatCurrency(promotion.value)}`;
  },
  getPromotionDescription: (promotion: PromotionDto | null) => {
    if (promotion === null) {
      return '';
    }
  },
  getLastPricePromotion: (
    retailPrice: number | undefined,
    promotion: SuggestedDiscountSubDto | null,
  ): [number | null, string] => {
    if (promotion === null || !retailPrice) {
      return [null, ''];
    }
    if (promotion.value_type === ConstantValuePricePromotion.PERCENTAGE) {
      return [
        retailPrice * ((100 - promotion.value) / 100),
        NumberUtils.formatCurrency(
          retailPrice * ((100 - promotion.value) / 100),
        ),
      ];
    }
    if (promotion.value_type === ConstantValuePricePromotion.FIXED_PRICE) {
      return [promotion.value, NumberUtils.formatCurrency(promotion.value)];
    }
    if (promotion.value_type === ConstantValuePricePromotion.FIXED_AMOUNT) {
      return [
        retailPrice - promotion.value,
        NumberUtils.formatCurrency(retailPrice - promotion.value),
      ];
    }
    return [null, ''];
  },
};

export default ProductUtils;
