import {StringUtils} from 'common';
import {
  CategoryResponse,
  MetafieldResponse,
  SubTask,
  Task,
  TaskResult,
  Template,
  TemplateSubTaskResponse,
} from '../responses/TaskResponse';
import {
  TaskResultResponse,
  TaskUpdateResponse,
} from '../responses/TaskResultResponse';
import moment from 'moment';
import {QuizStatus} from 'modules/personalize/enums';
import {TrainingEntity} from './TrainingEntity';

export class TaskEntity {
  id: number;
  dueDate: Date;
  assignTo: string;
  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string | null;
  lastModifiedDate: string | null;
  template: TemplateEntity | null;
  subTasks: SubTaskEntity[];
  status: string | undefined;
  result?: TaskResult | null;
  metafields?: MetafieldEntity[] | null;

  constructor(taskResponse: Task) {
    this.id = taskResponse.id;
    this.dueDate = new Date(taskResponse.dueDate);
    this.assignTo = taskResponse.assignTo;
    this.createdBy = taskResponse.createdBy;
    this.createdDate = new Date(taskResponse.createdDate);
    this.lastModifiedBy = taskResponse.lastModifiedBy;
    this.lastModifiedDate = taskResponse.lastModifiedDate;
    this.template =
      taskResponse.template !== null
        ? new TemplateEntity(taskResponse.template)
        : null;
    this.subTasks = taskResponse.subTasks
      ? taskResponse.subTasks.map(subTask => new SubTaskEntity(subTask))
      : [];
    this.status = taskResponse.status;
    this.result = taskResponse.result;
    this.metafields =
      taskResponse.metafields !== null
        ? taskResponse.metafields?.map(e => new MetafieldEntity(e))
        : null;
  }

  static clone(task: Task, subTask: SubTaskEntity[]) {
    const newTask = new TaskEntity(task);
    newTask.setSubTasks(subTask);
    return newTask;
  }

  static createEmpty() {
    return new TaskEntity({
      id: 0,
      dueDate: '',
      assignTo: '',
      createdBy: '',
      createdDate: '',
      lastModifiedBy: null,
      lastModifiedDate: null,
      template: null,
      subTasks: [],
      result: null,
      status: QuizStatus.Unfinished,
      metafields: [],
    });
  }

