import Login from './components/login_register/Login';
import Register from './components/login_register/Register';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import React,  {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
        </section>
      </Fragment>
    </Router>

  );
}

export default App;

