import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.base.white,
    marginHorizontal: DimentionUtils.scale(16),
    shadowColor: '#A8A8A8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    borderRadius: DimentionUtils.scale(5),
    borderLeftColor: colors.primary.o500,
    borderLeftWidth: DimentionUtils.scale(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginTop: {
    marginTop: DimentionUtils.scale(8),
  },
  title: {
    width: '33%',
  },
  value: {
    flex: 1,
  },
});

export default style;
