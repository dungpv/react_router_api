import { call, takeLatest, put, delay } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { CLOSE_DRAWER } from "../../constants/Cyberbugs/Cyberbugs";
import {
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  GET_PROJECT_DETAIL,
  PUT_PROJECT_DETAIL,
  UPDATE_PROJECT_SAGA,
} from "../../constants/Cyberbugs/ProjectCyberBugsConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/Cyberbugs/UserConstant";

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

function* getProjectDetailSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  try {
    const { data, status } = yield call(() =>
      projectService.getProjectDetail(action.projectId)
    );
    yield put({
      type: PUT_PROJECT_DETAIL,
      projectDetail: data.content,
    });
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
    history.push("/projectmanagement");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetProjectDetail() {
  yield takeLatest(GET_PROJECT_DETAIL, getProjectDetailSaga);
}

function* getProjectAllSaga(action) {
  // console.log('getProjectAllSaga action',action);

  //HIỂN THỊ LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    const { data, status } = yield call(() => projectService.getAllProject());

    //Lấy dữ liệu thành công thì đưa dữ liệu lên redux
    yield put({
      type: GET_ALL_PROJECT,
      arrProject: data.content,
    });

    yield put({
      type: GET_USER_BY_PROJECT_ID_SAGA,
      idProject: data.content[0]?.id,
    });
  } catch (err) {
    console.log("404 not found !");
    history.push("/projectmanagement");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}
