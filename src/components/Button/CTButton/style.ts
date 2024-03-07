import {normalize} from 'utils/DimensionsUtils';
import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';
import {Size} from 'assets/theme';
import {colors} from 'assets/v2';

const CTButtonStyle = StyleSheet.create({
  viewButton: {
    height: Size.DefaultButtonHeight,
  },
  buttonDisable: {
    backgroundColor: Colors.Background,
  },
  buttonPrimary: {
    backgroundColor: Colors.Blue,
    borderRadius: Size.DefaultButtonRadius,
  },
  PrimaryDestruction: {
    backgroundColor: Colors.Red,
    borderRadius: Size.DefaultButtonRadius,
  },
  buttonPressPrimary: {
    backgroundColor: Colors.BluePress,
    borderRadius: Size.DefaultButtonRadius,
  },
  buttonPressPrimaryDestruction: {
    backgroundColor: Colors.RedPress,
    borderRadius: Size.DefaultButtonRadius,
  },
  buttonSecondary: {
    backgroundColor: Colors.Transparent,
    borderColor: Colors.Blue,
    borderRadius: Size.DefaultButtonRadius,
    borderWidth: normalize(1),
  },
  buttonSecondaryDestruction: {
    backgroundColor: Colors.Transparent,
    borderColor: Colors.Red,
    borderRadius: Size.DefaultButtonRadius,
    borderWidth: normalize(1),
  },
  buttonGrey: {
    backgroundColor: colors.secondary.o25,
    borderColor: Colors.Gray900,
    borderRadius: Size.DefaultButtonRadius,
    borderWidth: normalize(1),
  },
  buttonGreyDestruction: {
    backgroundColor: Colors.Transparent,
    borderColor: Colors.Red,
    borderRadius: Size.DefaultButtonRadius,
    borderWidth: normalize(1),
  },
  buttonPressSecondary: {
    backgroundColor: Colors.BluePress,
    borderColor: Colors.Blue,
    borderRadius: Size.DefaultButtonRadius,
    borderWidth: normalize(1),
  },
  buttonPressSecondaryDestruction: {
    backgroundColor: Colors.RedPress,
    borderColor: Colors.Red,
    borderRadius: Size.DefaultButtonRadius,
    borderWidth: normalize(1),
  },
  buttonPressGray: {
    backgroundColor: colors.secondary.o25,
    borderColor: Colors.Gray900,
    borderRadius: Size.DefaultButtonRadius,
    borderWidth: normalize(1),
  },
  buttonPressGrayDestruction: {
    backgroundColor: Colors.RedPress,
    borderColor: Colors.Red,
    borderRadius: Size.DefaultButtonRadius,
    borderWidth: normalize(1),
  },
  buttonText: {
    backgroundColor: Colors.Transparent,
  },
  textPrimary: {
    color: Colors.White,
  },
  textSecondary: {
    color: Colors.Blue,
  },
  textSecondaryDestruction: {
    color: Colors.Red,
  },
  textPressSecondary: {
    color: Colors.White,
  },
  textBtnText: {
    opacity: 1,
    color: Colors.Blue,
  },

  textBtnTextGrey: {
    color: Colors.Gray900,
  },
  textBtnTextDestruction: {
    opacity: 1,
    color: Colors.Red,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: Size.DefaultButtonPaddingHorizontal,
  },
  iconDefaultStyle: {
    width: Size.IconDefaultSize,
    height: Size.IconDefaultSize,
  },
  center: {
    marginHorizontal: normalize(2),
  },
  iconPrimary: {
    tintColor: Colors.White,
  },
  iconSecondary: {
    tintColor: Colors.Blue,
  },
  iconSecondaryDestruction: {
    tintColor: Colors.Red,
  },
  iconGrey: {
    tintColor: Colors.Gray900,
  },
  iconGreyDestruction: {
    tintColor: Colors.Red,
  },
  iconPressSecondary: {
    tintColor: Colors.White,
  },
  iconRight: {
    marginLeft: 10,
    marginTop: 3,
  },
  iconPressPlain: {
    opacity: 0.4,
  },
  iconPressPlainDestruction: {
    opacity: 0.4,
    tintColor: Colors.Red,
  },
  iconPlain: {
    opacity: 1,
  },
  iconPlainDestruction: {
    opacity: 1,
    tintColor: Colors.Red,
  },
  textPressPlain: {
    opacity: 0.4,
    color: Colors.Blue,
  },
  textPressPlainGrey: {
    opacity: 0.4,
    color: Colors.Gray900,
  },
  textPressPlainDestruction: {
    opacity: 0.4,
    color: Colors.Red,
  },
  plainDisable: {
    backgroundColor: Colors.Transparent,
  },
  secondaryDisable: {
    backgroundColor: Colors.Transparent,
    borderColor: Colors.Icon,
  },
  iconDisable: {
    tintColor: Colors.SubText2,
  },
  textDisable: {
    color: Colors.SubText2,
  },
  buttonSmall: {
    minWidth: normalize(150),
    alignItems: 'stretch',
  },
});

export {CTButtonStyle};
