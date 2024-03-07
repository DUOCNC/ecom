import {OtherMenuType} from 'modules/personalize/enums';

export default class OtherMenuTypeEntity {
  private readonly id: string;
  private readonly title: string;
  private readonly haveSeeAll: boolean;
  private readonly position: number;
  private readonly type: OtherMenuType;

  constructor(
    id: string,
    title: string,
    haveSeeAll: boolean,
    position: number,
    type: OtherMenuType,
  ) {
    this.id = id;
    this.title = title;
    this.haveSeeAll = haveSeeAll;
    this.position = position;
    this.type = type;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title.toUpperCase();
  }

  isHaveSeeAll(hideFeature: boolean) {
    if (hideFeature) {
      return false;
    }
    return this.haveSeeAll;
  }

  getPosition() {
    return this.position;
  }

  getType() {
    return this.type;
  }
}
