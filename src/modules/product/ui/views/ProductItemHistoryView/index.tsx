import React from 'react';
import {Typography} from 'common-ui';
import {HistorySearchEntity} from 'modules/product/models';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {ic_close, ic_history} from 'assets/images';

interface Props {
  data: HistorySearchEntity;
  onDelete: (data: HistorySearchEntity) => void;
  onPress: (key: string) => void;
}

const ProductItemHistoryView: React.FC<Props> = ({data, onDelete, onPress}) => {
  const onDeletePress = () => {
    onDelete(data);
  };
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => onPress(data.getKeyword())}
        style={style.btnContainer}>
        <Image style={style.icHistory} source={ic_history} />
        <Typography
          style={style.txt}
          type="h3"
          numberOfLines={1}
          ellipsizeMode="tail"
          text={data.getKeyword()}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeletePress} style={style.btnDelete}>
        <Image style={style.icClose} source={ic_close} />
      </TouchableOpacity>
    </View>
  );
};

export default ProductItemHistoryView;
