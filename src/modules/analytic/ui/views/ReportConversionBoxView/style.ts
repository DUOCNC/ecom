import {colors} from 'assets/v2';
import {Dimensions, StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui/utils';
const cols = 2;
const marginHorizontal = 6;
const marginVertical = 6;
const width =
  Dimensions.get('window').width / cols - marginHorizontal * (cols + 1);

export const style = StyleSheet.create({
  box: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: width,
    height: 60,
    justifyContent: 'center',
    backgroundColor: colors.primary.o25,
    borderRadius: DimentionUtils.scale(7),
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
  },
  rowValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end',
  },
  left: {},
  right: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: DimentionUtils.scale(4),
  },
  selected: {
    backgroundColor: colors.primary.o500,
    borderWidth: DimentionUtils.scale(2),
    borderColor: colors.primary.o200,
  },
  tag: {
    borderRadius: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(2),
    paddingHorizontal: DimentionUtils.scale(8),
    up: {
      backgroundColor: colors.success.o50,
    },
    down: {
      backgroundColor: colors.error.o50,
    },
  },
});
