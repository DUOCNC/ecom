import {ImageSourcePropType} from 'react-native';

export default class ChannelEntity {
  private id: number;
  private code: string;
  private name: string;
  private icon: ImageSourcePropType;
  private feature: boolean;

  constructor(
    id: number,
    code: string,
    name: string,
    icon: ImageSourcePropType,
    feature: boolean,
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.icon = icon;
    this.feature = feature;
  }

  getId() {
    return this.id;
  }

  getCode() {
    return this.code;
  }

  getName() {
    return this.name;
  }

  getIcon() {
    return this.icon;
  }

  isFeature() {
    return this.feature;
  }

  getKey() {
    return this.id.toString();
  }
}
