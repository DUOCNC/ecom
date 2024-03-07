import {CategoryResponse} from '../responses';
import {StringUtils, AbstractCdn} from 'common';

export default class CategoryEntity extends AbstractCdn {
  private readonly id: number;
  private readonly categoryId: number;
  private readonly category: string;
  private readonly url: string;
  private readonly position: number;

  constructor(categoryResponse: CategoryResponse) {
    super();
    this.id = categoryResponse.id;
    this.categoryId = categoryResponse.categoryId;
    this.category = categoryResponse.category;
    this.url = categoryResponse.url;
    this.position = categoryResponse.position;
  }

  getId() {
    return StringUtils.format('CAT_{0}', this.id.toString());
  }

  getCategoryId() {
    return this.categoryId;
  }

  getCategory() {
    return this.category.trim();
  }

  getUrl() {
    return this.getResource(this.url);
  }

  getPosition() {
    return this.position;
  }
}
