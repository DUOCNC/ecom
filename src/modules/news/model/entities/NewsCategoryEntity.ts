import {StringUtils} from 'common';
import {NewsCategoryResponse} from '../response';
import moment from 'moment';

export default class NewsCategoryEntity {
  private id: number | null;
  private name: string | null;
  private isShow: boolean | null;
  private createdBy: string | null;
  private createdAt: Date | null;
  private updatedBy: string | null;
  private updatedAt: Date | null;
  private deleted: boolean | null;

  constructor(data: NewsCategoryResponse) {
    this.id = data.id;
    this.name = data.name;
    this.isShow = data.isShow;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt;
    this.updatedBy = data.updatedBy;
    this.updatedAt = data.updatedAt;
    this.deleted = data.deleted;
  }

  static createEmpty(): NewsCategoryEntity {
    return new NewsCategoryEntity({
      id: 0,
      name: '',
      isShow: false,
      createdBy: '',
      createdAt: null,
      updatedBy: '',
      updatedAt: null,
      deleted: false,
    });
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getIsShow() {
    return this.isShow;
  }

  getCreatedBy() {
    return this.createdBy;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getCreatedAtStr() {
    if (!this.createdAt) {
      return '';
    }
    return StringUtils.format(
      '{0} tháng {1}, {2}',
      moment(this.createdAt).format('DD'),
      moment(this.createdAt).format('MM'),
      moment(this.createdAt).format('yyyy'),
    );
  }
}
