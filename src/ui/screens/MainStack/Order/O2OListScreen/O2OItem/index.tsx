import {ic_delivery, icon_user} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {CTText} from 'components/Base';
import CTTypography from 'components/CTTypography';
import {
  OrderFulfillmentLineItemSearchSubDto,
  OrderSearchDto,
} from 'model/dto/OrderService/OrderSearchDto';
import React from 'react';
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomerUtils} from 'services/CustomerService/CustomerUtils';
import DateUtils, {FormatDatePattern} from 'utils/DateUtils';
import NumberUtils from 'utils/NumberUtils';
import style from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {OrderUtils} from 'services/OrderService/OrderUtils';

type Props = {
  index: number;
  max: number;
  order: OrderSearchDto;
  onPress: (id: number, code: string) => void;
  openDetailDelivery?: (
    fulfillment: OrderFulfillmentLineItemSearchSubDto,
  ) => void;
};

const O2OItem: React.FC<Props> = ({
  order,
  onPress,
  index,
  max,
  openDetailDelivery,
}) => {
  const subStatus = CustomerUtils.getSubStatus(order.subStatusCode);
  const onPressOrder = () => {
    onPress(order.id, order.code);
  };
  const handleOpenDetailDelivery = (
    event: GestureResponderEvent,
    fulfillment: OrderFulfillmentLineItemSearchSubDto,
  ) => {
    event.stopPropagation();
    openDetailDelivery && openDetailDelivery(fulfillment);
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPressOrder} style={style.btn}>
        <View style={[style.row, style.firstRow]}>
          <View style={style.row}>
            <Typography
              text={order.code}
              type="h3"
              textType="medium"
              color={colors.primary.o500}
              style={style.txtCode}
            />
            <Typography
              text={DateUtils.format(
                order.createdDate,
                FormatDatePattern['DD/MM/YYYY - HH:mm'],
              )}
              color={colors.secondary.o500}
              type="h5"
            />
          </View>
          {subStatus && (
            <View
              style={[
                style.viewSubStatus,
                {
                  backgroundColor: subStatus.backgroundColor,
                  borderColor: subStatus.borderColor,
                },
              ]}>
              <CTText
                fontSize={12}
                style={[style.txtStatus, {color: subStatus.textColor}]}
                text={CustomerUtils.getCustomerStringOrNull(subStatus.name)}
              />
            </View>
          )}
        </View>
        <View style={[style.row, style.twoRow]}>
          <Typography
            type="h3"
            style={style.txtInfo}
            textType="medium"
            text={`${NumberUtils.formatCurrency(
              NumberUtils.getNumberOrNull(order.total),
            )}`}
          />
          <Typography
            text={StringUtils.format(
              '({0} sản phẩm)',
              CustomerUtils.getCustomerNumberOrNull(order.actualQuantity),
            )}
            color={colors.secondary.o500}
            style={style.subMoney}
          />
        </View>

        <CTTypography.Text
          level="2"
          style={style.txtInfo}
          text={`${order.customer} - ${order.customerPhoneNumber}`}
        />
        <View style={[style.row, style.threeRow]}>
          <View style={style.row}>
            <Image style={style.icon} source={icon_user} />
            <Typography
              color={colors.secondary.o500}
              style={style.txtStore}
              type="h4"
              text={StringUtils.format(
                'CGTV: {0} - {1}',
                order.assigneeCode?.toUpperCase(),
                order.assignee,
              )}
            />
          </View>
        </View>
        {OrderUtils.getTrackingCode(order) !== '' && (
          <View style={[style.row, style.rowFour]}>
            <Image style={style.icon} source={icon_user} />
            <Typography
              color={colors.secondary.o500}
              style={style.txtStore}
              type="h4"
              text={StringUtils.format(
                'Vận đơn: {0} - {1}',
                order.coordinatorCode?.toUpperCase() ?? '',
                order.coordinator ?? '',
              )}
            />
          </View>
        )}

        {OrderUtils.getTrackingCode(order) !== '' && (
          <TouchableOpacity
            style={[style.row, style.rowFour]}
            onPress={(event: GestureResponderEvent) => {
              const fulfillments = [
                ...order.fulfillments.filter(e => e.shipment !== null),
              ];
              if (fulfillments) {
                const fulfillment = fulfillments[fulfillments.length - 1];
                handleOpenDetailDelivery(event, fulfillment);
              }
            }}>
            <View style={style.row}>
              <Image
                source={ic_delivery}
                style={{tintColor: colors.success.o500}}
              />
              <Typography
                color={colors.success.o500}
                text="Tiến trình giao hàng"
                style={style.textDelivery}
              />
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {index !== max - 1 && <View style={ThemeStyle.separator} />}
    </View>
  );
};

export default O2OItem;
