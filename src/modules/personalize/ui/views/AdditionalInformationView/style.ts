import {normalize} from 'utils/DimensionsUtils';
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
    marginTop: normalize(16),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    borderBottomWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o200,
    paddingVertical: DimentionUtils.scale(14),
    marginHorizontal: DimentionUtils.scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default style;
