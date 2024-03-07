import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  container: {
    marginTop: DimentionUtils.scale(8),
    borderBottomWidth: DimentionUtils.scale(1),
    borderBottomColor: colors.secondary.o200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  title: {
    flex: 1,
  },
  btnRight: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: DimentionUtils.scale(4),
    marginBottom: DimentionUtils.scale(8),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  colorView: {
    marginTop: DimentionUtils.scale(8),
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  containerItem: {
    marginRight: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(8),
  },
  img: {
    width: DimentionUtils.scale(50),
    height: DimentionUtils.scale(60),
    borderRadius: DimentionUtils.scale(5),
  },
  imgSelected: {
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.primary.o500,
  },
  icSelected: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  viewSize: {
    marginTop: DimentionUtils.scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeContent: {
    marginTop: DimentionUtils.scale(16),
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  itemSize: {
    height: DimentionUtils.scale(38),
    paddingHorizontal: DimentionUtils.scale(12),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o300,
    marginRight: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(8),
    minWidth: DimentionUtils.scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: DimentionUtils.scale(5),
  },
  itemSizeSelect: {
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.primary.o500,
  },
});

export default style;
