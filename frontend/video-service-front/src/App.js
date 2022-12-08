import React, { Component } from 'react';
import { Route, Routes, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import Auth from './containers/Auth/Auth';
import Profile from './containers/User/Profile/Profile';

import './App.css';

const Home = () => <h1> It's home, friend </h1>

class App extends Component {
  state = {
    showAuthModal: false,
  }


  render () {

    let routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={Home} />
      </Routes>
    );

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
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps ) ( App ) ;
