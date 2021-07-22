import Educations from './Educations';
import Experiences from './Experiences';
import Managers from './Managers';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, {useEffect} from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';


const Dashboard = (props) => {

    useEffect(() => {
        props.getCurrentProfile();
    }, []);

    
 
        return (
            <Fragment>
                <h1 className="large text-primary">
                    Dashboard
                </h1>
                <p className="lead">
                    <i className="fas fa-user"></i>
                    Welcome {props.auth.user.name}
                </p>
                {props.profile.data !== null ?
                    <Fragment>  
                        <Managers/> 
                        <Experiences experience_list={ props.profile.data.experience } />
                        <Educations education_list={ props.profile.data.education } />
                        <div className="my-2">
                            <button onClick={() => props.deleteAccount()} className="btn btn-danger">
                                <i className="fas fa-user-minus"></i> Delete Account
                            </button>
                        </div>

                    </Fragment> :
                    <Fragment>
                        <p>You don't have a profile.</p>
                        <Link to='/create-profile' className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </Fragment>

                }
            </Fragment>
        )    
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);