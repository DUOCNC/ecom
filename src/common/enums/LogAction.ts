export enum FunctionLog {
  VIEW_CUSTOMER_DETAIL = 'view_customer_detail', // Xem chi tiết khách hàng
  ADD_PRODUCT_TO_ORDER = 'add_product_to_order', // Thêm sản phẩm vào đơn yoscan
  ADD_YOSCAN_ORDER = 'add_yoscan_order', // Tạo đơn yoscan
  ADD_CHECKIN = 'add_checkin', // Tạo đơn yoscan
  ADD_MULTI_YOSCAN = 'add_multi_yoscan',
  ADD_YOSCAN_ORDER_HOMEPAGE = 'add_yoscan_order_homepage',
  ADD_YOSCAN_FROM_360 = 'add_yoscan_from_360',
}

export enum ScreenLog {
  POS_CREATE_SCREEN = 'pos_create_screen',
  TIME_SHEET_SCREEN = 'time_sheet_screen',
  SEARCH_CUSTOMER_SCREEN = 'search_customer_screen',
  ORDER_SCREEN = 'order_screen',
  HOMEPAGE_ORDER_SCREEN = 'homepage_order_screen',
  CUSTOMER_DETAIL_SCREEN = 'customer_detail_screen',
}

export enum ActionLog {
  CLICK = 'click',
  VIEW = 'view',
  EDIT = 'edit',
  ADD = 'add',
  DELETE = 'delete',
  CHECKIN = 'checkin',
}
