import { createProfile, getCurrentProfile } from '../../actions/profile';
import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const EditProf = props => {

    const [formData, setFormData] = useState({
        
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''

    });

    const [isSocialInToggled, toggleSocialInputs] = useState(false);

    useEffect(() => {
        props.getCurrentProfile();

        console.log(props.profile.data.social);


        setFormData({
            company : props.profile.loading || !props.profile.data.company ? '' : props.profile.data.company,
            website : props.profile.loading || !props.profile.data.website ? '' : props.profile.data.website,
            location : props.profile.loading || !props.profile.data.location ? '' : props.profile.data.location,
            status : props.profile.loading || !props.profile.data.status ? '' : props.profile.data.status,
            skills : props.profile.loading || !props.profile.data.skills ? '' : props.profile.data.skills.join(', '),
            githubusername : props.profile.loading || !props.profile.data.githubusername ? '' : props.profile.data.githubusername,
            bio : props.profile.loading || !props.profile.data.bio ? '' : props.profile.data.bio,
            twitter : props.profile.loading || !props.profile.data.social ? '' : props.profile.data.social.twitter,
            facebook : props.profile.loading || !props.profile.data.social ? '' : props.profile.data.social.facebook,
            linkedin : props.profile.loading || !props.profile.data.social ? '' : props.profile.data.social.linkedin,
            youtube : props.profile.loading || !props.profile.data.social ? '' : props.profile.data.social.youtube,
            instagram : props.profile.loading || !props.profile.data.social ? '' : props.profile.data.social.instagram

        });

    }, [props.profile.loading]);

    const onSelProfStatus = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onClickSubmit = async (e) => {
        e.preventDefault();

        props.createProfile(formData, props.history, true);
    };

    return (
        <Fragment>           
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={ e => onClickSubmit(e) }>
                <div className="form-group">
                <select name="status" value={formData.status} onChange={e => onSelProfStatus(e)}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Company" name="company" 
                    value={formData.company} 
                    onChange={e => onSelProfStatus(e)} 
                />
                <small className="form-text"
                    >Could be your own company or one you work for</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Website" name="website"
                value={formData.website} 
                onChange={e => onSelProfStatus(e)}  
                />
                <small className="form-text"
                    >Could be your own or a company website</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location"
                    value={formData.location} 
                    onChange={e => onSelProfStatus(e)}  
                />
                <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills" 
                    value={formData.skills} 
                    onChange={e => onSelProfStatus(e)}  
                />
                <small className="form-text"
                    >Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small
                >
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                    value={formData.githubusername} 
                    onChange={e => onSelProfStatus(e)}  
                />
                <small className="form-text"
                    >If you want your latest repos and a Github link, include your
                    username</small
                >
                </div>
                <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio"
                    value={formData.bio} 
                    onChange={e => onSelProfStatus(e)}  
                ></textarea>
                <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                <button onClick={() => toggleSocialInputs(!isSocialInToggled)} type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
                </div>

                {isSocialInToggled && 
                <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter"
                            value={formData.twitter} 
                            onChange={e => onSelProfStatus(e)}   
                        />
                        </div>

                        <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook"
                            value={formData.facebook} 
                            onChange={e => onSelProfStatus(e)}  
                        />
                        </div>

                        <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" name="youtube"
                            value={formData.youtube} 
                            onChange={e => onSelProfStatus(e)}  
                        />
                        </div>

                        <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin"
                            value={formData.linkedin} 
                            onChange={e => onSelProfStatus(e)}  
                        />
                        </div>

                        <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" 
                            value={formData.instagram} 
                            onChange={e => onSelProfStatus(e)}  
                        />
                    </div>

                </Fragment>
                }

                
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
            
        </Fragment>
    )
}

EditProf.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProf);

