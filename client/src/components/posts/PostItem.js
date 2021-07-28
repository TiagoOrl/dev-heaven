import {getFullPost} from '../../actions/post'
import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'

const PostItem = (props) => {

    let deleteBtn = <div></div>;

    if (props.auth.user !== null && props.item.user_id === props.auth.user._id){
        deleteBtn = 
        <button      
        type="button"
        className="btn btn-danger">
            <i className="fas fa-times"></i>
        </button>
    }

    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/full-profile/${props.item._id}`}>
              <img
                className="round-img"
                src={props.item.avatar}
                alt=""
              />
              <h4>{props.item.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {props.item.title}
            </p>
             <p className="post-date">
                Posted on {' '}
                <Moment format="DD/MM/YYYY">{props.item.date}</Moment>
            </p>
            <button type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>{' '}
              <span>{props.item.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/full-item`} className="btn btn-primary">
              Comments <span className='comment-count'>{props.item.comments.length}</span>
            </Link>
            {deleteBtn}
          </div>
        </div>
    )
}

PostItem.propTypes = {
    getFullPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getFullPost })(PostItem);
