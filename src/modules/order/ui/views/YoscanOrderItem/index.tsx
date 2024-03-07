import {ic_clock} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import CTTypography from 'components/CTTypography';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {CustomerUtils} from 'services/CustomerService/CustomerUtils';
import style from './style';
import {OrderYoscanEntity} from 'modules/order/models/entities/OrderYoscanEntity';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import DateUtils, {FormatDatePattern} from 'utils/DateUtils';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import DateUtilts from 'common/utils/DateUtilts';
import {DateFormatPattern} from 'common/enums';

type Props = {
  index: number;
  max: number;
  order: OrderYoscanEntity;
};

const YoscanOrderItem: React.FC<Props> = ({order, index, max}) => {
  const subStatus = order.getStatusColor();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onClickItemYoscan = () => {
    navigation.navigate(MainRouteConfig.YoscanDetail, {
      code: order.getCode(),
      createdDate: order.getCreatedDate(),
    });
  };
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onClickItemYoscan} style={style.btn}>
        <View style={[style.row, style.firstRow]}>
          <Typography
            textType="medium"
            type="h3"
            color={colors.primary.o500}
            text={order.getCode()}
          />
          {subStatus && (
            <View
              style={[
                style.viewSubStatus,
                {
                  backgroundColor: subStatus.backgroundColor,
                  borderColor: subStatus.borderColor,
                },
              ]}>
              <Typography
                style={[style.txtStatus]}
                color={subStatus.textColor}
                text={CustomerUtils.getCustomerStringOrNull(subStatus.name)}
              />
            </View>
          )}
        </View>
        <CTTypography.Text
          level="2"
          style={style.txtInfo}
          text={`${order.getTotalCurrency()} (${order.getTotalProduct()} sản phẩm)`}
        />
        <CTTypography.Text
          level="2"
          style={style.txtInfo}
          text={`${order.getOrder().getCustomer().getName()} - ${order
            .getOrder()
            .getCustomer()
            .getPhoneNumber()}`}
        />
        <View style={[style.row, style.threeRow]}>
          <View style={style.row}>
            <Image resizeMode="center" style={style.icon} source={ic_clock} />
            <Typography
              style={style.txtStore}
              color={colors.secondary.o600}
              text={DateUtilts.formatDateFromServer(
                order.getCreatedDate(),
                DateFormatPattern.DDMMYYYYHHmm,
              )}
            />
          </View>
        </View>
      </TouchableOpacity>
      {index !== max - 1 && <View style={ThemeStyle.separator16} />}
    </View>
  );
};

export default YoscanOrderItem;
