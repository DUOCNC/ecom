import {StringUtils} from 'common';
import {NewsResponse} from '../response';
import moment from 'moment';
import NewsCategoryEntity from './NewsCategoryEntity';
import FileEntity from './FileEntity';

export default class NewsEntity {
  private id: number;
  private title: string;
  private content: string;
  private shortContent: string | null;
  private contentFile: FileEntity | null;
  private thumbnail: FileEntity | null;
  private applicableSystem: string;
  private isHotNews: boolean;
  private requireLogin: boolean;
  private displayTimeFrom: Date | null;
  private displayTimeTo: Date | null;
  private createdAt: Date | null;
  private category: NewsCategoryEntity | null;
  private fileType: string;
  private updatedAt: Date | null;
  private description: string;

  constructor(data: NewsResponse) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.description = data.description;
    this.shortContent = data.shortContent;
    this.contentFile = data.contentFile
      ? new FileEntity(data.contentFile)
      : null;
    this.thumbnail = data.thumbnail ? new FileEntity(data.thumbnail) : null;
    this.applicableSystem = data.applicableSystem;
    this.isHotNews = data.isHotNews;
    this.requireLogin = data.requireLogin;
    this.displayTimeFrom = data.displayTimeFrom;
    this.displayTimeTo = data.displayTimeTo;
    this.createdAt = data.createdAt;
    this.category = data.category
      ? new NewsCategoryEntity(data.category)
      : NewsCategoryEntity.createEmpty();
    this.fileType = data.fileType;
    this.updatedAt = data.updatedAt;
  }

  static createEmpty(): NewsEntity {
    return new NewsEntity({
      id: 0,
      title: '',
      content: '',
      description: '',
      shortContent: '',
      isHotNews: true,
      contentFile: {url: '', mimetype: ''},
      thumbnail: {url: '', mimetype: ''},
      applicableSystem: '',
      requireLogin: false,
      displayTimeFrom: null,
      displayTimeTo: null,
      createdAt: null,
      category: null,
      fileType: '',
      updatedAt: null,
    });
  }

  getThumbnail() {
    return this.thumbnail;
  }

  getThumbnailUrl() {
    if (!this.thumbnail) {
      return null;
    }
    return this.thumbnail.getUrl();
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title.trim();
  }

  getTitleUpperCase() {
    if (this.title) {
      return this.title.toUpperCase().trim();
    }
    return '';
  }

  getContent() {
    return this.content;
  }

  getDescription() {
    return this.description;
  }

  getShortContent() {
    if (this.getContentFile() !== null) {
      return this.description;
    }
    return this.content;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getCreatedAtStr() {
    if (!this.createdAt) {
      return '';
    }
    return StringUtils.format(
      '{0} tháng {1}, {2}',
      moment(this.createdAt).format('DD'),
      moment(this.createdAt).format('MM'),
      moment(this.createdAt).format('yyyy'),
    );
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getIsHotNews() {
    return this.isHotNews;
  }

  isTagNew() {
    if (this.updatedAt) {
      const today = moment(new Date());
      const updatedAt = moment(this.updatedAt);
      const diffDays = today.diff(updatedAt, 'days');
      if (diffDays >= 0 && diffDays <= 7) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  getNewsCategory() {
    return this.category;
  }

  getContentFile() {
    if (!this.contentFile || this.contentFile.getUrl() === '') {
      return null;
    }
    return this.contentFile.getUrl();
  }
  getFileType() {
    return this.fileType;
  }

  getMimetype() {
    if (!this.contentFile || this.contentFile.getUrl() === '') {
      return '';
    }
    return this.contentFile.getMimeType();
  }
}
