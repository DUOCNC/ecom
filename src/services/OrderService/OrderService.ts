import {BaseAxios, Pageable, Result, StringUtils} from 'common';
import {OrderSubStatusDto} from 'model/dto/OrderService/OrderDto';

class OrderService {
  private BaseOrderUrl = 'unicorn/order-service';
  constructor() {}

  getSubStatus = (onSuccess: (status: Array<OrderSubStatusDto>) => void) => {
    const url = StringUtils.format(
      '{0}/sub_status?sort_type=asc&sort_column=display_order',
      this.BaseOrderUrl,
    );
    BaseAxios.get<Result<Pageable<OrderSubStatusDto>>>(url)
      .then(res => {
        const {items} = res.data.data;
        if (items && items.length > 0) {
          return onSuccess(items);
        }
      })
      .catch(() => {
        return onSuccess([]);
      });
    return onSuccess([]);
  };
}

const orderService = new OrderService();

export default orderService;
