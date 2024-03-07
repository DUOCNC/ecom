import {ChannelConfig, ChannelDetailConfig} from '../config';
import {ChannelDetailEntity, ChannelEntity} from '../models';
import BaseService from './BaseService';

class ChannelService extends BaseService {
  private readonly channels: Array<ChannelEntity>;
  private readonly channelDetail: Array<ChannelDetailEntity>;
  constructor() {
    super();
    this.channels = ChannelConfig;
    this.channelDetail = ChannelDetailConfig;
  }

  getChannels(hideFeatureFunction: boolean) {
    return this.channels.filter(channel => {
      if (hideFeatureFunction) {
        return !channel.isFeature();
      }
      return channel;
    });
  }

  getChannelDetail(channelId: number, hideFeatureFunction: boolean) {
    return this.channelDetail
      .filter(channelDetail => channelDetail.getChannelId() === channelId)
      .filter(channel => {
        if (hideFeatureFunction) {
          return !channel.isFeature();
        }
        return channel;
      });
  }
}

const channelService = new ChannelService();

export default channelService;
