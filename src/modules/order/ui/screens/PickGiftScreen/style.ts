import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container: {
    flex: DimentionUtils.scale(1),
  },
  header: {
    padding: DimentionUtils.scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.secondary.o200,
    borderBottomWidth: DimentionUtils.scale(1),
  },
  body: {
    flex: DimentionUtils.scale(1),
  },
  title: {
    marginHorizontal: DimentionUtils.scale(16),
    marginBottom: DimentionUtils.scale(12),
    paddingTop: DimentionUtils.scale(1),
  },
  mt12: {
    marginTop: DimentionUtils.scale(4),
  },
  note: {
    marginHorizontal: DimentionUtils.scale(16),
    marginBottom: DimentionUtils.scale(19),
  },
  icClose: {
    position: 'absolute',
    left: DimentionUtils.scale(16),
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
  },
  iconClose: {
    width: DimentionUtils.scale(13),
    height: DimentionUtils.scale(13),
  },
  contact: {
    position: 'absolute',
    right: DimentionUtils.scale(16),
  },
  contactText: {
    color: Colors.Primary,
  },
  contactDisable: {
    color: Colors.Gray400,
  },
  itemDetail: {
    flex: 1,
    height: DimentionUtils.scale(40),
    justifyContent: 'space-between',
    paddingHorizontal: DimentionUtils.scale(24),
  },
  search: {
    marginHorizontal: DimentionUtils.scale(16),
    borderColor: colors.secondary.o200,
    borderWidth: 1,
    borderRadius: DimentionUtils.scale(50),
    marginBottom: DimentionUtils.scale(8),
  },
  list: {
    paddingTop: DimentionUtils.scale(16),
    flex: 1,
    backgroundColor: colors.secondary.o25,
  },
  empty: {justifyContent: 'center', height: '100%'},
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(12),
  },
  giftContainer: {
    marginBottom: DimentionUtils.scale(8),
  },
});

export default Style;
