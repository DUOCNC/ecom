import {ic_box, ic_box_checked, ic_box_partial} from 'assets/images';
import React, {useMemo} from 'react';
import {Image, TouchableOpacity, View, ViewProps} from 'react-native';
import CTCheckStyle from './style';

interface Props extends ViewProps {
  disabled: boolean;
  value: boolean;
  type?: 'partial' | 'all';
  onValueChange?: (value: boolean) => void;
  label?: React.ReactNode;
}

const CTCheckbox: React.FC<Props> = (props: Props) => {
  const {value, onValueChange, disabled, type, label} = props;
  const ic_check = useMemo(
    () => (type === 'partial' ? ic_box_partial : ic_box_checked),
    [type],
  );
  const source = useMemo(() => (value ? ic_check : ic_box), [ic_check, value]);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        onValueChange && onValueChange(value);
      }}
      style={CTCheckStyle.row}>
      <Image source={source} />
      {label && <View style={CTCheckStyle.label}>{label}</View>}
    </TouchableOpacity>
  );
};

export default CTCheckbox;
