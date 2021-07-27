import { setAlert } from './alert';
import axios from 'axios';
import { GET_ALL_POSTS, GET_FULL_POST, REMOVE_POST, 
            POST_ERROR } from './types';




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