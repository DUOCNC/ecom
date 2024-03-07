import {BaseDto} from 'model/base/BaseDto';

export interface OrderConfigDto extends BaseDto {
  sellable_inventory: boolean;
  order_config_action: string;
  order_config_print: {
    id: number;
    name: string;
  };
  for_all_order: boolean;
  allow_choose_item: boolean;
  hide_gift: boolean;
  hide_bonus_item: boolean;
}
