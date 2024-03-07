import {IView} from 'common';
import ObjectUtils from 'common/utils/ObjectUtils';
import {OtherMenuType} from 'modules/personalize/enums';
import {ImageSourcePropType} from 'react-native';

export default class OtherMenuEntity implements IView {
  private readonly id: string;
  private readonly icon: ImageSourcePropType;
  private readonly name: string;
  private readonly type: OtherMenuType;
  private readonly permission: string | null;
  private readonly feature: boolean;
  private readonly route: string;
  private readonly checkContract?: boolean | undefined = false;

  constructor(
    id: string,
    icon: ImageSourcePropType,
    name: string,
    type: OtherMenuType,
    permission: string | null,
    feature: boolean,
    route: string,
    checkContract?: boolean | undefined,
  ) {
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.type = type;
    this.permission = permission;
    this.feature = feature;
    this.route = route;
    this.checkContract = checkContract;
  }

  getId() {
    return this.id;
  }

  getIcon() {
    return this.icon;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  getRoute() {
    return this.route;
  }

  hasPermission() {
    return ObjectUtils.nonNull(this.permission);
  }

  isFeature() {
    return this.feature;
  }

  isCheckContract() {
    return this.checkContract;
  }
}
