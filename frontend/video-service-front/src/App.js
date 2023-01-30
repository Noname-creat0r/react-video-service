import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './containers/Layout/Layout';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import Home from './containers/Home/Home';
import Video from './containers/Video/Video';
import Profile from './containers/Profile/Profile';
import Logout from './containers/Auth/Logout/Logout';

import './App.css';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() ),
  };
};

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render () {

    let routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<Video />} />
      </Routes>
    );

    if (this.props.isAuthenticated){
      routes =( 
        <Routes>
          <Route path="/video" element={<Video />} />
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

export default connect( mapStateToProps, mapDispatchToProps ) ( App ) ;
