import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import Axios from "axios";
import {
  GET_TASK_API,
  GET_TASKLIST_API,
  ADD_TASK_API,
  DELETE_TASK_API,
  REJECT_TASK_API,
  CHECK_TASK_API,
} from "../constants/ToDoListConst";
import { toDoListService } from "../../services/ToDoListService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";

/*redux 2 loại action: 
      Loại 1: action => object (action thường)
      Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác )
  */

function* getTaskApiAction(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    let { data, status } = yield call(toDoListService.getTaskApi);

    yield delay(1000);

    if (status === STATUS_CODE.SUCCESS) {
      // sau khi lay gia tri thanh cong dung put (giong dispatch ben thunk)
      yield put({
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}

function* addTaskApiAction(action) {
  //Gọi api
  //Hiển thị loading
  //thành công thì load lại task = cách gọi lại action saga load tasklist
  const { taskName } = action;
  try {
    let { data, status } = yield call(() => {
      return toDoListService.addTaskApi(taskName);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction);
}

function* deleteTaskApiAction(action) {
  const { taskName } = action;
  try {
    let { data, status } = yield call(() => {
      return toDoListService.deleteTaskApi(taskName);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiActionDeleteTaskApi() {
  yield takeLatest(DELETE_TASK_API, deleteTaskApiAction);
}

function* rejectTaskApiAction(action) {
  const { taskName } = action;
  try {
    let { data, status } = yield call(() => {
      return toDoListService.rejectTaskApi(taskName);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiActionRejectTaskApi() {
  yield takeLatest(REJECT_TASK_API, rejectTaskApiAction);
}

function* checkDoneTaskApiAction(action) {
  const { taskName } = action;
  try {
    let { data, status } = yield call(() => {
      return toDoListService.checkDoneTaskApi(taskName);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiActionCheckDoneTaskApi() {
  yield takeLatest(CHECK_TASK_API, checkDoneTaskApiAction);
}
