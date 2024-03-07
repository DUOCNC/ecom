import {colors} from 'assets/v2';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const style = StyleSheet.create({
  container: {
    width: normalize(20),
    height: normalize(20),
    borderWidth: normalize(2),
    borderColor: '#D6D6D7',
    borderRadius: normalize(25),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selected: {
    backgroundColor: colors.primary.o500,
    height: normalize(10),
    width: normalize(10),
    borderRadius: normalize(25),
  },
  ctSelected: {
    borderColor: colors.primary.o500,
  },
});

export {style};
