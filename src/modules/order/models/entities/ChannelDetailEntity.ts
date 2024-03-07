export default class ChannelDetailEntity {
  private id: number;
  private code: string;
  private name: string;
  private channelId: number;
  private feature: boolean;
  private requireStore: boolean;
  private link: string;
  private confirm: boolean;
  constructor(
    id: number,
    code: string,
    name: string,
    channelId: number,
    feature: boolean,
    requireStore: boolean,
    link: string,
    confirm: boolean,
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.channelId = channelId;
    this.feature = feature;
    this.requireStore = requireStore;
    this.link = link;
    this.confirm = confirm;
  }

  setFeature(value: boolean) {
    this.feature = value;
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

  getChannelId() {
    return this.channelId;
  }

  isFeature() {
    return this.feature;
  }

  isConfirm() {
    return this.confirm;
  }

  getKey() {
    return this.id.toString();
  }

  isRequireStore() {
    return this.requireStore;
  }

  getLink() {
    return this.link;
  }
}
