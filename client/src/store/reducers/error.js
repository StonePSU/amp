import { ADD_PAGE_ERROR } from "../actionTypes";

const DEFAULT_STATE = {
  error: null
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_PAGE_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
