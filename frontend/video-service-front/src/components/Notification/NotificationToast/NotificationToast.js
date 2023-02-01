import React from 'react';

import Toast from 'react-bootstrap/Toast';

const NotificationToast = (props) => {
    return (
        <Toast 
            className='Toast'
            bg={props.bg} 
            show={props.show}
            autohide
            onClose={(event, key) => props.click(event, key)}>
            <Toast.Header closeButton>
                <strong>Notification</strong>
            </Toast.Header>
            <Toast.Body>
                {props.text}
            </Toast.Body>
        </Toast>
    );
};

export default NotificationToast;