import { Spinner } from '../layout/Spinner';
import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllPosts } from '../../actions/post';
import PostItem from './PostItem';

const Posts = props => {

    useEffect(() => {
        props.getAllPosts();
    },[]);

    // always check if the store is null after making an action request to fill that store
    return props.post.all_posts === null ? 
        <Spinner /> :
            (
                <Fragment>
                    <h1 className="large text-primary">
                        <p className="lead">
                            <i className="fas fa-user">

                            </i> 
                            See the latest posts
                        </p>

                        <div className="posts">
                            {props.post.all_posts.map((post_item) => (
                                <PostItem key={post_item._id} item={post_item} />
                            ))}
                        </div>
                    </h1>
                </Fragment>
            )
}

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    post: state.post
});


export default connect(mapStateToProps, { getAllPosts })(Posts)
