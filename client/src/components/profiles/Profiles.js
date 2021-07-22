import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = props => {

    useEffect(() => {
        props.getAllProfiles();


    }, []);

    return (
        <Fragment>
        {
            props.profile.profiles.loading ? 
                <Spinner/> :
                <Fragment> 
                    <h1 className="large text-primary">
                    Developers
                    </h1> 
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i>
                        Browse and connect with developers.
                    </p>
                    <div className="profiles">
                        {props.profile.profiles.length > 0 ? 
                            props.profile.profiles.map( (item) => (
                                <Fragment>
                                    <ProfileItem key={item._id} profile={item} />
                                    <p/>
                                </Fragment>
                                )    
                            ) :
                            <h4>No profiles found :/</h4>
                    }
                    </div>
                </Fragment>
            
        }
        </Fragment>
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
