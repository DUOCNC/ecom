import Optional from 'common/helper/Optional';
import {OtherMenuConfig, OtherMenuTypeConfig} from '../config';
import {OtherMenuType} from '../enums';
import {OtherMenuTypeEntity, OtherMenuEntity} from '../models';

class OtherService {
  private readonly OtherMenus: Array<OtherMenuEntity>;
  private readonly OtherMenuTypes: Array<OtherMenuTypeEntity>;

  constructor() {
    this.OtherMenus = OtherMenuConfig;
    this.OtherMenuTypes = OtherMenuTypeConfig;
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
}

const otherService = new OtherService();

export default otherService;
