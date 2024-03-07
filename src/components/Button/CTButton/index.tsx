import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import React, {useMemo} from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
  PressableProps,
  View,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import {CTButtonStyle} from './style';

export interface CTButtonProps extends PressableProps {
  text?: string | React.ReactNode;
  style?: StyleProp<ViewStyle>;
  type?: 'primary' | 'secondary' | 'plain' | 'grey';
  icon?: ImageSourcePropType;
  buttonType?: 'default' | 'destruction';
  textStyle?: StyleProp<TextStyle>;
  iconStyleProps?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  level?: '1' | '2' | '3' | '4';
  font?: Font;
}

const IosButton: React.FC<CTButtonProps> = (props: CTButtonProps) => {
  const {
    style,
    text,
    disabled,
    type,
    textStyle,
    icon,
    buttonType,
    containerStyle,
    level,
    font,
    iconStyleProps,
    ...rest
  } = props;
  const buttonStyle = useMemo(() => {
    switch (type) {
      case 'secondary':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.buttonSecondary
          : CTButtonStyle.buttonSecondaryDestruction;
      case 'plain':
        return CTButtonStyle.buttonText;
      case 'grey':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.buttonGrey
          : CTButtonStyle.buttonGreyDestruction;
      case 'primary':
      default:
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.buttonPrimary
          : CTButtonStyle.PrimaryDestruction;
    }
  }, [buttonType, type]);
  const buttonPressStyle = useMemo(() => {
    switch (type) {
      case 'secondary':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.buttonPressSecondary
          : CTButtonStyle.buttonPressSecondaryDestruction;
      case 'plain':
        return CTButtonStyle.buttonText;
      case 'grey':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.buttonPressGray
          : CTButtonStyle.buttonPressGrayDestruction;
      case 'primary':
      default:
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.buttonPressPrimary
          : CTButtonStyle.buttonPressPrimaryDestruction;
    }
  }, [buttonType, type]);
  const txtStyle = useMemo(() => {
    switch (type) {
      case 'secondary':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.textSecondary
          : CTButtonStyle.textSecondaryDestruction;
      case 'plain':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.textBtnText
          : CTButtonStyle.textBtnTextDestruction;

      case 'grey':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.textBtnTextGrey
          : CTButtonStyle.textBtnTextDestruction;
      case 'primary':
      default:
        return CTButtonStyle.textPrimary;
    }
  }, [buttonType, type]);
  const txtPressStyle = useMemo(() => {
    switch (type) {
      case 'secondary':
        return CTButtonStyle.textPressSecondary;
      case 'plain':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.textPressPlain
          : CTButtonStyle.textPressPlainDestruction;
      case 'grey':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.textPressPlainGrey
          : CTButtonStyle.textPressPlainDestruction;
      case 'primary':
      default:
        return CTButtonStyle.textPrimary;
    }
  }, [buttonType, type]);
  const iconStyle = useMemo(() => {
    switch (type) {
      case 'secondary':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.iconSecondary
          : CTButtonStyle.iconSecondaryDestruction;
      case 'plain':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.iconPlain
          : CTButtonStyle.iconPlainDestruction;
      case 'grey':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.iconGrey
          : CTButtonStyle.iconGreyDestruction;
      case 'primary':
      default:
        return CTButtonStyle.iconPrimary;
    }
  }, [buttonType, type]);
  const iconPressStyle = useMemo(() => {
    switch (type) {
      case 'secondary':
        return CTButtonStyle.iconPressSecondary;
      case 'plain':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.iconPressPlain
          : CTButtonStyle.iconPressPlainDestruction;
      case 'grey':
        return buttonType === 'default' || buttonType === undefined
          ? CTButtonStyle.iconPressPlain
          : CTButtonStyle.iconPressPlainDestruction;
      case 'primary':
      default:
        return CTButtonStyle.iconPrimary;
    }
  }, [buttonType, type]);
  const buttonDisable = useMemo(() => {
    switch (type) {
      case 'secondary':
        return CTButtonStyle.secondaryDisable;
      case 'plain':
        return CTButtonStyle.plainDisable;
      case 'grey':
        return CTButtonStyle.plainDisable;
      case 'primary':
      default:
        return CTButtonStyle.buttonDisable;
    }
  }, [type]);
  return (
    <Pressable
      disabled={disabled}
      style={({pressed}) => [
        CTButtonStyle.viewButton,
        pressed ? buttonPressStyle : buttonStyle,
        disabled && buttonDisable,
        style,
      ]}
      {...rest}>
      {({pressed}) => (
        <View style={[CTButtonStyle.container, containerStyle]}>
          {icon && (
            <Image
              style={[
                CTButtonStyle.iconDefaultStyle,
                disabled && CTButtonStyle.iconDisable,
                pressed ? iconPressStyle : iconStyle,
                iconStyleProps,
              ]}
              source={icon}
            />
          )}
          {icon && text && <View style={CTButtonStyle.center} />}
          {text && (
            <CTTypography.Text
              level={level ? level : '2'}
              font={font ? font : Font.Regular}
              style={[
                pressed ? txtPressStyle : txtStyle,
                textStyle,
                disabled && CTButtonStyle.textDisable,
              ]}
              text={text}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};

export default IosButton;
