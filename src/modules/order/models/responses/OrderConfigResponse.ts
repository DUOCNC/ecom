import {BaseAuditResponse} from 'common';
import {OrderPrintConfigResponse} from './OrderPrintConfigResponse';

export interface OrderConfigResponse extends BaseAuditResponse {
  id: number;
  code: string;
  allowChooseItem: boolean;
  forAllOrder: boolean;
  hideBonusItem: boolean;
  hideGift: boolean;
  orderConfigAction: string;
  orderConfigPrint: OrderPrintConfigResponse;
  sellableInventory: true;
}
