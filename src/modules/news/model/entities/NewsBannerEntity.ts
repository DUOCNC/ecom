import {NewsBannerResponse} from '../response';
import FileEntity from './FileEntity';

export default class NewsBannerEntity {
  private id: number | null;
  private title: string;
  private bannerUrl: FileEntity | null;
  private redirectUrl: string | null;
  private newsId: number | null;
  private isShow: boolean;

  constructor(data: NewsBannerResponse) {
    this.id = data.id;
    this.title = data.title;
    this.bannerUrl = data.bannerUrl ? new FileEntity(data.bannerUrl) : null;
    this.redirectUrl = data.redirectUrl;
    this.newsId = data.newsId;
    this.isShow = data.isShow;
  }

  static createEmpty(): NewsBannerEntity {
    return new NewsBannerEntity({
      id: 0,
      title: '',
      bannerUrl: null,
      redirectUrl: '',
      newsId: null,
      isShow: false,
    });
  }

  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getBannerUrl() {
    if (!this.bannerUrl) {
      return null;
    }
    return this.bannerUrl.getUrl();
  }
  getRedirectUrl() {
    return this.redirectUrl;
  }
  getNewsId() {
    return this.newsId;
  }
  getIsShow() {
    return this.isShow;
  }
}
