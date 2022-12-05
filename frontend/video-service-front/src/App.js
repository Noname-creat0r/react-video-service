import React from 'react';
import { Route, Routes} from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import Auth from './containers/Auth/Auth';
import Profile from './containers/User/Profile/Profile';

import './App.css';

const Home = () => <h1> It's home, friend </h1>
//const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const App = () => {
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

export default App;
