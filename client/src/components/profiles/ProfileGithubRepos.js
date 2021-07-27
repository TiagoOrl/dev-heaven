import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import {Spinner} from '../layout/Spinner';


const ProfileGithubRepos = ({username, getGithubRepos, repos }) => {

    useEffect(() => {
        getGithubRepos(username);
    }, []);

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Github Repos</h2>
            {repos.length < 0 ? 
                <Spinner /> : 
                (
                    repos.map((item) => (
                        <div key={item._id} className="repo bg-white p-1 my-1">
                            <div>
                                <h4>
                                    <a href={item.html_url} target='_blank' rel='noopener noreferrer'>
                                        {item.name}
                                    </a>
                                </h4>
                                <p>
                                    {item.description}
                                </p>
                            </div>
                            <div>
                                <ul>
                                    <li className="badge badge-primary">
                                        Stars: {item.stargazers_count}
                                    </li>
                                    <li className="badge badge-dark">
                                        Watchers: {item.watchers_count}
                                    </li>
                                    <li className="badge badge-light">
                                        Forks: {item.forks_count}
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    ))
                )
            }
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
