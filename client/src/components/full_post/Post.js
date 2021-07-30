import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Spinner} from '../layout/Spinner'
import { getFullPost, addLike, removeLike, deletePost } from '../../actions/post'
import { Fragment } from 'react'

const Post = ({
    getFullPost, 
    addLike, 
    removeLike,
    deletePost, 
    post: {full_post}, 
    auth,
    match}) => {

    useEffect(() => {
        getFullPost(match.params.post_id);
    }, [])

    let deleteBtn = <div />;
    let commentForm = <div>You have to be logged in to comment.</div>;
    let postSection = <Spinner />;


    if (auth.token !== null && full_post !== null) {
        commentForm = <CommentForm post_id={full_post._id} />;
    }

    if (full_post !== null && auth.user !== null && full_post.user_id === auth.user._id){
        deleteBtn = 
        <button      
        type="button"
        onClick={e => {deletePost(full_post._id)}}
        className="btn btn-danger">
            <i className="fas fa-times"></i>
        </button>
    }

    if (full_post !== null) {
        postSection = 
        
        <div>
            <div/>
            <div className="post bg-white p-1 my-1">
                
                <div>
                    <Link to={`/full-profile/${full_post.user_id}`}>
                        <img
                            className="round-img"
                            src={full_post.avatar}
                            alt=""
                        />
                        <h4>{full_post.name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                    {full_post.title}
                    </p>
                    <p className="my-1">
                    {full_post.text}
                    </p>
                    <p className="post-date">
                        Posted on {' '}
                        <Moment format="DD/MM/YYYY">{full_post.date}</Moment>
                    </p>
                    <button onClick={e => { addLike(full_post._id)} } type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up"></i>{' '}
                    <span>{full_post.likes.length}</span>
                    </button>
                    <button onClick={e => { removeLike(full_post._id)} } type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down"></i>
                    </button>
                    {deleteBtn}

                    <div className="comments">
                        
                        <h2>Comments</h2>
                        {full_post.comments.map(item => (
                            <CommentItem postId={full_post._id} comment={item} key={item._id} />
                        )
                        )}
                    </div>
                    {commentForm}
                </div>
                
            </div>
        </div>
    }

    return (
        <Fragment>
            <Link to="/all-posts" className='btn'>
                All Posts
            </Link>
            {postSection}
        </Fragment>
    
    )
}

Post.propTypes = {
    getFullPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getFullPost, deletePost, addLike, removeLike })(Post);
