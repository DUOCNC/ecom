import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  icon: {
    marginLeft: normalize(10),
  },
  empty: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },

  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(22),
  },

  rule: {
    height: DimentionUtils.scale(1),
    backgroundColor: colors.secondary.o200,
  },
  selfCenter: {
    alignSelf: 'center',
  },

  viewSubStatus: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(2),
    borderRadius: normalize(30),
    borderWidth: normalize(1),
  },
  txtStatus: {
    lineHeight: normalize(20),
  },

  titleBarcode: {
    marginBottom: DimentionUtils.scale(12),
  },

  viewBarCode: {
    alignSelf: 'center',
    marginTop: DimentionUtils.scale(12),
  },
  rowStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DimentionUtils.scale(12),
  },

  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(12),
  },
});

export default style;
