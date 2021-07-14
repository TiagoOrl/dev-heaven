import PrivateRoute from './components/routing/PrivateRoute';
import getUserFromTokenAction from './actions/auth';
import Alert from './components/layout/Alert';
import Login from './components/login_register/Login';
import Register from './components/login_register/Register';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/layout/Landing';
import React,  { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';



const App = () => {
  useEffect(() => {
    store.dispatch(getUserFromTokenAction());
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
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

