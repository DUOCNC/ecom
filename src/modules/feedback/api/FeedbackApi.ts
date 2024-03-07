import {BaseApi, BaseAxios, Pageable, Result, StringUtils} from 'common';
import {FeedbackRequest, FeedbackResponse} from '../models';
import {
  AllFeedbackParam,
  LotFeedbackParam,
} from 'modules/feedback/models/params/AllFeedbackParam';
import {StatusUpdateRequest} from 'modules/feedback/models/requests/StatusUpdateRequest';
import {FeedbackStatusResponse} from 'modules/feedback/models/responses/FeedbackResponse';
import {LotFeedbackResponse} from 'modules/feedback/models/responses/LotFeedbackResponse';
import {BehaviorEntity} from '../models/entities/BehaviorEntity';

class FeedbackApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/feedback-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  createFeedbackApi(request: FeedbackRequest) {
    let url = this.getUrl('feedbacks.json');
    return BaseAxios.post<FeedbackResponse>(url, request);
  }
  getLotFeedbackApi(param: LotFeedbackParam) {
    let url = this.getUrl('lot-reports-statistics.json');
    return BaseAxios.post<Result<LotFeedbackResponse>>(url, param);
  }

  getFormFeedbackApi() {
    let url = this.getUrl('feedback-forms/4.json');
    return BaseAxios.get<Result<FeedbackResponse>>(url);
  }

  updateFeedbackApi(request: FeedbackRequest, feedbackId: number) {
    let url = this.getUrl(`feedbacks/${feedbackId}.json`);
    return BaseAxios.put<FeedbackResponse>(url, request);
  }

  updateStatus(idFeedback: number, request: StatusUpdateRequest) {
    let url = this.getUrl(`feedback-advisors/${idFeedback}.json`);
    return BaseAxios.put<Result<FeedbackStatusResponse>>(url, request);
  }
  updateFeedbackWidthBehavior(
    idFeedback: number,
    request: StatusUpdateRequest,
  ) {
    let url = this.getUrl(`feedbacks/${idFeedback}/update-purchases.json`);
    return BaseAxios.put<Result<FeedbackStatusResponse>>(url, request);
  }

  deleteFeedbackApi(id: number) {
    let url = this.getUrl(StringUtils.format('/feedbacks/{0}.json', id));
    return BaseAxios.delete<Result<string>>(url);
  }

  getFeedbacksApi(params: AllFeedbackParam) {
    let url = this.getUrl('feedbacks.json');
    return BaseAxios.get<Result<Pageable<FeedbackResponse>>>(url, {
      params,
    });
  }

  getDetailFeedbackApi(id: number) {
    let url = this.getUrl(StringUtils.format('feedbacks/{0}.json', id));
    return BaseAxios.get<Result<FeedbackResponse>>(url);
  }
  getListBehaviors() {
    const url = this.getUrl('key-behaviors.json');
    return BaseAxios.get<Result<BehaviorEntity[]>>(url);
  }
}

export default FeedbackApi;
