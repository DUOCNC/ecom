import {BehaviorResponse} from '../responses/BehaviorReponse';

export class BehaviorEntity {
  public keyBehavior: BehaviorResponse;
  public keyBehaviors: BehaviorResponse;
  public code: string | null;
  public createdBy: string;
  public createdDate: string;
  public createdName: string;
  public deleted: boolean;
  public id: number;
  public updatedBy: string;
  public updatedDate: string;
  public updatedName: string;
  public value: string;
  public quantity: number;
  constructor(behaviorEntity: BehaviorResponse) {
    this.code = behaviorEntity.code;
    this.createdBy = behaviorEntity.createdBy;
    this.createdDate = behaviorEntity.createdDate;
    this.createdName = behaviorEntity.createdName;
    this.deleted = behaviorEntity.deleted;
    this.id = behaviorEntity.id;
    this.updatedBy = behaviorEntity.updatedBy;
    this.updatedDate = behaviorEntity.updatedDate;
    this.updatedName = behaviorEntity.updatedName;
    this.value = behaviorEntity.value || behaviorEntity.keyBehavior.value;
    this.quantity = behaviorEntity?.quantity || 0;
    this.keyBehavior = behaviorEntity.keyBehavior;
    this.keyBehaviors = behaviorEntity.keyBehavior;
  }
  static clone(behaviorEntity: BehaviorEntity) {
    return new BehaviorEntity(behaviorEntity);
  }

  static fromResponse(response: BehaviorEntity): BehaviorEntity {
    return new BehaviorEntity(response);
  }
  getCode() {
    return this.code;
  }
  setCode(code: string) {
    this.createdBy = code;
  }
  getCreatedBy() {
    return this.createdBy;
  }
  setCreatedBy(value: string) {
    this.createdBy = value;
  }

  getCreatedDate() {
    return this.createdDate;
  }
  setCreatedDate(value: string) {
    this.createdDate = value;
  }

  getCreatedName() {
    return this.createdName;
  }
  setCreatedName(value: string) {
    this.createdName = value;
  }

  getDeleted() {
    return this.deleted;
  }
  setDeleted(value: boolean) {
    this.deleted = value;
  }

  getId() {
    return this.id;
  }
  setId(value: number) {
    this.id = value;
  }

  getUpdatedBy() {
    return this.updatedBy;
  }
  setUpdatedBy(value: string) {
    this.updatedBy = value;
  }

  getUpdatedDate() {
    return this.updatedDate;
  }
  setUpdatedDate(value: string) {
    this.updatedDate = value;
  }

  getUpdatedName() {
    return this.updatedName;
  }
  setUpdatedName(value: string) {
    this.updatedName = value;
  }

  getValue() {
    return this.value;
  }
  setValue(value: string) {
    this.value = value;
  }

  getQuality() {
    return this.quantity;
  }
  setQuality(quantity: number) {
    this.quantity = quantity;
  }
}

export interface KeyBehaviorRequest {
  key_behavior_id: number;
  quantity: number;
}

export class KeyBehaviorEntity {
  public keyBehaviors: KeyBehaviorRequest[] = [];
  constructor(keyBehaviors: KeyBehaviorRequest[]) {
    this.keyBehaviors = keyBehaviors;
  }
  static clone(keyBehavior: KeyBehaviorEntity): KeyBehaviorEntity {
    return new KeyBehaviorEntity(keyBehavior.keyBehaviors);
  }

  getKeyBehaviors() {
    return this.keyBehaviors;
  }

  setKeyBehaviors(keyBehaviors: KeyBehaviorRequest[]) {
    this.keyBehaviors = keyBehaviors;
  }

  removeKeyBehaviors(key: number) {
    const keyBehavior = new KeyBehaviorEntity(this.getKeyBehaviors());
    const index = keyBehavior
      .getKeyBehaviors()
      .findIndex(e => e.key_behavior_id === key);
    if (index >= 0) {
      keyBehavior.getKeyBehaviors().splice(index, 1);
      this.setKeyBehaviors(keyBehavior.getKeyBehaviors());
    }
    return keyBehavior;
  }

  addKeyBehaviors(key: KeyBehaviorRequest) {
    const keyBehavior = new KeyBehaviorEntity(this.getKeyBehaviors());
    keyBehavior.setKeyBehaviors(keyBehavior.getKeyBehaviors().concat(key));
    this.setKeyBehaviors(keyBehavior.getKeyBehaviors());
    return keyBehavior;
  }
  addKeyBehavior(key: KeyBehaviorRequest) {
    const keyBehavior = new KeyBehaviorEntity(this.getKeyBehaviors());
    keyBehavior.setKeyBehaviors([key]);
    this.setKeyBehaviors(keyBehavior.getKeyBehaviors());
    return keyBehavior;
  }
  isEmpty(): boolean {
    return this.keyBehaviors.length === 0;
  }
  setNumberByKeyBehavior(keyBehavior: KeyBehaviorRequest, number: number) {
    const index = this.keyBehaviors.findIndex(
      key => key.key_behavior_id === keyBehavior.key_behavior_id,
    );
    if (index >= 0) {
      this.keyBehaviors[index].quantity = number;
      this.setKeyBehaviors(this.keyBehaviors);
    }
  }
}
