export interface BillingAddressSubRequest {}
export interface ContactSubRequest {}
export interface NoteSubRequest {}
export interface ShippingAddressSubRequest {}

export interface CustomerRequest {
  assigned_date: Date | null;
  assigned_store_id: number | null;
  billing_addresses: Array<BillingAddressSubRequest>;
  birthday: Date | null;
  card_number: string;
  channel_id: number;
  contacts: Array<ContactSubRequest>;
  country_id: number;
  customer_type_id: number | null;
  description: string | null;
  district_id: number | null;
  email: string;
  full_address: string;
  full_name: string;
  gender: string | null;
  city_id: number | null;
  ward_id: number | null;
  notes: Array<NoteSubRequest>;
  phone: string;
  responsible_staff_code: string | null;
  status: string;
  source_id: number | null;
  shipping_addresses: Array<ShippingAddressSubRequest>;
  customer_group_id: number | null;
}
