import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {Platform, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  image: {
    width: DimentionUtils.scale(227 + 16),
    height: DimentionUtils.scale(83 + 16),
    marginLeft: DimentionUtils.scale(8),
  },
  imageVertical: {
    width: DimentionUtils.scale(352),
    height: DimentionUtils.scale(125),
    marginBottom: DimentionUtils.scale(8),
    alignSelf: 'center',
  },
  container: {
    width: DimentionUtils.scale(167),
    height: DimentionUtils.scale(83),
    marginTop: DimentionUtils.scale(8),
    marginLeft: DimentionUtils.scale(68),
    padding: DimentionUtils.scale(8),
  },
  containerStyle: {
    flex: 1,
    width: DimentionUtils.scale(250),
    height: DimentionUtils.scale(83),
    marginVertical: DimentionUtils.scale(8),
    marginLeft: DimentionUtils.scale(89),
    paddingLeft: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
  },
  txtPromotion: {
    marginTop: DimentionUtils.scale(2),
  },
  txtTitle: {
    height: DimentionUtils.scale(28),
  },
  txtTitleVertical: {
    height: DimentionUtils.scale(36),
  },
  channel: {
    flexDirection: 'row',
    marginBottom: DimentionUtils.scale(6),
    marginTop: DimentionUtils.scale(6),
  },
  channelHorizontal: {
    marginBottom:
      Platform.OS === 'android'
        ? DimentionUtils.scale(0)
        : DimentionUtils.scale(4),
    marginTop:
      Platform.OS === 'ios' ? DimentionUtils.scale(0) : DimentionUtils.scale(2),
  },
  channelPos: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: DimentionUtils.scale(1),
    backgroundColor: colors.success.o50,
    borderColor: colors.success.o300,
    borderRadius: DimentionUtils.scale(30),
    width: DimentionUtils.scale(76),
    height: DimentionUtils.scale(20),
  },
  channelPosHorizontal: {
    width: DimentionUtils.scale(56),
    height: DimentionUtils.scale(16),
  },
  channelOnline: {
    marginLeft: DimentionUtils.scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: DimentionUtils.scale(1),
    backgroundColor: colors.error.o50,
    borderColor: colors.error.o300,
    borderRadius: DimentionUtils.scale(30),
    width: DimentionUtils.scale(50),
    height: DimentionUtils.scale(20),
  },
  channelOnlineHorizontal: {
    width: DimentionUtils.scale(40),
    height: DimentionUtils.scale(16),
  },
});

export default style;
