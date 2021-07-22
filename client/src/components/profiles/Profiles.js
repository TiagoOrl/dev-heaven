import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllProfiles } from '../../actions/profile';

const Profiles = props => {

    useEffect(() => {
        props.getAllProfiles();
        

    }, []);

    return (
        <div>
            
        </div>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profiles: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles } )(Profiles);
