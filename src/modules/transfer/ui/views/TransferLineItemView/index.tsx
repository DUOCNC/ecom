import {ThemeStyle} from 'assets/theme';
import React from 'react';
import {View} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {LineItemEntity} from 'modules/transfer/models/entities';
import CTImage from 'components/CTImage';
import {ic_placeholder_6080} from 'assets/images';
import {getMediaUrl} from 'utils/MediaUtils';

type Props = {
  index: number;
  max: number;
  lineItem: LineItemEntity;
};

const TransferLineItemView: React.FC<Props> = ({lineItem, index, max}) => {
  return (
    <View style={style.container}>
      <View style={style.item}>
        <CTImage
          style={style.imgItem}
          source={{uri: getMediaUrl(lineItem.getVariantImage()) ?? undefined}}
          placeholder={ic_placeholder_6080}
        />
        <View style={style.itemRight}>
          <View style={[style.firstRow]}>
            <Typography
              text={lineItem.getVariantName()}
              color={colors.secondary.o900}
              style={style.txtCode}
              numberOfLines={2}
              lineHeight={20}
            />
          </View>
          <View style={[style.row, style.twoRow]}>
            <Typography
              text={lineItem.getSku()}
              textType="medium"
              color={colors.secondary.o900}
              style={style.txtCode}
              numberOfLines={2}
              lineHeight={20}
            />
          </View>
          <View style={[style.row, style.threeRow]}>
            <View style={style.row}>
              <Typography
                text="Số lượng gửi: "
                color={colors.secondary.o900}
                style={style.txtCode}
                numberOfLines={2}
                lineHeight={20}
              />
              <Typography
                text={lineItem.getTransferQuantity()}
                color={colors.secondary.o900}
                textType="medium"
              />
            </View>
            <View style={style.row}>
              <Typography
                text="Giá bán: "
                color={colors.secondary.o900}
                style={style.txtCode}
                numberOfLines={2}
                lineHeight={20}
              />
              <Typography
                text={lineItem.getPrice()}
                color={colors.secondary.o900}
                textType="medium"
              />
            </View>
          </View>
        </View>
      </View>
      {index !== max - 1 && <View style={ThemeStyle.separator} />}
    </View>
  );
};

export default TransferLineItemView;
