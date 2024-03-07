import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const Styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  content: {
    flex: 1,
  },
  param: {
    flexDirection: 'row',
    paddingVertical: normalize(16),
    height: normalize(68),
    paddingHorizontal: normalize(16),
  },
  title: {
    marginTop: normalize(16),
    backgroundColor: Colors.White,
    paddingHorizontal: normalize(16),
    justifyContent: 'space-between',
    height: normalize(48),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(12),
  },
  list: {
    paddingTop: normalize(8),
    paddingHorizontal: normalize(16),
    flex: normalize(1),
  },
  empty: {
    paddingTop: '25%',
    flex: 1,
    backgroundColor: Colors.White,
  },
  tabButton: {
    height: normalize(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  store: {
    height: normalize(118),
    backgroundColor: Colors.Primary25,
    marginHorizontal: normalize(16),
    padding: normalize(16),
    flexDirection: 'row',
    borderRadius: normalize(8),
  },
  iconStore: {
    width: normalize(40),
    height: normalize(40),
  },
  storeRight: {
    paddingLeft: normalize(16),
    flex: 1,
  },
  storeName: {
    paddingBottom: normalize(12),
  },
  storeViewType: {},
  subText: {
    color: Colors.Gray500,
  },
  storeValue: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: normalize(4),
    justifyContent: 'space-between',
  },
  storeGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: normalize(8),
    borderRadius: normalize(16),
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(8),
    tagUp: {
      backgroundColor: Colors.Success50,
    },
    tagDown: {
      backgroundColor: Colors.Error50,
    },
  },
  growth: {
    paddingLeft: normalize(8),
    flexDirection: 'row',
    text: {color: Colors.SubText2},
    rate: {
      flexDirection: 'row',
      paddingLeft: normalize(8),
      alignItems: 'center',
    },
    up: {
      color: Colors.Success700,
      paddingLeft: normalize(4),
    },
    down: {
      color: Colors.Red,
      paddingLeft: normalize(4),
    },
  },
  countEmployee: {
    borderRadius: normalize(30),
    backgroundColor: Colors.Blue10,
    paddingHorizontal: normalize(12),
    borderWidth: normalize(1),
    borderColor: Colors.Tag,
  },
  countEmpText: {
    color: Colors.Tag,
  },
  rankColumn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    flexDirection: 'row',
    rank2: {
      flex: 1,
      marginTop: normalize(40),
    },
    rank1: {
      flex: 1,
    },
    rank3: {flex: 1, paddingTop: normalize(54)},
  },
  rankBottom: {
    borderTopLeftRadius: normalize(16),
    width: '100%',
    borderTopRightRadius: normalize(16),
    paddingHorizontal: normalize(6),
    paddingTop: normalize(10),
    alignItems: 'center',
  },
  rank1Bottom: {
    backgroundColor: Colors.Primary25,
    height: normalize(126),
  },
  rank2Bottom: {
    backgroundColor: '#B7B7FF',
    height: normalize(96),
  },
  rank3Bottom: {backgroundColor: '#B7B7FF', height: normalize(80)},
  rankValue: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: DimentionUtils.scale(8),
  },
  rank1Value: {},
  rankText: {lineHeight: normalize(16)},
  rank1Text: {
    marginTop: normalize(12),
    marginBottom: normalize(12),
  },
  rank2Value: {paddingTop: normalize(8)},
  rank2Text: {color: '#2F54EB'},
  rank3Value: {paddingTop: normalize(8)},
  rank3Text: {color: '#793CDD'},
  icCustomer: {
    width: normalize(16),
    height: normalize(16),
    padding: normalize(4),
  },
});

const SelectFilterStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: normalize(48),
    backgroundColor: Colors.White,
  },
  title: {
    paddingVertical: normalize(12),
    fontWeight: 500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  tag: {
    borderRadius: normalize(30),
    borderWidth: normalize(1),
    color: Colors.BorderTagBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: Colors.BorderTagBlue,
    marginRight: normalize(10),
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(12),
    backgroundColor: Colors.Blue10,
  },
  tagText: {
    color: Colors.Tag,
    fontSize: normalize(12),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const ButtonStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: normalize(10),
    right: normalize(10),
    width: 46,
    height: 46,
  },
});

export {Styles, SelectFilterStyle, ButtonStyle};
