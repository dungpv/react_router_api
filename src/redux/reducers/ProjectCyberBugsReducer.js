import {
  GET_ALL_PROJECT,
  GET_LIST_PROJECT,
} from "../constants/Cyberbugs/ProjectCyberBugsConstant";

const stateDefault = {
  projectList: [],
  arrProject: [], // Get all project
};

export const ProjectCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT: {
      state.projectList = action.projectList;
      return { ...state };
    }
    case GET_ALL_PROJECT: {
      state.arrProject = action.arrProject;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
