import { call, takeLatest, put, delay } from "redux-saga/effects";
import { priorityService } from "../../../services/PriorityService";
import {
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
} from "../../constants/Cyberbugs/PriorityConstant";

function* getAllPrioritySaga(action) {
  try {
    const { data, status } = yield call(() => priorityService.getAllPriority());

    //Lấy dữ liệu thành công thì đưa dữ liệu lên redux
    yield put({
      type: GET_ALL_PRIORITY,
      arrPriority: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetAllPrioritySaga() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}
