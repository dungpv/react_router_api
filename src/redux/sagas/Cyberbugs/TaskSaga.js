import { call, takeLatest, put, delay } from "redux-saga/effects";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { taskService } from "../../../services/TaskService";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { CREATE_TASK_SAGA } from "../../constants/Cyberbugs/TaskConstant";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { CLOSE_DRAWER } from "../../constants/Cyberbugs/Cyberbugs";

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
