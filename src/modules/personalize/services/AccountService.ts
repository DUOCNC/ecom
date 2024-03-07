import {AccountProvider} from 'model/providers';
import {AccountEntity} from '../models';
import BaseService from './BaseService';

class AccountService extends BaseService {
  constructor() {
    super();
  }

  getAccount(account: AccountProvider | null) {
    if (account == null) {
      return null;
    }
    return AccountEntity.createFromResponse(account);
  }
}

const accountService = new AccountService();

export default accountService;
