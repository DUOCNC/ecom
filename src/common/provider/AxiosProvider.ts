import axios, {AxiosRequestConfig} from 'axios';
import {AuthenticationUtils} from 'common/authentication';
import {StringUtils} from 'common/utils';
import {AppConfig} from 'config/AppConfig';
import {camelizeKeys, decamelizeKeys} from 'humps';
import * as queryString from 'query-string';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

axios.defaults.paramsSerializer = params =>
  queryString.stringify(params, {arrayFormat: 'separator', encode: true});
export default class AxiosProvider {
  static getAxios(version: string) {
    if (version === 'v3') {
      let axiosV2 = axios.create({
        baseURL: `${AppConfig.BaseUrlV2}admin/v2`,
      });
      axiosV2.interceptors.response.use(
        result => {
          if (
            result.data &&
            result.headers['content-type'] === 'application/json'
          ) {
            result.data = camelizeKeys(result.data);
          }
          return result;
        },
        error => {
          return Promise.reject(error);
        },
      );
      axiosV2.interceptors.request.use(
        async request => {
          let authentication = await AuthenticationUtils.get();
          let isPublicApi = request.url?.includes('/mobile-service/public');
          if (authentication != null && !isPublicApi) {
            let Authorization = StringUtils.format(
              '{0} {1}',
              'Bearer',
              authentication.token,
            );
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
        },
        error => {
          return Promise.reject(error);
        },
      );
      return axiosV2;
    }
    if (version === 'v2') {
      let axiosV2 = axios.create({
        baseURL: AppConfig.BaseUrlV2,
      });
      axiosV2.interceptors.response.use(
        result => {
          if (
            result.data &&
            result.headers['content-type'] === 'application/json'
          ) {
            result.data = camelizeKeys(result.data);
          }
          return result;
        },
        error => {
          return Promise.reject(error);
        },
      );
      axiosV2.interceptors.request.use(
        async request => {
          let authentication = await AuthenticationUtils.get();
          let isPublicApi = request.url?.includes('/mobile-service/public');
          if (authentication != null && !isPublicApi) {
            let Authorization = StringUtils.format(
              '{0} {1}',
              'Bearer',
              authentication.token,
            );
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
          this.handleRequest(request);
          return request;
        },
        error => {
          return Promise.reject(error);
        },
      );
      return axiosV2;
    }

    let axiosV1 = axios.create({
      baseURL: AppConfig.BaseUrlV1,
    });
    axiosV1.interceptors.request.use(async request => {
      let authentication = await AuthenticationUtils.get();
      if (authentication != null) {
        let Authorization = StringUtils.format(
          '{0} {1}',
          'Bearer',
          authentication.token,
        );

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
      this.handleRequest(request);
      return request;
    });
    axiosV1.interceptors.response.use(
      result => {
        if (
          result.data &&
          result.headers['content-type'] === 'application/json'
        ) {
          result.data = camelizeKeys(result.data);
        }
        return result;
      },
      error => {
        return Promise.reject(error);
      },
    );
    return axiosV1;
  }

  private static handleRequest(request: AxiosRequestConfig<any>) {
    if (request.data) {
      request.data = decamelizeKeys(request.data);
    }
    if (request.params) {
      request.params = decamelizeKeys(request.params);
    }
  }
}
