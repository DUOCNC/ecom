import {VariantResponse} from 'modules/order/models';
import {
  BinLocationResponse,
  BinTargetResponse,
} from '../responses/InventoryResponse';
import {VariantImageResponse} from 'modules/order/models/responses';
import {enumBinLocation} from 'common/enums';
import {InventoryApi} from 'modules/product/api';
import {getMediaUrl} from 'utils/MediaUtils';

const findAvatar = (VariantImage: Array<VariantImageResponse>): string => {
  let avatar: string = '';

  VariantImage?.length > 0 &&
    VariantImage.forEach(v => {
      if (v.variantAvatar || v.variant_avatar) {
        avatar = v.url || '';
      }
    });
  return avatar;
};

export default class BinLocationEntity {
  private barcode: string;
  private companyId: number | null;
  private id: number | null;
  private name: string;
  private onHand: number;
  private productId: number;
  private showroom: number;
  private showroomBalance: number;
  private showroomTarget: number;
  private sku: string;
  private storage: number;
  private store: string | null;
  private storeId: number | null;
  private variantId: number;
  private variantImage: string | null;
  private quantity: number;
  private checkbox: boolean;
  private note: string;
  static inventory: InventoryApi = new InventoryApi();

  constructor(binLocation: BinLocationResponse) {
    this.id = binLocation?.id;
    this.barcode = binLocation.barcode;
    this.companyId = binLocation.companyId;
    this.onHand = binLocation.onHand || 0;
    this.name = binLocation.name;
    this.productId = binLocation.productId;
    this.showroom = binLocation.showroom || 0;
    this.sku = binLocation.sku;
    this.store = binLocation?.store || null;
    this.showroomBalance = binLocation.showroomBalance || 0;
    this.storage = binLocation.storage || 0;
    this.showroomTarget = binLocation.showroomTarget || 0;
    this.storeId = binLocation?.storeId || null;
    this.variantId = binLocation.variantId;
    this.variantImage = binLocation.variantImage;
    this.quantity = 1;
    this.checkbox = true;
    this.note = '';
  }

  static async convertVariantResponseToBinLocationResponse(
    variant: VariantResponse,
    store_id: number,
    onSuccess: (dataSuccess: BinLocationResponse) => void,
  ) {
    const showroom = variant.binLocations.find(
      location => location.binCode === enumBinLocation.storage,
    );

    const storage = variant.binLocations.find(
      location => location.binCode === enumBinLocation.showroom,
    );
    const res = await BinLocationEntity.inventory.geShowTargetByVariant(
      store_id,
      {
        variant_ids: variant.id,
      },
    );
    const dataBinTarget: BinTargetResponse[] = res?.data?.data || [];
    const data: BinLocationResponse = {
      barcode: variant.barcode,
      companyId: 0,
      id: null,
      name: variant.name,
      onHand: variant.onHand,
      productId: variant.productId,
      showroom: showroom?.remain || 0,
      showroomBalance: 0,
      showroomTarget: dataBinTarget.length > 0 ? dataBinTarget[0].target : 0,
      sku: variant.sku,
      storeId: null,
      store: null,
      storage: storage?.remain || 0,
      variantId: variant.id,
      variantImage: findAvatar(variant.variantImages),
    };
    onSuccess(data);
  }

  static onChangeCheckBoxItem(
    binLocations: BinLocationEntity[],
    bin: BinLocationEntity,
  ): BinLocationEntity[] {
    const index = binLocations.findIndex(
      item => item.getSku() === bin.getSku(),
    );
    if (index !== -1) {
      binLocations[index].setCheckBox(!binLocations[index].getCheckBox());
      return binLocations;
    }
    return binLocations;
  }
  static onChangeQuantityItem(
    binLocations: BinLocationEntity[],
    bin: BinLocationEntity,
    value: number,
  ): BinLocationEntity[] {
    const index = binLocations.findIndex(
      item => item.getSku() === bin.getSku(),
    );
    if (index !== -1) {
      binLocations[index].setQuantity(value);
      return binLocations;
    }
    return binLocations;
  }

  getBarcode(): string {
    return this.barcode;
  }

  setDarcode(value: string) {
    this.barcode = value;
  }

  getCompanyId(): number | null {
    return this.companyId;
  }

  setCompanyId(value: number | null) {
    this.companyId = value;
  }

  getId(): number | null {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getOnHand(): number {
    return this.onHand;
  }

  setOnHand(value: number) {
    this.onHand = value;
  }

  getProductId(): number {
    return this.productId;
  }

  getShowroom(): number {
    return this.showroom;
  }

  setShowroom(value: number) {
    this.showroom = value;
  }

  getShowroomBalance(): number {
    return this.showroomBalance;
  }

  setShowroomBalance(value: number) {
    this.showroomBalance = value;
  }

  getShowroomTarget(): number {
    return this.showroomTarget;
  }

  setShowroomTarget(value: number) {
    this.showroomTarget = value;
  }

  getSku(): string {
    return this.sku;
  }

  setSku(value: string) {
    this.sku = value;
  }

  getStorage(): number {
    return this.storage;
  }

  setStorage(value: number) {
    this.storage = value;
  }

  getStore(): string | null {
    return this.store;
  }

  setStore(value: string) {
    this.store = value;
  }

  getStoreId(): number | null {
    return this.storeId;
  }

  setStoreId(value: number) {
    this.storeId = value;
  }

  getVariantId(): number {
    return this.variantId;
  }

  setVariantId(value: number) {
    this.variantId = value;
  }

  getVariantImage(): string | null {
    return getMediaUrl(this.variantImage);
  }

  setVariantImage(value: string | null) {
    this.variantImage = value;
  }

  getQuantity(): number {
    return this.quantity;
  }

  setQuantity(value: number) {
    this.quantity = value;
  }
  getCheckBox(): boolean {
    return this.checkbox;
  }

  setCheckBox(value: boolean) {
    this.checkbox = value;
  }
}
