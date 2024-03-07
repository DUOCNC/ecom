import {ic_clock, ic_store} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {CTText} from 'components/Base';
import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import {OrderSearchDto} from 'model/dto/OrderService/OrderSearchDto';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {CustomerUtils} from 'services/CustomerService/CustomerUtils';
import DateUtils, {FormatDatePattern} from 'utils/DateUtils';
import NumberUtils from 'utils/NumberUtils';
import OrderSearchItemStyle from './style';

type Props = {
  index: number;
  max: number;
  order: OrderSearchDto;
  onPress: (id: number, code: string) => void;
};

const OrderSearchItem: React.FC<Props> = ({order, onPress, index, max}) => {
  const subStatus = CustomerUtils.getSubStatus(order.subStatusCode);
  const onPressOrder = () => {
    onPress(order.id, order.code);
  };
  return (
    <View style={OrderSearchItemStyle.container}>
      <TouchableOpacity onPress={onPressOrder} style={OrderSearchItemStyle.btn}>
        <View style={[OrderSearchItemStyle.row, OrderSearchItemStyle.firstRow]}>
          <CTTypography.Text
            font={Font.Medium}
            level="2"
            style={OrderSearchItemStyle.txtCode}
            text={order.code}
          />
          {subStatus && (
            <View
              style={[
                OrderSearchItemStyle.viewSubStatus,
                {
                  backgroundColor: subStatus.backgroundColor,
                  borderColor: subStatus.borderColor,
                },
              ]}>
              <CTText
                fontSize={12}
                style={[
                  OrderSearchItemStyle.txtStatus,
                  {color: subStatus.textColor},
                ]}
                text={CustomerUtils.getCustomerStringOrNull(subStatus.name)}
              />
            </View>
          )}
        </View>
        <CTTypography.Text
          level="2"
          style={OrderSearchItemStyle.txtInfo}
          text={`${NumberUtils.formatCurrency(
            NumberUtils.getNumberOrNull(order.total),
          )} (${CustomerUtils.getCustomerNumberOrNull(
            order.actualQuantity,
          )} sản phẩm)`}
        />
        <CTTypography.Text
          level="2"
          style={OrderSearchItemStyle.txtInfo}
          text={`${order.customer} - ${order.customerPhoneNumber}`}
        />
        <View style={[OrderSearchItemStyle.row, OrderSearchItemStyle.twoRow]}>
          <View style={OrderSearchItemStyle.row}>
            <Image
              style={OrderSearchItemStyle.icon}
              resizeMode="contain"
              source={ic_store}
            />
            <CTTypography.Text
              style={OrderSearchItemStyle.txtStore}
              level="2"
              text={order.store}
            />
          </View>
        </View>
        <View style={[OrderSearchItemStyle.row, OrderSearchItemStyle.threeRow]}>
          <View style={OrderSearchItemStyle.row}>
            <Image
              resizeMode="center"
              style={OrderSearchItemStyle.icon}
              source={ic_clock}
            />
            <CTText
              style={OrderSearchItemStyle.txtStore}
              fontSize={14}
              text={DateUtils.format(
                order.createdDate,
                FormatDatePattern['DD/MM/YYYY - HH:mm'],
              )}
            />
          </View>
        </View>
      </TouchableOpacity>
      {index !== max - 1 && <View style={ThemeStyle.separator16} />}
    </View>
  );
};

export default OrderSearchItem;
