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
import { USER_SIGNIN_API } from "../../constants/Cyberbugs/Cyberbugs";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

function* signinSaga(action) {
  yield delay(500);
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    let { data, status } = yield cyberbugsService.signinCyberBugs(
      action.userLogin
    );

    //Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    console.log(data);
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiActionSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}
