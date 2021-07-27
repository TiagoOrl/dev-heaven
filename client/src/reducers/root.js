import { combineReducers } from "redux";
import alert from './alert';
import register from './register';
import auth from "./auth";
import login from './login';
import profile from './profile';
import post from './post';

export default combineReducers({
    alert,
    register,
    auth,
    login,
    profile,
    post
});