import Spinner from '../layout/Spinner';
import {getCurrentProfile} from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, {useEffect} from 'react';
import { Fragment } from 'react';


const Dashboard = (props) => {

    useEffect(() => {
        props.getCurrentProfile();
    }, []);

    if (props.auth.loading && props.profile === null)
        return <Spinner />
    else    
        return (
            <Fragment>
                <h1 className="large text-primary">
                    Dashboard
                </h1>
                <p className="lead">
                    <i className="fas fa-user"></i>
                    Welcome {props.auth.user && props.auth.user.name}
                </p>
                {props.profile !== null ?
                    <Fragment>Has</Fragment> :
                    <Fragment></Fragment>

                }
            </Fragment>
        )    
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);