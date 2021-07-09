import { Link } from 'react-router-dom';
import React from 'react';
import { Fragment, useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const onChange = e => { setFormData({ ...formData, [e.target.name]: e.target.value }) };
    const onSubmit = async (e) => {

        e.preventDefault();


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
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </Fragment>
    )
}


export default Login;