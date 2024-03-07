import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const OrderLineStyle = StyleSheet.create({
  container: {
    marginVertical: DimentionUtils.scale(16),
    flexDirection: 'row',
  },
  firstRow: {flexDirection: 'row'},
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: DimentionUtils.scale(4),
  },
  quantityControl: {
    flexDirection: 'row',
  },
  quantityButon: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignItems: 'center',
    borderColor: '#DCDCDC',
    borderWidth: DimentionUtils.scale(1),
    borderRadius: DimentionUtils.scale(2),
    justifyContent: 'center',
  },
  input: {
    height: DimentionUtils.scale(24),
    width: DimentionUtils.scale(48),
    borderColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: DimentionUtils.scale(1),
    borderRadius: DimentionUtils.scale(2),
    marginHorizontal: DimentionUtils.scale(4),
  },
  thirdRow: {
    marginVertical: DimentionUtils.scale(4),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  fourthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtPrice: {
    color: colors.primary.o500,
  },
  txtPriceNotDiscount: {
    marginLeft: DimentionUtils.scale(8),
  },
  txtVariant: {
    flex: 1,
  },
  viewLoading: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.25)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'relative',
  },
  programDiscountIcon: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: '10%',
    width: '100%',
  },
  variantAvatar: {
    width: DimentionUtils.scale(80),
    height: DimentionUtils.scale(100),
    borderRadius: DimentionUtils.scale(5),
  },
  right: {
    paddingLeft: DimentionUtils.scale(12),
    flex: 1,
  },
  iconClose: {
    width: DimentionUtils.scale(14),
    height: DimentionUtils.scale(14),
  },
  btnClose: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    paddingRight: DimentionUtils.scale(20),
    flex: 1,
  },
  icPromotion: {
    marginRight: DimentionUtils.scale(16),
  },
});

export {OrderLineStyle};
