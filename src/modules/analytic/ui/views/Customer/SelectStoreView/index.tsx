import React from 'react';
import {SelectStoreViewStyle} from './style';
import {Image, TouchableOpacity, View} from 'react-native';
import {ic_arrow_blue, ic_product_store} from 'assets/images';
import {Colors} from 'assets/colors';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text/enums';

interface Props {
  storeName: string;
  onPickStore?: () => void;
}

const SelectStoreView: React.FC<Props> = (props: Props) => {
  const {storeName, onPickStore} = props;
  return (
    <TouchableOpacity
      style={[SelectStoreViewStyle.row, SelectStoreViewStyle.rowStore]}
      onPress={onPickStore}>
      <View style={[SelectStoreViewStyle.row]}>
        <Image style={SelectStoreViewStyle.icStore} source={ic_product_store} />
        <CTTypography.Text
          text={storeName}
          level="2"
          font={Font.Medium}
          style={SelectStoreViewStyle.nameStore}
        />
      </View>
      <Image source={ic_arrow_blue} style={{tintColor: Colors.Blue}} />
    </TouchableOpacity>
  );
};

export default SelectStoreView;
