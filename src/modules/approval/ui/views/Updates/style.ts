import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: DimentionUtils.scale(16),
  },
  btnUpdate: {
    width: DimentionUtils.scale(56),
    height: DimentionUtils.scale(30),
  },
  row: {
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(20),
    alignItems: 'center',
  },
  label: {
    width: DimentionUtils.scale(100),
  },
  value: {
    flex: 1,
  },
  rowTime: {
    marginTop: DimentionUtils.scale(24),
  },
  imageCircle: {
    width: DimentionUtils.scale(20),
    height: DimentionUtils.scale(20),
  },
  labelIcon: {
    marginLeft: DimentionUtils.scale(8),
  },
  box: {
    borderRadius: DimentionUtils.scale(5),
    borderWidth: DimentionUtils.scale(1),
    borderStyle: 'dotted',
    padding: DimentionUtils.scale(16),
  },
  iconClose: {
    position: 'absolute',
    right: 0,
    marginTop: DimentionUtils.scale(-10),
    marginRight: DimentionUtils.scale(0),
  },
  detailItem: {
    marginTop: DimentionUtils.scale(16),
  },
});

export {style};
