import { Link } from 'react-router-dom'; 
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Spinner } from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithubRepos from './ProfileGithubRepos';

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
                        <ProfileAbout profile={props.profile.data} />

                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {props.profile.data.experience.length > 0 ? 
                            (
                                <Fragment>
                                    {props.profile.data.experience.map(item => (
                                        <ProfileExperience key={item._id} experience={item} />
                                    ))}
                                </Fragment>) :
                            (<h4>No experience found</h4>)}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {props.profile.data.education.length > 0 ? 
                            (
                                <Fragment>
                                    {props.profile.data.education.map(item => (
                                        <ProfileEducation key={item._id} education={item} />
                                    ))}
                                </Fragment>) : 
                                
                                (<h4>No education found</h4>)   }
                        </div>

                        {props.profile.data.github_username && (
                            <ProfileGithubRepos  username={props.profile.data.github_username} />
                        )}
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
