import {LineItemSubDto} from 'model/dto/OrderService/LineItemSubDto';
import {LineItemViewer} from 'model/viewer/LineItemViewer';
import NumberUtils from 'utils/NumberUtils';

const LineItemMapper = {
  mapLineItemViewer: (lineItem: LineItemSubDto) => {
    let discountAmount = lineItem.discountItems
      .map(item => item.amount)
      .reduce((a, b) => a + b, 0);
    let price_promotion = lineItem.price - discountAmount;
    return {
      id: lineItem.id.toString(),
      variant_image: lineItem.variantImage,
      sku: lineItem.sku,
      name: lineItem.variant,
      quantity: `x${lineItem.quantity}`,
      price: NumberUtils.formatCurrency(lineItem.price),
      price_promotion: NumberUtils.formatCurrency(price_promotion),
      have_promotion: discountAmount > 0,
    } as LineItemViewer;
  },
};

export default LineItemMapper;
