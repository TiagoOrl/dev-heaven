import { connect } from 'react-redux'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/post'

const PostForm = props => {

    const [formData, setFormData] = useState({
        text: '',
        title: ''
    });

    return (
        <div class="post-form">
        <div class="bg-primary p">
          <h3>Create a new Post</h3>
        </div>
        <form class="form my-1" onSubmit={e => {e.preventDefault(); props.addPost(formData)}}>
            <textarea
                name="title"
                cols="30"
                rows="5"
                value={formData.title}
                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                placeholder="Title Here"
                required
            ></textarea>
            <textarea
                name="text"
                cols="30"
                rows="5"
                value={formData.text}
                onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                placeholder="Post Text"
                required
            ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm)
