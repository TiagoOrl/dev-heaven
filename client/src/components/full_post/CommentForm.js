import { addComment } from '../../actions/post'
import {connect} from 'react-redux'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CommentForm = props => {

    const [formData, setFormData] = useState({
        text: '',
        title: ''
    });

    return (
        <div class="post-form">
            <div class="bg-primary p">
            <h3>Leave a comment: </h3>
            </div>
            <form class="form my-1" 
                onSubmit={e => {
                    e.preventDefault(); 
                    props.addComment(props.post_id, formData )}}>

            <textarea
                name="title"
                cols="26"
                rows="1"
                value={formData.title}
                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                placeholder="Title Comment"
                // required
            ></textarea>
            <textarea
                name="text"
                cols="30"
                rows="5"
                value={formData.text}
                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                placeholder="Comment Here"
                
            ></textarea>
            <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, {addComment})(CommentForm)
