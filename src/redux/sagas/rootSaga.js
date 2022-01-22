import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";

export function* rootSaga() {
  yield all([
    //Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTaskApi(),
    ToDoListSaga.theoDoiActionRejectTaskApi(),
    ToDoListSaga.theoDoiActionCheckDoneTaskApi(),
  ]);
}
