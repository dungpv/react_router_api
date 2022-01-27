import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_EDIT_PROJECT,
} from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
  visible: false,
  title: "Open Drawer",
  ComponentContentDrawer: <p>Default Content</p>,
  callBackSubmit: (propsValue) => {
    alert("click Demo");
  },
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };
    case CLOSE_DRAWER:
      return { ...state, visible: false };
    case OPEN_FORM_EDIT_PROJECT: {
      state.visible = true;
      state.ComponentContentDrawer = action.Component;
      state.title = action.title;
      return { ...state };
    }
    case SET_SUBMIT_EDIT_PROJECT: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }
    default:
      return state;
  }
};
