import {AppConfig} from 'config/AppConfig';
import {HistorySearchQuery} from 'model/query/HistorySearchQuery';
import {ServiceConfig} from 'config/ServiceConfig';
import {HttpConfig} from 'config/HttpConfig';
import {Paging} from 'model/base/Paging';
import {HistorySearchDto} from 'model/dto/MobileService/HistorySearchDto';
import {Result} from 'model/base/Result';
import {ResultConfig} from 'config/ResultConfig';
import {MainStore} from 'reduxs/MainStore';
import {logout} from 'reduxs';
import {HistorySearchRequest} from 'model/request/HistorySearchRequest';
import {BaseAxios} from 'common';

const getHistorySearchApi = (
  query: HistorySearchQuery,
  onSuccess: (histories: Paging<HistorySearchDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy lịch sử tìm kiếm. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Mobile}/histories/search`, {
    params: query,
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<HistorySearchDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinally && onFinally());
};

const saveHistorySearchApi = (
  request: HistorySearchRequest,
  onFinally?: () => void,
) => {
  BaseAxios.post(`${ServiceConfig.Mobile}/histories/search`, request)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        console.log('Save history search success');
      }
    })
    .finally(() => onFinally && onFinally());
};

const deleteHistorySearchApi = (id: number, onFinally?: () => void) => {
  BaseAxios.delete(`${ServiceConfig.Mobile}/histories/search/${id}`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        console.log('Delete history search success');
      }
    })
    .finally(() => onFinally && onFinally());
};

export {getHistorySearchApi, saveHistorySearchApi, deleteHistorySearchApi};
