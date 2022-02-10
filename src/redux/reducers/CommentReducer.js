import {
  CREATE_COMMENT_MODAL,
  GET_COMMENT_ALL,
} from "../constants/Cyberbugs/CommentConstant";

const initialState = {
  commentDetailModal: {
    taskId: 0,
    contentComment: "",
  },
  commentAll: [],
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_ALL: {
      state.commentAll = action.commentAll;
      //console.log("state", state);
      return { ...state };
    }
    case CREATE_COMMENT_MODAL: {
      const { name, value } = action;
      //console.log("value", value);
      // console.log(state.taskDetailModal)
      return {
        ...state,
        commentDetailModal: { ...state.commentDetailModal, [name]: value },
      };
    }
    default:
      return state;
  }
};
