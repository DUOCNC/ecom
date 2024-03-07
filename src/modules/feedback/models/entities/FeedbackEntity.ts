import {NumberUtils, StringUtils} from 'common';
import {QuestionsConfig} from 'modules/feedback/config';
import {FeedbackQuestion} from 'modules/feedback/enums';
import {SourceId} from 'modules/feedback/enums/Source';
import {AnswerRequest, QuestionRequest} from 'modules/feedback/models';
import moment from 'moment';
import {AnswerResponse, FeedbackResponse, QuestionResponse} from '../responses';
import {BehaviorEntity, KeyBehaviorRequest} from './BehaviorEntity';
import {QuestionConfigEntity} from './FeedbackConfigEntity';

export class FeedbackEntity {
  private questionsConfig: Array<QuestionConfigEntity> = QuestionsConfig;
  constructor(
    public id: number,
    public createdBy: string,
    public createdName: string,
    public updatedBy: string,
    public updatedName: string,
    public requestId: string | null,
    public operatorKcId: string | null,
    public code: string,
    public type: string,
    public name: string,
    public note: string,
    public storeId: number,
    public sourceId: number,
    public advisorCode: string | null,
    public advisorName: string | null,
    public status: string,
    public deleted: boolean,
    public revision: number,
    public createdAt: string,
    public updatedAt: string,
    public questions: QuestionEntity[],
    public total: number,
    public totalVisitor: number,
    public keyBehaviors: BehaviorEntity[],
  ) {}

  static clone(feedback: FeedbackEntity) {
    return new FeedbackEntity(
      feedback.id,
      feedback.createdBy,
      feedback.createdName,
      feedback.updatedBy,
      feedback.updatedName,
      feedback.requestId,
      feedback.operatorKcId,
      feedback.code,
      feedback.type,
      feedback.name,
      feedback.note,
      feedback.storeId,
      feedback.sourceId,
      feedback.advisorCode,
      feedback.advisorName,
      feedback.status,
      feedback.deleted,
      feedback.revision,
      feedback.createdAt,
      feedback.updatedAt,
      feedback.questions.map(e => QuestionEntity.clone(e)),
      feedback.total,
      feedback.totalVisitor,
      feedback.keyBehaviors,
    );
  }

  static createEmpty(): FeedbackEntity {
    return new FeedbackEntity(
      0,
      '',
      '',
      '',
      '',
      null,
      null,
      'Chi tiết đóng góp',
      '',
      '',
      '',
      0,
      SourceId.MOBILE,
      null,
      null,
      '',
      false,
      0,
      '',
      '',
      [],
      0,
      0,
      [],
    );
  }

  static fromResponse(
    response: FeedbackResponse,
    total?: number,
  ): FeedbackEntity {
    const questions = response.questions
      ? response.questions.map(QuestionEntity.fromResponse)
      : [];
    if (!total) {
      total = 0;
    }
    const keyBehaviors = (response?.keyBehaviors || []).map(keyBehavior => {
      return new BehaviorEntity(keyBehavior);
    });
    return new FeedbackEntity(
      response.id,
      response.createdBy,
      response.createdName,
      response.updatedBy,
      response.updatedName,
      response.requestId,
      response.operatorKcId,
      response.code,
      response.type,
      response.name,
      response.note,
      response.storeId,
      SourceId.MOBILE,
      response.advisorCode,
      response.advisorName,
      response.status,
      response.deleted,
      response.revision,
      response.createdAt,
      response.updatedAt,
      questions,
      total,
      0,
      keyBehaviors,
    );
  }

