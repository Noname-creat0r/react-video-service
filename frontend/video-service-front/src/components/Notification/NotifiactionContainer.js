import React from 'react';

import ToastContainer from 'react-bootstrap/ToastContainer';

const NotifiactionContainer = (props) => {
    return (
        <ToastContainer 
            className='mx-2 my-2'
            containerPosition='fixed' 
            position='top-end'>
                {props.toasts}
        </ToastContainer>
    );
  
};

export default NotifiactionContainer;