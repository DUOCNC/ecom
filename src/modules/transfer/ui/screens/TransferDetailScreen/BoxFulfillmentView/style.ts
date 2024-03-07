import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: DimentionUtils.scale(8),
  },
  label: {maxWidth: DimentionUtils.scale(100)},
  labelRowOne: {
    paddingTop: DimentionUtils.scale(4),
  },
  shipping: {
    backgroundColor: colors.base.white,
    paddingHorizontal: DimentionUtils.scale(16),
    marginTop: DimentionUtils.scale(8),
    paddingVertical: DimentionUtils.scale(16),
  },
  viewSubStatus: {
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(2),
    borderRadius: DimentionUtils.scale(30),
    borderWidth: DimentionUtils.scale(1),
  },
  txtStatus: {
    lineHeight: DimentionUtils.scale(20),
  },
  rowOne: {
    alignItems: 'center',
    height: DimentionUtils.scale(54),
  },
  rowTwo: {
    alignItems: 'center',
    height: DimentionUtils.scale(52),
  },
  fulfillmentCode: {
    marginLeft: DimentionUtils.scale(8),
  },
  copy: {
    marginLeft: DimentionUtils.scale(8),
  },
  deliveryTypeRow: {
    flexDirection: 'row',
  },
  deliveryType: {
    borderColor: '#D9D9D9',
    borderRadius: DimentionUtils.scale(2),
    borderWidth: DimentionUtils.scale(1),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  deliveryTypeName: {
    marginLeft: DimentionUtils.scale(8),
    alignItems: 'center',
  },
});

export default style;
