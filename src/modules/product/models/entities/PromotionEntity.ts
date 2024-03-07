import {DateUtils, NumberUtils, StringUtils} from 'common';
import {DateFormatPattern} from 'common/enums';
import {PromotionResponse} from '../responses';
import SuggestedDiscountEntity from './SuggestedDiscountEntity';

export default class PromotionEntity {
  private id: number;
  private type: string;
  private title: string;
  private startsDate: Date | null;
  private endsDate: Date | null;
  private state: string;
  private prerequisiteSalesChannelNames: Array<string>;
  private suggestedDiscounts: SuggestedDiscountEntity;

  private constructor(
    id: number,
    type: string,
    title: string,
    startsDate: Date | null,
    endsDate: Date | null,
    state: string,
    prerequisiteSalesChannelNames: Array<string>,
    suggestedDiscounts: SuggestedDiscountEntity,
  ) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.startsDate = startsDate;
    this.endsDate = endsDate;
    this.state = state;
    this.prerequisiteSalesChannelNames = prerequisiteSalesChannelNames;
    this.suggestedDiscounts = suggestedDiscounts;
  }

  public static createFromResponse(response: PromotionResponse) {
    let startDate = null;
    if (response.startsDate !== null) {
      startDate = new Date(response.startsDate);
    }
    let endDate = null;
    if (response.endsDate !== null) {
      endDate = new Date(response.endsDate);
    }

    let suggestedDiscount = SuggestedDiscountEntity.createFromResponse(
      response.suggestedDiscounts,
    );

    return new PromotionEntity(
      response.id,
      response.type,
      response.title,
      startDate,
      endDate,
      response.state,
      response.prerequisiteSalesChannelNames,
      suggestedDiscount,
    );
  }

  getKey(): string {
    return this.id.toString();
  }

  getTitle() {
    return this.title;
  }

  getPriceAfterDiscountValue(variantPrice: number) {
    if (this.suggestedDiscounts.getValueType() === 'PERCENTAGE') {
      const priceAfterDiscountValue =
        variantPrice -
        (this.suggestedDiscounts.getValue() / 100) * variantPrice;
      if (priceAfterDiscountValue <= 0) {
        return 0;
      }
      return (
        variantPrice - (this.suggestedDiscounts.getValue() / 100) * variantPrice
      );
    }
    if (this.suggestedDiscounts.getValueType() === 'FIXED_PRICE') {
      return this.suggestedDiscounts.getValue();
    }
    if (variantPrice - this.suggestedDiscounts.getValue() <= 0) {
      return 0;
    }
    return variantPrice - this.suggestedDiscounts.getValue();
  }

  getPriceAfterDiscount(variantPrice: number) {
    return NumberUtils.formatCurrency(
      this.getPriceAfterDiscountValue(variantPrice),
    );
  }

  getDueDate(): any {
    if (this.endsDate) {
      return StringUtils.format(
        'HSD: {0}',
        DateUtils.format(this.endsDate, DateFormatPattern.DDMMYYYY),
      );
    }
    if (this.startsDate) {
      return StringUtils.format(
        'Bắt đầu từ: {0}',
        DateUtils.format(this.startsDate, DateFormatPattern.DDMMYYYY),
      );
    }
    return 'Không có thời hạn';
  }

  getPrerequisiteSalesChannelNames() {
    return this.prerequisiteSalesChannelNames;
  }
}
