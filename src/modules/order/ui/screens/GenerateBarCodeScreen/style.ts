import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(22),
  },
  scrollView: {
    flex: 1,
  },
  container: {
    height: DimentionUtils.scale(321),
    // backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingLeft: DimentionUtils.scale(35),
    paddingRight: DimentionUtils.scale(35),
  },
  image: {
    paddingTop: DimentionUtils.scale(16),
    height: DimentionUtils.scale(345),
    width: '100%',
    marginTop: DimentionUtils.scale(10),
    alignSelf: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  titleBarcode: {
    marginBottom: DimentionUtils.scale(12),
  },
  viewBarCode: {
    alignSelf: 'center',
    marginTop: DimentionUtils.scale(33),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DimentionUtils.scale(33),
  },
  price: {
    marginTop: DimentionUtils.scale(4),
  },
  button: {
    height: DimentionUtils.scale(38),
    // width: DimentionUtils.scale(103),
    borderRadius: 8,
  },
  elementContainer: {
    flex: 1,
    marginTop: DimentionUtils.scale(12),
    flexDirection: 'row',
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    marginHorizontal: DimentionUtils.scale(9),
    borderRadius: DimentionUtils.scale(8),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o200,
  },
  description: {
    flex: 1,
    marginLeft: DimentionUtils.scale(8),
    // paddingHorizontal: 10,
  },
});

export default style;
