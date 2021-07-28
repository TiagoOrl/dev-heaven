import { setAlert } from './alert';
import axios from 'axios';
import { GET_ALL_POSTS, GET_FULL_POST, DELETE_POST, 
            POST_ERROR, ADD_POST, UPDATE_LIKES } from './types';




export const getAllPosts = () => async dispatch => {

    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_ALL_POSTS,
            payload: res.data
        });

    } catch (error) {
        
        dispatch({
            type: POST_ERROR,
            payload: error
        });
    }
}


export const getFullPost = (post_id) => async dispatch => {

    try {
        const res = await axios.get(`/api/posts/${post_id}`);

        dispatch({
            type: GET_FULL_POST,
            payload: res.data
        });

    } catch (error) {

        dispatch({
            type: POST_ERROR,
            payload: error
        })
    }
}


export const addPost = (new_post) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        const res = await axios.post('/api/posts', new_post, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        
        dispatch(setAlert(res.data, 'success'));

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger')));
        }

        dispatch({
            type: POST_ERROR,
            payload: error
        });
    }
}


export const deletePost = (post_id) => async dispatch => {
     
    try {
        const res = await axios.delete(`/api/posts/${post_id}`);

        dispatch({
            type: DELETE_POST,
            payload: res.data
        });

        dispatch(setAlert(res.data, 'success'));
        dispatch(getAllPosts());

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error
        })
    }
}


export const addLike = (post_id) => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/like/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {res: res.data, msg: 'Added Like'}
        });

        dispatch(getAllPosts());

    } catch (error) {

        dispatch({
            type: POST_ERROR,
            payload: error
        })
    }
}


export const removeLike = (post_id) => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/unlike/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {res: res.data, msg: 'Removed Like'}
        });

        dispatch(getAllPosts());

    } catch (error) {

        dispatch({
            type: POST_ERROR,
            payload: error
        })
    }
}