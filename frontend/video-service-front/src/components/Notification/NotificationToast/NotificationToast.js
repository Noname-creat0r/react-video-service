import React from 'react';

import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

const NotificationToast = () => {
    return (
        <ToastContainer 
            className='mx-2 my-2'
            containerPosition='fixed' 
            position='top-end'>
            <Toast 
                className='Toast'
                bg='success' 
                show={props.show}
                onClose={props.click}>
                <Toast.Header>
                    <strong>Notification</strong>
                </Toast.Header>
                <Toast.Body>
                    {props.text}
                </Toast.Body>
            </Toast>
            
        </ToastContainer>
    );
};

export default NotificationToast;