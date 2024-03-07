import CTTypography from 'components/CTTypography';
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  View,
  ImageSourcePropType,
} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import {CTButtonTextIconStyle} from './style';

export interface CTButtonProps extends TouchableOpacityProps {
  text?: string;
  icon?: any;
  iconTail?: ImageSourcePropType;
  iconColor?: string;
  iconTailColor?: string;
}

const CTButtonTextIcon: React.FC<CTButtonProps> = (props: CTButtonProps) => {
  const {text, disabled, icon, iconTail, iconColor, iconTailColor, ...rest} =
    props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={CTButtonTextIconStyle.viewButton}
      {...rest}>
      <View style={CTButtonTextIconStyle.btnIcon}>
        <Image source={icon} style={[{tintColor: iconColor}]} />
      </View>
      <CTTypography.Text style={CTButtonTextIconStyle.btnText} text={text} />
      {iconTail && (
        <Image
          source={iconTail}
          style={[CTButtonTextIconStyle.icTail, {tintColor: iconTailColor}]}
          width={normalize(6)}
          height={normalize(10)}
        />
      )}
    </TouchableOpacity>
  );
};

export default CTButtonTextIcon;