  buildCreateFeedbackRequest() {
    const questionList: Array<QuestionRequest> = this.questions.map(
      question => {
        return question.buildCreateQuestionRequest();
      },
    );
    return {
      type: this.type,
      code: this.code,
      name: this.name,
      note: this.note,
      storeId: this.storeId,
      sourceId: SourceId.MOBILE,
      advisorName: this.advisorName,
      advisorCode: this.advisorCode,
      deleted: this.deleted,
      revision: this.revision,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      status: this.status,
      questions: questionList,
      totalVisitor:
        Number(this.getNumberOfChildren()) + Number(this.getNumberOfAdults()),
    };
  }
  buildEditFeedbackRequest(keyBehaviors: KeyBehaviorRequest[]) {
    const questionList: Array<QuestionRequest> = this.questions.map(
      question => {
        return question.buildEditQuestionRequest();
      },
    );
    return {
      id: this.id,
      type: this.type,
      code: this.code,
      name: this.name,
      note: this.note,
      storeId: this.storeId,
      sourceId: SourceId.MOBILE,
      advisorName: this.advisorName,
      advisorCode: this.advisorCode,
      deleted: this.deleted,
      revision: this.revision,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      status: this.status,
      questions: questionList,
      totalVisitor:
        Number(this.getNumberOfChildren()) + Number(this.getNumberOfAdults()),
      keyBehaviors,
    };
  }

  //DUOCNC START
  getId() {
    return this.id;
  }
  getKeyFlatList() {
    return this.id + this.code;
  }

  getCode() {
    if (this.code) {
      return this.code;
    }
    return '';
  }

  getNumberOfAdults() {
    const question = this.questions.find(
      e => e.getQuestionId() === FeedbackQuestion.ADULT,
    );
    if (question) {
      const answer = question.getAnswers()[0];
      if (answer) {
        return answer.getValue();
      }
    }
    return 0;
  }
  getDeleted() {
    return this.deleted;
  }
  getTotal() {
    return this.total;
  }
  setNumberOfAdults(numberAdult: number) {
    const question = this.questions.find(
      e => e.getQuestionId() === FeedbackQuestion.ADULT,
    );
    if (question) {
      const answer = question.getAnswers()[0];
      if (answer) {
        return answer.setValue(`${numberAdult}`);
      }
    }
    return 0;
  }

  getNumberOfChildren() {
    const question = this.questions.find(
      e => e.getQuestionId() === FeedbackQuestion.CHILDREN,
    );
    if (question) {
      const answer = question.getAnswers()[0];
      if (answer) {
        return answer.getValue();
      }
    }
    return 0;
  }

  getAllPerson() {
    return (
      (Number(this.getNumberOfAdults()) || 0) +
      (Number(this.getNumberOfChildren()) || 0)
    );
  }

  setNumberOfChildren(numberChildren: number) {
    const question = this.questions.find(
      e => e.getQuestionId() === FeedbackQuestion.CHILDREN,
    );
    if (question) {
      const answer = question.getAnswers()[0];
      if (answer) {
        return answer.setValue(`${numberChildren}`);
      }
    }
    return 0;
  }

  setReasonDetail(reason: string) {
    const question = this.questions.find(
      e => e.getQuestionId() === FeedbackQuestion.REASON_DETAIL,
    );
    if (question) {
      const answer = question.getAnswers()[0];
      if (answer) {
        return answer.setValue(reason);
      }
    }
    return 0;
  }

  getAdvisorCode() {
    if (this.advisorCode) {
      return this.advisorCode;
    }
    return '';
  }

  getAdvisorName() {
    if (this.advisorName) {
      return this.advisorName;
    }
    return '';
  }

  getStatusValue() {
    return this.status;
  }

  setStatusValue(status: string) {
    this.status = status;
  }

  getQuestionById(questionId: number) {
    return this.questions.find(e => e.getQuestionId() === questionId);
  }

  getReasons() {
    const question = this.questions.find(
      e => e.getQuestionId() === FeedbackQuestion.REASON,
    );
    if (question) {
      return question.getAnswers().map(e => e.getValueText());
    }
    return [];
  }

  getReasonsText() {
    let reason = '';

    const question = this.questions.find(
      e => e.getQuestionId() === FeedbackQuestion.REASON,
    );

    if (question) {
      question.getAnswers().forEach((e, index) => {
        reason =
          reason +
          StringUtils.format(`${index ? ', ' : ''}{0}`, e.getValueText());
      });
    }

    if (!reason) {
      return 'Không có';
    }
    return reason;
  }

