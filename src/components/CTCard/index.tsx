import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import React, {FC} from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {style} from './style';
import {colors} from 'assets/v2';

interface CTCardProps {
  title?: string;
  icon?: ImageSourcePropType;
  children?: React.ReactElement;
  styleContainer?: StyleProp<ViewStyle>;
  right?: React.ReactElement;
  showHeaderLine?: boolean;
  subTitle?: string;
}

const CTCard: FC<CTCardProps> = (props: CTCardProps) => {
  const {
    title,
    children,
    styleContainer,
    icon,
    right,
    showHeaderLine,
    subTitle,
  } = props;
  return (
    <View style={[style.container, styleContainer]}>
      <View style={[style.header, showHeaderLine && style.headerLine]}>
        <View style={style.headerLeft}>
          {icon && (
            <Image
              style={[style.icon, {tintColor: colors.secondary.o500}]}
              source={icon}
            />
          )}
          <CTTypography.Text
            style={style.headerText}
            text={title}
            font={Font.Medium}
            level="2"
          />
          {subTitle && (
            <CTTypography.Text
              style={style.headerSubText}
              text={subTitle}
              font={Font.Medium}
              level="2"
            />
          )}
        </View>
        {right}
      </View>
      <View style={style.body}>{children}</View>
    </View>
  );
};

export default CTCard;
