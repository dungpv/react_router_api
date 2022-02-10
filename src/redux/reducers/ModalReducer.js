import React from "react";
import { OPEN_FORM } from "../constants/Cyberbugs/Cyberbugs";

const stateDefault = {
  Component: <p>Nội dung mặc định</p>,
};

export default (state = stateDefault, action) => {
  switch (action.type) {
    case OPEN_FORM: {
      state.Component = action.Component;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
