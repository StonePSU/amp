import { GET_ACCOUNTS, GET_ACCOUNT_BY_ID } from "../actionTypes";

export default function accountReducer(state = [], action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return [...action.accounts];
    case GET_ACCOUNT_BY_ID:
      return [...state.accounts, action.account];
    default:
      return state;
  }
}
