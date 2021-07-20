import { setAlert } from './alert';
import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, UPDATE_PROFILE_ERROR } from './types';


export const getCurrentProfile = () => async dispatch => {

    
    try {
        const res = await axios.get('/api/profile/me');
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error, 
                status: error.response.status }
        });
    }
};


export const createProfile = (formData, history, edit = false) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }


    try {
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) history.push('/dashboard');  // redirect 


    } catch (err) {
        const errors = err.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: UPDATE_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }


};


export const addExperience = (formData, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience added with success.', 'success'));
        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: UPDATE_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const addEducation = (formData, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience added with success.', 'success'));
        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: UPDATE_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
