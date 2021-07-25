import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';


const ProfileGithubRepos = ({username, getGithubRepos, repos }) => {

    useEffect(() => {
        getGithubRepos(username);
    }, []);

    return (
        <div>
            
        </div>
    )
}

ProfileGithubRepos.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    repos: state.profile.repos // reading the repos fetched from the getGithubRepos action API call
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithubRepos);
