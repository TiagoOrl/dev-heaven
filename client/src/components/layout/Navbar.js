import { logout } from '../../actions/login';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import React, {Fragment} from 'react';

const Navbar = (props) => {

    const onLogout = () => {
        window.location.reload();
        props.logout();
    };

    const loggedLinks = (
        <ul>
            <li><Link to="/" onClick={onLogout} >Logout</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );


    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i clLinkssName="fas fa-code"></i> DevConnector
                </Link>
            </h1>
            { 
                !props.auth.loading ? 
                ( <Fragment>
                    { props.auth.isAuthenticated ? 
                        loggedLinks : 
                        guestLinks 
                    }
                </Fragment> ) :
                null
             }
        </nav>
    )
}

// valitate the type of the object props
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);