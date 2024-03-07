import {TransferEntity} from 'modules/transfer/models/entities';
import React, {FC} from 'react';
import {View} from 'react-native';
import style from './style';
import {DimentionUtils, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';

interface Props {
  transfer: TransferEntity;
}

const BoxStoreView: FC<Props> = (props: Props) => {
  const {transfer} = props;
  return (
    <View style={style.store}>
      <View style={style.storeFrom}>
        <View style={style.row}>
          <Typography
            text="Kho gửi"
            style={style.label}
            color={colors.secondary.o500}
          />
          <Typography
            text={transfer.getFromStoreName()}
            color={colors.secondary.o900}
            numberOfLines={1}
          />
        </View>
        <View style={style.row}>
          <Typography
            text={StringUtils.format('Mã CH: {0}', transfer.getFromStoreCode())}
            style={[style.label, {maxWidth: DimentionUtils.scale(160)}]}
            color={colors.secondary.o500}
          />
          <Typography
            text={transfer.getFromStorePhone()}
            color={colors.secondary.o900}
            numberOfLines={1}
          />
        </View>
        <View style={style.row}>
          <Typography
            text={transfer.getFromStoreAddress()}
            color={colors.secondary.o900}
            numberOfLines={2}
            lineHeight={20}
          />
        </View>
      </View>
      <View style={style.storeTo}>
        <View style={style.row}>
          <Typography
            text="Kho gửi"
            style={style.label}
            color={colors.secondary.o500}
          />
          <Typography
            text={transfer.getToStoreName()}
            color={colors.secondary.o900}
            numberOfLines={1}
          />
        </View>
        <View style={style.row}>
          <Typography
            text={StringUtils.format('Mã CH: {0}', transfer.getToStoreCode())}
            style={[style.label, {maxWidth: DimentionUtils.scale(160)}]}
            color={colors.secondary.o500}
          />
          <Typography
            text={transfer.getToStorePhone()}
            color={colors.secondary.o900}
            numberOfLines={1}
          />
        </View>
        <View style={style.row}>
          <Typography
            text={transfer.getToStoreAddress()}
            color={colors.secondary.o900}
            numberOfLines={2}
            lineHeight={20}
          />
        </View>
      </View>
    </View>
  );
};

export default BoxStoreView;
