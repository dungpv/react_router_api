import { call, takeLatest, put, delay } from "redux-saga/effects";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { taskService } from "../../../services/TaskService";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
  CREATE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "../../constants/Cyberbugs/TaskConstant";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { CLOSE_DRAWER } from "../../constants/Cyberbugs/Cyberbugs";
import { GET_PROJECT_DETAIL } from "../../constants/Cyberbugs/ProjectCyberBugsConstant";

function* createTaskSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  try {
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
    yield put({
      type: CLOSE_DRAWER,
    });
    notifiFunction("success", "Create task successfully !");
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

function* getTaskDetailSaga(action) {
  const { taskId } = action;
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(taskId)
    );

    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModal: data.content,
    });
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  try {
    const { data, status } = yield call(() =>
      taskService.updateStatusTask(taskUpdateStatus)
    );
    //console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL,
        projectId: taskUpdateStatus.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateStatus.taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}
