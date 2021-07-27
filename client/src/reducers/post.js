import { GET_ALL_POSTS, GET_FULL_POST, REMOVE_POST, POST_ERROR } from '../actions/types';


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

        case REMOVE_POST:
            return {
                ...state,
                full_post: null,
                msg: 'post removed from state'
            }

        case POST_ERROR:
            return {
                ...state,
                msg: action.payload
            }

        default:
            return state;
    }
}