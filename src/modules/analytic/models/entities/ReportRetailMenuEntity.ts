import {ImageSourcePropType} from 'react-native';

export default class ReportRetailMenuEntity {
  private readonly id: number;
  private readonly title: string;
  private readonly screen: string;
  private readonly icon: ImageSourcePropType;
  private readonly showFeature?: boolean;

  constructor(
    id: number,
    title: string,
    screen: string,
    icon: ImageSourcePropType,
    showFeature?: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.screen = screen;
    this.icon = icon;
    this.showFeature = showFeature;
  }

  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getScreen() {
    return this.screen;
  }
  getIcon() {
    return this.icon;
  }
  getShowFeature() {
    return this.showFeature;
  }
}
