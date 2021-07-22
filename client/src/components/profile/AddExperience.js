import { Link } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';


const AddExperience = (props) => {

    const [formData, setFormdata] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });


    const onTypingExperiences = (e) => {
      setFormdata({...formData, [e.target.name]: e.target.value})
    };

    const onClickSubmit = async (e) => {
      e.preventDefault();

      props.addExperience(formData, props.history);
    }

    return (
      <Fragment>
        <h1 className="large text-primary">
        Add An Experience
        </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = // required field</small>
        <form className="form" onSubmit={e => onClickSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="* Job Title" name="title" 
              onChange={e => onTypingExperiences(e)} 
              value={formData.title} 
              // required 
              />
          </div>

          <div className="form-group">
            <input type="text" placeholder="* Company" name="company" 
              onChange={e => onTypingExperiences(e)}
              value={formData.company}
              // required 
              />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Location" name="location" 
              onChange={e => onTypingExperiences(e)}
              value={formData.location} 
              />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" 
              onChange={e => onTypingExperiences(e)}
              value={formData.from}
              />
          </div>
          <div className="form-group">
              <p>
                  <input type="checkbox" name="current" 
                  checked={formData.current}
                  onChange={e => {
                    console.log('clicked ->');
                    setFormdata({...formData, current: !formData.current});
                  }}
                  value={formData.current} 
                  /> 
                  {' '}Current Job
              </p>
          </div>

          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to"
              onChange={e => onTypingExperiences(e)}
              value={ formData.to }
              disabled={ formData.current ? 'disabled' : '' }
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              onChange={e => onTypingExperiences(e)}
              value={formData.description}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
      </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
};



export default connect(null, { addExperience })(AddExperience);

