import { ADD_PAGE_ERROR } from "../actionTypes";

export function addError(error) {
  return {
    type: ADD_PAGE_ERROR,
    error
  };
}
export function removeError() {
  return {
    type: ADD_PAGE_ERROR,
    error: null
  };
}
