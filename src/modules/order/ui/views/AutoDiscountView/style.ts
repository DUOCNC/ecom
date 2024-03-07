import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {Platform, StyleSheet} from 'react-native';
import Colors from 'assets/v2/colors';

const style = StyleSheet.create({
  container: {
    paddingHorizontal: DimentionUtils.scale(16),
  },
  header: {
    paddingTop: DimentionUtils.scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: DimentionUtils.scale(16),
  },
  txtTitle: {
    flex: 1,
  },
  noteInput: {
    height: DimentionUtils.scale(80),
    borderRadius: DimentionUtils.scale(5),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o200,
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(10),
  },
  switch:
    Platform.OS === 'ios'
      ? {transform: [{scaleX: 0.8}, {scaleY: 0.8}]}
      : {transform: [{scaleX: 1.1}, {scaleY: 1.1}]},
  discountIcon: {
    marginRight: DimentionUtils.scale(10),
  },
  discountInput: {
    flex: 1,
    paddingLeft: 0,
    color: '#424242',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: DimentionUtils.scale(1),
    borderColor: Colors.secondary.o200,
    borderRadius: DimentionUtils.scale(5),
    padding: DimentionUtils.scale(12),
  },
  circleCheck: {
    marginLeft: DimentionUtils.scale(10),
  },
  discountContainer: {
    flexDirection: 'row',
  },
  buttonDiscount: {
    width: DimentionUtils.scale(92),
    marginLeft: DimentionUtils.scale(4),
    height: '100%',
  },
  title: {
    // flex: 1,
    color: Colors.secondary.o500,
    alignSelf: 'center',
  },
  titleTotalDiscount: {
    color: Colors.secondary.o500,
    alignSelf: 'center',
  },
  information: {
    marginTop: DimentionUtils.scale(16),
    marginBottom: 8,
  },

  rowInformation: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: DimentionUtils.scale(12),
    justifyContent: 'space-between',
  },
  selectInput: {
    borderWidth: DimentionUtils.scale(1),
    borderColor: Colors.secondary.o200,
    borderRadius: DimentionUtils.scale(5),
    height: DimentionUtils.scale(54),
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(4),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: colors.secondary.o200,
  },
  promotionTitle: {
    marginLeft: DimentionUtils.scale(8),
    flex: 1,
    paddingRight: DimentionUtils.scale(16),
  },
  promoValue: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: DimentionUtils.scale(4),
  },
  value: {
    marginRight: DimentionUtils.scale(8),
    backgroundColor: colors.error.o50,
    paddingHorizontal: DimentionUtils.scale(6),
    paddingVertical: DimentionUtils.scale(2),
    borderRadius: DimentionUtils.scale(30),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.error.o200,
  },
  valuePrice: {
    alignSelf: 'center',
  },
  iconArrowContainer: {
    justifyContent: 'center',
  },
  iconArrow: {
    width: DimentionUtils.scale(21),
    height: DimentionUtils.scale(21),
  },
  tag: {
    // flex: 1,
    marginLeft: DimentionUtils.scale(8),
    backgroundColor: colors.error.o50,
    paddingHorizontal: DimentionUtils.scale(6),
    paddingVertical: DimentionUtils.scale(2),
    borderRadius: DimentionUtils.scale(30),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.error.o200,
  },
  row: {
    flexDirection: 'row',
  },
  point: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  discountItem: {
    marginBottom: DimentionUtils.scale(8),
  },
});

export default style;
