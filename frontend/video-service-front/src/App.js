import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import Home from './containers/Home/Home';
import Profile from './containers/Profile/Profile';
import Logout from './containers/Auth/Logout/Logout';

import './App.css';

class App extends Component {
  state = {
  }

  render () {

    let routes = (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    );

    if (this.props.isAuthenticated){
      routes =( 
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      )
    }
  return (
      <div className="App">
        <ErrorBoundary>
          <Layout>
            {routes}
          </Layout>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps ) ( App ) ;
