import { deleteComment } from '../../actions/post'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const CommentItem = ({deleteComment, postId, comment, auth}) => {

    let deleteBtn = <div/>;

    if (comment !== null && auth.user !== null && comment.user_id === auth.user._id){
        deleteBtn = 
        <button      
            type="button"
            onClick={e => {deleteComment(postId, comment._id)}}
            className="btn btn-danger">
                <i className="fas fa-times"></i>
        </button>
    }

    return (
        <div class="post bg-white p-1 my-1">
            <div>
                <Link to={`/full-profile/${comment.user_id}`}>
                    <img
                    class="round-img"
                    src={comment.avatar}
                    alt=""
                    />
                    <h4>{comment.username}</h4>
                </Link>
            </div>
            <div>
                <p><b>{comment.title}</b></p>
                <p class="my-1">
                    {comment.text}
                </p>
                    <p class="post-date">
                    Posted on <Moment format='DD/MM/YYYY'>{comment.date}</Moment>
                </p>
                {deleteBtn}
            </div>   
        </div>
    )
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStatetoProps = state => ({
    auth: state.auth
})

export default connect(mapStatetoProps, { deleteComment })(CommentItem)
