import { GET_CURRENT_USER } from "../actionTypes";
import { restAPICall } from "../../services/restApiCall";
import { setLoading } from "./api";

export function getCurrentUser(user) {
  return {
    type: GET_CURRENT_USER,
    user
  };
}

export function getProfile() {
  return (dispatch, getState) => {
    dispatch(setLoading(1));
    return new Promise((resolve, reject) => {
      let userId = getState().auth.user.sub;
      restAPICall("get", `/api/users/${userId}`)
        .then(res => {
          dispatch(setLoading(0));
          dispatch(getCurrentUser(res));
          resolve(res);
        })
        .catch(err => {
          dispatch(setLoading(0));
          console.log(err);
          reject();
        });
    });
  };
}

export function updateProfile(profile) {
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
      dispatch(setLoading(1));
      restAPICall('put', `/api/users/${profile._id}`, profile)
        .then(res => {
          dispatch(setLoading(0));
          resolve(res);
        })
        .catch(err => {
          dispatch(setLoading(0));
          reject(err);
        })
    })
  }

}