import {normalize} from 'utils/DimensionsUtils';
import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  card: {
    marginHorizontal: DimentionUtils.scale(16),
    marginTop: DimentionUtils.scale(16),
    padding: DimentionUtils.scale(16),
    borderWidth: DimentionUtils.scale(1),
    borderRadius: DimentionUtils.scale(8),
    borderColor: colors.secondary.o200,
    backgroundColor: 'white',
    shadowColor: 'rgba(114,114,114,0.25)',
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 2,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTxt: {
    alignSelf: 'center',
  },
  iconArrow: {
    alignSelf: 'center',
  },
  iconArrowTransform: {
    transform: [{rotate: '180deg'}],
  },
  priceTxt: {
    marginTop: DimentionUtils.scale(11),
  },
  content: {
    marginTop: DimentionUtils.scale(16),
    borderTopWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o200,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DimentionUtils.scale(16),
  },
  childTitle: {width: '60%'},
});

export default style;
