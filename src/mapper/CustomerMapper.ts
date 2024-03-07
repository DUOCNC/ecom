import {CustomerDto} from 'model/dto/CustomerService/CustomerDto';
import {HistoryCustomerDto} from 'model/dto/MobileService/HistoryCustomer';
const CustomerMapper = {
  mapHistoryCustomer: (customer: CustomerDto) =>
    ({
      id: customer.id,
      name: customer.fullName,
      phone: customer.phone,
    } as HistoryCustomerDto),
};

export {CustomerMapper};
