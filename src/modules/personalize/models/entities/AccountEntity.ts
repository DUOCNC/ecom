import {DateUtils} from 'common';
import {DateFormatPattern} from 'common/enums';
import {GenderConfig} from 'modules/personalize/config';
import {AccountProvider} from 'model/providers';

export default class AccountEntity {
  private address: string | null;
  private birthday: Date | null;
  private city: string | null;
  private district: string | null;
  private fullName: string;
  private gender: string | null;
  private id: number;
  private phone: string;
  private code: string;

  private constructor(
    address: string | null,
    birthday: Date | null,
    city: string | null,
    district: string | null,
    fullName: string,
    gender: string | null,
    id: number,
    phone: string,
    code: string,
  ) {
    this.address = address;
    this.birthday = birthday;
    this.city = city;
    this.district = district;
    this.fullName = fullName;
    this.gender = gender;
    this.id = id;
    this.phone = phone;
    this.code = code;
  }

  public static createFromResponse(res: AccountProvider) {
    let birthday = res.birthday === null ? null : new Date(res.birthday);
    return new AccountEntity(
      res.address,
      birthday,
      res.city,
      res.district,
      res.fullName,
      res.gender,
      res.id,
      res.phone,
      res.code,
    );
  }

  getId() {
    return this.id;
  }

  getCode() {
    return this.code.trim().toUpperCase();
  }

  getBirthday() {
    return this.birthday;
  }

  getBirthdayDisplay() {
    if (this.birthday == null) {
      return 'Không có ngày sinh';
    }
    return DateUtils.format(this.birthday, DateFormatPattern.DDMMYYYY);
  }

  getPhone() {
    if (this.phone) {
      return this.phone.trim().toUpperCase();
    }
    return '';
  }

  getGender() {
    return this.gender;
  }

  getGenderDisplay() {
    let genderConfig = GenderConfig.find(
      itemGender => itemGender.getId() === this.gender,
    );
    if (genderConfig === undefined) {
      return '';
    }
    return genderConfig.getName();
  }

  getLocation() {
    let location = '';
    if (this.city) {
      location = this.city;
    }
    if (this.district) {
      if (location !== '') {
        location = location + ' - ';
      }
      location = location + this.district;
    }
    if (location === '') {
      return 'Không có địa chỉ';
    }
    return location;
  }

  getAddress() {
    if (this.address == null) {
      return '';
    }
    return this.address;
  }

  getAddressDisplay() {
    if (this.address == null) {
      return 'Không có địa chỉ';
    }
    return this.address;
  }
}
