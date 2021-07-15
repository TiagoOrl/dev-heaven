import axios from 'axios';
import { LOGIN_SUCCESS, LOGOUT, LOGIN_FAIL } from './types';
import { setAlert } from './alert';
import setUserToken  from './auth';

// login route return the token
export const login = (email, password) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { email, password };

    try {
        const res = await axios.post('/api/users/login', body, config);
        localStorage.setItem('token', res.data.token);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(setUserToken(res.data.token));

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger')));
        }

        localStorage.removeItem('token');
        dispatch({type: LOGIN_FAIL});
    }
};


export const logout = () => dispatch => {
    
    localStorage.removeItem('token');
    dispatch ({
        type: LOGOUT
    });
};