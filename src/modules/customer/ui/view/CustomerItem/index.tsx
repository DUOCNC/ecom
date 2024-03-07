import React from 'react';
import {CustomerDto} from 'model/dto/CustomerService/CustomerDto';
import {TouchableOpacity, View} from 'react-native';
import {CustomerItemStyle} from './style';
import {CTText} from 'components/Base';
import {CustomerUtils} from 'services/CustomerService/CustomerUtils';
import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import {ThemeStyle} from 'assets/theme';

interface CustomerItemProps {
  customer: CustomerDto;
  onPress: (customer: CustomerDto) => void;
  index: number;
  max: number;
}

const CustomerItem: React.FC<CustomerItemProps> = (
  props: CustomerItemProps,
) => {
  const {customer, onPress, index, max} = props;
  const point = CustomerUtils.getPoint(customer.point);
  const totalBuy = CustomerUtils.getTotalFinishedOrder(
    customer.totalFinishedOrder,
    customer.totalReturnedOrder,
  );
  const fullName =
    customer.fullName !== null && customer.fullName !== ''
      ? customer.fullName
      : 'Không có tên';
  return (
    <View style={CustomerItemStyle.container}>
      <TouchableOpacity
        onPress={() => onPress(customer)}
        style={CustomerItemStyle.btn}>
        <View style={CustomerItemStyle.body}>
          <View style={[CustomerItemStyle.row, CustomerItemStyle.justify]}>
            <CTTypography.Text
              level="2"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={CustomerItemStyle.txtFullName}
              text={fullName}
            />

            {customer.customerLevel && (
              <View style={CustomerItemStyle.viewLevel}>
                <CTText
                  fontSize={12}
                  font={Font.Regular}
                  style={CustomerItemStyle.txtLevel}
                  text={customer.customerLevel || ''}
                />
              </View>
            )}
          </View>
          <View style={CustomerItemStyle.row}>
            <CTTypography.Text
              level="2"
              numberOfLines={1}
              ellipsizeMode="tail"
              text={customer.phone}
            />
          </View>
          <View style={CustomerItemStyle.row}>
            <CTTypography.Text
              level="3"
              numberOfLines={1}
              ellipsizeMode="tail"
              text={`Điểm: ${point}`}
            />
            <View style={CustomerItemStyle.view} />
            <CTTypography.Text
              level="3"
              numberOfLines={1}
              ellipsizeMode="tail"
              text={`Đã mua ${totalBuy}`}
            />
          </View>
        </View>
      </TouchableOpacity>
      {index + 1 !== max && <View style={ThemeStyle.separator16} />}
    </View>
  );
};

export default CustomerItem;
