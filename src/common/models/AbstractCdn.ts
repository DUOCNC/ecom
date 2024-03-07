import Config from 'react-native-config';
import {StringUtils} from '../utils';

export default abstract class AbstractCdn {
  private readonly CDN: string;
  constructor() {
    if (!Config.CDN_YODY) {
      throw new Error('Missing config CDN_YODY');
    }
    this.CDN = Config.CDN_YODY;
  }

  protected getResource(endpoint: string) {
    return StringUtils.format('{0}/{1}', this.CDN, endpoint);
  }
}
