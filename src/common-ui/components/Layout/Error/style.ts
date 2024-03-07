import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  top: {
    paddingTop: DimentionUtils.scale(40),
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  contactElement: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    backgroundColor: colors.primary.o500,
    marginBottom: DimentionUtils.scale(12),
    borderRadius: 8,
  },
  reloadButton: {
    paddingHorizontal: DimentionUtils.scale(16),
    width: DimentionUtils.scale(120),
    paddingVertical: DimentionUtils.scale(8),
    backgroundColor: colors.secondary.o25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary.o300,
  },
});
export default style;