  getAnswerReasons() {
    const question = this.questions.find(
      e => e.getQuestionId() === FeedbackQuestion.REASON,
    );
    if (question) {
      return question.getAnswers();
    }
    return [];
  }

  updateAnswerReasons(fbEntity: FeedbackEntity, reasons: Array<AnswerEntity>) {
    const fb = FeedbackEntity.clone(fbEntity);
    fb.questions
      .find(e => e.getQuestionId() === FeedbackQuestion.REASON)
      ?.setAnswers(reasons);

    return fb;
  }

  getReasonDetail() {
    const question = this.questions.find(
      e => e.getQuestionId() === FeedbackQuestion.REASON_DETAIL,
    );
    if (question) {
      if (question.getAnswers().length > 0) {
        return question.getAnswers()[0].getValueText();
      }
    }
    return '';
  }

  getCreatedHourDate() {
    return moment(this.createdAt).format('HH:mm DD/MM/YYYY');
  }

  getCreatedDate() {
    return moment(this.createdAt).format('DD/MM/YYYY');
  }
  //DUOCNC END

  setAdvisorCode(code: string) {
    this.advisorCode = code;
  }

  setAdvisorName(name: string) {
    this.advisorName = name;
  }

  setStoreId(storeId: number) {
    this.storeId = storeId;
  }
  getCreatedName() {
    if (this.createdName) {
      return this.createdName;
    }
    return '';
  }
  getCreatedBy() {
    if (this.createdBy) {
      return this.createdBy;
    }
    return '';
  }
  getBehaviors() {
    if (this.keyBehaviors) {
      return this.keyBehaviors;
    }
  }
}

export class QuestionEntity {
  constructor(
    private id: number,
    private feedbackId: number,
    private questionId: number,
    private type: string,
    private value: string,
    private position: number,
    private required: boolean,
    private deleted: boolean,
    private revision: number,
    private isHidden: boolean,
    private answers: AnswerEntity[],
    private formId: number,
    private key: string,
  ) {}

  static clone(question: QuestionEntity) {
    return new QuestionEntity(
      question.id,
      question.feedbackId,
      question.questionId,
      question.type,
      question.value,
      question.position,
      question.required,
      question.deleted,
      question.revision,
      question.isHidden,
      question.answers.map(e => AnswerEntity.clone(e)),
      question.formId,
      question.key,
    );
  }

  static createEmpty(): QuestionEntity {
    return new QuestionEntity(
      0,
      0,
      0,
      '',
      '',
      0,
      false,
      false,
      0,
      false,
      [],
      0,
      '',
    );
  }

  static fromResponse(response: QuestionResponse): QuestionEntity {
    const answers = response.answers
      ? response.answers.map(AnswerEntity.fromResponse)
      : [];

    return new QuestionEntity(
      response.id,
      response.feedbackId,
      response.questionId,
      response.type,
      response.value,
      response.position,
      response.required,
      response.deleted,
      response.revision,
      response.isHidden,
      answers,
      response.formId,
      response.key,
    );
  }

  buildCreateQuestionRequest() {
    const answerList: Array<AnswerRequest> = this.answers.map(answer => {
      return answer.buildCreateAnswerRequest();
    });
    return {
      feedbackId: this.feedbackId,
      questionId: this.questionId,
      type: this.type,
      value: this.value,
      position: this.position,
      required: this.required,
      deleted: this.deleted,
      revision: this.revision,
      isHidden: this.isHidden,
      formId: this.formId,
      key: this.key,
      answers: answerList,
    };
  }

  buildEditQuestionRequest() {
    const answerList: Array<AnswerRequest> = this.answers.map(answer => {
      return answer.buildEditAnswerRequest();
    });
    return {
      id: this.id,
      feedbackId: this.feedbackId,
      questionId: this.questionId,
      type: this.type,
      value: this.value,
      position: this.position,
      required: this.required,
      deleted: this.deleted,
      revision: this.revision,
      isHidden: this.isHidden,
      formId: this.formId,
      key: this.key,
      answers: answerList,
    };
  }

