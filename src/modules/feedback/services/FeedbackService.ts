import {ErrorType} from 'common-ui';
import {AnswerEntity, FeedbackEntity} from '../models/entities';
import BaseService from './BaseService';
import {FeedbackApi} from 'modules/feedback/api';
import {FeedbackRequest} from 'modules/feedback/models';
import {
  AllFeedbackParam,
  LotFeedbackParam,
} from 'modules/feedback/models/params/AllFeedbackParam';
import {StatusUpdateRequest} from 'modules/feedback/models/requests';
import {FeedbackQuestion} from '../enums';
import {FeedbackStatusResponse} from 'modules/feedback/models/responses/FeedbackResponse';
import {LotFeedbackEntity} from 'modules/feedback/models/entities/LotFeedbackEntity';
import {Metadata} from 'common';
import {
  BehaviorEntity,
  KeyBehaviorRequest,
} from '../models/entities/BehaviorEntity';
import {showError} from 'utils/ToastUtils';

class FeedbackService extends BaseService {
  private feedbackApi: FeedbackApi;
  constructor() {
    super();
    this.feedbackApi = new FeedbackApi();
  }

  getFeedbackDetail(
    id: number,
    handleSuccess: (feedbackEntity: FeedbackEntity) => void,
    handleError: (error: ErrorType, msg: string, code?: number) => void,
    beforeCallApi?: () => void,
    handleFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.feedbackApi
      .getDetailFeedbackApi(id)
      .then(res => {
        if (res && res.data && res.data.data) {
          const fbEntity = FeedbackEntity.fromResponse(res.data.data);
          handleSuccess(fbEntity);
          return;
        }
        if (res.data.data === null) {
          handleError('NotfoundReport', 'Đóng góp này không tồn tại');
        }
      })
      .catch(e => {
        handleError(
          'Error',
          'Bạn vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ để được giải quyết.',
          e.response.status,
        );
      })
      .finally(handleFinally);
  }

  getFeedbacks(
    params: AllFeedbackParam,
    handleSuccess: (
      feedbackEntity: Array<FeedbackEntity>,
      metadata: Metadata,
    ) => void,
    handleError: (error: ErrorType, msg: string, code?: number) => void,
    beforeCallApi?: () => void,
    handleFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.feedbackApi
      .getFeedbacksApi(params)
      .then(res => {
        if (res && res.data && res.data.data && res.data.data.items) {
          const fbEntities = res.data.data.items.map(e =>
            FeedbackEntity.fromResponse(e),
          );
          handleSuccess(fbEntities, res.data.data.metadata);
          return;
        }
        if (res.data.data.items === null) {
          handleError('NotfoundReport', 'Không có dữ liệu hiển thị.');
        }
      })
      .catch(e => {
        handleError(
          'Error',
          'Bạn vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ để được giải quyết.',
          e.response.status,
        );
      })
      .finally(() => handleFinally && handleFinally());
  }

