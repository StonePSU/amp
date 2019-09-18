import { combineReducers } from "redux";
import auth from "./auth";
import account from "./account";
import error from "./error";
import api from "./api";
import profile from "./profile";

const rootReducer = combineReducers({ auth, account, error, api, profile });

export default rootReducer;
