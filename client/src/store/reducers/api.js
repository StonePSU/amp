import { LOADING } from "../actionTypes";

const DEFAULT_STATE = {
  loading: false
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.loading };

    default:
      return state;
  }
};
