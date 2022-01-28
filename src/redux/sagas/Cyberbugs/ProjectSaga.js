import { call, takeLatest, put, delay } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import {
  CLOSE_DRAWER,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  UPDATE_PROJECT_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";

function* createProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      //console.log(data);
      history.push("/projectmanagement");
    }
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getListProject()
    );

    if (status === STATUS_CODE.SUCCESS) {
      //console.log(data);
      yield put({
        type: GET_LIST_PROJECT,
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

function* updateProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.updateProject(action.projectUpdate)
    );

    if (status === STATUS_CODE.SUCCESS) {
      //console.log(data);
      //history.push("/projectmanagement");
    }
    yield put({ type: GET_LIST_PROJECT_SAGA });
    yield put({ type: CLOSE_DRAWER });
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

function* deleteProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  try {
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      //console.log(data);

      notifiFunction("success", "Delete project successfully !");

      // history.push('/projectmanagement');
    } else {
      notifiFunction("error", "Delete project fail !");
    }
    yield call(getListProjectSaga);
  } catch (err) {
    console.log(err.response.data);
    notifiFunction("error", "Delete project fail !");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}
