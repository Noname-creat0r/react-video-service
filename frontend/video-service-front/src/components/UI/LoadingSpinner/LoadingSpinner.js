import React from 'react';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import './LoadingSpinner.css';


const LoadingSpinner = (props) => {
    return (
        <Container className="my-2" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '3rem' }}>Loading...</span> 
            <Spinner 
                className='spinner'
                animation='border' />
        </Container>
    );
};

export default LoadingSpinner;