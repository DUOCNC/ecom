import CTTypography from 'components/CTTypography';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  TouchableOpacityProps, TouchableWithoutFeedback,
  View,
} from 'react-native';

import {normalize} from 'utils/DimensionsUtils';
import {CTButtonTextIconHomeStyle} from './style';
import {Font} from 'components/Base/Text';

export interface CTButtonProps extends TouchableOpacityProps {
  text?: string;
  icon?: any;
  iconTail?: ImageSourcePropType;
  iconColor?: string;
  iconTailColor?: string;
}

const CTButtonTextIconHome: React.FC<CTButtonProps> = (
  props: CTButtonProps,
) => {
  const {text, disabled, icon, iconTail, iconColor, iconTailColor, ...rest} =
    props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={CTButtonTextIconHomeStyle.viewButton}
      {...rest}>
      {icon && (
        <View style={CTButtonTextIconHomeStyle.btnIcon}>
          <Image source={icon} style={[{tintColor: iconColor}]} />
        </View>
      )}
      <CTTypography.Text
        style={CTButtonTextIconHomeStyle.btnText}
        font={Font.Regular}
        text={text}
      />
      {iconTail && (
        <Image
          source={iconTail}
          style={[CTButtonTextIconHomeStyle.icTail, {tintColor: iconTailColor}]}
          width={normalize(6)}
          height={normalize(10)}
        />
      )}
    </TouchableOpacity>
  );
};

export default CTButtonTextIconHome;
