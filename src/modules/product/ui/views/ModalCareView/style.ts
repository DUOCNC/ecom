import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.base.white,
    borderRadius: DimentionUtils.scale(10),
  },
  header: {
    alignItems: 'center',
    marginTop: DimentionUtils.scale(16),
  },
  content: {
    marginVertical: DimentionUtils.scale(16),
    paddingHorizontal: '3%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
  },
  itemTxt: {
    flex: 1,
    marginLeft: DimentionUtils.scale(12),
  },
  bottom: {
    width: '100%',
    height: DimentionUtils.scale(48),
    borderTopWidth: DimentionUtils.scale(1),
    borderTopColor: colors.secondary.o200,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default style;
