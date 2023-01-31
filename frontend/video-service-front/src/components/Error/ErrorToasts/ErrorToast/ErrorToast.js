import React from 'react';

import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

import './ErrorToast.css';

const ErrorToast = (props) => {
    return (
        <ToastContainer 
            className='mx-2 my-2'
            containerPosition='fixed' 
            position='top-end'>
            <Toast 
                className='Toast'
                bg='warning' 
                show={props.show}
                onClose={props.click}>
                <Toast.Header>
                    <strong>Error</strong>
                </Toast.Header>
                <Toast.Body>
                    {props.text}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ErrorToast;