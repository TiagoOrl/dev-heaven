import setUserToken  from './auth';
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from './alert';


// Register User
export const register = (name, email, password) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { name, email, password };

    try {
        const res = await axios.post('/api/users/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        localStorage.setItem('token', res.data.token);
        dispatch(setUserToken());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger')));
        }

        localStorage.removeItem('token');
        dispatch({type: REGISTER_FAIL});
    }
}



