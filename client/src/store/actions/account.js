import { GET_ACCOUNTS, GET_ACCOUNT_BY_ID } from "../actionTypes";
import { restAPICall } from "../../services/restApiCall";
import { setLoading } from "./api";

export function getAccounts(accounts) {
  return {
    type: GET_ACCOUNTS,
    accounts
  };
}

export function getAccount(account) {
  return {
    type: GET_ACCOUNT_BY_ID,
    account
  };
}

export function getAccountById(accountId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));
      restAPICall("get", `/api/accounts/${accountId}`)
        .then(res => {
          dispatch(setLoading(false));
          dispatch(getAccountById(res));
          resolve(res);
        })
        .catch(err => {
          dispatch(setLoading(false));
          console.log("error getting single account");
          reject();
        });
    });
  };
}

export function queryAccounts() {
  return dispatch => {
    dispatch(setLoading(true));
    return restAPICall("get", "/api/accounts")
      .then(res => {
        dispatch(setLoading(false));
        dispatch(getAccounts(res));
      })
      .catch(err => {
        dispatch(setLoading(false));
        console.log("error getting accounts");
      });
  };
}

export function addAccount(account) {
  return dispatch => {
    return new Promise(function (resolve, reject) {
      dispatch(setLoading(true));
      return restAPICall("post", "/api/accounts", account)
        .then(res => {
          dispatch(setLoading(false))
          resolve(res);
        })
        .catch(err => {
          dispatch(setLoading(false));
          reject(err);
        })
    })
  }

}