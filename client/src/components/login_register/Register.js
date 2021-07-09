import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { Fragment, useState } from 'react';

const Register = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const onChange = e => { setFormData({ ...formData, [e.target.name]: e.target.value }) };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2){
            props.setAlert('Passwords do not match', 'danger');
            return;
        }

    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={ e => onSubmit(e) }>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name"
                        name="name" 
                        value={formData.name} 
                        required
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={e => onChange(e)}
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        required
                        value={formData.password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={formData.password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register);