  getFormFeedback(
    success: (data: FeedbackEntity) => void,
    error: (code: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.feedbackApi
      .getFormFeedbackApi()
      .then(response => {
        if (response.data && response.data.data) {
          const feedbackEntity = FeedbackEntity.fromResponse(
            response.data.data,
          );
          success(feedbackEntity);
        } else {
          error('NotfoundReport', 'Không tìm thấy kết quả');
        }
      })
      .catch(e => {
        this.handlerCatch(e, error);
      })
      .finally(onFinish);
  }

  createFeedback(
    data: FeedbackRequest,
    onSuccess: () => void,
    error: (code: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    return this.feedbackApi
      .createFeedbackApi(data)
      .then(() => onSuccess())
      .catch(e => {
        this.handlerCatch(e, error);
      })
      .finally(onFinish);
  }

  getLotFeedback(
    params: LotFeedbackParam,
    onSuccess: (lotFeedback: LotFeedbackEntity) => void,
    error: (code: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.feedbackApi
      .getLotFeedbackApi(params)
      .then(response => {
        if (response.data && response.data.data) {
          const feedbackEntity = LotFeedbackEntity.fromResponse(
            response.data.data,
          );
          onSuccess(feedbackEntity);
        }
        if (response.data.errors && response.data.errors.length > 0) {
          error('Error', response.data.errors[0]);
          return;
        }
      })
      .catch(e => {
        this.handlerCatch(e, error);
      })
      .finally(onFinish);
  }

  updateFeedback(
    feedbackId: number,
    data: FeedbackRequest,
    onSuccess: () => void,
    error: (code: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.feedbackApi
      .updateFeedbackApi(data, feedbackId)
      .then(() => onSuccess())
      .catch(e => {
        this.handlerCatch(e, error);
      })
      .finally(onFinish);
  }

  updateStatusFeedback(
    idFeedback: number,
    data: StatusUpdateRequest,
    onSuccess: (response: FeedbackStatusResponse) => void,
    error: (code: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.feedbackApi
      .updateStatus(idFeedback, data)
      .then(response => {
        if (response && response.data && response.data.data) {
          onSuccess(response.data.data);
        }
      })
      .catch(e => {
        this.handlerCatch(e, error);
      })
      .finally(onFinish);
  }
  validateBehavior(keyBehaviors: KeyBehaviorRequest[]): boolean {
    if (keyBehaviors.length <= 0) {
      showError('Vui lòng chọn KH đến cửa hàng thông qua nguồn nào');
      return true;
    }
    return false;
  }
  updateFeedbackWidthBehavior(
    idFeedback: number,
    data: StatusUpdateRequest,
    onSuccess: (response: FeedbackStatusResponse) => void,
    error: (code: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    const validateBehavior = this.validateBehavior(data?.key_behaviors || []);
    if (validateBehavior) {
      return;
    }
    beginCallApi && beginCallApi();
    this.feedbackApi
      .updateFeedbackWidthBehavior(idFeedback, data)
      .then(response => {
        if (response && response.data && response.data.data) {
          onSuccess(response.data.data);
        }
      })
      .catch(e => {
        this.handlerCatch(e, error);
      })
      .finally(onFinish);
  }
  deleteFeedback(
    idFeedback: number,
    onSuccess: () => void,
    error: (code: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.feedbackApi
      .deleteFeedbackApi(idFeedback)
      .then(() => onSuccess())
      .catch(e => {
        this.handlerCatch(e, error);
      })
      .finally(onFinish);
  }

  buildAnswersReason(fbOld: FeedbackEntity, fbNew: FeedbackEntity) {
    const answersReasonOld = fbOld
      .getQuestionById(FeedbackQuestion.REASON)
      ?.getAnswers();
    let answers: Array<AnswerEntity> = fbNew.getAnswerReasons().map(e => {
      e.setIsAnswer(true);
      e.setId(-1);
      if (answersReasonOld) {
        const old = answersReasonOld.find(
          p => p.getAnswerId() === e.getAnswerId(),
        );
        if (old) {
          e.setId(old.getId());
        }
      }
      return e;
    });
    //update answer question reason
    const answersReasonNew = fbNew
      .getQuestionById(FeedbackQuestion.REASON)
      ?.getAnswers();

    if (answersReasonNew && answersReasonOld) {
      const filteredAnswers = answersReasonOld.filter(
        b => !answersReasonNew.find(a => a.answerId === b.answerId),
      );
      if (filteredAnswers.length > 0) {
        for (let i = 0; i < filteredAnswers.length; i++) {
          let e = filteredAnswers[i];
          e.setIsAnswer(false);
          e.setDeleted(true);
          answers.push(e);
        }
      }
    }
    return answers;
  }

  getListBehaviors(onSuccess: (data: BehaviorEntity[]) => void) {
    this.feedbackApi
      .getListBehaviors()
      .then(response => {
        if (response.data && response.data.data) {
          const behaviorEntity = response.data.data.map(item => {
            return BehaviorEntity.fromResponse(item);
          });
          onSuccess(behaviorEntity);
        }
      })
      .catch(e => {});
  }
}

const feedbackService = new FeedbackService();

export default feedbackService;
