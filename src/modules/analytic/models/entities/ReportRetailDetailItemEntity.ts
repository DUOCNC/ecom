import {ImageSourcePropType} from 'react-native';

export default class ReportRetailDetailItemEntity {
  private readonly icon: ImageSourcePropType;
  private readonly id: number;
  private readonly title: string;
  private readonly subTitle: string;
  private readonly screen: string;
  private readonly type: string;

  constructor(
    icon: number,
    id: number,
    title: string,
    subTitle: string,
    screen: string,
    type: string,
  ) {
    this.icon = icon;
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.screen = screen;
    this.type = type;
  }

  getIcon() {
    return this.icon;
  }
  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getSubTitle() {
    return this.subTitle;
  }
  getScreen() {
    return this.screen;
  }
  getType() {
    return this.type;
  }
}
