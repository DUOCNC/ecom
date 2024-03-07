import CTTypography from 'components/CTTypography';
import {CustomerDto} from 'model/dto/CustomerService/CustomerDto';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CustomerUtils} from 'services/CustomerService/CustomerUtils';
import {CustomerItemStyle} from './style';
import {Typography} from 'common-ui';

interface Props {
  customer: CustomerDto;
  onPress: (customer: CustomerDto) => void;
}

const SearchCustomItem: React.FC<Props> = (props: Props) => {
  const {customer, onPress} = props;
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
                <Typography
                  text={customer.customerLevel || ''}
                  type="h5"
                  textType="regular"
                  style={CustomerItemStyle.txtLevel}
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
    </View>
  );
};

export default SearchCustomItem;
