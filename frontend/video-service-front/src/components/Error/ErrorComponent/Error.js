import React from 'react';

import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import './Error.css';

const Error = (props) => {
    return (
        <Container className='Error my-5'>
            <Alert variant='warning'>
                <h1>Oops, i think we have got a <b>{props.errorCode}</b> error!</h1>
                <p>{props.text}</p>
            </Alert>
        </Container>
    );
};

export default Error;