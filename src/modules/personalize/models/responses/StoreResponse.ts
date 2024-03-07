export interface StoreResponse {
  id: number;
  name: string;
  rank: number;
  rankName: string;
  square: number;
  address: string;
  hotline: string;
  vmCode: string | null;
  vm: string | null;
  mail: string | null;
  beginDate: string | Date;
  departmentId: number | null;
  department: string | null;
  departmentH3Id: number | null;
  departmentH3: string | null;
  departmentH4Id: number | null;
  departmentH4: string | null;
  status: string;
  zipCode: string | null;
  countryId: number | null;
  countryName: string | null;
  cityId: number | null;
  cityName: string | null;
  districtId: number | null;
  districtName: string | null;
  wardId: number | null;
  wardName: string | null;
  latitude: number | null;
  longitude: number | null;
  isSaleable: boolean | null;
  isStocktaking: boolean | null;
  type: string | null;
  referenceId: number | null;
  statusName: string | null;
  typeName: string | null;
  code: string | null;
  version: number | null;
  createdBy: string | null;
  createdName: string | null;
  createdDate: string | null;
  updatedBy: string | null;
  updatedName: string | null;
  updatedDate: string | null;
  storeManagerCode: string | null;
  storeManagerName: string | null;
  linkGoogleMap: string | null;
}