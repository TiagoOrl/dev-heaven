import { connect } from 'react-redux';
import React, {Fragment} from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types'

const Experiences = props => {


    const exp_list = props.experiences.map(item => (
        <tr key={item._id}>
            <td>{item.company}</td>
            <td className="hide-sm">{item.title}</td>
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

            <h2 className="my-2">Experiences</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>

                </thead>
                <tbody>{exp_list}</tbody>
            </table>

        </Fragment>
    )
}

Experiences.propTypes = {
    exp_list: PropTypes.array.isRequired
}   

export default Experiences;
