import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui/utils';
import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';

const OtherMenuGroupStyle = StyleSheet.create({
  container: {
    paddingVertical: DimentionUtils.scale(8),
    borderBottomColor: Colors.Gray200,
    borderBottomWidth: DimentionUtils.scale(1),
  },
  rowTitle: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuContainer: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    minHeight: DimentionUtils.scale(32),
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleAndroid: {
    textAlignVertical: 'center',
    minHeight: DimentionUtils.scale(32),
  },
  seeAll: {
    color: Colors.Primary,
  },
  menuIcon: {
    height: DimentionUtils.scale(24),
    width: DimentionUtils.scale(24),
    marginRight: DimentionUtils.scale(8),
  },
  newFeature: {
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: colors.success.o50,
    paddingVertical: DimentionUtils.scale(2),
    paddingHorizontal: DimentionUtils.scale(12),
    borderColor: colors.success.o200,
    marginLeft: DimentionUtils.scale(8),
  },
  iconArrowRight: {
    alignSelf: 'auto',
  },
});

export default OtherMenuGroupStyle;
