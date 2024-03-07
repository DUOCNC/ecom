import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    marginTop: DimentionUtils.scale(16),
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: DimentionUtils.scale(8),
  },
  viewContent: {
    marginHorizontal: DimentionUtils.scale(16),
    backgroundColor: Colors.Background3,
    padding: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(8),
    alignItems: 'center',
  },
  priceValue: {
    marginVertical: DimentionUtils.scale(8),
  },
  txtHint: {
    color: colors.secondary.o500,
  },
  title: {
    paddingTop: DimentionUtils.scale(31),
    marginHorizontal: DimentionUtils.scale(16),
  },
  switchTab: {
    marginTop: DimentionUtils.scale(14),
  },
  note: {
    marginBottom: DimentionUtils.scale(14),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  statusContainer: {
    marginBottom: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  statusElement: {
    borderWidth: 1,
    borderRadius: DimentionUtils.scale(40),
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(8),
    marginRight: DimentionUtils.scale(8),
  },
});

export default style;