  getAnswers() {
    if (!this.answers) {
      return [];
    }
    return this.answers;
  }

  getId() {
    return this.id;
  }

  getQuestionId() {
    return this.questionId;
  }

  setAnswers(answers: Array<AnswerEntity>) {
    this.answers = answers.filter(e => {
      return e;
    });
  }

  removeAnswer(answer: AnswerEntity, question: QuestionEntity) {
    const newQuestion = QuestionEntity.clone(question);
    const index = newQuestion
      .getAnswers()
      .findIndex(e => e.getAnswerId() === answer.getAnswerId());
    newQuestion.getAnswers().splice(index, 1);
    newQuestion.setAnswers(newQuestion.getAnswers());
    return newQuestion;
  }

  addAnswer(answer: AnswerEntity, question: QuestionEntity) {
    const newQuestion = QuestionEntity.clone(question);
    newQuestion.setAnswers(question.getAnswers().concat([answer]));
    return newQuestion;
  }
}

export class AnswerEntity {
  constructor(
    public id: number,
    public formId: number,
    public answerId: number,
    public formQuestionId: number,
    public feedBackQuestionId: number,
    public value: string,
    public deleted: boolean,
    public revision: number,
    public isAnswer: boolean,
  ) {}

  static clone(answerEntity: AnswerEntity) {
    return new AnswerEntity(
      answerEntity.id,
      answerEntity.formId,
      answerEntity.answerId,
      answerEntity.formQuestionId,
      answerEntity.feedBackQuestionId,
      answerEntity.value,
      answerEntity.deleted,
      answerEntity.revision,
      answerEntity.isAnswer,
    );
  }

  static createEmpty(): AnswerEntity {
    return new AnswerEntity(0, 0, 0, 0, 0, '', false, 0, false);
  }

  static fromResponse(response: AnswerResponse): AnswerEntity {
    return new AnswerEntity(
      response.id,
      response.formId,
      response.answerId,
      response.formQuestionId,
      response.feedBackQuestionId,
      response.value,
      response.deleted,
      response.revision,
      response.isAnswer,
    );
  }

  getId() {
    return this.id;
  }

  getQuestionId() {
    return this.formQuestionId;
  }

  getFeedBackQuestionId() {
    return this.feedBackQuestionId;
  }

  getAnswerId() {
    return this.answerId;
  }

  buildCreateAnswerRequest() {
    return {
      formId: this.formId,
      formQuestionId: this.formQuestionId,
      feedBackQuestionId: this.feedBackQuestionId,
      answerId: this.answerId,
      deleted: this.deleted,
      revision: this.revision,
      value: this.value,
      isAnswer: this.isAnswer,
    };
  }

  buildEditAnswerRequest() {
    if (this.id === -1) {
      return {
        formId: this.formId,
        formQuestionId: this.formQuestionId,
        feedBackQuestionId: this.feedBackQuestionId,
        answerId: this.answerId,
        deleted: this.deleted,
        revision: this.revision,
        value: this.value,
        isAnswer: this.isAnswer,
      };
    }
    return {
      id: this.id,
      formId: this.formId,
      formQuestionId: this.formQuestionId,
      feedBackQuestionId: this.feedBackQuestionId,
      answerId: this.answerId,
      deleted: this.deleted,
      revision: this.revision,
      value: this.value,
      isAnswer: this.isAnswer,
    };
  }

  getValue() {
    if (this.value) {
      return NumberUtils.formatNumber(parseInt(this.value, 10));
    }
    return 0;
  }
  setValue(value: string) {
    this.value = value;
  }
  getValueText() {
    return this.value;
  }

  setDeleted(value: boolean) {
    this.deleted = value;
  }

  setId(value: number) {
    this.id = value;
  }

  setIsAnswer(value: boolean) {
    this.isAnswer = value;
  }

  getIsAnswer() {
    return this.isAnswer;
  }
}
