import {BaseAxios} from 'common';
import {AppConfig} from 'config/AppConfig';
import {HttpConfig} from 'config/HttpConfig';
import {ServiceConfig} from 'config/ServiceConfig';
import {AnalyticDto} from 'model/dto/AnalyticService/AnalyticDto';
import {AnalyticQuery} from 'model/query/AnalyticQuery';

const getAnalyticsApi = (
  query: AnalyticQuery,
  onSuccess: (analytic: AnalyticDto) => void,
  onError: (errors: Array<string>) => void,
  onFinnaly?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy dữ liệu. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Analytic}/query`, {
    params: query,
    timeout: 1000000,
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: AnalyticDto = response.data;
        onSuccess(result);
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinnaly && onFinnaly());
};

export {getAnalyticsApi};
