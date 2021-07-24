import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile }) => {

    let bioSection = <p/>;
    let skillsSection;

    if (profile.bio !== null) {
        bioSection = <p> {profile.bio} </p>
    }

    skillsSection = 
        profile.skills.map(item => (
            <div className="p-1"><i className="fa fa-check"></i>{' '}{item}</div>
        ))
    

    return (

        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profile.user.name.split(' ')[0]}'s Bio</h2>
          {bioSection}
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {skillsSection}
          </div>
        </div>
    )
}

ProfileAbout.propTypes = {

}

export default ProfileAbout
