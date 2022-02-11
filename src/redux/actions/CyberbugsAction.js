import { USER_SIGNIN_API } from "../constants/Cyberbugs/UserConstant";

export const signinCyberbugAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
