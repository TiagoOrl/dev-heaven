import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Fragment, useState } from 'react';
import { login }  from '../../actions/login';

const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const onChange = e => { setFormData({ ...formData, [e.target.name]: e.target.value }) };

    const onSubmit = async (e) => {
        e.preventDefault();
        props.login(formData.email, formData.password);
    }

    // redirect if logged in
    if (props.isAuthenticated) {
        return  <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Log in</h1>
            <p className="lead"><i className="fas fa-user"></i> Enter into your profile</p>
            <form className="form" onSubmit={ e => onSubmit(e) }>

                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={e => onChange(e)}
                    />
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
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </Fragment>
    )
};


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.hasToken
});



export default connect(mapStateToProps, { login })(Login);