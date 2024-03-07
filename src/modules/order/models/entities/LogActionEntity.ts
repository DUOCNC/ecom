import moment from 'moment';
import {LoyaltyResponse} from '../responses';
import {DateFormatPattern} from 'common/enums';
import {LogActionResponse} from 'modules/order/models/responses/LogActionResponse';

export default class LogActionEntity {
  id: number;
  function: string;
  screen: string;
  action: string;
  user: string;
  time: string;

  constructor(data: LogActionResponse) {
    this.id = data.id;
    this.function = data.function;
    this.screen = data.screen;
    this.action = data.action;
    this.user = data.user;
    this.time = data.time;
  }

  static createEmpty(): LogActionEntity {
    return new LogActionEntity({
      id: 0,
      function: '',
      screen: '',
      action: '',
      user: '',
      time: '',
    });
  }
  
  
}
