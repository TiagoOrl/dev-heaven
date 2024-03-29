import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = props => {


    let socialSection = <div/>;
    
    if (props.profile.social) {
        socialSection = 
        <div >
            {
                props.profile.social.twitter && 
                    <a href={props.profile.social.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
            }

            {
                props.profile.social.facebook && 
                    <a href={props.profile.social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
            }

            {
                props.profile.social.linkedin &&
                    <a href={props.profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>

            }

            {
                props.profile.social.youtube && 
                    <a href={props.profile.social.youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>
            }
                
            {
                props.profile.social.instagram &&
                    <a href={props.profile.social.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
            }       

        </div>
    }


    return (
        <div className="profile-top bg-primary p-2">

            <img
                className="round-img my-1"
                src={props.profile.user.avatar}
                alt='avatar pic'
            />
            <h1 className="large">{props.profile.user.name}</h1>
            <p className="lead">{props.profile.status} at {props.profile.company}</p>
            <p>{props.profile.location && props.profile.location}</p>

            
            <div className="icons my-1">
                {  
                    props.profile.website && (
                        <a href={props.profile.website} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-globe fa-2x"></i>
                        </a>
                    )
                }

                {socialSection}
            </div>

        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop
