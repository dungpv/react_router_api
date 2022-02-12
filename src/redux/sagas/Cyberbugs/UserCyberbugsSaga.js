import Axios from "axios";
import {
  call,
  delay,
  fork,
  take,
  takeEvery,
  takeLatest,
  put,
  select,
} from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { USLOGIN } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { userService } from "../../../services/UserService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { GET_LIST_PROJECT_SAGA } from "../../constants/Cyberbugs/ProjectCyberBugsConstant";
import {
  ADD_USER_PROJECT_API,
  GET_USER_API,
  GET_USER_SEARCH,
  REMOVE_USER_PROJECT_API,
  USER_SIGNIN_API,
  DELETE_USER_SAGA,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
  SIGNUP_SAGA,
  UPDATE_USER_SAGA,
} from "../../constants/Cyberbugs/UserConstant";

//Quản lý các action saga
function* signinSaga(action) {
  // console.log(action);
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  //Gọi api
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signinCyberBugs(action.userLogin)
    );

    //Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    //let history = yield select((state) => state.HistoryReducer.history);

    history.push("/home");
  } catch (err) {
    console.log(err);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

function* getUserSaga(action) {
  const { keyword } = action;
  try {
    const { data, status } = yield call(() => userService.getUser(keyword));
    yield put({
      type: GET_USER_SEARCH,
      lstUserSearch: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest(GET_USER_API, getUserSaga);
}

//Quản lý các action saga
function* addUserProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );

    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiAddUserProject() {
  yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
}

function* removeUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.userProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Delete member from project successfully !");
    } else {
      notifiFunction("error", "Delete member from project fail !");
    }
    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
    notifiFunction("error", "Delete member from project fail !");
  }
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga);
}

function* getUserByProjectIdSaga(action) {
  const { idProject } = action;
  //console.log("ProjectId", idProject);
  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );
    //console.log("getUserByProjectId", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [],
      });
    }
  }
}

export function* theoDoiGetUserByProjectId() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

function* signupSaga(action) {
  const { userObject } = action;
  try {
    const { data, status } = yield call(() => userService.signup(userObject));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_API,
        keyword: "",
      });
      notifiFunction("success", "Signup user successfully !");
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiSignUpSaga() {
  yield takeLatest(SIGNUP_SAGA, signupSaga);
}

function* updateUserSaga(action) {
  //console.log(action);
  const { userObject } = action;
  try {
    const { data, status } = yield call(() => userService.editUser(userObject));
    //console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Edit user successfully !");
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiUpdateUserSaga() {
  yield takeLatest(UPDATE_USER_SAGA, updateUserSaga);
}

function* deleteUserSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  const { id } = action;
  console.log(action);
  try {
    const { data, status } = yield call(() => userService.deleteUser(id));
    //console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_API,
        keyword: "",
      });
      notifiFunction("success", "Delete user successfully !");
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiDeleteUserSaga() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}