  public getMetafields() {
    if (!this.metafields) {
      return [];
    }
    return this.metafields;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getDueDate(): Date {
    return this.dueDate;
  }

  public getDueDateDis(): string {
    return moment(this.dueDate).format('DD/MM/yyyy');
  }

  public setDueDate(dueDate: Date): void {
    this.dueDate = dueDate;
  }

  public getAssignTo(): string {
    return this.assignTo;
  }

  public setAssignTo(assignTo: string): void {
    this.assignTo = assignTo;
  }

  public getCreatedBy(): string {
    return this.createdBy;
  }

  public setCreatedBy(createdBy: string): void {
    this.createdBy = createdBy;
  }

  public getCreatedDate(): Date {
    return this.createdDate;
  }

  public setCreatedDate(createdDate: Date): void {
    this.createdDate = createdDate;
  }

  public getLastModifiedBy(): string | null {
    return this.lastModifiedBy;
  }

  public setLastModifiedBy(lastModifiedBy: string | null): void {
    this.lastModifiedBy = lastModifiedBy;
  }

  public getLastModifiedDate(): string | null {
    return this.lastModifiedDate;
  }

  public setLastModifiedDate(lastModifiedDate: string | null): void {
    this.lastModifiedDate = lastModifiedDate;
  }

  public getTitle() {
    if (!this.template) {
      return '';
    }
    return this.template.getTitle();
  }

  public getTemplate(): TemplateEntity | null {
    return this.template;
  }

  public setTemplate(template: TemplateEntity): void {
    this.template = template;
  }

  public getSubTasks(): SubTaskEntity[] {
    return this.subTasks;
  }

  public setSubTasks(subTasks: SubTaskEntity[]): void {
    this.subTasks = subTasks;
  }

  public chooseAnswer(
    task: TaskEntity,
    subTaskId: number,
    key: string,
    value?: string,
  ) {
    let subTasks: any;
    if (task.getSubTasks()) {
      subTasks = task.subTasks?.filter(e => {
        if (e.getId() === subTaskId) {
          const metafield: MetafieldResponse[] = [];
          if (e.template.isEnterAnswer()) {
            metafield.push(
              {
                key: 'answer',
                value: 'E',
              },
              {
                key: 'optionE',
                value: value ?? '',
                selected: true,
              },
            );
          } else {
            e.template.getMetafieldEntities()?.filter(p => {
              p.setSelected(false);
              if (p.getKey() === key) {
                p.setSelected(true);
              }
              metafield.push({
                key: p.getKey(),
                value: p.getValue(),
                selected: p.getSelected(),
              });
            });
          }
          e.template.setMetafields(metafield);
        }
        return e;
      });
    }
    task.setSubTasks(subTasks);
    return Object.assign(task);
  }

  public buildRequestUpdate(startAt: Date) {
    if (!this.subTasks) {
      return null;
    }
    const answers = this.subTasks.map(e => {
      if (e.template.isEnterAnswer()) {
        return {
          template_sub_task_id: e.template.getId(),
          answer: e
            .getTemplate()
            .getMetafields()
            .find(p => p.selected === true)?.value,
        };
      }
      return {
        template_sub_task_id: e.template.getId(),
        answer:
          e
            .getTemplate()
            .getMetafields()
            .find(p => p.selected === true)
            ?.key.replace('option', '') ?? '',
      };
    });
    return {
      task_id: this.id,
      start_at: startAt,
      answer_requests: answers ?? [],
    };
  }

  public getWorkingTime() {
    if (!this.template) {
      return 0;
    }
    if (this.template.metafields && this.template.metafields.length > 0) {
      const fieldsWorkingTime = this.template.metafields.find(
        e => e.getKey() === 'working_time',
      );
      if (!fieldsWorkingTime) {
        return 0;
      }
      return parseInt(fieldsWorkingTime.getValue());
    }
    return 0;
  }

  public getUserSelections(): Array<{title: string; value: string}> {
    let result: Array<{title: string; value: string}> = [];
    if (!this.getSubTasks()) {
      return [];
    }
    this.getSubTasks()?.filter((e, index) => {
      const metafields = e.template.getMetafieldEntities();
      if (metafields && metafields.length > 0) {
        const metafield = metafields.find(p => p.getSelected());
        if (metafield) {
          result.push({
            title: StringUtils.format('Câu {0}', index + 1),
            value: metafield.getKey().replace('option', ''),
          });
        }
      }
    });
    return result;
  }

  public getUserSelected() {
    return StringUtils.format(
      '{0}/{1}',
      this.getUserSelections().length,
      this.getSubTasks()?.length ?? 0,
    );
  }

  public getStatusValue() {
    if (!this.status) {
      return QuizStatus.Unfinished;
    }
    return this.status;
  }

  public getStatus() {
    if (QuizStatus.Expire === this.status) {
      return 'Quá hạn';
    }
    if (QuizStatus.Finished === this.status) {
      return 'Hoàn thành';
    }
    if (QuizStatus.Unfinished === this.status) {
      return 'Chưa hoàn thành';
    }
    return 'Chưa hoàn thành';
  }

  public setStatus(value: string) {
    this.status = value;
  }

  public getTaskResult() {
    return this.result;
  }

  public setTaskResult(value: TaskResult) {
    this.result = value;
  }

  public getTaskResultEntity() {
    if (this.result) {
      return new TaskResultEntity(this.result);
    }
    return null;
  }

  public getRemainingTimes() {
    if (this.status === QuizStatus.Finished) {
      return this.getTaskResultEntity()?.getRemainingTimes() ?? 0;
    }
    if (this.template) {
      const metafield = this.template
        .getMetafields()
        .find(e => e.getKey() === 'max_number_of_test');

      if (metafield) {
        return metafield.getValue();
      }
      return 0;
    }
    return 0;
  }

  public haveTraining() {
    //kt xem đã học chưa
    if (this.metafields) {
      if (this.metafields.findIndex(e => e.getKey() === 'learning_at') !== -1) {
        return false;
      }
    }
    if (this.template?.training) {
      return true;
    }
    return false;
  }

  public isDelay() {
    //kt xem còn trong thời gian hoãn làm bài không

    if (this.metafields) {
      let index = this.metafields.findIndex(e => e.getKey() === 'delay_to');
      if (index !== -1) {
        return (
          moment(this.metafields[index].getValue()).valueOf() >
          moment().valueOf()
        );
      }
    }
    return false;
  }

  isHaveDelay() {
    //kt xem đã delay lần nào chưa

    if (this.metafields) {
      if (this.metafields.findIndex(e => e.getKey() === 'delay_to') !== -1) {
        return false;
      }
    }
    return true;
  }

  getTraining() {
    return this.template?.training;
  }

  getNumberOfTested() {
    if (!this.metafields) {
      return 0;
    }
    const metafield = this.metafields.find(
      e => e.getKey() === 'number_of_tested',
    );

    if (metafield) {
      return metafield.getValue();
    }
    return 0;
  }

  //Số câu trả lời đúng
  getNumberOfCorrectAnswers() {
    if (!this.result) {
      return '';
    }
    return StringUtils.format(
      '{0}/{1}',
      this.result.numberOfCorrect,
      this.result.totalNumber,
    );
  }

  getNumberOfTimesTested() {
    let total = '0';
    if (this.template) {
      const metafield = this.template
        .getMetafields()
        .find(e => e.getKey() === 'max_number_of_test');

      if (metafield) {
        total = metafield.getValue();
      }
    }
    if (!this.result) {
      return StringUtils.format('{0}/{1}', 0, total);
    }
    return StringUtils.format('{0}/{1}', this.result.numberOfTested, total);
  }

  checkApplyTime() {
    if (this.template && this.template.metafields) {
      const applyTime = this.template.metafields.find(
        e => e.getKey() === 'apply_time',
      );
      const today = moment().format('YYYY-MM-DD');
      if (
        applyTime &&
        moment(today, 'YYYY-MM-DD').isSameOrAfter(
          moment(applyTime.getValue(), 'YYYY-MM-DD'),
        )
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

  //Hết số lần làm bài
  overOfTimes() {
    if (this.status === QuizStatus.Unfinished && this.result) {
      if (this.result.remainingTimes === 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  //Làm bài ngay
  doNow() {
    if (this.status === QuizStatus.Unfinished) {
      if (this.overOfTimes() || !this.checkApplyTime()) {
        return false;
      }
      return true;
    }
    return false;
  }
}

export class TemplateEntity {
  id: number;
  title: string;
  description: string;
  assignStrategyJson: string;
  subTasks: SubTaskEntity[] | null;
  metafields: MetafieldEntity[] | null;
  training: TrainingEntity | null;

  constructor(template: Template) {
    this.id = template.id;
    this.title = template.title;
    this.description = template.description;
    this.assignStrategyJson = template.assignStrategyJson;
    this.subTasks = template.subTasks
      ? template.subTasks.map(subTask => new SubTaskEntity(subTask))
      : null;
    this.metafields = template.metafields
      ? template.metafields.map(e => new MetafieldEntity(e))
      : null;
    this.training = template.training
      ? new TrainingEntity(template.training)
      : null;
  }
  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getAssignStrategyJson(): string {
    return this.assignStrategyJson;
  }

  public setAssignStrategyJson(assignStrategyJson: string): void {
    this.assignStrategyJson = assignStrategyJson;
  }

  public getSubTasks(): SubTaskEntity[] | null {
    return this.subTasks;
  }

  public setSubTasks(subTasks: SubTaskEntity[] | null): void {
    this.subTasks = subTasks;
  }

  public getMetafields(): MetafieldEntity[] {
    if (this.metafields === null) {
      return [];
    }
    return this.metafields;
  }

  public setMetafields(metafields: MetafieldEntity[]): void {
    this.metafields = metafields;
  }

  haveTraining() {
    return this.training !== null;
  }

  getTraining() {
    return this.training;
  }
}

export class SubTaskEntity {
  id: number;
  resolved: boolean;
  resolvedDate: Date | null;
  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string | null;
  lastModifiedDate: Date | null;
  title: string;
  sortedKey: string;
  category: {
    id: number;
    name: string;
  };
  metafields: MetafieldEntity[] | null;
  template: TemplateSubTaskEntity;

  constructor(subTask: SubTask) {
    this.id = subTask.id;
    this.resolved = subTask.resolved;
    this.resolvedDate = subTask.resolvedDate
      ? new Date(subTask.resolvedDate)
      : null;
    this.createdBy = subTask.createdBy;
    this.createdDate = new Date(subTask.createdDate);
    this.lastModifiedBy = subTask.lastModifiedBy;
    this.lastModifiedDate = subTask.lastModifiedDate
      ? new Date(subTask.lastModifiedDate)
      : null;
    this.title = subTask.title;
    this.sortedKey = subTask.sortedKey;
    this.category = subTask.category;
    this.metafields =
      subTask.metafields && subTask.metafields.length > 0
        ? subTask.metafields
            .filter(p => {
              return p.key !== 'answer';
            })
            .map(e => new MetafieldEntity(e))
        : null;
    this.template = TemplateSubTaskEntity.create(subTask.template);
  }

  public getTemplate() {
    return this.template;
  }

  public setTemplate(t: TemplateSubTaskEntity) {
    this.template = t;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public isResolved(): boolean {
    return this.resolved;
  }

  public setResolved(resolved: boolean): void {
    this.resolved = resolved;
  }

  public getResolvedDate(): null | Date {
    return this.resolvedDate;
  }

  public setResolvedDate(resolvedDate: null | Date): void {
    this.resolvedDate = resolvedDate;
  }

  public getCreatedBy(): string {
    return this.createdBy;
  }

  public setCreatedBy(createdBy: string): void {
    this.createdBy = createdBy;
  }

  public getCreatedDate(): Date {
    return this.createdDate;
  }

  public setCreatedDate(createdDate: Date): void {
    this.createdDate = createdDate;
  }

  public getLastModifiedBy(): null | string {
    return this.lastModifiedBy;
  }

  public setLastModifiedBy(lastModifiedBy: null | string): void {
    this.lastModifiedBy = lastModifiedBy;
  }

  public getLastModifiedDate(): null | Date {
    return this.lastModifiedDate;
  }

  public setLastModifiedDate(lastModifiedDate: null | Date): void {
    this.lastModifiedDate = lastModifiedDate;
  }

  public getTitle(): string {
    return this.title;
  }

  public getTitleDisplay(index: number): string {
    return StringUtils.format(
      'Câu {0}: {1}',
      index + 1,
      this.template.getTitle(),
    );
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getSortedKey(): string {
    return this.sortedKey;
  }

  public setSortedKey(sortedKey: string): void {
    this.sortedKey = sortedKey;
  }

  public getCategory(): {id: number; name: string} {
    return this.category;
  }

  public setCategory(category: {id: number; name: string}): void {
    this.category = category;
  }

  public getMetafields(): MetafieldEntity[] {
    if (this.metafields === null) {
      return [];
    }
    return this.metafields;
  }

  public setMetafields(metafields: MetafieldEntity[]): void {
    this.metafields = metafields;
  }

  static clone(subTask: SubTaskEntity): SubTaskEntity {
    const clonedSubTask = new SubTaskEntity({
      id: subTask.getId(),
      resolved: subTask.isResolved(),
      resolvedDate: subTask.getResolvedDate()?.toISOString() ?? null,
      createdBy: subTask.getCreatedBy(),
      createdDate: subTask.getCreatedDate().toISOString() ?? null,
      lastModifiedBy: subTask.getLastModifiedBy(),
      lastModifiedDate: subTask.getLastModifiedDate()?.toISOString() ?? null,
      title: subTask.getTitle(),
      sortedKey: subTask.getSortedKey(),
      category: subTask.getCategory(),
      metafields: [],
      template: {
        id: subTask.template.getId(),
        title: subTask.template.getTitle(),
        metafields: subTask.template.getMetafields() ?? [],
        category: subTask.template.getCategory(),
      },
    });

    return clonedSubTask;
  }
}

export class MetafieldEntity {
  private key: string;
  private value: string;
  private selected: boolean = false;

  constructor(metafield: MetafieldResponse) {
    this.key = metafield.key;
    this.value = metafield.value;
    this.selected = metafield.selected ?? false;
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(key: string): void {
    this.key = key;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
  }

  public setSelected(value: boolean) {
    this.selected = value;
  }
  public getSelected() {
    return this.selected;
  }

  static clone(metafield: MetafieldEntity): MetafieldEntity {
    const clonedMetafield = new MetafieldEntity({
      key: metafield.getKey(),
      value: metafield.getValue(),
      selected: metafield.getSelected(),
    });

    clonedMetafield.setSelected(metafield.getSelected());

    return clonedMetafield;
  }
}

export class TaskUpdateEntity {
  private assigneeCode: string;
  private minPointToPass: string;
  private numberOfCorrect: number;
  private numberOfTested: number;
  private pass: boolean;
  private ratio: string;
  private remainingTimes: number;
  private totalNumber: number;
  private status?: string;

  constructor(
    assigneeCode: string,
    minPointToPass: string,
    numberOfCorrect: number,
    numberOfTested: number,
    pass: boolean,
    ratio: string,
    remainingTimes: number,
    totalNumber: number,
    status?: string,
  ) {
    this.assigneeCode = assigneeCode;
    this.minPointToPass = minPointToPass;
    this.numberOfCorrect = numberOfCorrect;
    this.numberOfTested = numberOfTested;
    this.pass = pass;
    this.ratio = ratio;
    this.remainingTimes = remainingTimes;
    this.totalNumber = totalNumber;
    this.status = status;
  }

  static create(response: TaskUpdateResponse): TaskUpdateEntity {
    return new TaskUpdateEntity(
      response.assigneeCode,
      response.minPointToPass,
      response.numberOfCorrect,
      response.numberOfTested,
      response.pass,
      response.ratio,
      response.remainingTimes,
      response.totalNumber,
      response.status,
    );
  }

  getAssigneeCode(): string {
    return this.assigneeCode;
  }

  setAssigneeCode(value: string) {
    this.assigneeCode = value;
  }

  getMinPointToPass(): string {
    return this.minPointToPass;
  }

  setMinPointToPass(value: string) {
    this.minPointToPass = value;
  }

  getNumberOfCorrect(): number {
    return this.numberOfCorrect;
  }

  setNumberOfCorrect(value: number) {
    this.numberOfCorrect = value;
  }

  getNumberOfTested(): number {
    return this.numberOfTested;
  }

  setNumberOfTested(value: number) {
    this.numberOfTested = value;
  }

  isPass(): boolean {
    return this.pass;
  }

  setPass(value: boolean) {
    this.pass = value;
  }

  getRatio(): string {
    return this.ratio;
  }

  setRatio(value: string) {
    this.ratio = value;
  }

  getRemainingTimes(): number {
    return this.remainingTimes;
  }

  setRemainingTimes(value: number) {
    this.remainingTimes = value;
  }

  getTotalNumber(): number {
    return this.totalNumber;
  }

  setTotalNumber(value: number) {
    this.totalNumber = value;
  }

  getStatus(): 'completed' | 'wrong' | 'waiting' {
    if (this.pass) {
      return 'completed';
    }
    if (!this.pass) {
      return 'wrong';
    }
    return 'waiting';
  }

  setStatus(value: string | undefined) {
    this.status = value;
  }

  public getResponse(quizId: number): TaskResultResponse {
    return {
      quizId: quizId,
      remainingTimes: this.remainingTimes,
      status: this.getStatus(),
      minPointToPass: this.minPointToPass,
      ratio: this.ratio,
      totalNumber: this.totalNumber,
      numberOfCorrect: this.numberOfCorrect,
      numberOfTested: this.numberOfTested,
    };
  }
}

export class TemplateSubTaskEntity {
  private id: number;
  private title: string;
  private category: CategoryResponse | null;
  private metafields: MetafieldResponse[];

  constructor(
    id: number,
    title: string,
    category: CategoryResponse | null,
    metafields: MetafieldResponse[],
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.metafields = metafields;
  }

  static create(response: TemplateSubTaskResponse): TemplateSubTaskEntity {
    return new TemplateSubTaskEntity(
      response.id,
      response.title,
      response.category,
      response.metafields,
    );
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getCategory(): CategoryResponse | null {
    return this.category;
  }

  setCategory(category: CategoryResponse | null): void {
    this.category = category;
  }

  getMetafieldEntities(): MetafieldEntity[] {
    return this.metafields
      ? this.metafields
          .filter(p => {
            return p.key !== 'answer' && p.key !== 'type';
          })
          .map(e => new MetafieldEntity(e))
      : [];
  }

  getMetafields() {
    return this.metafields;
  }

  setMetafields(metafields: MetafieldResponse[]): void {
    this.metafields = metafields;
  }

  isEnterAnswer() {
    return (
      this.metafields.findIndex(
        e =>
          (e.key === 'type' && e.value === 'essay') ||
          (e.key === 'answer' && e.value === 'E'),
      ) !== -1
    );
  }
}

export class TaskResultEntity {
  startAt: string;
  finishAt: string;
  numberOfTested: number;
  numberOfCorrect: number;
  totalNumber: number;
  remainingTimes: number;
  minPointToPass: string;
  ratio: string;
  pass: boolean;

  constructor(response: TaskResult) {
    this.startAt = response.startAt;
    this.finishAt = response.finishAt;
    this.numberOfTested = response.numberOfTested;
    this.numberOfCorrect = response.numberOfCorrect;
    this.totalNumber = response.totalNumber;
    this.remainingTimes = response.remainingTimes;
    this.minPointToPass = response.minPointToPass;
    this.ratio = response.ratio;
    this.pass = response.pass;
  }

  getStartAt(): string {
    return this.startAt;
  }

  setStartAt(value: string) {
    this.startAt = value;
  }

  getFinishAt(): string {
    if (this.finishAt) {
      return moment(this.finishAt).format('hh:mm DD/MM/YYYY');
    }
    return this.finishAt;
  }

  setFinishAt(value: string) {
    this.finishAt = value;
  }

  getNumberOfTested(): number {
    return this.numberOfTested;
  }

  setNumberOfTested(value: number) {
    this.numberOfTested = value;
  }

  getNumberOfCorrect(): number {
    return this.numberOfCorrect;
  }

  setNumberOfCorrect(value: number) {
    this.numberOfCorrect = value;
  }

  getTotalNumber(): number {
    return this.totalNumber;
  }

  setTotalNumber(value: number) {
    this.totalNumber = value;
  }

  getRemainingTimes(): number {
    return this.remainingTimes;
  }

  setRemainingTimes(value: number) {
    this.remainingTimes = value;
  }

  getMinPointToPass(): string {
    return this.minPointToPass;
  }

  setMinPointToPass(value: string) {
    this.minPointToPass = value;
  }

  getRatio(): string {
    return this.ratio;
  }

  setRatio(value: string) {
    this.ratio = value;
  }

  getPass(): boolean {
    return this.pass;
  }

  setPass(value: boolean) {
    this.pass = value;
  }
}
