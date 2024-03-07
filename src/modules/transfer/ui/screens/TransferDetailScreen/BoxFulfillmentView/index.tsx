import {TransferEntity} from 'modules/transfer/models/entities';
import React, {FC} from 'react';
import {Clipboard, Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {DimentionUtils, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {ic_copy, ic_copy_outline, ic_next_action} from 'assets/images';
import {showSuccess} from 'utils/ToastUtils';
import {StringUtils} from 'common';
import {
  ShipmentButton,
  ShipmentMethodOption,
} from 'modules/transfer/constant/ShipmentType';

interface Props {
  transfer: TransferEntity;
}

const BoxFulfillmentView: FC<Props> = (props: Props) => {
  const {transfer} = props;
  const handleCopy = () => {
    Clipboard.setString(transfer.getFulfillmentCode());
    showSuccess('Sao chép mã vận đơn');
  };
  return (
    <View style={style.shipping}>
      <View style={[style.row, style.rowOne]}>
        <Typography
          text="VẬN CHUYỂN"
          style={[
            style.label,
            style.labelRowOne,
            {maxWidth: DimentionUtils.scale(160)},
          ]}
          color={colors.secondary.o900}
          textType="medium"
        />
        <View style={[style.deliveryTypeRow, style.deliveryType]}>
          {ShipmentButton.filter(
            item => item.value === ShipmentMethodOption.DELIVER_PARTNER,
          ).map(e => (
            <View style={style.row}>
              <Image source={e.icon} />
              <Typography
                text={e.name}
                style={style.deliveryTypeName}
                color={colors.secondary.o900}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={[style.row, style.rowTwo]}>
        <View style={style.row}>
          <Image source={ic_next_action} />
          <Typography
            text={transfer.getFulfillmentCode()}
            type="h3"
            color={colors.primary.o500}
            style={style.fulfillmentCode}
            textType="medium"
          />
          <TouchableOpacity onPress={handleCopy} style={style.copy}>
            <Image source={ic_copy_outline} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.row}>
        <Typography text="Đối tác giao hàng:" color={colors.secondary.o900} />
        <Typography
          text={transfer.getDeliveryServiceProviderName()}
          color={colors.secondary.o900}
          textType="medium"
        />
      </View>
      <View style={style.row}>
        <Typography text="Phí ship trả HVC:" color={colors.secondary.o900} />
        <Typography
          text={transfer.getShippingFeePaidToThreePls()}
          color={colors.secondary.o900}
          textType="medium"
        />
      </View>
      <View style={style.row}>
        <Typography text="Trọng lượng:" color={colors.secondary.o900} />
        <Typography
          text={StringUtils.format(
            '{0}{1}',
            transfer.getTotalWeight(),
            transfer.getWeightUnit(),
          )}
          color={colors.secondary.o900}
          textType="medium"
        />
      </View>
      <View style={style.row}>
        <Typography text="Dịch vụ:" color={colors.secondary.o900} />
        <Typography
          text={transfer.getDeliveryTransportType()}
          color={colors.secondary.o900}
          textType="medium"
        />
      </View>
      <View style={style.row}>
        <Typography text="Trạng thái:" color={colors.secondary.o900} />
        <Typography
          text={transfer.getFulfillmentStatus()}
          color={colors.secondary.o900}
          textType="medium"
        />
      </View>
      <View style={style.row}>
        <Typography text="Ngày tạo:" color={colors.secondary.o900} />
        <Typography
          text={transfer.getFulfillmentCreatedDate()}
          color={colors.secondary.o900}
          textType="medium"
        />
      </View>
    </View>
  );
};

export default BoxFulfillmentView;
