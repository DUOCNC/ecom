import {ic_delivery_partner} from 'assets/images';
import {ImageSourcePropType} from 'react-native';

type ShipmentButtonType = {
  name: string | null;
  value: number;
  icon: ImageSourcePropType;
};
export enum ShipmentMethodOption {
  DELIVER_PARTNER = 1,
  SELF_DELIVER = 2,
  LOGISTICS_HUB = 3,
}
export const ShipmentButton: Array<ShipmentButtonType> = [
  {
    name: 'Chuyển hãng vận chuyển',
    value: ShipmentMethodOption.DELIVER_PARTNER,
    icon: ic_delivery_partner,
  },
  {
    name: 'Tự giao hàng',
    value: ShipmentMethodOption.SELF_DELIVER,
    icon: ic_delivery_partner,
  },
  {
    name: 'Kho tổng',
    value: ShipmentMethodOption.LOGISTICS_HUB,
    icon: ic_delivery_partner,
  },
];
