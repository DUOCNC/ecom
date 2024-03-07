import {ImageSourcePropType} from 'react-native';
import {IView} from 'common';

/**
 * Hiển thị báo
 * Tạm thời hiện thị là ảnh giá trị cốt lõi
 */
export default class ArticleEntity implements IView {
  private readonly id: string;
  private readonly source: ImageSourcePropType;

  constructor(id: string, source: ImageSourcePropType) {
    this.source = source;
    this.id = id;
  }
  getId() {
    return this.id;
  }

  public getSource() {
    return this.source;
  }
}
