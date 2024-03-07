import {DateUtils, StringUtils} from 'common';
import {TrainingResponse} from '../responses';
import {DateFormatPattern} from 'common/enums';

export class TrainingEntity {
  id: number;
  name: string;
  content: string;
  mimetype: string;
  applyTime: Date;
  expireTime: Date;
  minimumStudyTime: number;
  constructor(res: TrainingResponse) {
    this.id = res.id;
    this.name = res.name;
    this.content = res.content;
    this.mimetype = res.mimetype;
    this.applyTime = res.applyTime;
    this.expireTime = res.expireTime;
    this.minimumStudyTime = res.minimumStudyTime;
  }

  getId() {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getName() {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getContent() {
    return this.content;
  }

  setContent(value: string) {
    this.content = value;
  }

  getMimetype() {
    return this.mimetype;
  }

  setMimetype(value: string) {
    this.mimetype = value;
  }

  getApplyTime() {
    return this.applyTime;
  }

  setApplyTime(value: Date) {
    this.applyTime = value;
  }

  getExpireTime() {
    return this.expireTime;
  }

  getExpireTimeDis() {
    return StringUtils.format(
      '23:59 {0}',
      DateUtils.format(this.expireTime, DateFormatPattern.DDMMYYYY),
    );
  }

  setExpireTime(value: Date) {
    this.expireTime = value;
  }

  getMinimumStudyTime() {
    if (!this.minimumStudyTime) {
      return 0;
    }
    return this.minimumStudyTime;
  }

  setMinimumStudyTime(value: number) {
    this.minimumStudyTime = value;
  }
}
