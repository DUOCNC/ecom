import {BaseAuditResponse} from 'common';
import {SuggestedDiscountResponse} from './SuggestedDiscountResponse';

export interface PromotionResponse extends BaseAuditResponse {
  id: number;
  type: string;
  title: string;
  priority: number;
  usageLimit: number | null;
  usageLimitPerCustomer: number | null;
  quantityLimit: number | null;
  startsDate: string | null;
  endsDate: string | null;
  entitledMethod: string;
  numberOfEntitlements: number;
  numberOfDiscountCodes: number;
  totalUsageCount: number;
  asyncUsageCount: number;
  asyncAllocationCount: number;
  state: string;
  activatedBy: string | null;
  activatedName: string | null;
  activatedDate: string | null;
  disabledBy: string | null;
  disabledName: string | null;
  disabledDate: string | null;
  cancelledBy: string | null;
  cancelledName: string | null;
  prerequisiteSalesChannelNames: Array<string>;
  suggestedDiscounts: SuggestedDiscountResponse;
}
