import {colors} from 'assets/v2';
import {Typography, DimentionUtils} from 'common-ui';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ic_tick} from 'assets/images';

type TValue = number | string;

interface Props<T extends TValue> {
  value: T;
  display: string;
  onPress: (v: T) => void;
  selected?: boolean;
}

const SelectItemView: React.FC<Props<any>> = ({
  selected,
  display,
  value,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[style.btn, selected && style.selected]}
      onPress={() => onPress(value)}>
      <Typography text={display} />
      {selected && <Image source={ic_tick} />}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btn: {
    height: DimentionUtils.scale(48),
    paddingHorizontal: DimentionUtils.scale(24),
    alignItems: 'center',
    flexDirection: 'row',
  },
  selected: {
    backgroundColor: colors.primary.o50,
    justifyContent: 'space-between',
    marginVertical: DimentionUtils.scale(-1),
  },
});

export default SelectItemView;
