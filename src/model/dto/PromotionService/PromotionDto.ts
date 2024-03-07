import {BaseDto} from 'model/base/BaseDto';

export interface SuggestedDiscountSubDto {
  price_rule_id: number;
  title: string;
  value_type: string;
  value: number;
  allocation_limit: number | null;
}

export interface PromotionDto extends BaseDto {
  type: string;
  title: string;
  priority: number;
  usage_limit: number | null;
  usage_limit_per_customer: number | null;
  quantity_limit: number | null;
  starts_date: string | null;
  ends_date: string | null;
  entitled_method: string;
  number_of_entitlements: number;
  number_of_discount_codes: number;
  total_usage_count: number;
  async_usage_count: number;
  async_allocation_count: number;
  state: string;
  activated_by: string | null;
  activated_name: string | null;
  activated_date: string | null;
  disabled_by: string | null;
  disabled_name: string | null;
  disabled_date: string | null;
  cancelled_by: string | null;
  cancelled_name: string | null;
  suggested_discounts: SuggestedDiscountSubDto;
}
