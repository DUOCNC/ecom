import {icon_user} from 'assets/images';
import {OrderHistoryDto} from 'model/dto/OrderService/OrderHistoryDto';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {CustomerUtils} from 'services/CustomerService/CustomerUtils';
import DateUtils, {FormatDatePattern} from 'utils/DateUtils';
import NumberUtils from 'utils/NumberUtils';
import OrderHistoryItemStyle from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';

type Props = {
  data: OrderHistoryDto;
  onPress: (isReturn: boolean, id: number, code: string) => void;
};

const OrderHistoryItem: React.FC<Props> = ({onPress, data}) => {
  const subStatus = CustomerUtils.getSubStatus(data.subStatusCode);
  const onPressItem = () => {
    onPress(data.orderId !== null, data.id, data.code);
  };
  return (
    <View style={OrderHistoryItemStyle.container}>
      <TouchableOpacity onPress={onPressItem}>
        <View
          style={[OrderHistoryItemStyle.row, OrderHistoryItemStyle.firstRow]}>
          <View style={OrderHistoryItemStyle.row}>
            <Typography
              textType="medium"
              text={data.code}
              color={colors.primary.o500}
            />
            <Typography
              text={DateUtils.format(
                data.createdDate,
                FormatDatePattern['DD/MM/YYYY - HH:mm'],
              )}
              type="h5"
              style={OrderHistoryItemStyle.createDate}
              color={colors.secondary.o500}
            />
          </View>
          {subStatus && (
            <View
              style={[
                OrderHistoryItemStyle.viewSubStatus,
                {
                  backgroundColor: subStatus.backgroundColor,
                  borderColor: subStatus.borderColor,
                },
              ]}>
              <Typography
                type="h5"
                color={subStatus.textColor}
                style={[OrderHistoryItemStyle.txtStatus]}
                text={CustomerUtils.getCustomerStringOrNull(subStatus.name)}
              />
            </View>
          )}
        </View>
        <View style={OrderHistoryItemStyle.row}>
          <Typography
            textType="medium"
            text={`${NumberUtils.formatCurrency(
              NumberUtils.getNumberOrNull(data.total),
            )} `}
          />
          <Typography
            color={colors.secondary.o500}
            text={`(${CustomerUtils.getCustomerNumberOrNull(
              data.actualQuantity,
            )} sản phẩm)`}
          />
        </View>
        <View style={[OrderHistoryItemStyle.row, OrderHistoryItemStyle.twoRow]}>
          <Typography text={data.store} color={colors.secondary.o900} />
        </View>
        <View
          style={[OrderHistoryItemStyle.row, OrderHistoryItemStyle.threeRow]}>
          <View style={OrderHistoryItemStyle.row}>
            <Image
              resizeMode="center"
              style={OrderHistoryItemStyle.icon}
              source={icon_user}
            />
            <Typography
              text={StringUtils.format(
                '  NVHB: {0} - {1}',
                data.assigneeCode,
                data.assignee,
              )}
              color={colors.secondary.o500}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OrderHistoryItem;
