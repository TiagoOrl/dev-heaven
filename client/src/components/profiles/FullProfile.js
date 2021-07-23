import { Link } from 'react-router-dom'; 
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Spinner } from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';

const FullProfile = props => {

    useEffect(() => {
        props.getProfileById(props.match.params.id);
    }, []);

    return (
        <Fragment>

            {props.profile.data === null ?
                <Spinner/> :
                <Fragment>
                    <Link className="btn btn-light" to="/all-profiles">Go Back</Link>
                    {props.auth.hasToken && props.auth.user._id === props.match.params.id &&  (
                    <Link to="/edit-profile" className="btn btn-dark">
                        Edit Profile
                    </Link>
                    )}
                    
                    <div className="profile-grid my-1">
                        <ProfileTop profile={props.profile.data} />
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

FullProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(FullProfile);
