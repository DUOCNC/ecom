import {ErrorType} from 'common-ui';
import TaskApi from '../axios/TaskApi';
import {TaskEntity, TaskUpdateEntity} from '../models/entities/TaskEntity';
import BaseService from './BaseService';
import {Task} from 'modules/personalize/models/responses/TaskResponse';
import {TaskRequest} from '../models/requests';
import {Moment} from 'moment';
import {
  DelayTaskPutRequests,
  MyTaskRequest,
} from 'modules/personalize/models/requests/TaskRequest';
import {Metadata} from 'common';

class TaskService extends BaseService {
  private taskApi: TaskApi;
  constructor() {
    super();
    this.taskApi = new TaskApi();
  }

  getMyTasksService(
    success: (data: TaskEntity) => void,
    error: (mess: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.taskApi
      .getMyTasksApi()
      .then(response => {
        if (response.data) {
          const {tasks} = response.data;
          if (tasks.length > 0) {
            const tasksEntity = tasks.map((item: Task) => {
              return new TaskEntity(item);
            });
            success(tasksEntity[0]);
          } else {
            error('NotfoundReport');
          }
        }
      })
      .catch(e => {
        this.handlerCatch(e);
      })
      .finally(onFinish);
  }

  getTasksService(
    request: MyTaskRequest,
    success: (data: Array<TaskEntity>, metaData: Metadata) => void,
    error: (mess: ErrorType) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.taskApi
      .getTasksApi(request)
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          this.handleResponse(res.data);
        }
        const result = res.data.data;
        if (result.metadata.total === 0) {
          error('SearchNotfound');
          return;
        }
        const tasksEntity = result.items.map((item: Task) => {
          return new TaskEntity(item);
        });
        success(tasksEntity, result.metadata);
      })
      .catch(e => {
        this.handlerCatch(e);
      })
      .finally(onFinish);
  }

  getTaskDetailService(
    id: number,
    success: (task: Task, data: TaskEntity) => void,
    error: (mess: ErrorType | false) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.taskApi
      .getTaskDetailApi(id)
      .then(response => {
        if (response.data) {
          const tasksEntity = new TaskEntity(response.data);
          success(response.data, tasksEntity);
        } else {
          error('Notfound');
        }
      })
      .catch(e => {
        this.handlerCatch(e);
      })
      .finally(onFinish);
  }

  updateTaskService(
    startAt: Moment,
    taskUpdate: TaskEntity,
    success: (data: TaskUpdateEntity) => void,
    error: (mess: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    const request = taskUpdate.buildRequestUpdate(startAt.toDate());
    if (!request) {
      return;
    }
    const {pass, msg} = this.validTaskUpdate(request);
    if (!pass) {
      return error(msg);
    }
    this.taskApi
      .updateTaskApi(request)
      .then(response => {
        if (response.data) {
          const taskEntity = TaskUpdateEntity.create(response.data);
          success(taskEntity);
        } else {
          error(response.data);
        }
      })
      .catch(e => {
        error('Đã có lỗi xảy ra vui lòng thử lại.');
        this.handlerCatch(e);
      })
      .finally(onFinish);
  }

  private validTaskUpdate(request: TaskRequest): {
    pass: boolean;
    msg: string;
  } {
    //kiểm tra trả lời hết câu hỏi chưa
    if (
      request &&
      request.answer_requests &&
      request.answer_requests.findIndex(e => e.answer === '' || !e.answer) !==
        -1
    ) {
      return {pass: false, msg: 'Bạn chưa trả lời hết câu hỏi'};
    }
    return {pass: true, msg: ''};
  }

  logLearn(task: TaskEntity) {
    this.taskApi.logLearnApi(task.getId());
  }

  logQuiz(task: TaskEntity) {
    this.taskApi.logQuizApi(task.getId());
  }

  delayTask(
    taskUpdate: TaskEntity,
    data: DelayTaskPutRequests,
    success: () => void,
    error: (mess: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.taskApi
      .delayTaskApi(taskUpdate.getId(), data)
      .then(response => {
        console.log('Đã lùi thời gian làm bài', response);
        success();
      })
      .catch(e => {
        error('Đã có lỗi xảy ra vui lòng thử lại.');
        this.handlerCatch(e);
      })
      .finally(onFinish);
  }
}

const taskService = new TaskService();

export default taskService;
