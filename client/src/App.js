import Post from './components/full_post/Post';
import Posts from './components/posts/Posts';
import FullProfile from './components/profiles/FullProfile';
import Profiles from './components/profiles/Profiles';
import AddEducation from './components/user_dashboard/AddEducation';
import AddExperience from './components/user_dashboard/AddExperience';
import PrivateRoute from './components/routing/PrivateRoute';
import setUserToken from './actions/auth';
import EditProf from './components/user_dashboard/EditProf';
import Create from './components/user_dashboard/Create';
import Alert from './components/layout/Alert';
import Login from './components/login_register/Login';
import Register from './components/login_register/Register';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/user_dashboard/Dashboard';
import Landing from './components/layout/Landing';
import React,  { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';



const App = () => {
  useEffect(() => {
    store.dispatch(setUserToken());
  }, []);

  return (
    // Provider allows Components to access the Redux store
    <Provider store={store}>  
      <Router>
        <Fragment>
          <Navbar/>
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/all-profiles" component={Profiles}/>
              <Route exact path="/full-profile/:id" component={FullProfile}/>
              <Route exact path="/all-posts" component={Posts} />
              <Route exact path="/full-post/:post_id" component={Post} />
              
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/create-profile" component={Create} />
              <PrivateRoute exact path="/edit-profile" component={EditProf} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />

            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

