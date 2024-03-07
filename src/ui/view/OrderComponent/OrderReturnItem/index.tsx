import {ic_clock, ic_store} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {CTText} from 'components/Base';
import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import {findPaymentReturnStatus} from 'config/DataSourceConfig/PaymentReturnStatus';
import {OrderReturnSearchDto} from 'model/dto/OrderService/OrderReturnSearchDto';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {CustomerUtils} from 'services/CustomerService/CustomerUtils';
import DateUtils, {FormatDatePattern} from 'utils/DateUtils';
import NumberUtils from 'utils/NumberUtils';
import OrderReturnItemStyle from './style';

interface OrderReturnItemProps {
  data: OrderReturnSearchDto;
  index: number;
  max: number;
  onPress: (id: number, code: string) => void;
}

const OrderReturnItem: React.FC<OrderReturnItemProps> = ({
  data,
  index,
  max,
  onPress,
}) => {
  const onPressOrder = () => {
    onPress(data.id, data.codeOrderReturn);
  };
  const paymentReturnStatus = findPaymentReturnStatus(data.paymentStatus);
  return (
    <View style={OrderReturnItemStyle.container}>
      <TouchableOpacity onPress={onPressOrder} style={OrderReturnItemStyle.btn}>
        <View style={[OrderReturnItemStyle.row, OrderReturnItemStyle.firstRow]}>
          <CTTypography.Text
            font={Font.Medium}
            level="2"
            style={OrderReturnItemStyle.txtCode}
            text={data.codeOrderReturn}
          />
          {paymentReturnStatus && (
            <View
              style={[
                OrderReturnItemStyle.viewSubStatus,
                {
                  backgroundColor: paymentReturnStatus.backgroundColor,
                  borderColor: paymentReturnStatus.borderColor,
                },
              ]}>
              <CTText
                fontSize={12}
                style={[
                  OrderReturnItemStyle.txtStatus,
                  {color: paymentReturnStatus.textColor},
                ]}
                text={CustomerUtils.getCustomerStringOrNull(
                  paymentReturnStatus.display,
                )}
              />
            </View>
          )}
        </View>
        <CTTypography.Text
          level="2"
          style={OrderReturnItemStyle.txtInfo}
          text={`Mã đơn gốc: ${data.codeOrder}`}
        />
        <CTTypography.Text
          level="2"
          style={OrderReturnItemStyle.txtInfo}
          text={`${NumberUtils.formatCurrency(
            NumberUtils.getNumberOrNull(data.total),
          )} (${CustomerUtils.getCustomerNumberOrNull(
            data.items.length,
          )} sản phẩm)`}
        />
        <CTTypography.Text
          level="2"
          style={OrderReturnItemStyle.txtInfo}
          text={`${data.customerName} - ${data.customerPhoneNumber}`}
        />
        <View style={[OrderReturnItemStyle.row, OrderReturnItemStyle.twoRow]}>
          <View style={OrderReturnItemStyle.row}>
            <Image
              style={OrderReturnItemStyle.icon}
              resizeMode="contain"
              source={ic_store}
            />
            <CTTypography.Text
              style={OrderReturnItemStyle.txtStore}
              level="2"
              text={data.store}
            />
          </View>
        </View>
        <View style={[OrderReturnItemStyle.row, OrderReturnItemStyle.threeRow]}>
          <View style={OrderReturnItemStyle.row}>
            <Image
              resizeMode="center"
              style={OrderReturnItemStyle.icon}
              source={ic_clock}
            />
            <CTTypography.Text
              style={OrderReturnItemStyle.txtStore}
              level="2"
              text={DateUtils.format(
                data.createdDate,
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

export default OrderReturnItem;
