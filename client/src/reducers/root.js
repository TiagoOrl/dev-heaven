import { combineReducers } from "redux";
import alert from './alert';
import register from './register';
import auth from "./auth";
import login from './login';

export default combineReducers({
    alert,
    register,
    auth,
    login
});