import {ic_clock_circle, ic_shop, ic_user_outline} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import TransferEntity from 'modules/transfer/models/entities/TransferEntity';
import {Colors} from 'assets/colors';

type Props = {
  index: number;
  max: number;
  transfer: TransferEntity;
  onPress: (id: number) => void;
};

const TransferItemView: React.FC<Props> = ({transfer, onPress, index, max}) => {
  const transferStatus = transfer.getObjectStatus();
  const onPressTransfer = () => {
    onPress(transfer.getId());
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPressTransfer} style={style.btn}>
        <View style={[style.row, style.firstRow]}>
          <Typography
            text={transfer.getCode()}
            type="h3"
            textType="medium"
            color={colors.primary.o500}
            style={style.txtCode}
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
        <View style={[style.row, style.twoRow]}>
          <Image source={ic_shop} />
          <Typography
            style={style.value}
            color={Colors.SubText}
            text={StringUtils.format(
              'Kho nhận: {0}',
              transfer.getToStoreName(),
            )}
          />
        </View>
        <View style={[style.row, style.threeRow]}>
          <Image source={ic_user_outline} />
          <Typography
            style={style.value}
            color={Colors.SubText}
            text={StringUtils.format(
              '{0} - {1}',
              transfer.getCreatedBy(),
              transfer.getCreatedName(),
            )}
          />
        </View>
        <View style={[style.row, style.fourRow]}>
          <Image source={ic_clock_circle} />
          <Typography
            style={style.value}
            color={Colors.SubText}
            text={StringUtils.format('{0}', transfer.getCreatedDateStr())}
          />
        </View>
      </TouchableOpacity>
      {index !== max - 1 && <View style={ThemeStyle.separator} />}
    </View>
  );
};

export default TransferItemView;
