import axios from 'axios';
import { LOGIN_SUCCESS, LOGOUT, LOGIN_FAIL } from './types';
import { setAlert } from './alert';
import getUserFromTokenAction  from './auth';

// Login User
export const login = (email, password) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { email, password };

    try {
        const res = await axios.post('/api/users/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(getUserFromTokenAction());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger')));
        }

        dispatch({type: LOGIN_FAIL});
    }
};


export const logout = () => dispatch => {
    dispatch ({
        type: LOGOUT
    });
};