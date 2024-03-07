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
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
  },
});

export default Style;
