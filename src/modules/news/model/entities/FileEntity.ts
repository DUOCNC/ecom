import {FileResponse} from '../response/NewsResponse';

export default class FileEntity {
  private url: string;
  private mimetype: string;
  constructor(data: FileResponse) {
    this.url = data.url;
    this.mimetype = data.mimetype;
  }

  static createEmpty() {
    return new FileEntity({url: '', mimetype: ''});
  }

  getUrl() {
    return this.url;
  }

  getMimeType() {
    return this.mimetype;
  }
}
