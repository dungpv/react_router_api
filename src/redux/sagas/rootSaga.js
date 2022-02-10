import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as ProjectCategory from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";
import * as TaskTypeSaga from "./Cyberbugs/TaskTypeSaga";
import * as PrioritySaga from "./Cyberbugs/PrioritySaga";
import * as TaskSaga from "./Cyberbugs/TaskSaga";
import * as StatusSaga from "./Cyberbugs/StatusSaga";
import * as CommentSaga from "./Cyberbugs/CommentSaga";

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
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetail(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    Cyberbugs.theoDoiGetUserByProjectId(),

    // danh muc
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiGetAllPrioritySaga(),
    StatusSaga.theoDoiGetAllStatusSaga(),

    // Task
    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiUpdateTaskSaga(),
    TaskSaga.theoDoiHandleChangePostApiSaga(),

    // Comment
    CommentSaga.theoDoiCreateCommentSaga(),
    CommentSaga.theoDoiGetAllCommentSaga(),
    CommentSaga.theoDoiDeleteCommentSaga(),
    CommentSaga.theoDoiUpdateCommentSaga(),
  ]);
}
