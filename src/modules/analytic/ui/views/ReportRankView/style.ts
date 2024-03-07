import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  rankColumn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: {
    paddingVertical: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
    flexDirection: 'row',
    rank2: {
      flex: 1,
      marginTop: DimentionUtils.scale(40),
    },
    rank1: {
      flex: 1,
    },
    rank3: {flex: 1, paddingTop: DimentionUtils.scale(54)},
  },
  rankBottom: {
    borderTopLeftRadius: DimentionUtils.scale(16),
    width: '100%',
    borderTopRightRadius: DimentionUtils.scale(16),
    paddingHorizontal: DimentionUtils.scale(6),
    paddingTop: DimentionUtils.scale(10),
    alignItems: 'center',
  },
  rank1Bottom: {
    backgroundColor: colors.primary.o25,
    height: DimentionUtils.scale(126),
  },
  rank2Bottom: {
    backgroundColor: '#B7B7FF',
    height: DimentionUtils.scale(96),
  },
  rank3Bottom: {backgroundColor: '#B7B7FF', height: DimentionUtils.scale(80)},
  rankValue: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: DimentionUtils.scale(8),
  },
  rank1Value: {},
  rankText: {lineHeight: DimentionUtils.scale(16)},
  rank1Text: {
    marginTop: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(12),
  },
  rank2Value: {paddingTop: DimentionUtils.scale(8)},
  rank2Text: {color: '#2F54EB'},
  rank3Value: {paddingTop: DimentionUtils.scale(8)},
  rank3Text: {color: '#793CDD'},
  icCustomer: {
    width: DimentionUtils.scale(16),
    height: DimentionUtils.scale(16),
    padding: DimentionUtils.scale(4),
  },
});

export {style};
