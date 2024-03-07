const Unicorn = '/unicorn';

export const ServiceConfig = {
  Account: `${Unicorn}/account-service`,
  Content: `${Unicorn}/content-service`,
  Core: `${Unicorn}/core-service`,
  Product: `${Unicorn}/product-service`,
  Customer: `${Unicorn}/customer-service`,
  Loyalty: `${Unicorn}/loyalty-service`,
  Inventory: `${Unicorn}/inventory-service`,
  Promotion: `${Unicorn}/promotion-service`,
  Mobile: `${Unicorn}/mobile-service`,
  Order: `${Unicorn}/order-service`,
  Report: {
    Base: '/api/reports',
    Visitor: '/api/customer-visitors',
    LoyalCustomer: '/api/key-drivers',
  },
  Analytic: '/api/analytics',
};
