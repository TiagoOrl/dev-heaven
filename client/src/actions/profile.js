import { setAlert } from './alert';
import axios from 'axios';
import { GET_PROFILE, GET_ALL_PROFILES, PROFILE_ERROR, 
        UPDATE_PROFILE, UPDATE_PROFILE_ERROR, CLEAR_PROFILE, 
        DELETE_ACCOUNT, GET_REPOS } from './types';


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
            payload: error
        });
    }
};

export const getAllProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');

        dispatch({type: CLEAR_PROFILE});
        
        dispatch({
            type: GET_ALL_PROFILES,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: error
        });
    }
};


export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: error
        });
    }
};


export const getGithubRepos = (githubUsrName) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${githubUsrName}`);
        
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: error
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


    } catch (error) {
        const errors = error.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: UPDATE_PROFILE_ERROR,
            payload: error
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

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: UPDATE_PROFILE_ERROR,
            payload: error
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

        dispatch(setAlert('Education added with success.', 'success'));
        history.push('/dashboard');

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: UPDATE_PROFILE_ERROR,
            payload: error
        });
    }
};


export const deleteExperience = (id) => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience removed.', 'success'));
        dispatch(getCurrentProfile());
        
    } catch (error) {

        dispatch({
            type: UPDATE_PROFILE_ERROR,
            payload: { msg: JSON.stringify(error) }
        });
    }
};


export const deleteEducation = (id) => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education removed.', 'success'));
        dispatch(getCurrentProfile());

    } catch (error) {


        console.log(error);

        dispatch({
            type: UPDATE_PROFILE_ERROR,
            payload: error
        });
    }
}


// delete Account
export const deleteAccount = () => async dispatch => {

    if (!window.confirm('Are you sure? This can NOT be undone.'))
        return;

    try {
        const res = await axios.delete(`/api/profile/`);

        dispatch({
            type: DELETE_ACCOUNT,
            payload: res.data});

        dispatch({
            type: CLEAR_PROFILE
        });

        dispatch(setAlert('Account deleted permanently.', 'success'));
    } catch (error) {

        dispatch({
            type: UPDATE_PROFILE_ERROR,
            payload: error
        });
    }
}