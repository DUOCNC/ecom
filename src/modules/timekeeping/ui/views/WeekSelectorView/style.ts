import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';
const style = StyleSheet.create({
  container: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    backgroundColor: colors.secondary.o25,
    marginHorizontal: DimentionUtils.scale(16),
    // borderWidth: 1,
    borderColor: colors.secondary.o300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default style;
