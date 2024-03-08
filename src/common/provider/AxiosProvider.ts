import axios from 'axios';
import {StringUtils} from 'common/utils';
import {AppConfig} from 'config/AppConfig';
import * as queryString from 'query-string';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

axios.defaults.paramsSerializer = params =>
  queryString.stringify(params, {arrayFormat: 'separator', encode: true});
export default class AxiosProvider {
  static getAxios() {
    let axiosV1 = axios.create({
      baseURL: AppConfig.BaseUrl,
    });
    axiosV1.interceptors.request.use(async request => {
      const token = AppConfig.Token;
      if (token != null) {
        let Authorization = StringUtils.format('{0} {1}', 'Basic', token);

        let header = {
          Authorization: Authorization,
          ...request.headers,
          'User-Agent': StringUtils.format(
            '{0}/{1}',
            Platform.OS,
            DeviceInfo.getUniqueId(),
          ),
        };
        request.headers = header;
      }
      return request;
    });
    return axiosV1;
  }
}
