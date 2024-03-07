import {Typography} from 'common-ui';
import {TransferEntity} from 'modules/transfer/models/entities';
import React, {FC} from 'react';
import {View} from 'react-native';
import {colors} from 'assets/v2';
import style from './style';

interface Props {
  transfer: TransferEntity;
}

const BoxGeneralView: FC<Props> = (props: Props) => {
  const {transfer} = props;
  const transferStatus = transfer.getObjectStatus();
  return (
    <View style={style.general}>
      <View style={style.rowGeneral}>
        <Typography
          text="Mã phiếu"
          style={style.label}
          color={colors.secondary.o500}
        />
        <Typography
          text={transfer.getCode()}
          color={colors.primary.o700}
          textType="medium"
        />
      </View>
      <View style={style.rowGeneral}>
        <Typography
          text="Trạng thái"
          style={style.label}
          color={colors.secondary.o500}
        />
        {transferStatus && (
          <View
            style={[
              style.viewSubStatus,
              {
                backgroundColor: transferStatus.backgroundColor,
                borderColor: transferStatus.borderColor,
              },
            ]}>
            <Typography
              style={[style.txtStatus]}
              color={transferStatus.textColor}
              text={transferStatus.name}
            />
          </View>
        )}
      </View>
      <View style={style.rowGeneral}>
        <Typography
          text="Người chuyển"
          style={style.label}
          color={colors.secondary.o500}
        />
        <Typography
          text={transfer.getCreatedByStr()}
          color={colors.secondary.o900}
          numberOfLines={1}
        />
      </View>
      <View style={style.rowGeneral}>
        <Typography
          text="Người xác nhận hàng về"
          style={style.label}
          color={colors.secondary.o500}
        />
        <Typography
          text={transfer.getArrivedByStr()}
          color={colors.secondary.o900}
          numberOfLines={1}
        />
      </View>
      <View style={style.rowGeneral}>
        <Typography
          text="người nhận"
          style={style.label}
          color={colors.secondary.o500}
        />
        <Typography
          text={transfer.getReceivedByStr()}
          color={colors.secondary.o900}
          numberOfLines={1}
        />
      </View>
      <View style={style.rowGeneral}>
        <Typography
          text="Người hủy"
          style={style.label}
          color={colors.secondary.o500}
        />
        <Typography
          text={transfer.getCancelByStr()}
          color={colors.secondary.o900}
          numberOfLines={1}
        />
      </View>
    </View>
  );
};

export default BoxGeneralView;
