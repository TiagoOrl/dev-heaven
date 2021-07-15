import axios from 'axios';
import { AUTH_SUCCESS, AUTH_FAIL } from './types';


// action for loading the user token, getting the user( for debugging purposes)
const setUserToken = (token) => async dispatch => {
    
    if (localStorage.token) 
        axios.defaults.headers.common['x-auth-token'] = localStorage.token;
    else {
        dispatch({
            type: AUTH_FAIL
        });
    }

    
    try {
        const res = await axios.get('/api/users');
        dispatch({
            type: AUTH_SUCCESS,
            payload: {usr: res.data, token: token}
        });

    } catch (error) {
        dispatch({
            type: AUTH_FAIL
        });
    }
};

export default setUserToken;
