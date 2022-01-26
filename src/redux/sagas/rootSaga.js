import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as ProjectCategory from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";

export function* rootSaga() {
  yield all([
    //Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTaskApi(),
    ToDoListSaga.theoDoiActionRejectTaskApi(),
    ToDoListSaga.theoDoiActionCheckDoneTaskApi(),

    // Cyberbugs Saga
    Cyberbugs.theoDoiSignin(),
    ProjectCategory.theoDoiAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
  ]);
}
