import {ColorValue} from 'react-native';

export interface ReportDto {
  aggregates: {[key: string]: Aggregate};
  properties: Properties;
  query: Query;
  result: Result;
}

export interface Aggregate {
  name: string;
}

export interface Properties {
  kênhBánHàng: KênhBánHàng;
  nhânViên: NhânViên;
  sảnPhẩm: SảnPhẩm;
  kháchHàng: KháchHàng;
  đơnHàng: ĐơnHàng;
}

export interface KháchHàng {
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  customerCode: string;
  customerGroup: string;
  loyaltyLevel: string;
  lastOrderCompare90_Days: string;
  agingGroup: string;
}

export interface KênhBánHàng {
  posLocationDepartmentLv2: string;
  posLocationDepartmentLv3: string;
  locationCity: string;
  posLocationName: string;
  locationDistrict: string;
  posLocationRankName: string;
  offlineSource: string;
  uniform: string;
}

export interface NhânViên {
  assigneeName: string;
  assigneeCode: string;
  staffName: string;
  staffCode: string;
}

export interface SảnPhẩm {
  productCategory: string;
  productName: string;
  variantName: string;
  variantSku3: string;
  variantSku3Name: string;
  variantSku3Group: string;
  variantSku7: string;
  variantSku: string;
  variantSize: string;
  productPrice: string;
  variantColor: string;
}

export interface ĐơnHàng {
  financialStatus: string;
  orderCode: string;
  orderReturnCode: string;
  saleKind: string;
  saleLineType: string;
}

export interface Query {
  columns: QueryColumn[];
  conditions: Array<string[]>;
  cube: string;
  from: Date;
  limitCount: number;
  orderBy: Array<string[]>;
  rows: string[];
  timeSeries: boolean;
  to: Date;
}

export interface QueryColumn {
  field: string;
}

export interface Result {
  columns: Column[];
  data: Array<string[]>;
  summary: (number | null)[];
}

export interface Column {
  field: string;
  type: string;
  format: string;
}

export interface ReportVisitor {
  departmentLv2: string;
  posLocationName: string;
  value: number;
}

export interface ReportLoyalCustomer {
  departmentLv2: string;
  vipTotalSales: number;
  nearVipTotalSales: number;
  customerLte90DaysTotalSales: number;
  customerGt90DaysTotalSales: number;
  shopperLte90DaysTotalSales: number;
  shopperGt90DaysTotalSales: number;
  newTotalSales: number;
  othersTotalSales: number;
  birthdayTotalSales: number;
  totalSales: number;
  customersCount: number;
  posLocations?: ReportLoyalCustomer[];
  posLocationName?: string;
}

export interface ReportBestSale {
  assigneeCode: string;
  assigneeName: string;
  orderCount: number;
  returnCount: number;
  totalSales: number;
  averageOrderValue: number;
  customers?: number;
  averageCustomerSpent?: number;
  returns?: number;
  grossSales?: number;
}

export interface ReportBestSaleItemView {
  key: string;
  value: string;
}
export interface ReportBestSaleFullDto {
  key: string;
  totalSales: number;
  item: ReportBestSale;
  isExpanded: boolean;
  totalView?: string;
  subItems?: Array<ReportBestSaleItemView>;
}

export interface AsmDto {
  name: string;
  id: number;
}

export interface AsmFullDto {
  data: AsmDto;
  textColor: ColorValue;
  isChecked: boolean;
}

export interface StoreSubDto {
  name: string;
  id: number;
}

export interface StoreFullDto {
  data: StoreSubDto;
  textColor: ColorValue;
  isChecked: boolean;
  bgColor?: ColorValue;
}

export interface AccountSubDto {
  name: string;
  id: number;
}

export interface AccountFullDto {
  data: AccountSubDto;
  textColor: ColorValue;
  isChecked: boolean;
}

export interface ReportAdvDto {
  asm: Array<AsmFullDto>;
  store: Array<StoreFullDto>;
  storeLeader: Array<AccountFullDto>;
  staffCode: Array<AccountFullDto>;
  assignCode: Array<AccountFullDto>;
}

export interface SelectFilterProps {
  title: string;
  selected: boolean;
  count: number;
  bs: any;
}
