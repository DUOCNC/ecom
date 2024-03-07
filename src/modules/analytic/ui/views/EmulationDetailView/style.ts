import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
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
  item: {
    marginVertical: DimentionUtils.scale(12),
    marginHorizontal: DimentionUtils.scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  sub: {},
  subItem: {
    marginTop: DimentionUtils.scale(-4),
    paddingLeft: DimentionUtils.scale(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: DimentionUtils.scale(4),
    paddingRight: DimentionUtils.scale(34),
  },
  subItemText: {
    color: colors.secondary.o500,
  },
  iconText: {
    color: colors.base.white,
  },
  iconText1: {
    color: colors.secondary.o500,
  },
  iconTop: {width: DimentionUtils.scale(30), height: DimentionUtils.scale(30)},
  icon: {
    width: DimentionUtils.scale(30),
    height: DimentionUtils.scale(30),
    borderRadius: DimentionUtils.scale(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DimentionUtils.scale(16),
  },
  icon1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DimentionUtils.scale(16),
  },
  name: {maxWidth: SCREEN_WIDTH - 230},
  left: {
    flexDirection: 'row',
    flex: 1,
  },
  right: {
    flexDirection: 'row',
  },
  transformArrow: {
    transform: [{rotate: '180deg'}],
    paddingTop: DimentionUtils.scale(0),
  },
  iconArrow: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    marginLeft: DimentionUtils.scale(10),
    transform: [{rotate: '-90deg'}],
  },
  line: {
    borderTopColor: '#E8EAEB',
    borderTopWidth: DimentionUtils.scale(1),
    marginLeft: DimentionUtils.scale(62),
    marginRight: DimentionUtils.scale(16),
  },
});

export {style};
