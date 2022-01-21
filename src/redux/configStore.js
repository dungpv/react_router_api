import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from "redux-thunk";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  //reducer khai báo tại đây
  ToDoListReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

middleWareSaga.run(rootSaga);

export default store;
