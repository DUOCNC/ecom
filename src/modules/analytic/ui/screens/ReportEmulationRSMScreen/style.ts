import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  param: {
    flexDirection: 'row',
    paddingVertical: DimentionUtils.scale(16),
    height: DimentionUtils.scale(68),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  title: {
    marginTop: DimentionUtils.scale(16),
    backgroundColor: colors.base.white,
    paddingHorizontal: DimentionUtils.scale(16),
    justifyContent: 'space-between',
    height: DimentionUtils.scale(48),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DimentionUtils.scale(12),
  },
  list: {
    paddingTop: DimentionUtils.scale(8),
    paddingHorizontal: DimentionUtils.scale(16),
    flex: DimentionUtils.scale(1),
  },
  empty: {
    paddingTop: '25%',
    flex: 1,
    backgroundColor: colors.base.white,
  },
  tabButton: {
    height: DimentionUtils.scale(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.base.white,
  },
  store: {
    backgroundColor: colors.primary.o25,
    marginHorizontal: DimentionUtils.scale(16),
    padding: DimentionUtils.scale(16),
    flexDirection: 'row',
    borderRadius: DimentionUtils.scale(8),
  },
  iconStore: {
    width: DimentionUtils.scale(40),
    height: DimentionUtils.scale(40),
  },
  storeRight: {
    paddingLeft: DimentionUtils.scale(16),
    flex: 1,
  },
  storeName: {
    paddingBottom: DimentionUtils.scale(12),
  },
  storeViewType: {marginBottom: DimentionUtils.scale(4)},
  subText: {
    color: colors.secondary.o500,
  },
  storeValue: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: DimentionUtils.scale(4),
  },
  storeGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: DimentionUtils.scale(8),
    borderRadius: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(2),
    paddingHorizontal: DimentionUtils.scale(8),
    tagUp: {
      backgroundColor: colors.success.o50,
    },
    tagDown: {
      backgroundColor: colors.error.o50,
    },
  },
  growth: {
    paddingLeft: DimentionUtils.scale(8),
    flexDirection: 'row',
    text: {color: Colors.SubText2},
    rate: {
      flexDirection: 'row',
      paddingLeft: DimentionUtils.scale(8),
      alignItems: 'center',
    },
    up: {
      color: Colors.Success700,
      paddingLeft: DimentionUtils.scale(4),
    },
    down: {
      color: Colors.Red,
      paddingLeft: DimentionUtils.scale(4),
    },
  },
  count: {
    borderRadius: DimentionUtils.scale(30),
    backgroundColor: Colors.Blue10,
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(2),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.blue.o75,
  },
  countText: {
    color: Colors.Tag,
  },
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
    backgroundColor: Colors.Primary25,
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
  hide: {display: 'none'},
  switchTab: {
    marginTop: DimentionUtils.scale(16),
  },
});
const ReportTabStyle = StyleSheet.create({
  container: {
    height: DimentionUtils.scale(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.base.white,
  },
});
export {style, ReportTabStyle};
