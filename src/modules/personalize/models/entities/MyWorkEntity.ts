import {IView} from 'common';
import {ImageSourcePropType} from 'react-native';
import {MyWorkConfigType} from 'modules/personalize/enums/MyWorkConfigType';

export default class MyWorkEntity implements IView {
  private readonly id: string;
  private readonly icon: ImageSourcePropType;
  private readonly name: string;
  private readonly feature: boolean;
  private readonly position: number;
  private readonly link: string;
  private readonly checkStoreDefault: boolean;
  private readonly type: MyWorkConfigType;
  private readonly checkContract?: boolean | undefined = false;

  constructor(
    id: string,
    icon: ImageSourcePropType,
    name: string,
    feature: boolean,
    position: number,
    link: string,
    checkStoreDefault: boolean,
    type: MyWorkConfigType,
    checkContract?: boolean,
  ) {
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.feature = feature;
    this.position = position;
    this.link = link;
    this.checkStoreDefault = checkStoreDefault;
    this.type = type;
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

  isFeature() {
    return this.feature;
  }

  getPosition() {
    return this.position;
  }

  getLink() {
    return this.link;
  }

  getType() {
    return this.type;
  }

  isCheckStoreDefault() {
    return this.checkStoreDefault;
  }
  isCheckContract() {
    return this.checkContract;
  }
}
