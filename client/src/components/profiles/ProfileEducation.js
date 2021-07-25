import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education}) => {
    
    return (
        <div>
            <h3 className="text-dark">{education.school}</h3>
            <p>
                <Moment format='DD/MM/YYYY'>{education.from}</Moment> - 
                {education.current ? 
                    'Now' : 
                    <Moment format='DD/MM/YYYY'>{education.to}</Moment>}
            </p>
            <p>
                <strong>Field of study: </strong> {education.fieldOfStudy}
            </p>
            <p>
                <strong>Degree: </strong> {education.degree}
            </p>

            <p>
                <strong>Description: </strong> {education.description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
}

export default ProfileEducation
