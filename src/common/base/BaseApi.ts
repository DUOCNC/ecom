import StringUtils from 'common/utils/StringUtils';

export default abstract class BaseApi {
  abstract getBaseUrl(): string;

  protected getUrl(url: string) {
    return StringUtils.format('{0}/{1}', this.getBaseUrl(), url);
  }
}
