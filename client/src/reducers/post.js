import { GET_ALL_POSTS, GET_FULL_POST, DELETE_POST, POST_ERROR, 
            UPDATE_LIKES } from '../actions/types';


const initialState = {
    all_posts: null,
    full_post: null,
    msg: null
};



export default function post(state = initialState, action) {

    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                all_posts: action.payload,
                msg: 'All posts queried from endpoint'
            };

        case GET_FULL_POST:
            return {
                ...state,
                full_post: action.payload,
                msg: 'Full post obtained'
            }

        case DELETE_POST:
            return {
                ...state,
                msg: action.payload
            }

        case POST_ERROR:
            return {
                ...state,
                msg: action.payload
            }

        case UPDATE_LIKES:
            return {
                ...state,
                all_posts: action.payload.res,
                msg: action.payload.msg
            };

        default:
            return state;
    }
}