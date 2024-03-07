import {QuestionsConfig} from 'modules/feedback/config';

export class QuestionConfigEntity {
  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  setQuestionConfig(id: number, name: string) {
    this.setId(id);
    this.setName(name);
  }

  private setId(id: number) {
    if (id) {
      this.id = id;
    }
  }

  private setName(name: string) {
    if (name) {
      this.name = name;
    }
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
}

export default class FeedbackConfigEntity {
  private questionsConfig: Array<QuestionConfigEntity> = QuestionsConfig;
  private formId: number = 3;
  getQuestionConfig() {
    return this.questionsConfig;
  }
  getFormId() {
    return this.formId;
  }
}
