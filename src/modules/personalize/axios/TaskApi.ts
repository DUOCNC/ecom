import {BaseApi, Pageable, Result, StringUtils} from 'common';
import {TaskResponse} from '../models/responses';
import BaseAxiosPegasus from 'common/base/BaseAxiosPegasus';
import {Task} from '../models/responses/TaskResponse';
import {
  DelayTaskPutRequests,
  MyTaskRequest,
  TaskRequest,
} from '../models/requests/TaskRequest';
import {TaskUpdateResponse} from '../models/responses/TaskResultResponse';

class TaskApi extends BaseApi {
  private readonly BaseUrlApi = 'api';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getMyTasksApi() {
    let url = this.getUrl('my-tasks');
    return BaseAxiosPegasus.get<TaskResponse>(url, {});
  }

  getTaskDetailApi(id: number) {
    let url = this.getUrl(StringUtils.format('tasks/{0}', id));
    return BaseAxiosPegasus.get<Task>(url, {});
  }

  updateTaskApi(answer: TaskRequest) {
    let url = this.getUrl(StringUtils.format('tasks/submit'));
    return BaseAxiosPegasus.post<TaskUpdateResponse>(url, answer);
  }

  getTasksApi(request: MyTaskRequest) {
    let url = this.getUrl(StringUtils.format('tasks'));
    return BaseAxiosPegasus.get<Result<Pageable<Task>>>(url, {params: request});
  }
  logLearnApi(taskId: number) {
    let url = this.getUrl(StringUtils.format('tasks/{0}/learning', taskId));
    return BaseAxiosPegasus.put<boolean>(url);
  }
  logQuizApi(taskId: number) {
    let url = this.getUrl(StringUtils.format('tasks/{0}/doing', taskId));
    return BaseAxiosPegasus.put<boolean>(url);
  }
  delayTaskApi(taskId: number, data: DelayTaskPutRequests) {
    let url = this.getUrl(
      StringUtils.format(
        'tasks/{0}/delay?number_of_minutes={1}',
        taskId,
        data.numberOfMinutes,
      ),
    );
    return BaseAxiosPegasus.put<boolean>(url);
  }
}

export default TaskApi;
