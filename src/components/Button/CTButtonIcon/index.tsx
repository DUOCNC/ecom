import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  Image,
  ImageStyle,
} from 'react-native';
import {CTButtonIconStyle} from './style';

export interface CTButtonProps extends TouchableOpacityProps {
  icon?: any;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
}

const CTButtonIcon: React.FC<CTButtonProps> = (props: CTButtonProps) => {
  const {style, icon, disabled, iconStyle, ...rest} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        CTButtonIconStyle.viewButton,
        disabled && CTButtonIconStyle.iconDisable,
        style,
      ]}
      {...rest}>
      <Image style={[iconStyle]} source={icon} />
    </TouchableOpacity>
  );
};

export default CTButtonIcon;
