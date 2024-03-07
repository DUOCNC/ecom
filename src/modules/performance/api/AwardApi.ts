import BaseAxios from 'common/base/BaseAxios';
import {AwardResponse} from '../models/responses';
import {AwardRequest} from '../models/requests';
import {StringUtils} from 'common';

class AwardApi {
  constructor() {}

  getAwardForApi(req: AwardRequest) {
    return BaseAxios.get<Array<AwardResponse>>(
      StringUtils.format(
        'admin/v2/awards.json?awardFor.equals={0}&sort=createdAt,desc',
        req.awardFor,
      ),
    );
  }
  getAwardsApi() {
    return BaseAxios.get<Array<AwardResponse>>(
      StringUtils.format('admin/v2/awards.json'),
    );
  }
}

export default AwardApi;
