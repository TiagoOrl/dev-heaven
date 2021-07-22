import { Link } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';


const AddEducation = (props) => {

    const [formData, setFormdata] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
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

      props.addEducation(formData, props.history);
    }

    return (
      <Fragment>
        <h1 className="large text-primary">
        Add Education
        </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add a course, degree, 
          masters or other type of Education that you have.
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => onClickSubmit(e)}>

          <div className="form-group">
            <input type="text" placeholder="* University" name="school" 
              onChange={e => onTypingExperiences(e)} 
              value={formData.school} 
              // required 
              />
          </div>

          <div className="form-group">
            <input type="text" placeholder="* Degree" name="degree" 
              onChange={e => onTypingExperiences(e)}
              value={formData.degree}
              // required 
              />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Field Of Study" name="fieldOfStudy" 
              onChange={e => onTypingExperiences(e)}
              value={formData.fieldOfStudy} 
            //   required
              />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" 
              onChange={e => onTypingExperiences(e)}
              value={formData.from}
            //   required
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
                  {' '}Current Course
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
              placeholder="Course Description"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
};



export default connect(null, { addEducation })(AddEducation);

