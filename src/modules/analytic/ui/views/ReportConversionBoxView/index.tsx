import {Typography} from 'common-ui';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {style} from './style';
import {colors} from 'assets/v2';
import {ic_rp_down, ic_rp_up} from 'assets/images';
interface props {
  boxKey: string;
  boxName: string;
  selected?: string;
  value: string;
  rate: string;
  up?: boolean;
  onPress: (keySelected: string) => void;
}
const ReportConversionBoxView: React.FC<props> = (props: props) => {
  const {boxName, selected, value, rate, up, boxKey, onPress} = props;
  const isSelect = selected === boxKey;
  let colorBoxName = colors.secondary.o500,
    colorValue = colors.primary.o500,
    colorRateUp = colors.success.o500,
    colorRateDown = colors.error.o500,
    colorIconUp = colors.success.o500,
    bgTagUp = colors.success.o50;
  if (isSelect) {
    colorBoxName = colors.secondary.o300;
    colorValue = colors.base.white;
    colorRateUp = colors.base.white;
    colorIconUp = colors.base.white;
    bgTagUp = colors.success.o500;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(boxKey);
      }}>
      <View style={[style.box, isSelect && style.selected]}>
        <View>
          <Typography
            text={boxName}
            textType="medium"
            color={colorBoxName}
            type="h5"
          />
        </View>
        <View style={style.rowValue}>
          <View style={style.left}>
            <Typography
              text={value}
              type="h3"
              textType="medium"
              color={colorValue}
            />
          </View>
          <View style={style.right}>
            {up ? (
              <View style={[{backgroundColor: bgTagUp}, style.tag]}>
                <View style={style.row}>
                  <Image
                    source={ic_rp_up}
                    style={[style.icon, {tintColor: colorIconUp}]}
                  />
                  <Typography text={rate} type="h5" color={colorRateUp} />
                </View>
              </View>
            ) : (
              <View style={[style.tag.down, style.tag]}>
                <View style={style.row}>
                  <Image source={ic_rp_down} style={style.icon} />
                  <Typography text={rate} type="h5" color={colorRateDown} />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ReportConversionBoxView;
