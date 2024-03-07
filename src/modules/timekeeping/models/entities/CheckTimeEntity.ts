import moment from 'moment';
import {CheckTimeResponse} from '../responses';

export class CheckTimeEntity {
  private time: Date;
  private fromType: string;

  constructor(time: Date, fromType: string) {
    this.time = time;
    this.fromType = fromType;
  }

  getTime(): string {
    return moment(this.time).format('HH:mm DD/MM/YYYY');
  }

  setTime(value: Date) {
    this.time = value;
  }

  getFromType(): string {
    return this.fromType;
  }

  setFromType(value: string) {
    this.fromType = value;
  }

  static fromCheckTimeResponses(
    checkTimeResponses: CheckTimeResponse[],
  ): CheckTimeEntity[] {
    const checkTimeEntities: CheckTimeEntity[] = [];

    for (const checkTimeResponse of checkTimeResponses) {
      const checkTimeEntity = new CheckTimeEntity(
        checkTimeResponse.time,
        checkTimeResponse.fromType,
      );
      checkTimeEntities.push(checkTimeEntity);
    }

    return checkTimeEntities;
  }
}
