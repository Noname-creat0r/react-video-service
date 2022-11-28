import React from 'react';

import Layout from './containers/Layout/Layout';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <Layout>
          dad
        </Layout>
      </ErrorBoundary>
    </div>
  );
}

export default App;
