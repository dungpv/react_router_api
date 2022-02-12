import { CLOSE_MODAL, OPEN_MODAL } from "../constants/Cyberbugs/Cyberbugs";
import {
  OPEN_FORM_CREATE_USER,
  OPEN_FORM_EDIT_USER,
  SET_SUBMIT_CREATE_USER,
  SET_SUBMIT_EDIT_USER,
} from "../constants/Cyberbugs/UserConstant";

const initialState = {
  visible: false,
  title: "Open Modal",
  textButtonSubmit: "Save",
  ComponentContentModal: <p>Default Content</p>,
  callBackSubmit: (propsValue) => {
    alert("click open modal");
  },
};

export const ModalCyberbugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, visible: true };
    case CLOSE_MODAL:
      return { ...state, visible: false };
    case OPEN_FORM_CREATE_USER: {
      //console.log(action);
      state.visible = true;
      state.ComponentContentModal = action.Component;
      state.title = action.title;
      state.textButtonSubmit = action.textButtonSubmit;
      return { ...state };
    }
    case SET_SUBMIT_CREATE_USER: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }

    case OPEN_FORM_EDIT_USER: {
      //console.log(action);
      state.visible = true;
      state.ComponentContentModal = action.Component;
      state.title = action.title;
      state.textButtonSubmit = action.textButtonSubmit;
      return { ...state };
    }
    case SET_SUBMIT_EDIT_USER: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }

    default:
      return state;
  }
};
