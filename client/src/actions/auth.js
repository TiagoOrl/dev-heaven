import setAuthToken from '../utils/header_config';
import axios from 'axios';
import { AUTH_SUCCESS, AUTH_FAIL } from './types';


// load User
const getUserFromTokenAction = () => async dispatch => {
    
    if (localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users');
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: AUTH_FAIL
        });
    }
};

export default getUserFromTokenAction;
