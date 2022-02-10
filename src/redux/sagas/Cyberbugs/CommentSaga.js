import { call, takeLatest, put, delay, select } from "redux-saga/effects";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { commentService } from "../../../services/CommentService";
import {
  CREATE_COMMENT_SAGA,
  DELETE_COMMENT_SAGA,
  GET_COMMENT_ALL,
  GET_COMMENT_ALL_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../../constants/Cyberbugs/CommentConstant";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { GET_TASK_DETAIL_SAGA } from "../../constants/Cyberbugs/TaskConstant";

function* createCommentSaga(action) {
  const { commentObject } = action;
  //console.log(commentObject);
  try {
    const { data, status } = yield call(() =>
      commentService.createComment(commentObject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      //console.log(data);
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: commentObject.taskId,
      });

      yield put({
        type: GET_COMMENT_ALL_SAGA,
        taskId: commentObject.taskId,
      });
      notifiFunction("success", "Create comment successfully !");
    }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiCreateCommentSaga() {
  yield takeLatest(CREATE_COMMENT_SAGA, createCommentSaga);
}

function* getAllCommentSaga(action) {
  //console.log(action);
  const { taskId } = action;
  try {
    const { data, status } = yield call(() =>
      commentService.getAllComment(taskId)
    );

    yield put({
      type: GET_COMMENT_ALL,
      commentAll: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetAllCommentSaga() {
  yield takeLatest(GET_COMMENT_ALL_SAGA, getAllCommentSaga);
}

function* updateCommentSaga(action) {
  console.log(action);
  const { id, contentComment, taskId } = action;
  try {
    const { data, status } = yield call(() =>
      commentService.updateComment(id, contentComment)
    );
    //console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskId,
      });
      yield put({
        type: GET_COMMENT_ALL_SAGA,
        taskId: taskId,
      });
      notifiFunction("success", "Edit comment successfully !");
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiUpdateCommentSaga() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}

function* deleteCommentSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  const { idComment, taskId } = action;
  try {
    const { data, status } = yield call(() =>
      commentService.deleteComment(idComment)
    );
    //console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskId,
      });
      yield put({
        type: GET_COMMENT_ALL_SAGA,
        taskId: taskId,
      });
      notifiFunction("success", "Delete comment successfully !");
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
