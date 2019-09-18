import { SET_CURRENT_USER } from "../actionTypes";
import { restAPICall, setTokenHeader } from "../../services/restApiCall";
import jwtDecode from "jwt-decode";
import { addError, removeError } from "./error";
import { setLoading } from "./api";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function register(type, userData) {
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
      let url = type ? "/api/auth/signup" : "/api/auth/signin";
      dispatch(setLoading(1));
      restAPICall("post", url, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(jwtDecode(token)));
          dispatch(removeError());
          dispatch(setLoading(0));
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          dispatch(addError(err));
          dispatch(setLoading(0));
          reject(); // indicate the API call failed
        });
    });
  };
}

export function logoutUser() {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    dispatch(setCurrentUser({}));
  };
}
