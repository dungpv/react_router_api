import { USLOGIN } from "../constants/Cyberbugs/Cyberbugs";
import {
  GET_USER_SEARCH,
  GET_USER_BY_PROJECT_ID,
  EDIT_USER,
} from "../constants/Cyberbugs/UserConstant";

const { USER_LOGIN } = require("../../util/constants/settingSystem");

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: usLogin,
  userSearch: [],
  arrUser: [],
  userEdit: {
    id: 0,
    email: "abc@gmail.com",
    passWord: "123456",
    name: "user",
    phoneNumber: "123456789",
  },
};

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case GET_USER_SEARCH: {
      state.userSearch = action.lstUserSearch;
      //console.log("action", action);
      return { ...state };
    }
    case GET_USER_BY_PROJECT_ID: {
      return { ...state, arrUser: action.arrUser };
    }
    case EDIT_USER: {
      state.userEdit = action.userEditModel;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
