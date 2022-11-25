import React from 'react';

import Layout from './containers/Layout/Layout';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';

import './App.css';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Layout>videos here</Layout>
      </ErrorBoundary>
    </div>
  );
}

export default App;
