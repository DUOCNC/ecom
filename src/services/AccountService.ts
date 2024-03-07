import {Result} from 'common';
import {AccountApi, MobileApi} from 'api';
import {saveInfo} from 'reduxs';
import BaseService from './BaseService';
import {saveConfig} from 'reduxs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppInfo, MobileConfigResponse} from 'model';
import {MainStore} from 'reduxs/MainStore';
import {AsyncStorageKey} from 'enums';
import AssigneeEntity from 'model/entities/AssigneeEntity';
import {AssigneeResponse} from 'model/responses';

class AccountService extends BaseService {
  private readonly accountApi: AccountApi;
  private readonly mobileApi: MobileApi;
  constructor() {
    super();
    this.accountApi = new AccountApi();
    this.mobileApi = new MobileApi();
  }

  verifyToken(onResult: (isAuthentication: boolean) => void) {
    this.accountApi
      .getProfile()
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          onResult(false);
          return;
        }
        onResult(true);
      })
      .catch(e => {
        onResult(false);
      });
  }

  private getConfigApi(
    onSuccess: (result: Result<MobileConfigResponse>) => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.mobileApi
      .getConfig()
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          this.handleResponse(res.data);
          return;
        }
        onSuccess(res.data);
      })
      .catch(e => this.handlerCatch(e));
  }

  private getStorage() {
    AsyncStorage.getItem(AsyncStorageKey.ON_BOARD).then(value => {
      let info: AppInfo = {
        firstLoad: value === null,
      };
      MainStore.dispatch(saveInfo(info));
    });
  }

  getConfig() {
    this.getConfigApi(res => {
      MainStore.dispatch(saveConfig(res.data));
      this.getStorage();
    }, undefined);
  }

  private getAssigneeFromApi(
    keyword: string,
    onSuccess: (cities: Array<AssigneeResponse>) => void,
    departmentIds?: number | null,
  ) {
    this.accountApi
      .getAccountCode({search: keyword, size: 100, page: 0}, departmentIds)
      .then(response => {
        onSuccess(response.data);
      })
      .catch(e => this.handlerCatch(e));
  }
  loadAssignee(
    keyword: string,
    onSuccess: (assignee: Array<AssigneeEntity>) => void,
    departmentId?: number | null,
  ) {
    this.getAssigneeFromApi(
      keyword,
      listAssignee => {
        onSuccess(
          listAssignee.map(assignee =>
            AssigneeEntity.createFromResponse(assignee),
          ),
        );
      },
      departmentId,
    );
  }
}

const accountService = new AccountService();

export default accountService;
