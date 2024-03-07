import Optional from 'common/helper/Optional';
import {MobileApi} from '../axios';
import {OtherMenuConfig, OtherMenuTypeConfig} from '../config';
import {OtherMenuType} from '../enums';
import {OtherMenuTypeEntity, OtherMenuEntity} from '../models';
import BaseService from './BaseService';

class OtherService extends BaseService {
  private readonly OtherMenus: Array<OtherMenuEntity>;
  private readonly OtherMenuTypes: Array<OtherMenuTypeEntity>;
  private readonly mobileApi: MobileApi;
  constructor() {
    super();
    this.OtherMenus = OtherMenuConfig;
    this.OtherMenuTypes = OtherMenuTypeConfig;
    this.mobileApi = new MobileApi();
  }

  public getOtherType() {
    return this.OtherMenuTypes.sort(
      (m1, m2) => m1.getPosition() - m2.getPosition(),
    );
  }

  public getOtherMenu(type: OtherMenuType, hideFeature: boolean) {
    return Optional.ofNulable(this.OtherMenus)
      .orElse([])
      .filter(otherMenu => type === otherMenu.getType())
      .filter(otherMenu => !hideFeature || !otherMenu.isFeature());
  }

  public getTicket(onResponse: (haveTicket: boolean) => void) {
    this.mobileApi
      .getTicket()
      .then(response => {
        let result = response.data;
        this.handleResponse(result);
        let data = result.data;
        onResponse(data != null);
      })
      .catch(e => this.handlerCatch(e));
  }
}

const otherService = new OtherService();

export default otherService;
