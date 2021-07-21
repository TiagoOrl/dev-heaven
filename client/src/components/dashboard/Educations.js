import { connect } from 'react-redux';
import React, {Fragment} from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types'

const Educations = props => {


    const edu_list = props.educations.map(item => (
        <tr key={item._id}>
            <td>{item.school}</td>
            <td className="hide-sm">{item.fieldOfStudy}</td>
            <td className="hide-sm">{item.degree}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{item.from}</Moment> - {' '}
                {item.current === true ? 
                'Now' : 
                <Moment format='DD/MM/YYYY'>{item.to}</Moment>
                }   
            </td>

            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
        
    ));

    return (
        <Fragment>

            <h2 className="my-2">Education</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Course</th>
                        <th className="hide-sm">Degree Type</th>
                        <th className="hide-sm">Period</th>
                        <th />
                    </tr>

                </thead>
                <tbody>{edu_list}</tbody>
            </table>

        </Fragment>
    )
}

Educations.propTypes = {
    edu_list: PropTypes.array.isRequired
}   

export default Educations;
