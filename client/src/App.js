import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import React,  {Fragment} from 'react';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <Navbar/>
      <Landing/>
    </Fragment>

  );
}

export default App;
