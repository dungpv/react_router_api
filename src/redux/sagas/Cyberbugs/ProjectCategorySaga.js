import { call, takeLatest, put } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";

function* getAllProjectCategorySaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getAllProjectCategory()
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
