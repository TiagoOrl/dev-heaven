import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';


const ProfileItem = props => {
    return (
        <div className="profile bg-light">
            <img className="rounf-img" 
                src={props.profile.user.avatar} 
                alt="User img" 
            />

            <div>
                <h2>
                    {props.profile.user.name}
                </h2>
                <p>
                    {props.profile.status} {props.profile.company && 
                        <span> at {props.profile.company} </span>}
                </p>
                
                <p className="my-1">
                        {props.profile.location && 
                            <span>{props.profile.location}</span>
                        }
                </p>
                <Link to={`/full-profile/${props.profile.user._id}`} 
                    className="btn btn-primary">
                        View Profile
                </Link>
            </div>

            <ul>
                {props.profile.skills.slice(0, 4).map( (item, index) => (
                    <li key={index} calssName="text-primary"> 
                        <i className="fas fa-check"/> {item}
                    </li>
                    ) 
                )}
            </ul>

        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;
