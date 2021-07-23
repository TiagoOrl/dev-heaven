import React from 'react'
import { a } from 'react-router-dom';
import PropTypes from 'prop-types'

const ProfileTop = props => {
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
            {   props.profile.website &&
                    <a href={props.profile.website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                    </a>
            }
            {
                props.profile.twitter && 
                    <a href={props.profile.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
            }

            {
                props.profile.facebook && 
                    <a href={props.profile.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
            }

            {
                props.profile.linkedin &&
                    <a href={props.profile.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>

            }

            {
                props.profile.youtube && 
                    <a href={props.profile.youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>
            }
                
            {
                props.profile.instagram &&
                    <a href={props.profile.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
            }
                
                
                
          </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop
